import React from 'react'

class Stone extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color : this.props.color
        }
    }
    
    render() {
        var style = {
            height: 25,
            width: 25,
            display: 'inline-block',
            borderRadius: 100/2,
            backgroundColor: this.state.color
        };
        return (
            <span onClick={() => this.props.click(this.state.color)} style = {style}></span>
        );
    }
 
}
export default Stone;