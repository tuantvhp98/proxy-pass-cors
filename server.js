const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();
const { getData, postData, putData } = require("./common");
const axios = require('axios');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const path = req.query.path;
    const data = await getData(path, req);
    return res.json(data);
  } catch (error) {
    return res.json({});
  }
});

app.post("/", async (req, res) => {
  try {
    const path = req.query.path;
    const data = await postData(path, req.headers, req.body);
    return res.send(data)
  } catch (error) {
    return res.status(error?.code || 400).json(error);
  }
});

app.put("/", async (req, res) => {
  try {
    const path = req.query.path;
    const data = await putData(path, req.headers, req.body);
    return res.send(data)
  } catch (error) {
    return res.status(error?.code || 400).json(error);
  }
});

app.listen(process.env.PORT, (err) => {
  console.log(`Server listening at ${process.env.PORT}`);
});

