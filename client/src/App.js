import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Game from './pages/Game';
import socketIOClient from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      socket: socketIOClient('http://localhost:5000')
    };
  }

  render() {
    const App = () => (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact path="/"
              render={props => (
                <Home
                  {...props}
                  socket={this.state.socket}
                />
              )}
            />
            <Route
              path="/game"
                render={props => <Game {...props} socket={this.state.socket} />}
            />
          </div>
        </BrowserRouter>
      </div>
    )

    return (
      <App/>
    );
  }
}

export default App;
