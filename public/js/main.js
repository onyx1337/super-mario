import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadEntities(),
    loadLevel('1-1'),
])
.then(([entityFactory, level]) => {
    const camera = new Camera();
    window.camera = camera;

    level.comp.layers.push(createCollisionLayer(level));

    const mario = entityFactory.mario();
    mario.pos.set(64, 64);

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const goomba = entityFactory.goomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    const koopa = entityFactory.koopa();
    koopa.pos.x = 320;
    level.entities.add(koopa);


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }
    timer.listenTo(window);
    timer.start();
});