const express = require("express");
const router = express.Router();
const Jogador = require("../models/jogador");

router.post("/", async (req, res) => {
  try {
    let jogador = new Jogador(req.body);

    jogador = await jogador.save();
    res.status(201).json(jogador);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  res.json(await Jogador.find());
});

module.exports = router;
