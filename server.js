import express from "express";
import statsHandler from "./api/stats.js";

const app = express();
const PORT = 3000;

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("GitHub README Stats API is running");
});

app.get("/api/stats", (req, res) => {
  statsHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
