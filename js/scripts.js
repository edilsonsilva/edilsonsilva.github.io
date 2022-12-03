//const pathURL = "https://univespbackbancoalimentos.herokuapp.com/api/v1";
const pathURL = "https://univespbackbancoalimentos.herokuapp.com/api/v1";

function carregarDados() {
  carregarEstoque();
  doados24();
  doadosinicio();
  retirados24();
  retiradosinicio();
  url = window.location.href.split("/");
  if (url[3] === "formretirada.html") {
    formRetirada();
    qtdRetirada();
  }
  if (url[3] === "formdoacao.html") {
    formDoacao();
    listaDias();
    listaMes();
    listaAno();
    listaQtd();
  }
}

function carregarEstoque() {
  const conteudoestoque = document.getElementById("conteudoestoque");

  fetch(`${pathURL}/estoque/listarprodutoestoque`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log(produtos);

      produtos.map((itens, ix) => {
        var div = `<div>${itens.nomeproduto}</div>
        <div id=totalestoque>
        <div style=background-color:${cor[ix]};width:${
          10 * parseInt(itens.total.toString())
        }px;height:20px>
          </div>
          <div>${itens.total}</div>
          </div>
          `;
        conteudoestoque.innerHTML += div;
      });
    })
    .catch((error) =>
      console.error(
        `Erro ao tentar carregar a lista de produtos em estoque-> ${error}`
      )
    );
}

function doados24() {
  fetch(`${pathURL}/doacao/totaldoado24`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log(produtos);

      document.getElementById("pdoacao24").innerHTML = produtos[0].total;
    })
    .catch((error) =>
      console.error(
        `Erro ao tentar carregar o total de produtos doados 24h-> ${error}`
      )
    );
}

function doadosinicio() {
  fetch(`${pathURL}/doacao/totaldoadoinicio`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log(`doacao inicio -> ${produtos[0].total} `);

      document.getElementById("pdoacaoinicio").innerHTML = produtos[0].total;
    })
    .catch((error) =>
      console.error(
        `Erro ao tentar carregar o total de produtos doados 24h-> ${error}`
      )
    );
}

function retirados24() {
  fetch(`${pathURL}/retirada/totaldoado24`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log(`doacao inicio -> ${produtos[0].total} `);

      document.getElementById("pretirados24").innerHTML = produtos[0].total;
    })
    .catch((error) =>
      console.error(
        `Erro ao tentar carregar o total de produtos doados 24h-> ${error}`
      )
    );
}

function retiradosinicio() {
  fetch(`${pathURL}/retirada/totaldoadoinicio`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log(`doacao inicio -> ${produtos[0].total} `);

      document.getElementById("pretiradosinicio").innerHTML = produtos[0].total;
    })
    .catch((error) =>
      console.error(
        `Erro ao tentar carregar o total de produtos doados 24h-> ${error}`
      )
    );
}

//----------------- Formulários que serão abertos por cada botao ---------------------------------
const btnRetirada = document.getElementById("retirada");
btnRetirada.onclick = () => {
  window.location.replace("formretirada.html");
};

const btnDoacao = document.getElementById("doacao");
btnDoacao.onclick = () => {
  window.location.replace("formdoacao.html");
};

const btnTelaInicial = document.getElementById("telainicial");
btnTelaInicial.onclick = () => {
  window.location.replace("index.html");
};

const btnSobre = document.getElementById("sobre");
btnSobre.onclick = () => {
  window.location.replace("sobre.html");
};

function formRetirada() {
  const produtosestoque = document.getElementById("select-retirada");

  fetch(`${pathURL}/estoque/listarprodutoestoque`)
    .then((response) => response.json())
    .then((produtos) => {
      produtos.map((itens, ix) => {
        produtosestoque.innerHTML += `<option value=${itens.idproduto}>${itens.nomeproduto}</option>`;
      });
    })
    .catch((erro) =>
      console.error(`Erro ao tentar carregar os produtos->${erro}`)
    );
}

function formDoacao() {
  const sr = document.getElementById("select-retirada");
  fetch(`${pathURL}/produto/listar`)
    .then((response) => response.json())
    .then((produtos) => {
      console.log("informacoes " + produtos);

      produtos.map((itens, ix) => {
        sr.innerHTML += `<option value=${itens.idproduto}>${itens.nomeproduto}</option>`;
      });
    })
    .catch((error) =>
      console.error(`Erro ao tentar carregar a lista de produtos -> ${error}`)
    );
}

function listaDias() {
  for (var i = 1; i < 31; i++) {
    document.getElementById(
      "dia"
    ).innerHTML += `<option value=${i}>${i}</option>`;
  }
}

function listaAno() {
  for (var i = 2020; i < 2030; i++) {
    document.getElementById(
      "ano"
    ).innerHTML += `<option value=${i}>${i}</option>`;
  }
}

function listaMes() {
  var mes = `
  <option value="1">Janeiro</option>
  <option value="2">Fevereiro</option>
  <option value="3">Março</option>
  <option value="4">Abril</option>
  <option value="5">Maio</option>
  <option value="6">Junho</option>
  <option value="7">Julho</option>
  <option value="8">Agosto</option>
  <option value="9">Setembro</option>
  <option value="10">Outubro</option>
  <option value="11">Novembro</option>
  <option value="12">Dezembro</option> `;
  document.getElementById("mes").innerHTML = mes;
}

function listaQtd() {
  for (var i = 1; i < 20; i++) {
    document.getElementById(
      "quantidade"
    ).innerHTML += `<option value=${i}>${i}</option>`;
  }
}

function qtdRetirada() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById(
      "quantidade-retirada"
    ).innerHTML += `<option value=${i}>${i}</option>`;
  }
}

//-------------------------------------------- Cadastrar doacao ------------

function realizarDoacao() {
  // Realizando o cadastro de uma nova doação
  const produto = document.getElementById("select-retirada").value;
  const doador = 1;
  const qtd = document.getElementById("quantidade").value;

  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;

  const datavalidade = `${ano}-${mes}-${dia}`;

  fetch(`${pathURL}/doacao/cadastro`, {
    method: "POST",
    mode: "cors",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      idproduto: produto,
      iddoador: doador,
      quantidade: qtd,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Doação cadastrada.");
      console.log(data);
    })
    .catch((error) =>
      console.error(`Erro ao tentar cadastrar uma nova doação -> ${error}`)
    );

  // Realizando o cadastro de uma nova entrada

  fetch(`${pathURL}/entrada/cadastro`, {
    method: "POST",
    mode: "cors",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      idproduto: produto,
      datavalidade: datavalidade,
      quantidade: qtd,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) =>
      console.error(`Erro ao tentar cadastrar uma nova entrada -> ${error}`)
    );
}

//--------------------------- cadastrar retirada -----------------------------------------

function realizarRetirada() {
  // Realizando o cadastro de uma nova entrada
  const produto = document.getElementById("select-retirada").value;
  const qtd = document.getElementById("quantidade-retirada").value;

  fetch(`${pathURL}/retirada/cadastro`, {
    method: "POST",
    mode: "cors",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      idproduto: produto,
      quantidade: qtd,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Retirada realizada.");
      console.log(data);
    })
    .catch((error) =>
      console.error(`Erro ao tentar cadastrar uma nova retirada -> ${error}`)
    );
}

//cores para as barras do estoque
let cor = [
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
  "#c62828",
  "#64b5f6",
  "#7b1fa2",
  "#009688",
  "#01579b",
  "#cddc39",
  "#ffa726",
  "#ff6f00",
];
