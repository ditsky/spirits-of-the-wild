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
        if (this.state.stone == "grey"){
            if (this.props.placeStone(this.props.animal_number, this.props.position)) {
                this.setState({stone: this.props.stoneSelected});
            }
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