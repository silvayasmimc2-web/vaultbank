let saldo = 5000;
let saldoVisivel = true;

const saldoElemento = document.getElementById("saldo");
const listaHistorico = document.getElementById("listaHistorico");

// Formatar moeda
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Atualizar saldo na tela
function atualizarSaldo() {
  if (saldoVisivel) {
    saldoElemento.innerText = formatarMoeda(saldo);
  } else {
    saldoElemento.innerText = "••••••";
  }
}

// Mostrar / esconder saldo
function alternarSaldo() {
  saldoVisivel = !saldoVisivel;
  atualizarSaldo();
}

// Histórico
let historico = [
  { tipo: "entrada", descricao: "Pix recebido", valor: 800 },
  { tipo: "saida", descricao: "Supermercado", valor: -230 },
  { tipo: "saida", descricao: "Netflix", valor: -39.90 }
];

function atualizarHistorico() {
  listaHistorico.innerHTML = "";

  historico.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("historico-item");

    div.innerHTML = `
      <div>
        <strong>${item.descricao}</strong>
      </div>
      <div class="${item.tipo}">
        ${formatarMoeda(item.valor)}
      </div>
    `;

    listaHistorico.appendChild(div);
  });
}

// Ações
function depositar() {
  saldo += 100;
  historico.unshift({ tipo: "entrada", descricao: "Depósito", valor: 100 });
  atualizarSaldo();
  atualizarHistorico();
}

function sacar() {
  saldo -= 50;
  historico.unshift({ tipo: "saida", descricao: "Saque", valor: -50 });
  atualizarSaldo();
  atualizarHistorico();
}

function criarCaixinha() {
  alert("Função em desenvolvimento 💜");
}

function pagar() {
  saldo -= 120;
  historico.unshift({ tipo: "saida", descricao: "Pagamento", valor: -120 });
  atualizarSaldo();
  atualizarHistorico();
}

// Inicialização
atualizarSaldo();
atualizarHistorico();
