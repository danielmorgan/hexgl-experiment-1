'use strict';

export default class Border {
    constructor() {
        let borderSize = 6;
        let padding = 20;
        let topLeftPadding = padding;
        let bottomRightPadding = topLeftPadding * 2;
        let border = new PIXI.Graphics();
        border.beginFill(0xff00ff, 0);
        border.lineStyle(borderSize, 0x3d3a31, 1);
        border.drawRect(
            topLeftPadding,
            topLeftPadding,
            game.$container.width() - bottomRightPadding,
            game.$container.height() - bottomRightPadding
        );
        border.endFill();

        this.displayObject = border;
    }

    getDisplayObject() {
        return this.displayObject;
    }
}
