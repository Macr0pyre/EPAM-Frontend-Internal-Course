export default function Movable(x, y, speed, health, game) {
    this.boundingType = 'arc';
    this.x = x * game.blockSize;
    this.y = y * game.blockSize;
    this.angle = 0;
    this.footPosition = 0;
    this.footIncrementer = 0;
    this.speed = speed;
    this.sleep = true;
    this.health = health;
    this.dead = false;
}