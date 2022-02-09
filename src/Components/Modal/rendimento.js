import React from "react";

import "./styles.scss";

function IndexacaoModal({ showRendimentoModal }) {
  return (
    <section className="modal">
      <div className="container-modal">
        <h2>Informações</h2>
        <p>
          <strong>Rendimento bruto</strong>, é o resultado de uma aplicação
          financeira sem nenhum tipo de desconto, nem de taxas, ou impostos.
          <br />
          <strong>Rendimento líquido</strong>, é esse mesmo resultado,
          descontando taxas ou impostos.
          <br />
        </p>
        <button type="button" onClick={showRendimentoModal}>
          X
        </button>
      </div>
    </section>
  );
}

export default IndexacaoModal;
