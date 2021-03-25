/* eslint-disable import/no-anonymous-default-export */
import api from "../backend/index";

const getJogadores = async () => {
  const { data } = await api.get("/ranking");
  return data;
};

const criarJogador = async (formJogador) => {
  await api.post("/", formJogador);
};

export default {
  getJogadores,
  criarJogador,
};
