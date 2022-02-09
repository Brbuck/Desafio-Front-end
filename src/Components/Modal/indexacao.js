import React from "react";

import "./styles.scss";

function IndexacaoModal({ shownIndexacaoModal }) {
  return (
    <section className="modal">
      <div className="container-modal">
        <h2>Informações</h2>
        <p>
          <strong>Título prefixado</strong>, ou seja, no momento da compra, você
          já sabe exatamente quanto irá receber no futuro.
          <br />
          <strong>Título pós-fixado</strong>, cujo rendimento não é um valor
          absoluto, mas depende do comportamento de um indicador como o CDI ou a
          Selic.
          <br />
          <strong>Título fixado (IPCA)</strong>, Aumenta o poder de compra do
          seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a
          variação da inflação.
        </p>
        <button type="button" onClick={shownIndexacaoModal}>
          X
        </button>
      </div>
    </section>
  );
}

export default IndexacaoModal;
