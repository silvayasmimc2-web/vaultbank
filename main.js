// ===============================
// DADOS INICIAIS (com LocalStorage)
// ===============================

let saldo = localStorage.getItem("saldo")
  ? parseFloat(localStorage.getItem("saldo"))
  : 5000;

let saldoVisivel = true;

let historico = localStorage.getItem("historico")
  ? JSON.parse(localStorage.getItem("historico"))
  : [];

// ===============================
// ELEMENTOS
// ===============================

const saldoElemento = document.getElementById("saldo");
const historicoLista = document.getElementById("listaHistorico");

// ===============================
// FORMATAÇÃO
// ===============================

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ===============================
// SALVAR DADOS
// ===============================

function salvarDados() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("historico", JSON.stringify(historico));
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
}

// ===============================
// MOSTRAR / ESCONDER SALDO
// ===============================

function toggleSaldo() {
  saldoVisivel = !saldoVisivel;
  atualizarSaldo();
}

// ===============================
// ADICIONAR HISTÓRICO
// ===============================

function adicionarHistorico(texto, valor) {
  const data = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemData = {
    texto,
    valor,
    data,
  };

  historico.unshift(itemData);
  salvarDados();
  renderizarHistorico();
}

// ===============================
// RENDERIZAR HISTÓRICO
// ===============================

function renderizarHistorico() {
  historicoLista.innerHTML = "";

  historico.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("transaction");

    const left = document.createElement("div");
    left.classList.add("transaction-left");

    const titulo = document.createElement("strong");
    titulo.textContent = item.texto;

    const data = document.createElement("small");
    data.textContent = "Hoje • " + item.data;

    left.appendChild(titulo);
    left.appendChild(data);

    const valor = document.createElement("span");
    valor.textContent = formatar(item.valor);

    if (item.valor > 0) {
      valor.style.color = "#00C853";
    } else {
      valor.style.color = "#D50000";
    }

    div.appendChild(left);
    div.appendChild(valor);

    historicoLista.appendChild(div);
  });
}

// ===============================
// AÇÕES
// ===============================

function depositar() {
  const valor = parseFloat(prompt("Valor para depositar:"));

  if (!isNaN(valor) && valor > 0) {
    saldo += valor;
    salvarDados();
    atualizarSaldo();
    adicionarHistorico("Depósito", valor);
  }
}

function sacar() {
  const valor = parseFloat(prompt("Valor para sacar:"));

  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    salvarDados();
    atualizarSaldo();
    adicionarHistorico("Saque", -valor);
  }
}

function pagar() {
  const valor = parseFloat(prompt("Valor do pagamento:"));

  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    salvarDados();
    atualizarSaldo();
    adicionarHistorico("Pagamento", -valor);
  }
}

function criarCaixinha() {
  const valor = parseFloat(prompt("Valor para guardar na caixinha:"));

  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saldo -= valor;
    salvarDados();
    atualizarSaldo();
    adicionarHistorico("Caixinha criada", -valor);
  }
}

// ===============================
// INICIAR APP
// ===============================

window.onload = function () {
  atualizarSaldo();
  renderizarHistorico();
};
