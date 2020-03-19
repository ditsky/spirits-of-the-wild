var Board = require('./board');

    class Game {
      constructor(room_id, users) {
        this.room_id = room_id;
        this.cloth_bag_total = 56
        this.cloth_bag = {"Opalescent" : 8, "Blue" : 8, "Teal" : 8, "Orange" : 8, "White" : 8, "Purple" : 8, "Yellow" : 8};
        this.bowl = []
        for (var i=0; i<4; i++){
          var stone = this.takeStoneFromBag(false)
          this.bowl.push(stone)
        }
        var board1 = new Board(users[0])
        var board2 = new Board(users[1])
        this.boards = [board1, board2]  
      }

      takeFromBowl(color) {
        var index = this.bowl.indexOf(color);
        if (index > -1) {
           this.bowl.splice(index, 1);
        }
     }

      takeStoneFromBag(Opalescent) {
        //calulate probabilites
        var opalescent_p = 1 - this.cloth_bag["Opalescent"]/this.cloth_bag_total
        var blue_p = opalescent_p - this.cloth_bag["Blue"]/this.cloth_bag_total
        var teal_p = blue_p - this.cloth_bag["Teal"]/this.cloth_bag_total
        var orange_p = teal_p - this.cloth_bag["Orange"]/this.cloth_bag_total
        var white_p = orange_p - this.cloth_bag["White"]/this.cloth_bag_total
        var purple_p = white_p - this.cloth_bag["Blue"]/this.cloth_bag_total

        var color = null
        if (!Opalescent) {
          while (color == null || color == "Opalescent") {
            color = this.chooseStoneColor(opalescent_p, blue_p, orange_p, white_p, purple_p)
          }
        } else {
          color = this.chooseStoneColor(opalescent_p, blue_p, orange_p, white_p, purple_p)
        }
        this.cloth_bag[color]--
        this.cloth_bag_total--
        return color
      }

      chooseStoneColor(opalescent_p, blue_p, teal_p, orange_p, white_p, purple_p) {
        var rand = Math.random()
        if (rand < purple_p)
          return "Yellow"
        if (rand < white_p)
          return "Purple"
        if (rand < orange_p)
          return "White"
        if (rand < teal_p)
          return "Orange"
        if (rand < blue_p)
          return "Teal"
        if (rand < opalescent_p)
          return "Blue"
        else
          return "Opalescent"
      }
    }

  module.exports = Game;