'use strict';

import Axial from './Axial';

export default class Grid {
    constructor(bounds, size) {
        this.pixelWidth = bounds.width - bounds.x;
        this.pixelHeight = bounds.height - bounds.y;
        this.gridWidth = Math.floor(this.pixelWidth / size.w);
        this.gridHeight = Math.floor(this.pixelHeight / size.h);
        this.pixelWidthRemainder = Math.abs(this.gridWith - this.pixelWidth / size.w);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.pixelHeight / size.h);
     

        // temporarily make grid smaller
        this.gridWidth /= 2;
        this.gridHeight /= 2;

        this.coords = this.rectangle();
    }

    parallelogram() {
        let coords = [];
        
        for (let q = 0; q <= this.gridWith; q++) {
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
            console.log('r', r, 'rOffset', rOffset);
            for (let q = -rOffset; q < this.gridWidth - rOffset; q++) {
                console.log('q', q);
                coords.push(new Axial(q, r));
            }
        }

        return coords;
    }
}
