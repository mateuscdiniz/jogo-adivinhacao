const mongoose = require("mongoose");

const jogadorSchema = new mongoose.Schema({
  nome: { type: String },
  tentativas: { type: String },
  tempo: {type: String}
});
module.exports = mongoose.model("Jogador", jogadorSchema);
