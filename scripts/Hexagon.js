'use strict';

import PIXI from 'pixi.js';

export default class Hexagon {
    constructor(center, size) {
        this.center = center;
        this.size = size;

        let graphics = new PIXI.Graphics();

        graphics.beginFill(0xa69c79, 1);
        graphics.drawPolygon(this.getCoordsForHex());
        graphics.endFill();

        return graphics;
    }

    getCoordsForHex() {
        let coords = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.getSingleHexPoint(this.center, this.size, i);
            coords.push(point.x, point.y);
        }

        return coords;
    }

    getSingleHexPoint(center, size, i) {
        let angleDeg = 60 * i + (this.pointyTopped ? 30 : 0);
        let angleRad = Math.PI / 180 * angleDeg;
        let x = center.x + size * Math.cos(angleRad);
        let y = center.y + size * Math.sin(angleRad);

        return new PIXI.Point(x, y);
    }
}
