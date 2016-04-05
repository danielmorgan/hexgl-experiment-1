'use strict';

import Axial from './Axial';

export default class Cube {
    constructor(x, y, z) {
        if (x + y + z === 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else {
            throw new Error('Invalid Cube coordinates', 'Coordinates must equal 0 when summed.');
        }
    }

    toAxial() {
        return new Axial(this.x, this.z);
    }
}