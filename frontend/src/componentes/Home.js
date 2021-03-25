import React, { useState, useEffect } from "react";

import BackendService from "../servicos/BackendService";

let contadorPalpites = 0;
let secret = Math.floor(Math.random() * 10);

const criaFormEmBranco = () => {
  return {
    nome: "",
    numero: "",
    tentativas: "",
    tempo: "",
  };
};

function Home() {
  const [form, setForm] = useState(criaFormEmBranco());
  const [resultado, setResultado] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const setValor = (evento, campo) => {
    setForm({ ...form, [campo]: evento.target.value });
  };

  const handleClick = (evento) => {
    const palpite = form.numero;
    contadorPalpites++;
    form.tempo = seconds;
    form.tentativas = contadorPalpites;
    if (palpite > secret) {
      setResultado(<p>"Palpite maior do que o número gerado"</p>);
    } else if (palpite < secret) {
      setResultado(<p>"Palpite menor do que o número gerado"</p>);
    } else if (palpite === "") {
      return null;
    } else {
      reset();
      submeter();
      setResultado(<p>"Você acertou!!"</p>);
    }

    evento.preventDefault();
  };

  console.log(contadorPalpites);

  const submeter = async (evento) => {
    let dadosForm = { ...form };
    await BackendService.criarJogador(dadosForm);
  };

  return (
    <div>
      <form onSubmit={submeter}>
        <fieldset>
          <legend>Nome do jogador</legend>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={(e) => setValor(e, "nome")}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Digite o seu palpite</legend>
          <div>
            <label>Digite um número:</label>
            <input
              type="numero"
              name="numero"
              value={form.numero}
              onChange={(evento) => setValor(evento, "numero")}
            />
          </div>
          <input type="submit" onClick={handleClick} value="ok" />
        </fieldset>
        <p>Total de tentativas: {contadorPalpites}</p>
        {resultado}
      </form>
      <div className="app">
        <div className="time">{seconds}s</div>
        <div className="row">
          <button
            className={`button button-primary button-primary-${
              isActive ? "active" : "inactive"
            }`}
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
