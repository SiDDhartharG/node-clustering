import { fork } from 'child_process';
import express from 'express';
const app = express();
const options = {
    execArgv: ['--max-old-space-size=200'] // Sets the memory limit to 200MB
};
app.get('/one', (req, res) => {
    try {
        const child = fork('./gg6.js', options);
        child.send({ event: 'start', code: 34567890 });
        child.on('message', (sum) => {
            console.log(sum);
            // res.send({ sum: sum });
        });
        child.on('exit', (payload) => {
            console.log(2345678, "exit", payload);
            res.send("error")
        })
        child.on('error', (payload) => {
            console.log(2345678, "error", payload);
            res.send("error")
        })
    } catch (error) {
        res.send(error)
    }
});

app.get('/two', async (req, res) => {
    const sum = await longComputePromise();
    res.send({ sum: sum });
});


app.get('/three', (req, res) => {
    try {
        const child = fork('./gg6.js', options);
        child.send('start');
        child.on('message', (sum) => {
            res.send({ sum: sum });
        });
        child.on('exit', (payload) => {
            console.log(process.memoryUsage())
            console.log(2345678, "exit1", payload);
            res.send("error")
        })
        child.on('error', (payload) => {
            console.log("child err", process.memoryUsage())
            console.log(2345678, "error", payload);
            res.send("error")
        })
    } catch (error) {
        console.log("err", process.memoryUsage())
        res.send(error)
    }
});
app.get('/', async (req, res) => {
    console.log(9098445678);
    res.send("OK");
});

app.listen(3000, () => console.log('server on port 3000...'));

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