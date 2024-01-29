import axios from "axios";
import { NodeVM } from "vm2";
import { removeCircularReferences } from "./utility.js";
import { Piscina } from "piscina";
import { setTimeout } from 'timers/promises'
import { AbortController } from 'abort-controller';
import EventEmitter from "events";
import Machine from "./machine.js";

// const piscina = new Piscina({
//     filename: new URL('./worker.mjs', import.meta.url).href,
// });
const machine = new Machine('./worker.mjs');
export default class AsyncListController {

    piscina = async (req, res) => {
        try {
            const result = await machine.execute(code3, {});
            console.log(result);
            res.json({ ProcessId: 'Worker Process Id' + process.pid, data: result });
        } catch (error) {
            console.log("in error ", error);
            res.send(error)
        }
    }
}
const code1 = `module.exports = async function(variables) { return 111};`;
const code2 = `module.exports = async function(variables) { return await axios.get("http://localhost:3000/")};`;
const code3 = `module.exports = async function(variables) { let i=7000000000;// while(true){} \n while(i-- > 0){};  return 111};`;
const code4 = `module.exports = async function(variables) { return 111};`;

