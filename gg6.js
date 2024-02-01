import vm from "node:vm";
import axios from "axios";
import helloWorldApi from "./api.js";
import EventEmitter from "node:events";

process.on("uncaughtException", (err) => {
  process.send(err.message);
  process.exit(1);
});

const mainThreadEmitter = new EventEmitter();
const vmEmitter = new EventEmitter();

async function startExecution({ code, config }) {
  const x = 1;
  const context = {
    helloWorldApi,
    axios,
    x: 2,
    channel: {
      emit: (...params) => {
        process.send(params);
      },
    },
    console: {
      log: (...params) => {
        console.log(params);
      },
    },
    mainThreadEmitter,
    vmEmitter
  };
  vm.createContext(context); // Contextify the object.
  code = `
  let bb = 33;
  var cc = 334;
  async function getDB(){
    return new Promise((resolve,reject)=>{
      vmEmitter.emit('getMongoDB');
      mainThreadEmitter.on("mongodbResponse", (message) => {
        return resolve(message);
      });
    })
  }
    async function daddyFunction() {
      var hkk = 65382183;
      let zz = await getDB();
      console.log("finally primkbkashh",zz);
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
    getDB();
    const storage = [];
  const twoMegabytes = 1024 * 1024 * 2;
  let a = 35000;
  // console.log(process)
  while (a--) {
    const array = new Uint8Array(twoMegabytes);
    storage.push(array);
    // console.log("storage size is",storage.length);
  }
  const p = new Promise((resolve,reject)=>{
    reject("no");
  })
  const jjh = helloWorldApi();
  jjh.then((res)=>{
    console.log(res.data);
  })
  console.log(jjh);
  p.then((r)=>{
    console.log("yes");
  }).catch((err)=>{
    console.log("catching ji")
  })
    `;
  // `x` and `y` are global variables in the context.
  // Initially, x has the value 2 because that is the value of context.x.
  vm.runInContext(code, context);

  console.log(context.x); // 42
  console.log(context.y); // 17
  console.log(x);
}

try {
  process.on("message", async (message) => {
    if (message.event === "start") {
      await startExecution({ code: message.code, config: message.config });
      process.send("sum");
      // getDB()
    }
  });
} catch (err) {
  console.log("mera error hai, ", err);
}

vmEmitter.on('getMongoDB',()=>{
  process.send({db:'mongodb'});
  process.on('message',(message)=>{
    if(message.event === "mongodb"){
      mainThreadEmitter.emit('mongodbResponse',message.data);
    }
  })
})