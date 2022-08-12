export default function Camera() {
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.frames = 0;
}

Camera.prototype.rectangleIntersection = function(r1, r2) {
    return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
};

Camera.prototype.update = function(game) {
    this.frames++;
    if (this.frames >= 15) {
        this.frames = 0;

        const screen = { x: game.player.x - this.offsetX - game.context.canvas.width / 2 - game.blockSize, y: game.player.y - this.offsetY - game.context.canvas.height / 2 - game.blockSize, width: game.context.canvas.width + game.blockSize * 2, height: game.context.canvas.height + game.blockSize * 2 };

        for (const entity of game.entities) {
            const bounds = {};

            if (entity.boundingType === 'arc') {
                bounds.x = entity.x - game.arcSizeRadius;
                bounds.y = entity.y - game.arcSizeRadius;
                bounds.width = game.arcSizeRadius * 2;
                bounds.height = game.arcSizeRadius * 2;

            } else if (entity.boundingType === 'box') {
                bounds.x = entity.x;
                bounds.y = entity.y;
                bounds.width = game.blockSize;
                bounds.height = game.blockSize;
            }

            entity.sleep = !this.rectangleIntersection(bounds, screen);
        }
    }
};

Camera.prototype.resize = function() {};

Camera.prototype.preRender = function(game) {
    const targetX = -game.player.x + game.context.canvas.width / 2;
    const targetY = -game.player.y + game.context.canvas.height / 2;

    const vectorX = targetX - this.x;
    const vectorY = targetY - this.y;

    this.offsetX = this.x - targetX;
    this.offsetY = this.y - targetY;

    this.x += vectorX / 10;
    this.y += vectorY / 10;

    game.context.save();
    game.context.translate(this.x, this.y);
};

Camera.prototype.postRender = function(game) {
    game.context.restore();
};