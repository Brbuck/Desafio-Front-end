import React from 'react'
import './styles.scss'

function Ultimo({ investimento }) {
    return (
        <div className="wrapper-container">
            {investimento.map((item) => (
                <div key={item.valorFinalBruto}>
                    <h2>Resultado da simulação</h2>
                    <div className="container-resultado">
                        <div className="card">
                            <span>Valor Final Bruto</span>
                            <span>R$ {item?.valorFinalBruto}</span>
                        </div>
                        <div className="card">
                            <span>Alíquota de IR</span>
                            <span>{item?.aliquotaIR}%</span>
                        </div>
                        <div className="card">
                            <span>Valor pago em IR</span>
                            <span>R$ {item?.valorspanagoIR}</span>
                        </div>
                        <div className="card">
                            <span>Valor Final Liquido</span>
                            <span className="color">
                                R$ {item?.valorFinalLiquido}
                            </span>
                        </div>
                        <div className="card">
                            <span>Valor Total Investido</span>
                            <span>R$ {item?.valorTotalInvestido}</span>
                        </div>
                        <div className="card">
                            <span>Ganho Liquido</span>
                            <span className="color">
                                R$ {item?.ganhoLiquido}
                            </span>
                        </div>
                        {/*  <p>{JSON.stringify(item?.graficoValores?.comAporte)}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Ultimo
