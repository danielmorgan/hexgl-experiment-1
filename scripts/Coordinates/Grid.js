'use strict';

import Cube from './Cube';
import Axial from './Axial';

let directions = [
    new Cube(+1, -1,  0), new Cube(+1,  0, -1), new Cube(0, +1, -1),
    new Cube(-1, +1,  0), new Cube(-1,  0, +1), new Cube(0, -1, +1)
].map(c => c.toAxial());

export default class Grid {
    constructor(bounds, size, origin = new Axial(0, 0)) {
        this.width = bounds.width - bounds.x;
        this.height = bounds.height - bounds.y;
        this.normalizedWidth = Math.floor(this.width / size.x);
        this.widthRemainder = Math.abs(Math.floor(this.width / size.x) - this.width / size.x);
        this.normalizedHeight = Math.floor(this.height / size.y);
        this.heightRemainder = Math.abs(Math.floor(this.height / size.y) - this.height / size.y);
        this.firstCoord = new Axial(0, 0) || origin;
        this.lastCoord;

        this.coords = [];
        for (let q = 0; q <= this.normalizedWidth; q++) {
            for (let r = 0; r <= this.normalizedHeight; r++) {
                let axial = new Axial(q, r);
                this.coords.push(axial);
                this.lastCoord = axial;
            }
        }
    }
}
