import Compositor from './Compositor.js';
import TileCollision from './collision/TileCollision.js';
import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.collision = new TileCollision(this.tiles, this.entities);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });

        this.collision.update(deltaTime);
    }
}
