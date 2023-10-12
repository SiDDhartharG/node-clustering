import axios from "axios"

const gg = async () => {
    for (let index = 0; index < 1; index++) {
        axios({ url: "http://localhost:8000/clustering/list" }).then(res => {
            console.log(res.data);
        })
    }
}

gg()