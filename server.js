const express = require("express");
const morgan = require("morgan");
const app = express();
const validTypes = require("./valid-types");

require("dotenv").config();

app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});
app.use(morgan("dev"));

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

function handleGetTypes(req, res) {
  res.json(validTypes);
}
function handleGetPokemon(req, res) {
  res.send("Hello, Pokemon!");
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
