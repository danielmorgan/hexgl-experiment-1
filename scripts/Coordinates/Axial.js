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
        let o = layout.orientation;
        let w = layout.size.w;
        let h = layout.size.h;
        let q = this.q;
        let r = this.r;

        let x = (o.f0 * q + o.f1 * r) * w;
        let y = (o.f2 * q + o.f3 * r) * h;

        return new PIXI.Point(x + layout.origin.x, y + layout.origin.y);
    }
}

export const Directions = [
    new Axial(+1, 0), new Axial(+1, -1), new Axial(0, -1),
    new Axial(-1, 0), new Axial(-1, +1), new Axial(0, +1)
];
