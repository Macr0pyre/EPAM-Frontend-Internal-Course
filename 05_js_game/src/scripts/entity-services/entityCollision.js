const entityCollision = {
    arcToWall: function(arcX, arcY, arcRadius, wallX, wallY, wallSize) {
        const distX = Math.abs(arcX - wallX - wallSize / 2);
        const distY = Math.abs(arcY - wallY - wallSize / 2);

        if (distX > (wallSize / 2 + arcRadius)) { return false; }
        if (distY > (wallSize / 2 + arcRadius)) { return false; }

        if (distX <= (wallSize / 2)) { return true; }
        if (distY <= (wallSize / 2)) { return true; }

        const dx = distX - wallSize / 2;
        const dy = distY - wallSize / 2;

        return (dx * dx + dy * dy <= (arcRadius * arcRadius));
    },

    arcToWalls: function(walls, arcX, arcY, arcSizeRadius, blockSize) {
        const resultVector = { x: 0, y: 0 };

        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];

            if (entityCollision.arcToWall(arcX, arcY, arcSizeRadius, wall.x, wall.y, blockSize)) {

                const wallCenterX = wall.x + blockSize / 2;
                const wallCenterY = wall.y + blockSize / 2;

                let vectorX = arcX - wallCenterX;
                let vectorY = arcY - wallCenterY;

                const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

                if (length > 0) {
                    vectorX /= length;
                    vectorY /= length;

                    resultVector.x += vectorX;
                    resultVector.y += vectorY;
                }
            }
        }
        return resultVector;
    }
};

export { entityCollision };