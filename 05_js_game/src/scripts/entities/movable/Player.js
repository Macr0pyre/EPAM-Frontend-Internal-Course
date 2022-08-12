import Movable from "./Movable";

export default function Player(x, y, game) {
    Movable.call(this, x, y, 5, 100, game);
    this.canTakeDamage = true;
    this.damageVelocity = { x: 0, y: 0 };
}

Player.prototype = Object.create(Movable.prototype);
Object.defineProperty(Player.prototype, 'constructor', { 
   value: Player, 
   enumerable: false,
   writable: true 
});

Player.prototype.takeDamage = function(enemy, game) {
    if (this.canTakeDamage) {
        const vectorX = this.x - enemy.x;
        const vectorY = this.y - enemy.y;

        const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

        if (length > 0) {
            this.damageVelocity.x = vectorX / length * 20;
            this.damageVelocity.y = vectorY / length * 20;
            this.canTakeDamage = false;

            this.health -= 25;
            this.health = this.health < 0 ? 0 : this.health;

            if (this.health == 0) {
                this.dead = true;
                document.querySelector('.wrapper-end').style.display = 'table';
                game.isGameEnded = true;
            }
        }

    }
};

Player.prototype.update = function(game, entityCollision) {

    if (this.sleep || this.dead) return;

    let keysCount = 0;
    keysCount += game.keyboard.up ? 1 : 0;
    keysCount += game.keyboard.down ? 1 : 0;
    keysCount += game.keyboard.left ? 1 : 0;
    keysCount += game.keyboard.right ? 1 : 0;

    let currentSpeed = this.speed;

    if (keysCount > 1) {
        currentSpeed /= Math.sqrt(2);
    }

    //#region keyboard
    if (Math.abs(this.damageVelocity.x) != 0 < Math.abs(this.damageVelocity.y) != 0) {

        this.damageVelocity.x *= 0.9;
        this.damageVelocity.y *= 0.9;

        this.x += this.damageVelocity.x;
        this.y += this.damageVelocity.y;

        if (Math.abs(this.damageVelocity.x) < 0.5 && Math.abs(this.damageVelocity.y) < 0.5) {
            this.damageVelocity = { x: 0, y: 0 };
            this.canTakeDamage = true;
        }

    } else {
        if (game.keyboard.up) this.y -= currentSpeed;
        if (game.keyboard.down) this.y += currentSpeed;
        if (game.keyboard.left) this.x -= currentSpeed;
        if (game.keyboard.right) this.x += currentSpeed;
    }
    //#endregion

    //#region collision
    const collisionVector = entityCollision.arcToWalls(game.walls, this.x, this.y, game.arcSizeRadius, game.blockSize);
    this.x += collisionVector.x * currentSpeed;
    this.y += collisionVector.y * currentSpeed;
    //#endregion

    //#region mouse
    let vectorX = game.camera.offsetX + game.context.canvas.width / 2 - game.mouse.x;
    let vectorY = game.camera.offsetY + game.context.canvas.height / 2 - game.mouse.y;
    //#endregion

    const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

    if (length > 0) {
        vectorX /= length;
        vectorY /= length;

        this.angle = Math.atan2(vectorY, vectorX) + 90 * Math.PI / 180;
    }

    if (game.keyboard.up || game.keyboard.down || game.keyboard.left || game.keyboard.right) {
        this.footIncrementer += this.speed;
    }
    this.footPosition = Math.sin(this.footIncrementer * Math.PI / 180);
};

Player.prototype.render = function(game, entityHelper, entityDrawer) {

    if (this.sleep) return;

    entityHelper.beginRotationOffset(game.context, this.x, this.y, this.angle);

    if (!this.dead) {
        entityDrawer.human(game.context, this.footPosition);
    } else {
        entityDrawer.deadHuman(game.context);
    }

    entityHelper.endRotationOffset(game.context, this.x, this.y, this.angle);

    entityDrawer.healthBar(game.context, this.health, this.x, this.y);
};