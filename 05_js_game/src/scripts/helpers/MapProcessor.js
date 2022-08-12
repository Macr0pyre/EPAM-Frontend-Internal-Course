export default function MapProcessor() {
    this.playerPosition = { x: 0, y: 0 };
    this.enemyPositions = [];
    this.wallPositions = [];
}

MapProcessor.prototype.generate = function(map) {
    for (let y = 0; y < map.length; y++) {
        const row = map[y];

        for (let x = 0; x < row.length; x += 2) {
            const char = row[x];
            const realX = x / 2;

            switch (char) {
                case 'W':
                    this.wallPositions.push({ x: realX, y: y });
                    break;
                case 'E':
                    this.enemyPositions.push({ x: realX, y: y });
                    break;
                case 'P':
                    this.playerPosition = { x: realX, y: y };
                    break;
            }
        }
    }
};

MapProcessor.prototype.getPlayerPosition = function() {
    return this.playerPosition;
};

MapProcessor.prototype.getEnemyPositions = function() {
    return this.enemyPositions;
};

MapProcessor.prototype.getWallPositions = function() {
    return this.wallPositions;
};