import express from "express";
import statsHandler from "./api/stats.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { svgHeaders } from "./middleware/headers.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("GitHub README Stats API is running");
});

app.get(
  "/api/stats",
  rateLimit,
  svgHeaders,
  statsHandler
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
