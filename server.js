import express from "express";
import statsHandler from "./api/stats.js";

const app = express();
const PORT = 3000;

app.get("/api/stats", (req, res) => {
  statsHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
