'use strict';

import PIXI from 'pixi.js';
import Hexagon from './Hexagon';

class HexGrid {
    constructor() {
        this.uid = performance.now();
        this.displayObject = this.drawGrid();
    }

    drawGrid() {
        let startCenter = new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2 );
        let size = 50;
        let width = size * Math.sqrt(3) / 2;
        let horiz = width;
        let height = size * 2;
        let vert = height * (3 / 4);

        let grid = new PIXI.Container();

        for (let i = 0; i < 4; i++) {
            let center = {
                x: startCenter.x + (i * horiz),
                y: startCenter.y + (i * vert)
            };
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
