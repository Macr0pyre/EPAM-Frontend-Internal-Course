import './styles/index.scss';
import Game from './scripts/entities/Game';
import Player from './scripts/entities/movable/Player';
import Enemy from './scripts/entities/movable/Enemy';
import Wall from './scripts/entities/immovable/Wall';
import Camera from './scripts/entities/Camera';
import MapProcessor from './scripts/helpers/MapProcessor';
import BulletManager from './scripts/helpers/BulletManager';
import { entityHelper } from './scripts/entity-services/entityHelper';
import { entityDrawer} from './scripts/entity-services/entityDrawer';
import { entityCollision } from './scripts/entity-services/entityCollision';

const game = new Game();

function startGame() {
    game.isGameEnded = false;
    game.entities = [];
    game.walls = [];
    game.enemies = [];
    let deadEmemiesCnt = 0;

    const mapProcessor = new MapProcessor();
    mapProcessor.generate(game.map);

    for (let i = 0; i < mapProcessor.getEnemyPositions().length; i++) {
        const enemyPosition = mapProcessor.getEnemyPositions()[i];
        const enemy = new Enemy(enemyPosition.x, enemyPosition.y, game);
        game.entities.push(enemy);
        game.enemies.push(enemy);
    }

    enemiesCnt.innerHTML = game.enemies.length;

    const playerPosition = mapProcessor.getPlayerPosition();
    game.player = new Player(playerPosition.x, playerPosition.y, game);


    game.entities.push(game.player);

    for (let i = 0; i < mapProcessor.getWallPositions().length; i++) {
        const wallPosition = mapProcessor.getWallPositions()[i];
        const wall = new Wall(wallPosition.x, wallPosition.y, game);
        game.entities.push(wall);
        game.walls.push(wall);
    }

    game.camera = new Camera();

    function onResize(width, height) {
        game.context.canvas.width = width;
        game.context.canvas.height = height;
        game.camera.resize();
    };

    game.bulletManager = new BulletManager();

    function onUpdate() {
        game.camera.update(game);
        game.bulletManager.update(game);
        for (const entity of game.entities) {
            entity.update(game, entityCollision);
        }

        deadEmemiesCnt = game.enemies.filter(e => e.dead).length;
        killedEnemiesCnt.innerHTML = deadEmemiesCnt;
    };

    function onRender() {
        game.context.clearRect(0, 0, game.context.canvas.width, game.context.canvas.height);
        game.camera.preRender(game);
        game.bulletManager.render(game);
        for (const entity of game.entities) {
            entity.render(game, entityHelper, entityDrawer);
        }
        game.camera.postRender(game);

        if (deadEmemiesCnt == game.enemies.length) {
            document.querySelector('.wrapper-win').style.display = 'table';
            game.isGameEnded = true;
        }
    };

    function resizeCallback() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        onResize(width, height);
    };
    window.addEventListener('resize', resizeCallback);
    resizeCallback();

    function tickCallback() {
        if (!game.isPaused && !game.isGameEnded) {
            onUpdate();
            onRender();
        }
        requestAnimationFrame(tickCallback);
    };
    requestAnimationFrame(tickCallback);

    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'w':
                game.keyboard.up = true;
                break;
            case 's':
                game.keyboard.down = true;
                break;
            case 'a':
                game.keyboard.left = true;
                break;
            case 'd':
                game.keyboard.right = true;
                break;
            case ' ':
                game.isPaused = !game.isPaused;
                document.querySelector('.wrapper-pause').classList.toggle('paused');
                break;
        }
    });

    document.addEventListener('keyup', function(event) {
        switch (event.key) {
            case 'w':
                game.keyboard.up = false;
                break;
            case 's':
                game.keyboard.down = false;
                break;
            case 'a':
                game.keyboard.left = false;
                break;
            case 'd':
                game.keyboard.right = false;
                break;
        }
    });

    document.addEventListener('mousemove', function(event) {
        game.mouse.x = event.clientX;
        game.mouse.y = event.clientY;
    });

    document.addEventListener('mousedown', function(event) {
        game.mouse.pressed = true;
    });

    document.addEventListener('mouseup', function(event) {
        game.mouse.pressed = false;
    });
}

document.querySelector('.start').addEventListener("click", function() {
    document.querySelector('.wrapper-start').style.display = 'none';
    game.canvas.style.display = 'block';
    game.gameInterface.style.display = 'block';
    startGame();
});
document.querySelector('.exit-start').addEventListener("click", () => close());

document.querySelector('.end-restart').addEventListener("click", function() {
    document.querySelector('.wrapper-end').style.display = 'none';
    startGame();
});
document.querySelector('.exit-end').addEventListener("click", () => close());

document.querySelector('.win-restart').addEventListener("click", function() {
    document.querySelector('.wrapper-win').style.display = 'none';
    startGame();
});
document.querySelector('.exit-win').addEventListener("click", () => close());