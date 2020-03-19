import React from 'react'
import Slot from  './Slot'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Beaver extends React.Component {

    constructor(props){
        super(props);
        this.renderBeaverTopRow = this.renderBeaverTopRow.bind(this)
        this.renderBeaverBottomRow = this.renderBeaverBottomRow.bind(this)
    }

    renderBeaverTopRow(){
        var beaver_array = []
        beaver_array.push(<Col md="auto"> 
            <Slot animal_number={3} position={0} placeStone={this.props.placeStone} stone={this.props.spaces[0]} 
                  stoneSelected={this.props.stoneSelected}> 
            </Slot> </Col>)
        beaver_array.push(<Col md={{ span: 1, offset: 1 }}>
            <Slot animal_number={3} position={1} placeStone={this.props.placeStone} stone={this.props.spaces[3]} 
                  stoneSelected={this.props.stoneSelected}> 
            </Slot> </Col>)
        return beaver_array
    }

    renderBeaverBottomRow(){
        var beaver_array = []
        for (var i=2; i<4; i++){
            beaver_array.push(<Col md="auto"> 
            <Slot animal_number={3} position={i} placeStone={this.props.placeStone} stone={this.props.spaces[i+1]} 
                  stoneSelected={this.props.stoneSelected}>
            </Slot> </Col>)
        }

        beaver_array.push(<Col md={{ span: 1, offset: 1 }}>
            <Slot animal_number={3} position={4} placeStone={this.props.placeStone} stone ={this.props.spaces[4]}
                  stoneSelected={this.props.stoneSelected}> 
            </Slot> </Col>)
        return beaver_array
    }
    
    render() {
        var topRow = this.renderBeaverTopRow()
        var bottomRow = this.renderBeaverBottomRow()
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
export default Beaver;