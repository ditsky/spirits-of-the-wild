var Animal = require('./animal');

class Rabbit extends Animal {

    differentColor(position, color){
      for (var position=0; position<this.spaces.length; position++) {
        if (this.spaces[position] == color)
          return false
      }
      return true
    }

    validMove(position, color) {
      if (this.valid(position) && this.differentColor(position, color)){
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

  module.exports = Rabbit;