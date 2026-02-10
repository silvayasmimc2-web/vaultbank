// ===============================
// DADOS SALVOS
// ===============================

let saldo = localStorage.getItem("saldo")
  ? parseFloat(localStorage.getItem("saldo"))
  : 5000;

let saldoVisivel = true;

const saldoElemento = document.getElementById("saldo");
const historicoLista = document.getElementById("listaHistorico");
const userNameElement = document.getElementById("userName");

// ===============================
// FORMATAÇÃO
// ===============================

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ===============================
// ATUALIZAR SALDO
// ===============================

function atualizarSaldo() {
  if (saldoVisivel) {
    saldoElemento.textContent = formatar(saldo);
  } else {
    saldoElemento.textContent = "••••••";
  }

  localStorage.setItem("saldo", saldo);
}

// ===============================
// TOGGLE SALDO
// ===============================

function toggleSaldo() {
  saldoVisivel = !saldoVisivel;
  atualizarSaldo();
}

// ===============================
// HISTÓRICO
// ===============================

function salvarHistorico() {
  localStorage.setItem("historico", historicoLista.innerHTML);
}

function carregarHistorico() {
  const salvo = localStorage.getItem("historico");
  if (salvo) {
    historicoLista.innerHTML = salvo;
  }
}

function adicionarHistorico(texto, valor) {
  const item = document.createElement("div");
  item.classList.add("transaction");

  const left = document.createElement("div");
  left.classList.add("transaction-left");

  const icon = document.createElement("div");
  icon.classList.add("transaction-icon");

  icon.textContent = valor > 0 ? "⬆️" : "⬇️";

  const info = document.createElement("div");

  const titulo = document.createElement("strong");
  titulo.textContent = texto;

  const data = document.createElement("small");
  data.textContent =
    "Hoje • " +
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

  info.appendChild(titulo);
  info.appendChild(data);

  left.appendChild(icon);
  left.appendChild(info);

  const valorElemento = document.createElement("span");
  valorElemento.textContent = formatar(valor);

  valorElemento.style.color = valor > 0 ? "#00c853" : "#d50000";

  item.appendChild(left);
  item.appendChild(valorElemento);

  historicoLista.prepend(item);

  salvarHistorico();
}

// ===============================
// AÇÕES
// ===============================

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
  const valor = parseFloat(prompt("Valor para guardar na caixinha:"));
  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico("Caixinha criada", -valor);
  }
}

// ===============================
// LOGIN
// ===============================

function fazerLogin() {
  const nome = document.getElementById("nomeUsuario").value.trim();

  if (nome !== "") {
    localStorage.setItem("nomeUsuario", nome);
    document.getElementById("loginScreen").style.display = "none";
    userNameElement.textContent = nome;
  }
}

function verificarLogin() {
  const nomeSalvo = localStorage.getItem("nomeUsuario");

  if (nomeSalvo) {
    document.getElementById("loginScreen").style.display = "none";
    userNameElement.textContent = nomeSalvo;
  }
}

// ===============================
// INICIALIZAÇÃO
// ===============================

window.onload = function () {
  verificarLogin();
  atualizarSaldo();
  carregarHistorico();
};
