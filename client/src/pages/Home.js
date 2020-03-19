import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';


class Home extends Component {

    constructor(props){
        super(props);
        this.state = { room_id: '', username: '' };

        this.handleHost = this.handleHost.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
    }

    componentDidMount(){
        this.props.socket.on('game', (room_id, username, opponent) => {
            this.props.history.push({
              pathname: '/game',
              state: {room_id: room_id, username: username, opponent: opponent}
            })
        })
    }

    handleHost(event){
        event.preventDefault();
        this.props.socket.emit('host game', this.state.username);
    }

    handleJoin(event){
        event.preventDefault();
        this.props.socket.emit('join game', this.state.room_id, this.state.username);
    }

    handleRoomChange(event) {
        this.setState({ room_id: event.target.value });
    }

    handleUserChange(event) {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
        <div className="App">
        <h1>Project Home</h1>

        <Form className="form-signin" onSubmit={this.handleJoin} >
        <Label>
             Username:
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleUserChange}
            />
          </Label>
            <button onClick={this.handleHost} variant="raised">
                Host a Game
            </button>
          <Label>
            Room id:
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleRoomChange}
            />
          </Label>
          <Button type="submit" value="Submit"> Submit </Button>
        </Form>
        </div>
        );
    }
}
export default Home;