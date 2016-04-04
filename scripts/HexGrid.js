'use strict';

import PIXI from 'pixi.js';
import Hexagon from './Hexagon';

class HexGrid {
    constructor() {
        this.uid = performance.now();
        this.displayObject = this.drawGrid();
        this.scale = 10;
        this.pointyTopped = false;
    }

    drawGrid() {
        let center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        return new Hexagon(center, 100);
    }

    getDisplayObject() {
        return this.displayObject;
    }

    update() {
    }
}

export default HexGrid;
