import React from 'react'
import Slot from  './Slot'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Salmon extends React.Component {

    constructor(props){
        super(props);
        this.renderSalmonRow = this.renderSalmonRow.bind(this)
    }

    renderSalmonRow(j){
        var salmon_array = []
        for (var i=0; i<3; i++){
            salmon_array.push(<Col md={{ span: 1, offset: 0 }}> 
            <Slot stone={this.props.spaces[j]} stoneSelected={this.props.stoneSelected} click={this.props.click} 
            turn={this.props.turn}> </Slot> </Col>)
            j++
        }
        return salmon_array
    }
    
    render() {
        var topRow = this.renderSalmonRow(0)
        var bottomRow = this.renderSalmonRow(3)
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
export default Salmon;