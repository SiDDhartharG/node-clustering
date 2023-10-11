import axios from "axios"

const gg = async () => {
    console.time()
    const res = await Promise.all([
        axios({ url: "http://localhost:8000/clustering/list" }),
        axios({ url: "http://localhost:8000/clustering/list" }),
        axios({ url: "http://localhost:8000/clustering/list" }),
        axios({ url: "http://localhost:8000/clustering/list" }),
        axios({ url: "http://localhost:8000/clustering/list" }),
    ])
    console.timeEnd()
    for (let index = 0; index < res.length; index++) {
        console.log(res[index].data);

    }
}

gg()