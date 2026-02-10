// Carregar valor salvo ou iniciar com 824
let caixinha = localStorage.getItem("caixinha");

if (caixinha === null) {
  caixinha = 824.00;
  localStorage.setItem("caixinha", caixinha);
} else {
  caixinha = parseFloat(caixinha);
}

const saldoElemento = document.getElementById("saldo");

// Formatar dinheiro
function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Atualizar tela
function atualizarTela() {
  saldoElemento.textContent = formatar(caixinha);
}

// Depositar
function depositar() {
  let valor = parseFloat(prompt("Quanto deseja guardar?"));
  if (!isNaN(valor) && valor > 0) {
    caixinha += valor;
    localStorage.setItem("caixinha", caixinha);
    atualizarTela();
  }
}

// Retirar
function sacar() {
  let valor = parseFloat(prompt("Quanto deseja retirar da caixinha?"));
  if (!isNaN(valor) && valor > 0 && valor <= caixinha) {
    caixinha -= valor;
    localStorage.setItem("caixinha", caixinha);
    atualizarTela();
  } else {
    alert("Valor inválido ou maior que o guardado.");
  }
}

// Iniciar
atualizarTela();
