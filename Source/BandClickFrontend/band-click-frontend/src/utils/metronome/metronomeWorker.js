const worker = () => {
    let intervalId;

    onmessage = (e) => {
        if (e.data.action == 'start-interval') {
            intervalId = setInterval(tick, e.data.interval);
        } else if (e.data.action == 'stop-interval') {
            clearInterval(intervalId);
        }
    };

    const tick = () => {
        postMessage({
            action: 'tick'
        });
    }
}

let code = worker.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const workerScript = URL.createObjectURL(blob);

export default workerScript;
