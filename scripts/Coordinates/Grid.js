'use strict';

import Cube from './Cube';
import Axial from './Axial';

export default class Grid {
    constructor(bounds, size) {
        this.pixelWidth = bounds.width - bounds.x;
        this.pixelHeight = bounds.height - bounds.y;
        this.gridWidth = Math.floor(this.pixelWidth / size.w);
        this.gridHeight = Math.floor(this.pixelHeight / size.h);
        this.pixelWidthRemainder = Math.abs(Math.floor(this.pixelWidth / size.w) - this.pixelWidth / size.w);
        this.pixelHeightRemainder = Math.abs(Math.floor(this.pixelHeight / size.h) - this.pixelHeight / size.h);

        this.coords = [];
        for (let q = 0; q <= this.gridWidth; q++) {
            for (let r = 0; r <= this.gridHeight; r++) {
                this.coords.push(new Axial(q, r));
            }
        }
    }
}
