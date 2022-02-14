import * as yup from "yup";

//validação de campos dos inputs requeridos

export const schema = yup
  .object({
    indexacao: yup.mixed().required("Campo é obrigatório"),
    rendimento: yup.mixed().required("Campo é obrigatório"),
    aporteInicial: yup.string().required("Campo é obrigatório"),
    prazo: yup
      .string("somente numeros")
      .max(2, "máximo 99 meses")
      .required("Campo é obrigatório"),
    rentabilidade: yup.string().required("Campo é obrigatório").max(2, "máximo 99%"),
  })
  .required();

// Função para aceitar apenas números no input

export function soNumero(e) {
  let value = e.target.value;
  value = value.replace(/\D/g, "");

  e.currentTarget.value = value;
  return e;
}

// Função para formatar entrada do input em moeda

export function formatarMoeda(e) {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
}
