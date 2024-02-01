import axios from "axios";

const helloWorldApi = function () {
  return axios.get("http://localhost:3001").then((res) => {
    return res;
  });
};

export default helloWorldApi;