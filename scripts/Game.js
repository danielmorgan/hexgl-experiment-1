'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import _ from 'lodash';

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

        this.bindEvents();
        this.update();

        return instance;
    }

    bindEvents() {
        $(window).on('resize', this.calculateLayout.bind(this));
        
        this.$container.on('mousedown', () => {
            this.$container.on('mousemove', e => {
                this.$container.trigger('hexGridMove', [e.clientX, e.clientY]);
            });
        });
    }

    calculateLayout() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.stage.addChild(entity.getDisplayObject());
    }

    update() {
        this.entities.forEach(entity => {
            if (typeof entity.update == 'function') {
                entity.update();
            }
        });

        this.renderer.render(this.stage);

        requestAnimationFrame(this.update.bind(this));
    }
}
