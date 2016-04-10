'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import HexagonGraphic from './HexagonGraphic';
import Grid from './Coordinates/Grid';
import Axial from './Coordinates/Axial';
import { LAYOUT_POINTY, LAYOUT_FLAT } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

class HexGrid {
    constructor() {
        this.layout = new Layout(LAYOUT_POINTY, { w: 25, h: 25 }, new PIXI.Point(0, 0));
        this.drawGrid();
        this.bindEvents();
    }

    drawGrid() {
        // mask
        let borderSize = 6;
        let padding = 20;
        let mask = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        mask.endFill();

        // grid
        let hexGridContainer = new PIXI.Container();
        let bounds = mask.getBounds();
        let grid = new Grid(bounds, this.layout.size);
        console.log(grid);
        for (let coord of grid.coords) {
            let point = coord.toPixel(this.layout);
            let hex = new HexagonGraphic(point, this.layout)
            hexGridContainer.addChild(hex);
        }

        this.displayObject = new PIXI.Container();
        this.displayObject.addChild(hexGridContainer);
        this.displayObject.mask = mask;
    }

    getDisplayObject() {
        return this.displayObject;
    }

    bindEvents() {
        $('#container').on('mousedown', () => this.panning = true);
        $('#container').on('mouseup', () => this.panning = false);
        $('#container').on('mousemove', e => {
            this.pan(e.clientX, e.clientY)
        });
    }

    pan(x, y) {
        if (this.previousX && this.previousY && this.panning) {
            let deltaX = x - this.previousX;
            let deltaY = y - this.previousY;
            this.displayObject.x += deltaX;
            this.displayObject.y += deltaY;
        }

        this.previousX = x;
        this.previousY = y;
    }

    update() {
    }
}

export default HexGrid;
