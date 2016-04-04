'use strict';

import Game from './Game';
import HexGrid from './HexGrid';

window.game = new Game('#container');

game.addEntity(new HexGrid());
