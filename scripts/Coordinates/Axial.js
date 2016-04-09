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
        let w = layout.size.x;
        let h = layout.size.y;
        let q = this.q;
        let r = this.r;

        let x = (o.f0 * q + o.f1 * r) * w;
        let y = (o.f2 * q + o.f3 * r) * h;

        // let x = (
        //     layout.origin.x + 
        //     (layout.orientation.f0 * this.q) + 
        //     (layout.orientation.f1 * this.r)
        // ) * layout.size.x;
        // let y = (
        //     layout.origin.x + 
        //     (layout.orientation.f2 * this.q) + 
        //     (layout.orientation.f3 * this.r)
        // ) * layout.size.y;

        return new PIXI.Point(x + layout.origin.x, y + layout.origin.y);
    }
}
