import vm from 'node:vm'
import axios from 'axios'
async function startExecution({ code, config }) {
    const x = 1;
    const context = { axios, x: 2, channel: { emit: (...params) => { process.send(params); } }, log: { console: (params) => { console.log(2345678, params); } } };
    vm.createContext(context); // Contextify the object.
    code = `
    async function daddyFunction() {
        const json = {
            gg: {
                set: new Set(["gg1"]),
                function: gg,
                status: false
            },
            gg2: {
                set: new Set(["gg1"]),
                function: gg2,
                status: false
            },
            gg1: {
                set: new Set(),
                function: gg1,
                status: false
            }
        }
        async function callBackFunction(params) {
            for (var key in json) {
                if (json[key].status) continue
                json[key].set.delete(params)
                if (json[key].set.size == 0) {
                    json[key].function()
                }
            }
        }
    
        async function gg(params) {
            console.log("IN GG");
            json["gg"].status = true
            channel.emit('event', { event: "STEP_START", stepName: "name", type: "gg" })
            await axios.get('https://google.com')
            channel.emit('event', { event: "STEP_END", stepName: "name", type: "gg" })
            callBackFunction("gg")
        }
        async function gg1(params) {
            console.log("IN GG1");
            json["gg1"].status = true
            channel.emit('event', { event: "STEP_START", stepName: "name", type: "gg1" })
            await axios.get('https://google.com')
            channel.emit('event', { event: "STEP_END", stepName: "name", type: "gg1" })
            callBackFunction("gg1")
        }
        async function gg2(params) {
            console.log("IN GG2");
            json["gg2"].status = true
            channel.emit('event', { event: "STEP_START", stepName: "name", type: "gg3" })
            await axios.get('https://google.com')
            channel.emit('event', { event: "STEP_END", stepName: "name", type: "gg3" })
            callBackFunction("gg2")
        }
        callBackFunction()
    }
    daddyFunction()
    `;
    // `x` and `y` are global variables in the context.
    // Initially, x has the value 2 because that is the value of context.x.
    vm.runInContext(code, context);

    console.log(context.x); // 42
    console.log(context.y); // 17
    console.log(x);
}

process.on('message', async (message) => {
    if (message.event === 'start') {
        await startExecution({ code: message.code, config: message.config });
        process.send("sum");
    }
});