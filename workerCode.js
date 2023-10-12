import axios from "axios";
import { NodeVM } from "vm2";
import { removeCircularReferences } from "./utility.js";

export default class AsyncListController {

    createList = async (req, res) => {
        setTimeout(() => {
            //  preprocess to kill process like // etc and etc
            console.log("KILLED");
            process.kill(process.pid)
        }, 5000);
        const data = await this.runScript(code3, {});
        res.json({ ProcessId: 'Worker Process Id' + process.pid, data });
    };

    runScript = async (code, variables) => {
        try {
            const vm = new NodeVM({
                console: 'redirect',
                sandbox: {
                    axios
                },
                timeout: 15000
            });
            const logs = [];
            vm.on('console.log', (...args) => {
                let myStr = '';
                args.forEach((element) => {
                    if (typeof element === 'object') element = JSON.stringify(element);
                    myStr = `${myStr} ${element}`;
                });
                logs.push(myStr);
            });
            const functionInSandbox = await vm.run(code);
            const answer = await functionInSandbox(variables);
            return { answer: removeCircularReferences(answer) };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
const code1 = `module.exports = async function(variables) { return 111};`;
const code2 = `module.exports = async function(variables) { return await axios.get("http://localhost:3000/")};`;
const code3 = `module.exports = async function(variables) {
     let i=5000000000;
while(true){}
        return 111};`;
const code4 = `module.exports = async function(variables) { return 111};`;