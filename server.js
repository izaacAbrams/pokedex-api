const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
app.use(morgan("dev"));

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`
];

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
