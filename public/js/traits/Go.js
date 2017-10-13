import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 400;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        entity.vel.x += this.acceleration * deltaTime * this.dir;

        if (this.dir === 0) {
            this.distance = 0;
        } else {
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        }
    }
}
