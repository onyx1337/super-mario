export const SIZE = 16;
export const X = 0;
export const Y = 1;
export const NAME = Symbol();

function noop() {
}

function solidCollisionX(entity, tileX) {
    if (entity.vel.x > 0) {
        entity.bounds.right = tileX * TILE_SIZE + TILE_SIZE;
    } else if (entity.vel.x < 0) {
        entity.bounds.left = tileX * TILE_SIZE;
    }
    entity.vel.x = 0;
}

function solidCollisionY(entity, tileY) {
    if (entity.vel.y > 0) {
        entity.bounds.bottom = tileY * TILE_SIZE;
    } else if (entity.vel.y < 0) {
        entity.bounds.top = tileY * TILE_SIZE + TILE_SIZE;
    }
    entity.vel.y = 0;
}

export function createSky() {
    return [noop, noop];
}

export function createGround() {
    const solid = createSolid();

    return [
        solidCollisionX,
        solidCollisionY,
    ];
}
