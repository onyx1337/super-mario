const TILE_SIZE = 16;

export default class TileCollision {
    constructor(tiles, entities) {
        this.tiles = tiles;
        this.entities = entities;
    }

    resolveGridTile(posX, posY) {
        const tileX = Math.floor(posX / TILE_SIZE);
        const tileY = Math.floor(posY / TILE_SIZE);
        const tile = this.tiles.get(tileX, tileY);
        if (tile) {
            return {
                tile,
                tileX,
                tileY,
            };
        }
    }

    update() {
        this.entities.forEach(entity => {
            const gridTile = this.resolveGridTile(entity.pos.x, entity.pos.y);
            if (gridTile) {
                if (gridTile.tile.name === 'ground') {
                    entity.pos.y = gridTile.tileY * TILE_SIZE - entity.size.y;
                    entity.vel.y = 0;
                    console.log('on ground');
                }
            }
        });
    }
}
