import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./styles.scss";
import IndexacaoModal from "../Modal/indexacao";
import RendimentoModal from "../Modal/rendimento";

function Desafio() {
  const { handleSubmit, register } = useForm();

  const [dados, setDados] = useState([]);
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    fetch("http://localhost:3000/indicadores")
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  const [indexacaoModal, setIndexacaoModal] = useState(false);

  function shownIndexacaoModal() {
    setIndexacaoModal(!indexacaoModal);
  }

  const [rendimentoModal, setRendimentoModal] = useState(false);

  function showRendimentoModal() {
    setRendimentoModal(!rendimentoModal);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Simulador de Investimentos</h1>
        <div className="container-content">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="container-simulacao">
              <h2>Simulação</h2>
              <div className="wrapper-up rendimento">
                <div>
                  <span>Rendimento</span>
                  <span onClick={showRendimentoModal}>&#8520;</span>
                  {rendimentoModal && (
                    <RendimentoModal
                      showRendimentoModal={showRendimentoModal}
                    />
                  )}
                </div>
                <div className="wrapper-radio-button">
                  <input
                    type="radio"
                    name="teste"
                    id="bruto"
                    {...register("rendimento")}
                    value={"bruto"}
                  />
                  <label htmlFor="bruto">Bruto</label>
                  <input
                    type="radio"
                    name="teste"
                    id="liquido"
                    {...register("rendimento")}
                    value={"liquido"}
                  />
                  <label htmlFor="liquido">Liquido</label>
                </div>
              </div>
              <div className="inputs rendimento">
                <div>
                  <label>Aporte Inicial</label>
                  <input type="text" {...register("aporteInicial")} />
                </div>
                <div>
                  <label> Prazo (em meses) </label>
                  <input type="text" {...register("prazo")} />
                </div>
                <div>
                  <label> IPCA (ao ano) </label>
                  <input type="text" value={dados[1]?.valor + "%"} readOnly />
                </div>
              </div>
              <button className="button " type="reset">
                Limpar Campos{" "}
              </button>
            </div>
            <div className="container-simulacao ">
              <div className="wrapper-up indexacao">
                <div>
                  <span>Tipo de indexação</span>
                  <span onClick={shownIndexacaoModal}>&#8520;</span>
                  {indexacaoModal && (
                    <IndexacaoModal shownIndexacaoModal={shownIndexacaoModal} />
                  )}
                </div>
                <div className="wrapper-radio-button">
                  <input
                    type="radio"
                    name="teste"
                    id="pre"
                    {...register("indexacao")}
                    value={"pre"}
                  />
                  <label htmlFor="pre">Pré</label>
                  <input
                    type="radio"
                    name="teste"
                    id="pos"
                    {...register("indexacao")}
                    value={"pos"}
                  />
                  <label htmlFor="pos">Pos</label>
                  <input
                    type="radio"
                    name="teste"
                    id="ipca"
                    {...register("indexacao")}
                    value={"ipca"}
                  />
                  <label htmlFor="ipca">Fixado</label>
                </div>
              </div>
              <div className="inputs indexacao">
                <div>
                  <label> Aporte Mensal </label>
                  <input type="text" {...register("aporteMensal")} />
                </div>
                <div>
                  <label> Rentabilidade </label>
                  <input type="text" {...register("rentabilidade")} />
                </div>
                <div>
                  <label> CDI (ao ano) </label>
                  <input type="text" value={dados[0]?.valor + "%"} readOnly />
                </div>
              </div>
              <button className="button simular" type="submit">
                Simular{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Desafio;
