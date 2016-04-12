'use strict';

import PIXI from 'pixi.js';

export default class HexagonGraphic extends PIXI.DisplayObject {
    constructor(center, layout, color) {
        super();
        this.center = center;
        this.layout = layout;

        let hexagon = new PIXI.Graphics();

        hexagon.beginFill(color, 1);
        hexagon.lineStyle(2, 0xe6dcc9, 1);
        hexagon.drawPolygon(this.hexCoords());
        hexagon.endFill();

        return hexagon;
    }

    hexCoords() {
        let coords = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.cornerPoint(this.center, i);
            coords.push(point.x, point.y);
        }

        return coords;
    }

    cornerPoint(center, i) {
        let angleDeg = 60 * i + this.layout.orientation.startAngle;
        let angleRad = Math.PI / 180 * angleDeg;
        let x = center.x + this.layout.size.w * Math.cos(angleRad);
        let y = center.y + this.layout.size.h * Math.sin(angleRad);

        return new PIXI.Point(x, y);
    }
}
