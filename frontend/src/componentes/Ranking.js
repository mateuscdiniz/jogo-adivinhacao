import React, { useState, useEffect } from "react";
import BackendService from "../servicos/BackendService";

function Ranking() {
  const [jogador, setJogador] = useState([]);

  useEffect(() => {
    (async () => {
      setJogador(await BackendService.getJogadores());
    })();
  }, []);

  jogador.sort(function (a, b) {
    return a.tentativas - b.tentativas;
  });

  const renderJogadores = (jogador) => {
    return (
      <div className="jogador" key={jogador._id}>
        <div>
          <h2>
            {" "}
            Nome: {jogador.nome}
            <br />
            Número de tentativas: {jogador.tentativas}
            <br />
            Tempo: {jogador.tempo} segundos
          </h2>
        </div>

        <hr />
      </div>
    );
  };

  return (
    <div className="jogador">
      <h1> Ranking </h1>
      <h3>{jogador.map(renderJogadores)}</h3>
    </div>
  );
}

export default Ranking;
