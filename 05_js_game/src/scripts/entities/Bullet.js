export default function Bullet(i, game) {
    this.vectorX = Math.cos(game.player.angle + 90 * Math.PI / 180 + i * 5 * Math.PI / 180);
    this.vectorY = Math.sin(game.player.angle + 90 * Math.PI / 180 + i * 5 * Math.PI / 180);
    this.x = game.player.x + this.vectorX * game.arcSizeRadius * 1.5;
    this.y = game.player.y + this.vectorY * game.arcSizeRadius * 1.5;
    this.radius = 5;
    this.bounds = { x: this.x - this.radius, y: this.y - this.radius, width: this.radius * 2, height: this.radius * 2 };
    this.frames = 0;
    this.markToDelete = false;
}

Bullet.prototype.rectangleIntersection = function(r1, r2) {
    return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
};

Bullet.prototype.update = function(game) {
    this.x += this.vectorX * 25;
    this.y += this.vectorY * 25;

    this.bounds.x = this.x - this.radius;
    this.bounds.y = this.y - this.radius;

    this.frames++;

    if (this.frames > 15) {
        this.markToDelete = true;
    }

    for (const wall of game.walls) {
        if (this.rectangleIntersection(wall.bounds, this.bounds)) {
            this.markToDelete = true;
        }
    }

};

Bullet.prototype.render = function(game) {
    game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    game.context.fillStyle = '#F8CA00';
    game.context.fill();
};