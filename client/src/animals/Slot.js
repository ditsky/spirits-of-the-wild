import React from 'react'
import './board.css';

class Slot extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stone : this.props.stone
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        if (this.props.turn && this.props.click && this.props.stoneSelected != null){
            this.setState({stone: this.props.stoneSelected});
        }
    }
    
    render() {
        var style = {
            height: 25,
            width: 25,
            display: 'inline-block',
            borderRadius: 100/2,
            backgroundColor: this.state.stone
        };
        return (
            <span onClick={this.handleClick} style = {style}></span>
        );
    }
 
}
export default Slot;