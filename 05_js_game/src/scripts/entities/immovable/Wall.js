import Immovable from "./Immovable";

export default function Wall(x, y, game) {
    Immovable.call(this, x, y, game);
}

Wall.prototype = Object.create(Immovable.prototype);
Object.defineProperty(Wall.prototype, 'constructor', { 
   value: Wall, 
   enumerable: false,
   writable: true 
});

Wall.prototype.update = function() {};

Wall.prototype.render = function(game) {

    if (this.sleep) return;

    game.context.beginPath();
    game.context.rect(this.x, this.y, game.blockSize, game.blockSize);
    game.context.fillStyle = '#774F38';
    game.context.fill();
};