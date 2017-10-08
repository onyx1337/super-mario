const REASON_EXPLICIT = 0;
const REASON_BLUR = 1;

export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        this.lastTime = null;
        this.frameId = null;
        this.stopReason = null;

        this.updateProxy = (time) => {
            if (this.lastTime !== null) {
                accumulatedTime += (time - this.lastTime) / 1000;

                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }
            }

            this.lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        this.frameId = this.window.requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    stop() {
        this.window.cancelAnimationFrame(this.frameId);
        this.lastTime = null;
        this.stopReason = REASON_EXPLICIT;
    }

    listenTo(window) {
        this.window = window;

        this.window.addEventListener('blur', () => {
            this.stop();
            this.stopReason = REASON_BLUR;
        });

        this.window.addEventListener('focus', () => {
            if (this.stopReason === REASON_BLUR) {
                this.start();
            }
        });
    }
}
