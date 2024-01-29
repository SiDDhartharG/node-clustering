import axios from "axios";
import { EventEmitter } from 'node:events'

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();
myEmitter.on('event', function (payload) {
    console.log("HERERRE=========", payload);
});
async function daddyFunction(channel) {
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
        channel.emit('event', { event: "STEP_START", stepName: "${name}", type: "gg" })
        await axios.get('https://google.com')
        channel.emit('event', { event: "STEP_END", stepName: "${name}", type: "gg" })
        callBackFunction("gg")
    }
    async function gg1(params) {
        console.log("IN GG1");
        json["gg1"].status = true
        channel.emit('event', { event: "STEP_START", stepName: "${name}", type: "gg1" })
        await axios.get('https://google.com')
        channel.emit('event', { event: "STEP_END", stepName: "${name}", type: "gg1" })
        callBackFunction("gg1")
    }
    async function gg2(params) {
        console.log("IN GG2");
        json["gg2"].status = true
        channel.emit('event', { event: "STEP_START", stepName: "${name}", type: "gg3" })
        await axios.get('https://google.com')
        channel.emit('event', { event: "STEP_END", stepName: "${name}", type: "gg3" })
        callBackFunction("gg2")
    }

    callBackFunction()
}

daddyFunction(myEmitter)