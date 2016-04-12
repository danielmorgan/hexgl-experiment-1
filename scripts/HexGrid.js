'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import _ from 'lodash';
import HexagonGraphic from './HexagonGraphic';
import Grid from './Coordinates/Grid';
import Axial from './Coordinates/Axial';
import { LAYOUT_POINTY, LAYOUT_FLAT } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

class HexGrid {
    constructor() {
        this.drawHexGrid();
        this.bindEvents();
    }

    bindEvents() {
        game.$container.on('mousedown', () => this.panning = true);
        game.$container.on('mouseup', () => {
            this.panning = false
            this.previousX = this.previousY = 0;
            this.redrawHexGrid();
        });
        game.$container.on('mousemove', e => {
            if (this.panning) this.pan(e.clientX, e.clientY);
        });
    }

    drawHexGrid() {
        // mask
        let borderSize = 6;
        let padding = 20;
        let topLeftPadding = (borderSize + padding);
        let bottomRightPadding = topLeftPadding * 2;
        let mask = new PIXI.Graphics();
        mask.beginFill(0x00000, 0);
        mask.drawRect(
            topLeftPadding,
            topLeftPadding,
            game.$container.width() - bottomRightPadding,
            game.$container.height() - bottomRightPadding
        );
        mask.endFill();

        this.layout = new Layout(LAYOUT_POINTY, { w: 25, h: 25 }, new PIXI.Point(0, 0));

        // grid
        this.coordGrid = (new Grid(mask.getBounds(), this.layout.size)).rectangle();

        // visual representation
        this.hexGrid = new PIXI.Container();
        this.displayObject = new PIXI.Container();
        this.displayObject.addChild(this.hexGrid);
        this.displayObject.mask = mask;

        this.redrawHexGrid();
    }

    redrawHexGrid() {
        let bounds = this.displayObject.mask.getBounds();
        let offset = new PIXI.Point(this.displayObject.x, this.displayObject.y);

        this.hexGrid.removeChildren();
        if (this.hexGrid.cacheAsBitmap) {
            this.hexGrid.cacheAsBitmap = null;
        }

        for (let coord of this.coordGrid) {
            let point = coord.toPixel(this.layout);
            if (this.inBounds(point, bounds, this.layout.size, offset)) {
                let color = '0x' + coord.q*6 + '00' + coord.r*10;
                let hex = new HexagonGraphic(point, this.layout, color);
                let text = new PIXI.Text(coord.q + ', ' + coord.r, {font : '12px Arial', fill : 0xffffff, align : 'center'});
                text.x = point.x - 12;
                text.y = point.y - 6;
                this.hexGrid.addChild(hex);
                this.hexGrid.addChild(text);
                this.hexGrid.cacheAsBitmap = true;
            }
        }
    }

    inBounds(point, bounds, size, offset = new PIXI.Point(0, 0)) {
        let x = point.x + offset.x;
        let y = point.y + offset.y;
        bounds.xMin = bounds.x - size.w;
        bounds.yMin = bounds.y - size.h;
        bounds.xMax = bounds.x + bounds.width + size.w;
        bounds.yMax = bounds.y + bounds.height + size.h;

        if (x > bounds.xMin &&
            x < bounds.xMax &&
            y > bounds.yMin &&
            y < bounds.yMax) {
            return true;
        }

        return false;
    }

    pan(x, y) {
        if (this.previousX && this.previousY) {
            let deltaX = x - this.previousX;
            let deltaY = y - this.previousY;
            this.displayObject.x += deltaX;
            this.displayObject.y += deltaY;
       }

        this.previousX = x;
        this.previousY = y;;
    }

    getDisplayObject() {
        return this.displayObject;
    }

    update() {
    }
}

export default HexGrid;
