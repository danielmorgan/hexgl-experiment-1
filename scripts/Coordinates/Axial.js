'use strict';

import PIXI from 'pixi.js';
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

    toPixel(layout) {
        let x = (
            layout.origin.x + 
            (layout.orientation.f0 * this.q) + 
            (layout.orientation.f1 * this.r)
        ) * layout.size.x;
        let y = (
            layout.origin.x + 
            (layout.orientation.f2 * this.q) + 
            (layout.orientation.f3 * this.r)
        ) * layout.size.y;

        return new PIXI.Point(x, y);
    }
}
