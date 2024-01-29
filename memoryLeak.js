const leakyArray = [];
let numb = 20
// let numb = 30
function addData() {
    console.log(1);
    const largeObject = new Array(10000000).fill('*');
    leakyArray.push(largeObject);
    if (numb-- === 0) return
    addData()
}

async function name1111s(params) {
    return new Promise(async (resolve, reject) => {
        while (true) { }
        resolve("DONE")

    }
    )
}


process.on('message', async (message) => {
    if (message.event === 'start') {
        console.log(1456789);
        addData();
        // await name1111s();

        process.send("sum");
    }
});