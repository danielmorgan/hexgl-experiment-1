'use strict';

import Cube from './Cube';

export default class Axial {
    constructor(q, r) {
        this.q = q;
        this.r = r;
    }

    toCube() {
        let x = this.q;
        let z = this.r;
        let y = -x - z;
        
        return new Cube(x, y, z);
    }
}