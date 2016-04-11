'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import _ from 'lodash';
import Stats from 'stats.js';

let instance = null;

export default class Game {
    constructor(selector) {
        if (! instance) {
            instance = this;
        }
        
        this.$container = $(selector);
        this.entities = [];
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            backgroundColor: 0xd6cca9
        });
        this.$container.append(this.renderer.view);

        this.stats = new Stats();
        this.$container.append(this.stats.dom);

        this.bindEvents();
        this.update();

        return instance;
    }

    bindEvents() {
        $(window).on('resize', this.calculateLayout.bind(this));
    }

    calculateLayout() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.stage.addChild(entity.getDisplayObject());
    }

    update() {
        this.stats.begin();

        this.entities.forEach(entity => {
            if (typeof entity.update == 'function') {
                entity.update();
            }
        });

        this.renderer.render(this.stage);

        this.stats.end();

        requestAnimationFrame(this.update.bind(this));
    }
}
