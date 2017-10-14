import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import {loadSpriteSheet} from './loaders.js';

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        const runningFrames = ['run-1', 'run-2', 'run-3'];
        const runningFrameDistance = 10;
        function pickFrame(mario) {
            if (mario.go.distance > 0) {
                console.log(Math.floor(mario.go.distance / runningFrameDistance) % runningFrames.length);
                return 'run-1';
            }
            return 'idle';
        }

        mario.draw = function drawMario(context) {

            sprite.draw(pickFrame(this), context, 0, 0);
        }

        return mario;
    });
}