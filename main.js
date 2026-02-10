// ============================
// VAULTBANK PRO - LÓGICA
// ============================

let saldo = 5000;
let caixinhas = [];
let historico = [];

// ============================
// INICIALIZAÇÃO
// ============================

window.onload = function () {
    carregarDados();
    atualizarTela();
};

// ============================
// SALVAR E CARREGAR DADOS
// ============================

function salvarDados() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("caixinhas", JSON.stringify(caixinhas));
    localStorage.setItem("historico", JSON.stringify(historico));
}

function carregarDados() {
    const saldoSalvo = localStorage.getItem("saldo");
    const caixinhasSalvas = localStorage.getItem("caixinhas");
    const historicoSalvo = localStorage.getItem("historico");

    if (saldoSalvo) saldo = parseFloat(saldoSalvo);
    if (caixinhasSalvas) caixinhas = JSON.parse(caixinhasSalvas);
    if (historicoSalvo) historico = JSON.parse(historicoSalvo);
}

// ============================
// ATUALIZAR TELA
// ============================

function atualizarTela() {
    document.getElementById("saldo").innerText = 
        "R$ " + saldo.toFixed(2);

    renderizarCaixinhas();
    renderizarHistorico();
}

// ============================
// DEPOSITAR
// ============================

function depositar() {
    let valor = parseFloat(prompt("Digite o valor para depositar:"));

    if (!valor || valor <= 0) return alert("Valor inválido");

    saldo += valor;

    historico.unshift({
        tipo: "Depósito",
        valor: valor
    });

    salvarDados();
    atualizarTela();
}

// ============================
// CRIAR CAIXINHA
// ============================

function criarCaixinha() {
    let nome = prompt("Nome da caixinha:");

    if (!nome) return;

    caixinhas.push({
        nome: nome,
        valor: 0
    });

    salvarDados();
    atualizarTela();
}

// ============================
// MOVER DINHEIRO PARA CAIXINHA
// ============================

function depositarNaCaixinha(index) {
    let valor = parseFloat(prompt("Valor para investir:"));

    if (!valor || valor <= 0) return alert("Valor inválido");
    if (valor > saldo) return alert("Saldo insuficiente");

    saldo -= valor;
    caixinhas[index].valor += valor;

    historico.unshift({
        tipo: "Investimento em " + caixinhas[index].nome,
        valor: valor
    });

    salvarDados();
    atualizarTela();
}

// ============================
// RENDERIZAR CAIXINHAS
// ============================

function renderizarCaixinhas() {
    const container = document.getElementById("listaCaixinhas");
    container.innerHTML = "";

    caixinhas.forEach((c, index) => {
        container.innerHTML += `
            <div class="card">
                <strong>${c.nome}</strong><br>
                R$ ${c.valor.toFixed(2)}<br>
                <button class="btn-primary" onclick="depositarNaCaixinha(${index})">
                    Investir
                </button>
            </div>
        `;
    });
}

// ============================
// RENDERIZAR HISTÓRICO
// ============================

function renderizarHistorico() {
    const container = document.getElementById("listaHistorico");
    container.innerHTML = "";

    historico.forEach(item => {
        container.innerHTML += `
            <div class="card">
                ${item.tipo} - R$ ${item.valor.toFixed(2)}
            </div>
        `;
    });
}