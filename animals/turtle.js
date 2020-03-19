var Beaver = require('./beaver');
class Turtle extends Beaver {

    same(color){
        return this.checkSpaces(color,1,5)
    }
  
    validMove(position, color) {
    if (this.valid(position) && this.same(color)){
        return true
    }
    return false
    }
}

module.exports = Turtle;