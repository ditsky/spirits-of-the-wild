var Owl = require('./animals/owl');
var Rabbit = require('./animals/rabbit');
var Beaver = require('./animals/beaver');
var Salmon = require('./animals/salmon');
var Turtle = require('./animals/turtle');

class Board {
    constructor(player) {
        var owl = new Owl(6)
        var rabbit = new Rabbit(3)
        var beaver = new Beaver(5)
        var salmon = new Salmon(6)
        var turtle = new Turtle(5)
        //maybe look for a way to change this
        this.animals = [player, owl, rabbit, beaver, salmon, turtle]
        
    }
}

module.exports = Board;