import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import {loadSpriteSheet} from './loaders.js';

function createMarioFactory(sprite) {
    const runningFrames = ['run-1', 'run-2', 'run-3'];
    const runningFrameDistance = 10;
    function pickFrame(mario) {
        if (mario.jump.stability === 0) {
            return 'jump';
        }

        if (mario.go.distance > 0) {
            if (
                (mario.vel.x > 0 && mario.go.dir < 0) ||
                (mario.vel.x < 0 && mario.go.dir > 0)
            ) {
                return 'break';
            }

            const frameIndex = Math.floor(mario.go.distance / runningFrameDistance) % runningFrames.length;
            const frameName = runningFrames[frameIndex];
            return frameName;
        }
        return 'idle';
    }

    function drawMario(context) {
        sprite.draw(pickFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.draw = drawMario;

        return mario;
    };
}

export function loadMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        return createMarioFactory(sprite);
    });
}