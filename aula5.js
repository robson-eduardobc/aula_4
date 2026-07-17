const GLOBAL_URL = `https://6a50327cf45d5352b6121ab2.mockapi.io/produtos`;

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

async function cadastrarProduto() {
  const produto = {
    nome: document.querySelector("#nome").value,
    preco: Number(document.querySelector("#preco").value) || 0, // ao digitar (|| 0 ele vai tentar fazer o number, e se der erro ele vai zerar).
    quantidade: Number(document.querySelector("#quantidade").value),
  };

  try {
    await fetch(GLOBAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    carregarProdutos();
  } catch (error) {
    console.error(error);
    alert("Não foi possível cadastrar esse produto");
  }
}

carregarProdutos();
