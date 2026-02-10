let saldo = 5000;
let saldoVisivel = true;

const saldoElemento = document.getElementById("saldo");
const historicoLista = document.getElementById("listaHistorico");
const userName = document.getElementById("userName");

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function atualizarSaldo() {
  if (saldoVisivel) {
    saldoElemento.textContent = formatar(saldo);
  } else {
    saldoElemento.textContent = "••••••";
  }
}

function toggleSaldo() {
  saldoVisivel = !saldoVisivel;
  atualizarSaldo();
}

function adicionarHistorico(texto, valor) {
  const item = document.createElement("div");
  item.classList.add("transaction");

  const titulo = document.createElement("strong");
  titulo.textContent = texto;

  const data = document.createElement("small");
  data.textContent =
    "Hoje • " +
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

  const valorElemento = document.createElement("span");
  valorElemento.textContent = formatar(valor);

  if (valor > 0) {
    valorElemento.style.color = "#00c853";
  } else {
    valorElemento.style.color = "#d50000";
  }

  item.appendChild(titulo);
  item.appendChild(data);
  item.appendChild(valorElemento);

  historicoLista.prepend(item);
}

function depositar() {
  const valor = parseFloat(prompt("Valor para depositar:"));
  if (!isNaN(valor) && valor > 0) {
    saldo += valor;
    atualizarSaldo();
    adicionarHistorico("Depósito", valor);
  }
}

function sacar() {
  const valor = parseFloat(prompt("Valor para sacar:"));
  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico("Saque", -valor);
  }
}

function pagar() {
  const valor = parseFloat(prompt("Valor do pagamento:"));
  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico("Pagamento", -valor);
  }
}

function criarCaixinha() {
  const valor = parseFloat(prompt("Valor para guardar:"));
  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico("Caixinha criada", -valor);
  }
}

/* LOGIN */
function fazerLogin() {
  const nome = document.getElementById("nomeUsuario").value;

  if (nome.trim() !== "") {
    userName.textContent = nome;
    document.getElementById("loginScreen").style.display = "none";
  }
}

window.onload = function () {
  atualizarSaldo();
};
