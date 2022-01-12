import workerScript from './metronomeWorker'

class MetronomeTimer {
    private id: number = 0;
    private intervalId: number = 0;
    private callback: Function = () => {};
    private context: any = this;
    private worker: Worker = new Worker(workerScript);

    constructor () {
        this.worker.onmessage = (e: any) => {
            this.callback.call(this.context);
        }
    }

    setInterval = (callback: Function, interval: number, context: any) => {
        this.id++;
        this.callback = callback;
        this.context = context;
        this.worker.postMessage({
            action: 'start-interval',
            interval: interval,
            id: this.id
        });
    };

    clearInterval = () => {
        this.worker.postMessage({
            action: 'stop-interval'
        });
    }
}

export default MetronomeTimer;
