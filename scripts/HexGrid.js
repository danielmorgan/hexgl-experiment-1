'use strict';

import PIXI from 'pixi.js';
import Hexagon from './Hexagon';
import Cube from './Coordinates/Cube';

class HexGrid {
    constructor() {
        this.uid = performance.now();
        this.displayObject = this.drawGrid();
    }

    drawGrid() {
        let startPoint = new PIXI.Point(size, size);
        let size = 50;
        let width = size * Math.sqrt(3) / 2;
        let horiz = width;
        let height = size * 2;
        let vert = height * (3 / 4);

        let directions = [
            new Cube(+1, -1,  0), new Cube(+1,  0, -1), new Cube(0, +1, -1),
            new Cube(-1, +1,  0), new Cube(-1,  0, +1), new Cube(0, -1, +1)
        ].map(c => c.toAxial());

        console.log(directions);

        let grid = new PIXI.Container();
        let background = new PIXI.Graphics();
        background.lineStyle(2, 0xff0000, 1);
        background.drawPolygon([0, 0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight]);
        grid.addChild(background);

        for (let i = 0; i < 4; i++) {
            let center = new PIXI.Point(
                startPoint.x + (i * horiz),
                startPoint.y + (i * vert)
            );
            let hex = new Hexagon(center, size)
            grid.addChild(hex);
        }

        return grid;
    }

    getDisplayObject() {
        return this.displayObject;
    }

    update() {
    }
}

export default HexGrid;
