'use strict';

export default class Border {
    constructor() {
        let borderSize = 6;
        let padding = 20;
        let border = new PIXI.Graphics();
        border.beginFill(0xff00ff, 0);
        border.lineStyle(borderSize, 0x3d3a31, 1);
        border.drawRect(padding + borderSize, padding + borderSize, window.innerWidth - (padding*2) - borderSize, window.innerHeight - (padding*2) - borderSize);
        border.endFill();

        this.displayObject = border;
    }

    getDisplayObject() {
        return this.displayObject;
    }
}
