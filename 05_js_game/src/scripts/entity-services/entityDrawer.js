const entityDrawer = {
    human: function(context, footPosition) {
        //#region left foot
        context.beginPath();
        context.rect(20, -20 + (footPosition * 35), 25, 40);
        context.fillStyle = '#2724f6';
        context.fill();
        //#endregion

        //#region right foot
        context.beginPath();
        context.rect(-40, -20 + (footPosition * -35), 25, 40);
        context.fillStyle = '#2724f6';
        context.fill();
        //#endregion

        //#region left hand
        context.rotate(30 * Math.PI / 180);
        context.beginPath();
        context.rect(40, -10, 20, 80);
        context.fillStyle = '#F1D4AF';
        context.fill();
        context.rotate(-30 * Math.PI / 180);
        //#endregion

        //#region right hand
        context.rotate(-50 * Math.PI / 180);
        context.beginPath();
        context.rect(-55, -20, 20, 45);
        context.fillStyle = '#F1D4AF';
        context.fill();
        context.rotate(50 * Math.PI / 180);
        //#endregion

        //#region torso
        context.beginPath();
        context.rect(-60, -30, 120, 60);
        context.fillStyle = '#0aa5ff';
        context.fill();
        //#endregion

        //#region gun
        context.beginPath();
        context.rect(-12.5, 30, 25, 70);
        context.fillStyle = '#000';
        context.fill();
        //#endregion

        //#region head
        context.beginPath();
        context.arc(0, 0, 40, 0, 2 * Math.PI);
        context.fillStyle = '#F1D4AF';
        context.fill();
        //#endregion
    },

    deadHuman: function(context) {
        //#region left foot
        context.beginPath();
        context.rect(30, 20, 25, 40);
        context.fillStyle = '#2724f6';
        context.fill();
        //#endregion

        //#region right foot
        context.beginPath();
        context.rect(-25, -30 - 35, 25, 40);
        context.fillStyle = '#2724f6';
        context.fill();
        //#endregion

        //#region left hand
        context.rotate(25 * Math.PI / 180);
        context.beginPath();
        context.rect(40, -5, 20, 80);
        context.fillStyle = '#F1D4AF';
        context.fill();
        context.rotate(-25 * Math.PI / 180);
        //#endregion

        //#region right hand
        context.rotate(-60 * Math.PI / 180);
        context.beginPath();
        context.rect(-40, 20, 20, 45);
        context.fillStyle = '#F1D4AF';
        context.fill();
        context.rotate(60 * Math.PI / 180);
        //#endregion

        //#region torso
        context.beginPath();
        context.rect(-60, -30, 120, 60);
        context.fillStyle = '#0aa5ff';
        context.fill();
        //#endregion

        //#region head
        context.beginPath();
        context.arc(20, 10, 35, 0, 2 * Math.PI);
        context.fillStyle = '#F1D4AF';
        context.fill();
        //#endregion
    },

    zombie: function(context, footPosition) {
        //#region left foot
        context.beginPath();
        context.rect(20, -20 + (footPosition * 35), 25, 40);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region right foot
        context.beginPath();
        context.rect(-40, -20 + (footPosition * -35), 25, 40);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region left hand
        context.beginPath();
        context.rect(-50, -10, 20, 90);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region right hand
        context.beginPath();
        context.rect(30, -10, 20, 85);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region torso
        context.beginPath();
        context.rect(-60, -30, 120, 60);
        context.fillStyle = '#0B486B';
        context.fill();
        //#endregion

        //#region head
        context.beginPath();
        context.arc(0, 0, 40, 0, 2 * Math.PI);
        context.fillStyle = '#CFF09E';
        context.fill();
        //#endregion
    },

    deadZombie: function(context) {
        //#region left foot
        context.beginPath();
        context.rect(52, -30, 25, 40);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region right foot
        context.beginPath();
        context.rect(26, -40, 25, 40);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region left hand
        context.beginPath();
        context.rect(-25, 35, 20, 90);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region right hand
        context.beginPath();
        context.rect(35, -40, 20, 85);
        context.fillStyle = '#3B8686';
        context.fill();
        //#endregion

        //#region torso
        context.beginPath();
        context.rect(-42, -20, 120, 60);
        context.fillStyle = '#0B486B';
        context.fill();
        //#endregion

        //#region head
        context.beginPath();
        context.arc(10, 5, 35, 0, 2 * Math.PI);
        context.fillStyle = '#CFF09E';
        context.fill();
        //#endregion
    },

    healthBar: function(context, health, centerX, centerY) {
        context.beginPath();
        context.rect(centerX - 50, centerY + 60, 100, 5);
        context.strokeStyle = 'black';
        context.stroke();

        let color;

        if (health <= 35) color = 'red';
        else if (health <= 75) color = 'orange';
        else color = 'lime';

        context.beginPath();
        context.rect(centerX - 50, centerY + 60, health, 5);
        context.fillStyle = color;
        context.fill();
    }
};

export { entityDrawer };