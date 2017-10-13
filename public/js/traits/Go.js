import {Trait} from '../Entity.js';
import {clamp} from '../math.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 400;
        this.speedLimit = 200;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        entity.vel.x = clamp(
            entity.vel.x + this.acceleration * deltaTime * this.dir,
            -this.speedLimit,
            this.speedLimit);

        if (this.dir === 0) {
            this.distance = 0;
        } else {
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        }
    }
}
