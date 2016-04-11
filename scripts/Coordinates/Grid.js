'use strict';

import Axial from './Axial';

export default class Grid {
    constructor(bounds, size) {
        this.pixelWidth = (bounds.width*(2/3)) - bounds.x;
        this.pixelHeight = (bounds.height*(2/3)) - bounds.y;
        this.gridWidth = Math.floor(this.pixelWidth / size.w);
        this.gridHeight = Math.floor(this.pixelHeight / size.h);
        this.pixelWidthRemainder = Math.abs(this.gridWidth - this.pixelWidth / size.w);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.pixelHeight / size.h);
    }

    parallelogram() {
        let coords = [];
        
        for (let q = 0; q <= this.gridWidth; q++) {
            for (let r = 0; r <= this.gridHeight; r++) {
                coords.push(new Axial(q, r));
            }
        }

        return coords;
    }

    rectangle() {
        let coords = [];

        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            for (let q = -rOffset; q < this.gridWidth - rOffset; q++) {
                coords.push(new Axial(q, r));
            }
        }

        return coords;
    }
}
