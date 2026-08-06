const GLOBAL_URL = `https://6a5fe634b1933e9d25fcc879.mockapi.io/produtos`;

async function carregarProdutos() {
  try {
    const resposta = await fetch(GLOBAL_URL);
    const produtos = await resposta.json();

    listarProdutos(produtos);
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar os dados.");
  }
}

function listarProdutos(produtos) {
  let html = "";
  for (const produto of produtos) {
    html += `
    <tr>
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.preco}</td>
      <td>${calcularTotal(produto.quantidade, produto.preco)}</td>
      <td>
      <button class= "btn btn-danger" onclick="removerProduto(${produto.id})">Remover
      </button>
       <button class= "btn btn-primary" onclick="editarProduto(${produto.id})">Editar
      </button>
      </td>
    </tr>`;
  }

  const tbody = document.querySelector("#table_produtos tbody");
  tbody.innerHTML = html;
}

function calcularTotal(quantidade, preco) {
  return quantidade * preco;
}

async function removerProduto(id) {
  // Regra de parada - Se a regra for atingida, para com RETURN
  // com a exclamação na frente, significa "Não" corfimado
  if (!confirm("Realmente deseja apagar esse produto?")) {
    return;
  }

  const url = `${GLOBAL_URL}/${id}`;

  try {
    await fetch(url, { method: "DELETE" });
  } catch (error) {
    console.error(error);
    alert("Não foi possível apagar este produto.");
  } finally {
    carregarProdutos();
  }
}

async function adicionarProduto() {
  const produto = criarObjetoProduto(); // refaturou ou reescrever o código

  try {
    await fetch(GLOBAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
    limparFormulario();
    fecharModal();
    carregarProdutos();
  } catch (error) {
    console.error(error);
    alert("Não foi possível cadastrar esse produto");
  }
}

function salvarProduto() {}

async function editarProduto(id) {
  const url = `${GLOBAL_URL}/${id}`;

  try {
    const resposta = await fetch(url);
    const produto = await resposta.json();

    console.log(produto);
  } catch (error) {
    alert("Não foi possível editar este produto");
  }
}

function preencherFormulario() {}

async function atualizarProduto() {}

function limparFormulario() {
  document.querySelector("#nome").value = "";
  document.querySelector("#preco").value = "";
  document.querySelector("#quantidade").value = "";
}

function fecharModal() {
  const modalHtml = document.querySelector("#modalProduto");
  const modal = bootstrap.Modal.getOrCreateInstance(modalHtml);
  modal.hide();
}

function criarObjetoProduto() {
  return {
    nome: document.querySelector("#nome").value,
    preco: Number(document.querySelector("#preco").value) || 0, // ao digitar (|| 0 ele vai tentar fazer o number, e se der erro ele vai zerar).
    quantidade: Number(document.querySelector("#quantidade").value),
  };
}
carregarProdutos();
