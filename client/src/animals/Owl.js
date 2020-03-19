import React from 'react'
import Slot from  './Slot'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Owl extends React.Component {

    constructor(props){
        super(props);
        this.renderOwlRow = this.renderOwlRow.bind(this)
    }

    renderOwlRow(j){
        var owl_array = []
        for (var i=0; i<3; i++){
            owl_array.push(<Col md="auto"> 
            <Slot placeStone={this.props.placeStone} animal_number={1} position={i} 
                  stone={this.props.spaces[j]} stoneSelected={this.props.stoneSelected}> 
            </Slot> </Col>)
            j++
        }
        return owl_array
    }
    
    render() {
        var topRow = this.renderOwlRow(0)
        var bottomRow = this.renderOwlRow(3)
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
export default Owl;