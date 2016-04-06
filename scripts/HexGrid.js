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

        // mask
        let borderSize = 10;
        let padding = 30;
        let mask = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        mask.endFill();

        // border
        let border = new PIXI.Graphics();
        border.beginFill(0xff00ff, 0);
        border.lineStyle(borderSize, 0x000000, 0.25);
        border.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        border.endFill();

        // grid
        let grid = new PIXI.Container();
        for (let i = 0; i < 20; i++) {
            let center = new PIXI.Point(
                startPoint.x + (i * horiz),
                startPoint.y + (i * vert)
            );
            let hex = new Hexagon(center, size)
            grid.addChild(hex);
        }

        let container = new PIXI.Container();
        container.addChild(grid);
        container.addChild(border);
        container.mask = mask;

        return container;
    }

    getDisplayObject() {
        return this.displayObject;
    }

    update() {
    }
}

export default HexGrid;
