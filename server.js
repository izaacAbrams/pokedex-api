const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokedex.json");
const app = express();
const helmet = require("helmet");
const validTypes = require("./valid-types");
const cors = require("cors");

require("dotenv").config();

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

function handleGetTypes(req, res) {
  res.json(validTypes);
}
function handleGetPokemon(req, res) {
  let response = POKEDEX.pokemon;
  if (req.query.name) {
    response = response.filter(pokemon =>
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }
  if (req.query.type) {
    response = response.filter(pokemon =>
      pokemon.type.includes(req.query.type)
    );
  }
  res.json(response);
}

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
