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

    renderTurtleRow(slots,j,start){
        var turtle_array = []
        for (var i=start; i<slots; i++){
            turtle_array.push(<Col md={{ span: 1, offset: 0 }}> 
            <Slot animal_number={5} position={i} placeStone={this.props.placeStone} stone={this.props.spaces[j]}
                stoneSelected={this.props.stoneSelected}> 
            </Slot> </Col>)
            j++
        }
        return turtle_array
    }
    
    render() {
        var topRow = this.renderTurtleRow(2,0,0)
        var bottomRow = this.renderTurtleRow(6,2,3)
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