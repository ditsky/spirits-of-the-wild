import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slot from '../animals/Slot'
import Owl from '../animals/Owl'
import Beaver from '../animals/Beaver'
import Salmon from '../animals/Salmon'
import Turtle from '../animals/Turtle'
import Stone from '../Stone'

class Game extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      selectingStones: 0,
      turn: true,
      stoneSelected: null,
      room_id: this.props.location.state.room_id,
      ready: false, 
      opponent: this.props.location.state.opponent, 
      game:null,
      your_board:null,
      opponent_board:null
    }

    this.takeOneStone = this.takeOneStone.bind(this)
    this.addStone = this.addStone.bind(this)
    this.handleStoneClick = this.handleStoneClick.bind(this)
    this.playTakeStone = this.playTakeStone.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.placeStone = this.placeStone.bind(this)
  }

  componentDidMount(){
    this.props.socket.on('refresh', (game) => {
      var your_board = null
      var opponent_board = null
      console.log(game)
      
      for (var i=0; i<2; i++){
        if (game.boards[i].animals[0] == this.props.socket.id)
          your_board = game.boards[i].animals
        else 
          opponent_board = game.boards[i].animals
      }
      this.setState({ready: true, game:game, your_board:your_board, opponent_board:opponent_board})
    })
    
    this.props.socket.on('opponent', (opponent) => {
      this.setState({opponent: opponent})
    })
  }

  changeTurn(){
    this.setState({turn: false, stoneSelected: null})
  }

  placeStone(animal, position){
    if (this.state.turn && this.state.click && this.state.stoneSelected != null && this.state.selectingStones > 0) {
      this.setState({selectingStones: this.state.selectingStones - 1})
      if (this.state.selectingStones == 0) {
        this.changeTurn()
      }
      this.takeOneStone(this.state.stoneSelected, animal, position);
      return true
    }
    return false
  }

  takeOneStone(color, animal, position) {
    this.props.socket.emit('take one stone', this.state.room_id, color, this.props.socket.id, animal, position)
  }

  playTakeStone(stones) {
    if (this.state.turn) {
      console.log("setting this # of stones: " + stones)
      this.setState({ selectingStones: stones })
      console.log("selecting stones: " + this.state.selectingStones)
    }
  }


  takeTwoStones(c1, a1, p1, c2, a2, p2) {
    this.takeOneStone(c1, a1, p1)
    this.takeOneStone(c2, a2, p2)
  }

  addStone(){
    this.props.socket.emit('add one stone', this.state.room_id)
  }

  addStones(stones){
    for (var i=0; i<stones; i++){
      this.addStone()
    }
  }

  renderPhrase = (ready) => {
    let text = null;
    if (ready){
      text = <div> 
                <p> Your opponent is {this.state.opponent} </p> 
                <button onClick={() => this.playTakeStone(1)}> Take One Stone </button> 
                <button onClick={() => this.playTakeStone(2)}> Take Two Stones </button>
                <button onClick={() => this.addStones(2)}> Add Two Stones, Take One Stone </button>
                <button onClick={() => this.addStones(3)}> Add Three Stones, Move Coyote </button>  
              </div>
    } else {
      text = <p> Send this code to your friend! {this.props.location.state.room_id} </p>
    }
    return text;
  }

  renderBoard = (board, click) => {
    var key = 0
    var board_array = []
    for (var i=1; i<board.length; i++){
      if (i==1) {
        board_array.push(<p key={key}> Owl: </p>)
        board_array.push(<Owl spaces={board[1].spaces} placeStone={() => this.placeStone(click)} 
                              stoneSelected={this.state.stoneSelected}> 
                        </Owl>)
      }
      else if (i==2){
        board_array.push(<p key={key}> Rabbit: </p>)
        for (var j=0; j<board[i].spaces.length; j++){
          board_array.push(<Slot animal_number={2} placeStone={this.placeStone} position={j} 
                              stone={board[2].spaces[j]} stoneSelected={this.state.stoneSelected}>
                          </Slot>)
        }
      }
      else if (i==3){
        board_array.push(<p key={key}> Beaver: </p>)
        board_array.push(<Beaver spaces={board[3].spaces} placeStone={this.placeStone} 
                            stoneSelected={this.state.stoneSelected}>
                        </Beaver>)
      }
      else if (i==4){
        board_array.push(<p key={key}> Salmon: </p>)
        board_array.push(<Salmon spaces={board[4].spaces} placeStone={this.placeStone} 
                            stoneSelected={this.state.stoneSelected}>
                        </Salmon>)
      }
      else if (i==5){
        board_array.push(<p key={key}> Turtle: </p>)
        board_array.push(<Turtle spaces={board[5].spaces} placeStone={this.placeStone} 
                            stoneSelected={this.state.stoneSelected}>
                        </Turtle>)
      }

      key++    
    }
    return board_array
  }

  renderBowl = (bowl) => {
    var bowl_array = []
    for (var i=0; i<bowl.length; i++){
      bowl_array.push(<Stone click = {this.handleStoneClick} color={bowl[i]} > </Stone>)
    }
    return bowl_array
  }

  handleStoneClick(color) {
    if (this.state.turn && this.state.selectingStones > 0){
        this.setState({stoneSelected: color});
    }
  }

  renderGame = (ready) => {
    let game = null;
    if (ready) {
      let your_board = this.renderBoard(this.state.your_board, true)
      let opponent_board = this.renderBoard(this.state.opponent_board, false)
      let bowl = this.renderBowl(this.state.game.bowl)
      game = <div>
                <Image src="https://image.shutterstock.com/image-photo/top-view-wooden-bowl-isolated-260nw-396726331.jpg" roundedCircle />
                <p> Bowl: {bowl} </p>
                <Container>
                  <Row>
                    <Col>Your board: {your_board}</Col>
                    <Col>Opponent board: {opponent_board}</Col>
                  </Row>
                </Container>
             </div>

    } else  
      game = <p> Game will start when your friend joins!</p>
    return game
  }

  render() {
    var text = this.renderPhrase(this.state.ready)
    var game = this.renderGame(this.state.ready)
    return (
      <div className="App">
        {text}
        {game}
      </div>
    );
  }
}

export default Game;