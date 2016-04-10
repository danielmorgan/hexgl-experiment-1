'use strict';

import Cube from './Cube';
import Axial from './Axial';

export default class Grid {
    constructor(bounds, size) {
        this.pixelWidth = bounds.width - bounds.x;
        this.pixelHeight = bounds.height - bounds.y;
        this.gridWith = Math.floor(this.pixelWidth / size.w);
        this.gridHeight = Math.floor(this.pixelHeight / size.h);
        this.pixelWidthRemainder = Math.abs(this.gridWith - this.pixelWidth / size.w);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.pixelHeight / size.h);

        this.coords = [];
        for (let q = 0; q <= this.gridWith/2; q++) {
            for (let r = 0; r <= this.gridHeight/2; r++) {
                this.coords.push(new Axial(q, r));
            }
        }
    }
}
