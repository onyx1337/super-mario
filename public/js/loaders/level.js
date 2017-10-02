import Level from '../Level.js';
import {loadBackgroundSprites} from '../sprites.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {createGround, createSky} from '../tiles.js';

function createTile(type) {
    switch(type) {
    case 'ground':
        return createGround();
    case 'sky':
        return createSky();
    }
}

function createTiler() {
    const tileCache = new Map();

    function getTile(name) {
        if (!tileCache.has(name)) {
            const tile = createTile(name);
            tile.name = name;
            tileCache.set(name, tile);
        }
        return tileCache.get(name);
    }

    return function addTiles(level, background) {
        level.tiles.forEach((tile, x1, x2, y1, y2]) => {
            const name = background.tile;
            const tile = getTile(name);
            if (tile) {
                level.tiles.set(x, y, tile);
            }
        });
    };
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then(r => r.json()),

        loadBackgroundSprites(),
    ])
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        const addTiles = createTiler();
        levelSpec.backgrounds.forEach(background => {
            addTiles(level, background);
        });

        const backgroundLayer = createBackgroundLayer(level.tiles, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
