'use strict';

import PIXI from 'pixi.js';
import Game from './Game';
import HexGrid from './HexGrid';

window.game = new Game('#container');

let hexGrid = new HexGrid();
game.addEntity(hexGrid);
