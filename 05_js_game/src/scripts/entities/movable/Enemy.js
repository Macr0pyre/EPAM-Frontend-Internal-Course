import Movable from "./Movable";

export default function Enemy(x, y, game) {
    Movable.call(this, x, y, 3, 100, game);
    this.pushAlongVelocity = { x: 0, y: 0 };
    this.pushBulletVelocity = { x: 0, y: 0 };
    this.canBePushedByBullet = true;
    this.lastVectorX = 0;
    this.lastVectorY = 0;
}

Enemy.prototype = Object.create(Movable.prototype);
Object.defineProperty(Enemy.prototype, 'constructor', { 
   value: Enemy, 
   enumerable: false,
   writable: true 
});

Enemy.prototype.pushAlong = function(vectorX, vectorY) {
    this.pushAlongVelocity.x = vectorX * 10;
    this.pushAlongVelocity.y = vectorY * 10;
};

Enemy.prototype.pushByBullet = function(bullet) {
    if (this.canBePushedByBullet) {
        this.pushBulletVelocity.x = bullet.vectorX * 15;
        this.pushBulletVelocity.y = bullet.vectorY * 15;
        this.canBePushedByBullet = false;

        this.health -= 25;
        this.health = this.health < 0 ? 0 : this.health;

        if (this.health == 0) {
            this.dead = true;
        }
    }

};

Enemy.prototype.rectangleIntersection = function(r1, r2) {
    return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
};

Enemy.prototype.update = function(game, entityCollision) {

    if (this.sleep || this.dead) return;

    let vectorX = game.player.x - this.x;
    let vectorY = game.player.y - this.y;

    if (game.player.dead) {
        vectorX = this.lastVectorX;
        vectorY = this.lastVectorY;
    } else {
        this.lastVectorX = vectorX;
        this.lastVectorY = vectorY;
    }

    const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

    if (length > 0) {
        vectorX /= length;
        vectorY /= length;

        if (length < 800) {
            this.angle = Math.atan2(vectorY, vectorX) - 90 * Math.PI / 180;
            this.x += vectorX * this.speed;
            this.y += vectorY * this.speed;

            //#region collision
            const collisionVector = entityCollision.arcToWalls(game.walls, this.x, this.y, game.arcSizeRadius, game.blockSize);
            this.x += collisionVector.x * this.speed;
            this.y += collisionVector.y * this.speed;
            //#endregion

            this.footIncrementer += this.speed;
            this.footPosition = Math.sin(this.footIncrementer * Math.PI / 180);

            if (length < 100) {
                game.player.takeDamage(this, game);
            }
        }
    }

    //#region enemy collision
    if (Math.random() <= 0.1) {
        for (const enemy of game.enemies) {
            if (enemy != this) {
                let vectorX = enemy.x - this.x;
                let vectorY = enemy.y - this.y;

                const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

                if (length != 0 && length < 100) {

                    vectorX /= length;
                    vectorY /= length;

                    enemy.pushAlong(vectorX, vectorY);
                }

            }
        }
    }
    //#endregion

    //#region push along velocity
    this.pushAlongVelocity.x *= 0.9;
    this.pushAlongVelocity.y *= 0.9;

    this.x += this.pushAlongVelocity.x;
    this.y += this.pushAlongVelocity.y;
    //#endregion

    //#region bullet collision
    const bounds = { x: this.x - game.arcSizeRadius, y: this.y - game.arcSizeRadius, width: game.arcSizeRadius * 2, height: game.arcSizeRadius * 2 };
    for (const bullet of game.bulletManager.bullets) {
        if (this.rectangleIntersection(bounds, bullet.bounds)) {
            bullet.markToDelete = true;
            this.pushByBullet(bullet);
        }
    }
    //#endregion

    //#region push bullet velocity
    this.pushBulletVelocity.x *= 0.9;
    this.pushBulletVelocity.y *= 0.9;

    this.x += this.pushBulletVelocity.x;
    this.y += this.pushBulletVelocity.y;

    if (Math.abs(this.pushBulletVelocity.x) < 0.5 && Math.abs(this.pushBulletVelocity.y) < 0.5) {
        this.canBePushedByBullet = true;
        this.pushBulletVelocity.x = 0;
        this.pushBulletVelocity.y = 0;
    }
    //#endregion

};

Enemy.prototype.render = function(game, entityHelper, entityDrawer) {

    if (this.sleep) return;

    entityHelper.beginRotationOffset(game.context, this.x, this.y, this.angle);

    if (!this.dead) {
        entityDrawer.zombie(game.context, this.footPosition);
    } else {
        entityDrawer.deadZombie(game.context);
    }

    entityHelper.endRotationOffset(game.context, this.x, this.y, this.angle);

    entityDrawer.healthBar(game.context, this.health, this.x, this.y);
};