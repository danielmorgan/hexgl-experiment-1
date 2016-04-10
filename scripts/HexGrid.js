'use strict';

import PIXI from 'pixi.js';
import HexagonGraphic from './HexagonGraphic';
import Grid from './Coordinates/Grid';
import Axial from './Coordinates/Axial';
import { LAYOUT_POINTY, LAYOUT_FLAT } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

class HexGrid {
    constructor() {
        let screenCenter = new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2);
        this.layout = new Layout(LAYOUT_POINTY, { w: 25, h: 25 }, screenCenter);
        this.uid = performance.now();
        this.displayObject = this.drawGrid();
    }

    drawGrid() {
        let width = this.layout.size.w * Math.sqrt(3) / 2;
        let height = this.layout.size.h * 2;

        // mask
        let borderSize = 6;
        let padding = 20;
        let mask = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        mask.endFill();

        // border
        let border = new PIXI.Graphics();
        border.beginFill(0xff00ff, 0);
        border.lineStyle(borderSize, 0x3d3a31, 1);
        border.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        border.endFill();

        // grid
        let hexGridContainer = new PIXI.Container();
        let grid = new Grid(mask.getBounds(), this.layout.size);
        for (let coord of grid.coords) {
            let point = coord.toPixel(this.layout);
            let hex = new HexagonGraphic(point, this.layout)
            hexGridContainer.addChild(hex);
        }

        let container = new PIXI.Container();
        container.addChild(hexGridContainer);
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
