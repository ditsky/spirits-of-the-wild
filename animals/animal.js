class Animal {
    constructor(slots) {
      this.spaces = []
      this.opalescent = false
      for (var i=0; i<slots; i++){
        this.spaces[i] = 'grey'
      }
    }

    valid(position) {
      if (this.spaces[position] == 'grey') {
        return true
      }
      return false
    }

    add(position, color) {
      this.spaces[position] = color
    }

    addOpalescent() {
      if (!this.opalescent) {
        this.opalescent = true
      }
    }
  }

module.exports = Animal;