import Bullet from '../entities/Bullet';

export default function BulletManager() {
    this.canSpawn = true;
    this.frames = 0;
    this.bullets = [];
    this.indexesToDelete = [];
}

BulletManager.prototype.update = function(game) {
    if (this.canSpawn && !game.player.dead) {
        if (game.mouse.pressed) {
            for (let i = -3; i <= 3; i++) {
                const bullet = new Bullet(i, game);
                this.bullets.push(bullet);
            }
            this.canSpawn = false;
        }

    } else {
        this.frames++;

        if (this.frames >= 60) {
            this.frames = 0;
            this.canSpawn = true;
        }
    }

    this.indexesToDelete = [];
    for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update(game);
        if (this.bullets[i].markToDelete) {
            this.indexesToDelete.push(i);
        }
    }

    for (let i = 0; i < this.indexesToDelete.length; i++) {
        this.bullets.splice(this.indexesToDelete[i], 1);
    }
};

BulletManager.prototype.render = function(game) {
    for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].render(game);
    }
};