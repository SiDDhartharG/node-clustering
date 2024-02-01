import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ data: "Hello World" });
});

app.listen(3001, () => {
  console.log("server started at port 3001");
});
