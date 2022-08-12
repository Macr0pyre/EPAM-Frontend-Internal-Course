export default function Immovable(x, y, game) {
    this.boundingType = 'box';
    this.x = x * game.blockSize;
    this.y = y * game.blockSize;
    this.sleep = true;
    this.bounds = { x: this.x, y: this.y, width: game.blockSize, height: game.blockSize };
}