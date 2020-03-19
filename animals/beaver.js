var Animal = require('./animal');
class Beaver extends Animal {

    sameColor(position, color){
        if (position < 4) {
            return this.checkSpaces(color,0,2)
        }
        return this.checkSpaces(color,3,4)
      }

      checkSpaces(color, start, end) {
        for (var i=start; i<end+1; i++) {
            if (this.spaces[i] != color && this.spaces[i] != 'grey')
                return false
        }
        return true
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

module.exports = Beaver;