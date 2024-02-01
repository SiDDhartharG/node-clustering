import { fork } from "child_process";
import express from "express";
import db, { getUser } from "./connection.js";
const app = express();
const options = {
  timeout: 15000,
  execArgv: ["--max-old-space-size=200"], // Sets the memory limit to 200MB
};

app.get("/one", (req, res) => {
  try {
    const child = fork("./gg6.js", options);
    child.send({ event: "start", code: 34567890 });
    child.on("message", async (sum) => {
      console.log("message come to main:", sum);
      // res.send({ sum: sum });
      if (sum.db === "mongodb") {
        const fg = await getUser();
        child.send({ event: "mongodb", data: fg });
      }
    });
    child.on('error', (err) => {
      console.error('Error in child process:', err);
    });
    child.on("exit", (code, signal) => {
      console.log(`Child process exited with code ${code} ${signal}`);
      console.log(process.memoryUsage());
      return res.json({ code,signal });
    });
  } catch (error) {
    console.log("some error occured", error);
    return res.json(error);
  }
});

app.get("/two", async (req, res) => {
  const sum = await longComputePromise();
  res.send({ sum: sum });
});

app.get("/three", (req, res) => {
  try {
    const child = fork("./gg6.js", options);
    child.send("start");
    child.on("message", (sum) => {
      res.send({ sum: sum });
    });
    child.on("exit", (payload) => {
      console.log(process.memoryUsage());
      console.log(2345678, "exit1", payload);
      res.send("error");
    });
    child.on("error", (payload) => {
      console.log("child err", process.memoryUsage());
      console.log(2345678, "error", payload);
      res.send("error");
    });
  } catch (error) {
    console.log("err", process.memoryUsage());
    res.send(error);
  }
});
app.get("/", async (req, res) => {
  console.log(9098445678);
  res.send("OK");
});

db.connectDB().then(() => {
  app.listen(3001, () => console.log("server on port 3000..."));
});

function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function longComputePromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum);
  });
}
