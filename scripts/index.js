'use strict';

import PIXI from 'pixi.js';
import Game from './Game';
import HexGrid from './HexGrid';
import Border from './Border';

window.game = new Game('#container');

game.addEntity(new HexGrid());
game.addEntity(new Border());
