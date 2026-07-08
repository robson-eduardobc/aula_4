async function buscarCep() {
  const cepDigitado = document.querySelector("#cep").value;
  const url = `https://viacep.com.br/ws/${cepDigitado}/json/`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  console.log(dados);
}

function popularInputs(dados) {}
