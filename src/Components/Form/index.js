import React, { useState, useEffect } from "react";
import "./styles.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, formatarMoeda, soNumero } from "./schema";

import IndexacaoModal from "../Modal/indexacao";
import RendimentoModal from "../Modal/rendimento";
import Simulacao from "../Simulacao";

function Desafio() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/indicadores")
      .then((res) => res.json())
      .then((data) => setIndicadores(data));
  }, []);

  // Modal do tipo de indexação
  const [indexacaoModal, setIndexacaoModal] = useState(false);

  function shownIndexacaoModal() {
    setIndexacaoModal(!indexacaoModal);
  }

  // Modal do Rendimento
  const [rendimentoModal, setRendimentoModal] = useState(false);

  function showRendimentoModal() {
    setRendimentoModal(!rendimentoModal);
  }

  // Função de requisição dos dados ao backend
  const [investimento, setInvestimento] = useState([]);

  async function getDados({ rendimento, indexacao }) {
    try {
      const response = await fetch(
        `http://localhost:3000/simulacoes/?tipoIndexacao=${indexacao}&tipoRendimento=${rendimento}`
      );
      const data = await response.json();
      setInvestimento(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Simulador de Investimentos</h1>
        <div className="container-content">
          <form className="form" onSubmit={handleSubmit(getDados)}>
            <div className="container-simulacao">
              <h2>Simulador</h2>
              <div className="wrapper-up rendimento">
                <div>
                  <span className={errors.rendimento ? "erro" : null}>
                    Rendimento
                  </span>
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
                <p className={errors.rendimento ? "erro" : null}>
                  {errors.rendimento?.message}
                </p>
              </div>
              <div className="inputs rendimento">
                <div>
                  <label className={errors.aporteInicial ? "erro" : null}>
                    Aporte Inicial
                  </label>
                  <input
                    type="text"
                    {...register("aporteInicial")}
                    onKeyUp={formatarMoeda}
                  />
                  <p className={errors.aporteInicial ? "erro" : null}>
                    {errors.aporteInicial?.message}
                  </p>
                </div>
                <div>
                  <label className={errors.prazo ? "erro" : null}>
                    Prazo (em meses)
                  </label>
                  <input
                    type="text"
                    {...register("prazo")}
                    onKeyUp={soNumero}
                  />
                  <p className={errors.prazo ? "erro" : null}>
                    {errors.prazo?.message}
                  </p>
                </div>
                <div>
                  <label> IPCA (ao ano) </label>
                  <input type="text" value={indicadores[1]?.valor + "%"} readOnly />
                </div>
              </div>
              <button className="button " type="reset">
                Limpar Campos
              </button>
            </div>
            <div className="container-simulacao ">
              <div className="wrapper-up indexacao">
                <div>
                  <span className={errors.indexacao ? "erro" : null}>
                    Tipos de indexação
                  </span>
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
                <p className={errors.indexacao ? "erro" : null}>
                  {errors.indexacao?.message}
                </p>
              </div>
              <div className="inputs indexacao">
                <div>
                  <label> Aporte Mensal </label>
                  <input
                    type="text"
                    {...register("aporteMensal")}
                    onKeyUp={formatarMoeda}
                  />
                </div>
                <div>
                  <label className={errors.rentabilidade ? "erro" : null}>
                    Rentabilidade
                  </label>
                  <input
                    type="text"
                    {...register("rentabilidade")}
                    onKeyUp={soNumero}
                  />
                  <p className={errors.rentabilidade ? "erro" : null}>
                    {errors.rentabilidade?.message}
                  </p>
                </div>
                <div>
                  <label> CDI (ao ano) </label>
                  <input type="text" value={indicadores[0]?.valor + "%"} readOnly />
                </div>
              </div>
              <button className="button simular" type="submit">
                Simular
              </button>
            </div>
          </form>
          <Simulacao investimento={investimento} />
        </div>
      </div>
    </div>
  );
}

export default Desafio;
