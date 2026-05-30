// BANCO DE DADOS INTEGRADO CEASA
const dadosCeasa = [
    { produto: "ABACATE AVOCADO", unidade: "cx 03 kg", situacao: "Estável", min: 60.00, mc: 60.00, max: 65.00, var: 0, proc: "PR, SP", categoria: "frutas" },
    { produto: "ABACAXI PÉROLA GRAUDO", unidade: "cx 15kg", situacao: "Estável", min: 60.00, mc: 65.00, max: 65.00, var: 0, proc: "PA, MA, PB", categoria: "frutas" },
    { produto: "BANANA CATURRA PRIMEIRA", unidade: "cx 20 kg", situacao: "Estável", min: 45.00, mc: 50.00, max: 50.00, var: 0, proc: "PR", categoria: "frutas" },
    { produto: "MAÇÃ GALA CAT 1", unidade: "cx 18 kg", situacao: "Fraco", min: 150.00, mc: 150.00, max: 155.00, var: -3.23, proc: "SC, RS", categoria: "frutas" },
    { produto: "MORANGO TIPO 1", unidade: "cx 1,2 kg", situacao: "Firme", min: 30.00, mc: 35.00, max: 35.00, var: 16.67, proc: "PR", categoria: "frutas" },
    { produto: "ABOBRINHA VERDE EXTRA AA", unidade: "cx 20 kg", situacao: "Estável", min: 110.00, mc: 120.00, max: 120.00, var: 0, proc: "PR, ES", categoria: "hortalicas" },
    { produto: "PEPINO JAPONÊS EXTRA AA", unidade: "cx 20 kg", situacao: "Fraco", min: 130.00, mc: 130.00, max: 140.00, var: -13.33, proc: "PR, SP", categoria: "hortalicas" },
    { produto: "TOMATE SALADETE EXTRA AA", unidade: "cx 20 kg", situacao: "Firme", min: 160.00, mc: 170.00, max: 170.00, var: 13.33, proc: "PR, SP, SC", categoria: "hortalicas" },
    { produto: "BATATA COMUM ESPECIAL", unidade: "sc 25kg", situacao: "Estável", min: 145.00, mc: 150.00, max: 150.00, var: 0, proc: "PR, SP, SC", categoria: "graos" }
];

// GERENCIADOR DE ABAS
function mudarAba(idAba) {
    document.querySelectorAll('.secao-site').forEach(secao => {
        secao.classList.add('aba-escondida');
    });
    document.querySelectorAll('.menu-navegacao button').forEach(btn => {
        btn.classList.remove('btn-ativo');
    });
    
    document.getElementById(`aba-${idAba}`).classList.remove('aba-escondida');
    document.getElementById(`btn-${idAba}`).classList.add('btn-ativo');
}

// RENDERIZAR CEASA
function renderizarTabelaCeasa(listaProdutos) {
    const tbody = document.getElementById("corpo-tabela-ceasa");
    tbody.innerHTML = "";
    listaProdutos.forEach(item => {
        let classeVar = item.var > 0 ? "preco-subiu" : item.var < 0 ? "preco-desceu" : "preco-estavel";
        let sinal = item.var > 0 ? "+" : "";
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.produto}</strong></td>
                <td>${item.unidade}</td>
                <td>${item.situacao}</td>
                <td>R$ ${item.min.toFixed(2)}</td>
                <td><strong>R$ ${item.mc.toFixed(2)}</strong></td>
                <td>R$ ${item.max.toFixed(2)}</td>
                <td class="${classeVar}">${sinal}${item.var}%</td>
                <td>${item.proc}</td>
            </tr>
        `;
    });
}

function filtrarTabelaCeasa() {
    const busca = document.getElementById("busca-produto").value.toLowerCase();
    const categoria = document.getElementById("filtro-categoria").value;
    const filtrados = dadosCeasa.filter(item => {
        const nomeOk = item.produto.toLowerCase().includes(busca);
        const catOk = categoria === "todos" || item.categoria === categoria;
        return nomeOk && catOk;
    });
    renderizarTabelaCeasa(filtrados);
}

// SIMULADOR DE IRRIGAÇÃO
function calcularIrrigacao() {
    const cultura = document.getElementById("irrigacao-cultura").value;
    const solo = document.getElementById("irrigacao-solo").value;
    const box = document.getElementById("resultado-irrigacao");
    box.classList.remove("aba-escondida");
    
    let tempo = cultura === "tomate" ? 25 : cultura === "folhosas" ? 15 : 20;
    if (solo === "arenoso") tempo += 10;
    
    box.innerHTML = `💧 <strong>Recomendação de Rega:</strong> Ligar o sistema por <strong>${tempo} minutos</strong> hoje. Evita o desperdício mantendo a umidade ideal para o solo selecionado.`;
}

// CALCULADORA FINANCEIRA
function calcularFinancas() {
    const custo = parseFloat(document.getElementById("custo-producao").value);
    const preco = parseFloat(document.getElementById("preco-venda").value);
    const qtd = parseFloat(document.getElementById("qtd-produzida").value);
    const box = document.getElementById("resultado-financeiro");
    
    if(!custo || !preco || !qtd) { alert("Preencha todos os campos financeiros!"); return; }
    
    box.classList.remove("aba-escondida");
    const faturamento = preco * qtd;
    const saldo = faturamento - custo;
    
    if(saldo >= 0) {
        box.style.borderColor = "#1b5e20";
        box.innerHTML = `📈 <strong>Balanço Positivo:</strong><br>Faturamento: R$ ${faturamento.toFixed(2)}<br><strong>Lucro Líquido: R$ ${saldo.toFixed(2)}</strong><br><span class="dica-verde">Sua margem está segura para venda!</span>`;
    } else {
        box.style.borderColor = "#d32f2f";
        box.innerHTML = `📉 <strong>Alerta de Prejuízo:</strong><br>Faturamento: R$ ${faturamento.toFixed(2)}<br><strong style="color:#d32f2f">Prejuízo estimado: R$ ${Math.abs(saldo).toFixed(2)}</strong><br>Dica: Tente vender direto na vitrine para aumentar sua margem.`;
    }
}

// CALCULADORA DE SUSTENTABILIDADE
function calcularSustentabilidade() {
    const rot = document.getElementById("eco-rotacao").value;
    const org = document.getElementById("eco-organico").value;
    const sol = document.getElementById("eco-solar").value;
    const box = document.getElementById("resultado-eco");
    box.classList.remove("aba-escondida");
    
    let pontos = 0;
    if(rot === "sim") pontos += 30;
    if(org === "sim") pontos += 35;
    if(sol === "sim") pontos += 35;
    
    let nota = pontos >= 90 ? "Nota A (Excelente Sustentabilidade!)" : pontos >= 60 ? "Nota B (Boa Prática Ambiental)" : "Nota C (Precisa Melhorar)";
    
    box.innerHTML = `🌱 <strong>Avaliação de Impacto Ecológico:</strong><br>Pontuação: ${pontos}/100<br><strong>Classificação: ${nota}</strong><br>Parabéns por aplicar práticas alinhadas às diretrizes do Programa Agrinho!`;
}

// SIMULADOR DE INTELIGÊNCIA ARTIFICIAL
function simularAnaliseIA() {
    const box = document.getElementById("resultado-ia");
    box.classList.remove("aba-escondida");
}

// CHATBOT CONTROLE
function toggleChatbot() {
    const corpo = document.getElementById("chatbot-corpo");
    const icone = document.getElementById("chat-icone-janela");
    if (corpo.classList.contains("chat-escondido")) {
        corpo.classList.remove("chat-escondido");
        icone.innerText = "🔽";
    } else {
        corpo.classList.add("chat-escondido");
        icone.innerText = "🔼";
    }
}

function perguntarChatbot(opcao) {
    const historico = document.getElementById("chat-mensagens");
    let perguntaTexto = "";
    let respostaTexto = "";

    switch(opcao) {
        case 1:
            perguntaTexto = "Como vejo o alerta de geada?";
            respostaTexto = "<strong>PontoVerde IA:</strong> O alerta vermelho fica ativo logo no topo da aba <strong>'Clima & Alertas'</strong> sempre que há riscos na região.";
            break;
        case 2:
            perguntaTexto = "De quando são os dados da CEASA?";
            respostaTexto = "<strong>PontoVerde IA:</strong> Nossos dados de cotação são baseados em coletas reais do dia <strong>29/05/2026</strong>.";
            break;
        case 3:
            perguntaTexto = "Como calcular meu lucro?";
            respostaTexto = "<strong>PontoVerde IA:</strong> Vá até a aba <strong>'Calculadora & Eco'</strong>, preencha o custo de produção, preço e quantidade na planilha integrada.";
            break;
        case 4:
            perguntaTexto = "Minha folha está doente, o que eu faço?";
            respostaTexto = "<strong>PontoVerde IA:</strong> Acesse a aba <strong>'Diagnóstico IA'</strong> e simule o envio da foto para receber a análise automatizada.";
            break;
    }

    historico.innerHTML += `<div class="msg-usuario"><strong>Você:</strong> ${perguntaTexto}</div>`;
    historico.scrollTop = historico.scrollHeight;

    setTimeout(() => {
        historico.innerHTML += `<div class="msg-ia">${respostaTexto}</div>`;
        historico.scrollTop = historico.scrollHeight;
    }, 400);
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    renderizarTabelaCeasa(dadosCeasa);
});
