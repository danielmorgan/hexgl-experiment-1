'use strict';

class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
        return {
            f0: f0,
            f1: f1,
            f2: f2,
            f3: f3,
            b0: b0,
            b1: b1,
            b2: b2,
            b3: b3,
            startAngle: startAngle
        };
    }
}

export const LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
export const LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
