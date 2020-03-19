import React from 'react'
import Slot from  './Slot'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Turtle extends React.Component {

    constructor(props){
        super(props);
        this.renderTurtleRow = this.renderTurtleRow.bind(this)
    }

    renderTurtleRow(slots,j){
        var turtle_array = []
        for (var i=0; i<slots; i++){
            turtle_array.push(<Col md={{ span: 1, offset: 0 }}> 
            <Slot stone={this.props.spaces[j]} stoneSelected={this.props.stoneSelected} click={this.props.click} 
            turn={this.props.turn}> </Slot> </Col>)
            j++
        }
        return turtle_array
    }
    
    render() {
        var topRow = this.renderTurtleRow(2,0)
        var bottomRow = this.renderTurtleRow(3,2)
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        {topRow}
                    </Row>
                    <Row className="justify-content-md-center">
                        {bottomRow}
                    </Row>
                </Container>
            </div>
        );
    }
 
}
export default Turtle;