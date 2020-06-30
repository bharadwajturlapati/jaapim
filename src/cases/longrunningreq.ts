// lrs : long running script
// takes long ms as arg
// waits for that ms for time on the microtask thread.
const lrs = (wait: number) => {
    let startTime = Date.now();
    let currentTime = Date.now();

    while (currentTime - startTime <= wait) {
        currentTime = Date.now();
    }
    return { msg: `i waited for you for ${wait}` };
}


export default lrs;