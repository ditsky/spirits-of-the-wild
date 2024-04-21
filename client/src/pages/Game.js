import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Board from '../board/Board'
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
      let your_board = <Board board={this.state.your_board} clickable={true} 
                        placeStone={this.placeStone} stoneSelected={this.state.stoneSelected}/>
      let opponent_board = <Board board={this.state.opponent_board} clickable={false} 
                            placeStone={this.placeStone} stoneSelected={this.state.stoneSelected}/>
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