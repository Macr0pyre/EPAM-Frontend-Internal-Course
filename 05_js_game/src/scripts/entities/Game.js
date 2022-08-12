import { mainMap, tryMap } from '../maps';

let instance = null;
export default function Game() {
    if (instance) {
        return instance;
    }
    instance = this;

    this.canvas = document.querySelector('.canvas');
    this.context = this.canvas.getContext('2d');
    this.gameInterface = document.querySelector('.in-game');
    this.keyboard = { up: false, down: false, left: false, right: false };
    this.mouse = { x: 0, y: 0, pressed: false };
    this.map = mainMap;
    this.isPaused = false;
    this.blockSize = 150;
    this.arcSizeRadius = 60;
    this.isGameEnded = false;

    this.entities = [];
    this.walls = [];
    this.enemies = [];
    this.player = [];
    this.camera = [];
    this.bulletManager = [];

    return instance;
}