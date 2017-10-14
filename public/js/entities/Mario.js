import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import {createAnim} from '../anim.js';
import {loadSpriteSheet} from '../loaders.js';

function createMarioFactory(sprite) {
    const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

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

            return runAnim(mario.go.distance);
        }
        return 'idle';
    }

    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.offset.set(8, 12);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.draw = function drawMario(context) {
            sprite.draw(pickFrame(this), context, 0, 0, mario.go.heading < 0);
        }

        return mario;
    };
}

export default function setup() {
    return loadSpriteSheet('mario')
    .then(createMarioFactory);
}
