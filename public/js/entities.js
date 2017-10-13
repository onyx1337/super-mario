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

        mario.draw = function drawMario(context) {

            sprite.draw(pickFrame(this), context, 0, 0);
        }

        return mario;
    });
}