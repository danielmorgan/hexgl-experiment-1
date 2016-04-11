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
        this.drawGrid();
        this.bindEvents();
    }

    drawGrid() {
        // mask
        let borderSize = 6;
        let padding = 20;
        let topLeftPadding = (borderSize + padding);
        let bottomRightPadding = topLeftPadding * 2;
        let mask = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRect(
            topLeftPadding,
            topLeftPadding,
            game.$container.width() - bottomRightPadding,
            game.$container.height() - bottomRightPadding
        );
        mask.endFill();

        // grid
        let hexGridContainer = new PIXI.Container();
        let bounds = mask.getBounds();
        let hexSize = { w: 25, h: 25 }
        let layout = new Layout(LAYOUT_POINTY,
            hexSize,
            new PIXI.Point(bounds.x + hexSize.w, bounds.y + hexSize.h));
        let grid = new Grid(bounds, layout.size);
        console.log(grid);
        for (let coord of grid.rectangle()) {
            let point = coord.toPixel(layout);
            let hex = new HexagonGraphic(point, layout);
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
        game.$container.on('mousedown', () => this.panning = true);
        game.$container.on('mouseup', () => this.panning = false);
        game.$container.on('mousemove', e => {
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
