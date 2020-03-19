var Animal = require('./animal');

class Owl extends Animal {

    sameColor(position, color){
      if (position == 1) {
        return (this.spaces[2] == 'grey' || color == this.map[2])
      }
      else if (position == 2) {
        return (this.spaces[1] == 'grey' || color == this.map[1])
      }
      else if (position == 3) {
        return (this.spaces[4] == 'grey' || color == this.map[4])
      }
      else if (position == 4) {
        return (this.spaces[3] == 'grey' || color == this.map[3])
      }
      else if (position == 5) {
        return (this.spaces[6] == 'grey' || color == this.map[6])
      }
      else if (position == 6) {
        return (this.spaces[5] == 'grey' || color == this.map[5])
      }
      else {
        return false
      }
    }

    validMove(position, color) {
      if (this.valid(position) && this.sameColor(position, color)){
        return true
      }
      return false
    }

    addStone(position, color) {
      if (this.validMove(position,color)) {
        this.add(position, color)
        return true
      }
      return false
    }
  }

  module.exports = Owl;