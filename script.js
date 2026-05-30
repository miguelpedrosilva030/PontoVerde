/* ==========================================================================
   1. TELA DE ABERTURA E MODO ESCURO
   ========================================================================== */
const telaEntrada = document.querySelector('#tela-entrada');
const btnEntrarSite = document.querySelector('#btn-entrar-site');
const containerAssistente = document.querySelector('#container-assistente');
const textoAssistente = document.querySelector('#texto-assistente');
const btnAlternarTema = document.querySelector('#btn-alternar-tema');

if (btnEntrarSite && telaEntrada) {
    btnEntrarSite.addEventListener('click', () => {
        telaEntrada.classList.add('ocultar');
        if (containerAssistente) containerAssistente.classList.add('centro-foco');
    });
}

if (btnAlternarTema) {
    btnAlternarTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        btnAlternarTema.textContent = document.body.classList.contains('dark-mode') ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    });
}

/* ==========================================================================
   2. INTELIGÊNCIA ARTIFICIAL: COTAÇÕES E MOMENTO DE PLANTIO
   ========================================================================== */
const btnSalvarNome = document.querySelector('#btn-salvar-nome');
const inputNomeUsuario = document.querySelector('#nome-usuario');
const controleNome = document.querySelector('#controle-nome');
const controleDuvidas = document.querySelector('#controle-duvidas');
const btnPerguntar = document.querySelector('#btn-perguntar');
const campoPergunta = document.querySelector('#campo-pergunta');
const balaoAssistente = document.querySelector('#balao-assistente');
const btnFecharChat = document.querySelector('#btn-fechar-chat');
const avatarPonto = document.querySelector('#avatar-ponto');

let nomeDoProdutor = "";

if (btnFecharChat) {
    btnFecharChat.addEventListener('click', (e) => {
        e.stopPropagation();
        balaoAssistente.style.display = "none";
        containerAssistente.classList.remove('centro-foco');
    });
}

if (avatarPonto) {
    avatarPonto.addEventListener('click', () => {
        balaoAssistente.style.display = balaoAssistente.style.display === "none" ? "block" : "none";
    });
}

if (btnSalvarNome) {
    btnSalvarNome.addEventListener('click', () => {
        const nomeInformado = inputNomeUsuario.value.trim();
        if (nomeInformado === "") return;
        nomeDoProdutor = nomeInformado;
        textoAssistente.innerHTML = `Conexão estabelecida, <strong>${nomeDoProdutor}</strong>! Oi sou o PontoVerde eu ajudarei você em tudo. Pode pergunte sobre soja, alface, batata, cenoura ou plantas de corte!`;
        containerAssistente.classList.remove('centro-foco');
        if(controleNome) {
            controleNome.style.display = "none";
            controleNome.remove();
        }
        controleDuvidas.style.display = "block";
    });
}

if (btnPerguntar) {
    btnPerguntar.addEventListener('click', () => {
        const pergunta = campoPergunta.value.toLowerCase();
        let resposta = `Desculpe ${nomeDoProdutor || 'produtor'}, tente consultar itens como 'alface', 'tomate', 'batata', 'cenoura', 'flores', 'soja' ou 'milho'.`;

        if (pergunta.includes('soja')) {
            resposta = "🌾 <strong>Cotação e Plantio de Soja:</strong> Janela ideal de <strong>setembro a janeiro</strong> no PR. Preço atualizado de referência: R$ 135,40 por saca.";
        } else if (pergunta.includes('milho')) {
            resposta = "🌽 <strong>Cotação e Plantio de Milho Safrinha:</strong> Janela ideal entre <strong>janeiro e março</strong> no estado. Preço atualizado: R$ 58,20 por saca.";
        } else if (pergunta.includes('alface')) {
            resposta = "🥬 <strong>Cotação CEASA-PR (Alface):</strong> Alface Crespa está saindo a R$ 50,00 a caixa de 7kg em Curitiba. O plantio ideal em estufas ocorre de forma saudável o ano todo!";
        } else if (pergunta.includes('tomate')) {
            resposta = "🍅 <strong>Cotação CEASA-PR (Tomate):</strong> Tomate Longa Vida Extra está cotado em R$ 90,00 a caixa com 20kg. É considerado estável nas últimas coletas.";
        } else if (pergunta.includes('batata')) {
            resposta = "🥔 <strong>Cotação CEASA-PR (Batata):</strong> Batata Comum Especial a R$ 150,00 o saco de 25kg. Apresentou leve tendência de baixa esta semana.";
        } else if (pergunta.includes('cenoura')) {
            resposta = "🥕 <strong>Cotação CEASA-PR (Cenoura):</strong> Cenoura Ninfas Extra saindo a R$ 85,00 a caixa de 20kg, com tendência de alta no mercado atual.";
        } else if (pergunta.includes('flor') || pergunta.includes('flores') || pergunta.includes('planta')) {
            resposta = "💐 <strong>Plantas e Flores de Paisagismo (CEASA):</strong> Maço de Alstroemeria cotado a R$ 18,00. Já caixas de Mini-Anthurium para paisagismo saem por R$ 120,00 com 15 vasos.";
        } else if (pergunta.includes('cotac') || pergunta.includes('preço') || pergunta.includes('ceasa')) {
            resposta = "💰 <strong>Painel CEASA-PR ativo:</strong> Clique na aba 'Cotação Hortifrúti' para analisar a tabela completa com os preços consolidados de Curitiba e Cascavel.";
        }

        textoAssistente.innerHTML = resposta;
        campoPergunta.value = "";
    });
}

/* ==========================================================================
   3. NAVEGAÇÃO ABAS
   ========================================================================== */
const botoesAbas = document.querySelectorAll('.btn-aba');
const conteudosAbas = document.querySelectorAll('.conteudo-aba');

botoesAbas.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesAbas.forEach(b => b.classList.remove('ativa'));
        conteudosAbas.forEach(c => c.classList.remove('ativa'));
        botao.classList.add('ativa');
        document.querySelector(`#aba-${botao.getAttribute('data-aba')}`).classList.add('ativa');
    });
});

/* ==========================================================================
   4. CALCULADORA: GANHOS, PREJUÍZOS E METAS
   ========================================================================== */
const btnCalcular = document.querySelector('#btn-calcular');
const inputAlimentacao = document.querySelector('#alimentacao');
const inputEnergia = document.querySelector('#energia');
const inputMaoObra = document.querySelector('#mao-obra');
const inputPrecoVenda = document.querySelector('#preco-venda');
const inputQuantidadeVenda = document.querySelector('#quantidade-venda');

const painelResultados = document.querySelector('#resultado-calculo');
const painelErro = document.querySelector('#mensagem-erro');
const txtCustoTotal = document.querySelector('#res-custo-total');
const txtFaturamento = document.querySelector('#res-faturamento');
const txtPontoEquilibrio = document.querySelector('#res-ponto-equilibrio');
const txtGanhos = document.querySelector('#res-ganhos');
const txtPrejuizos = document.querySelector('#res-prejuizos');
const txtAlertaStatus = document.querySelector('#res-alerta-status');

if (btnCalcular) {
    btnCalcular.addEventListener('click', () => {
        const cAlim = parseFloat(inputAlimentacao.value) || 0;
        const cEnerg = parseFloat(inputEnergia.value) || 0;
        const cMao = parseFloat(inputMaoObra.value) || 0;
        const pVenda = parseFloat(inputPrecoVenda.value) || 0;
        const qVenda = parseFloat(inputQuantidadeVenda.value) || 0;

        if (pVenda <= 0) {
            painelErro.textContent = "Erro: Insira um preço de venda unitário válido.";
            painelErro.className = "erro-visivel";
            painelResultados.className = "resultado-oculto";
            return;
        }

        painelErro.className = "erro-oculto";
        const custoTotal = cAlim + cEnerg + cMao;
        const faturamentoBruto = pVenda * qVenda;
        const saldoFinal = faturamentoBruto - custoTotal;
        const pontoEquilibrio = Math.ceil(custoTotal / pVenda);

        txtCustoTotal.textContent = `Custo Operacional Total: R$ ${custoTotal.toFixed(2).replace('.', ',')}`;
        txtFaturamento.textContent = `Faturamento Bruto Esperado: R$ ${faturamentoBruto.toFixed(2).replace('.', ',')}`;
        txtPontoEquilibrio.textContent = `Meta de Vendas Mínima: ${pontoEquilibrio} unidades.`;

        if (saldoFinal >= 0) {
            txtGanhos.textContent = `Ganhos Reais (Lucro Líquido): R$ ${saldoFinal.toFixed(2).replace('.', ',')}`;
            txtGanhos.style.display = "block";
            txtPrejuizos.style.display = "none";
            txtAlertaStatus.textContent = "Status: Produção Viável e Saudável!";
            txtAlertaStatus.className = "status-positivo";
        } else {
            txtPrejuizos.textContent = `Prejuízo Calculado: R$ ${Math.abs(saldoFinal).toFixed(2).replace('.', ',')}`;
            txtPrejuizos.style.display = "block";
            txtGanhos.style.display = "none";
            txtAlertaStatus.textContent = "Status: Alerta de Prejuízo! Avalie os custos na tabela CEASA ou reduza despesas.";
            txtAlertaStatus.className = "status-negativo";
        }

        painelResultados.className = "resultado-visivel";
    });
}

/* ==========================================================================
   5. VITRINE DE PRODUTOS COMPLETA
   ========================================================================== */
const listaInsumosTech = document.querySelector('#lista-insumos-tech');
const seletorRegiao = document.querySelector('#regiao-produtor');

const bancoInsumos = [
    { nome: "Defensivos Biológicos e Protetores de Cultivo", regiao: "sul", loja: "Distribuidora Agro Pinhais & RMC", endereco: "Marginal da BR-277 - Pinhais/PR", distancia: 12, desc: "Proteção contra pragas e doenças para lavouras." },
    { nome: "Adubo Organomineral de Alta Performance (50kg)", regiao: "sul", loja: "Agropecuária Central Contenda / Lapa", endereco: "Av. Gov. Moisés Lupion, 320 - Contenda/PR", distancia: 18, desc: "Fertilizante balanceado para nutrição do solo." },
    { nome: "Sementes de Milho Híbrido Tecnológico (Saca)", regiao: "campos-gerais", loja: "Cooperativa Foco Agrícola - Castro", endereco: "PR-340, Km 12 - Castro/PR", distancia: 140, desc: "Sementes certificadas de alta germinação." },
    { nome: "Suplemento de Nutrição Concentrado", regiao: "oeste", loja: "Agro Comercial Cascavel & Cooperativas", endereco: "Av. Brasil, 4500 - Cascavel/PR", distancia: 480, desc: "Nutrição e minerais essenciais para ganho de peso." }
];

function renderizarVitrine() {
    if (!listaInsumosTech) return;
    const filtro = seletorRegiao.value;
    listaInsumosTech.innerHTML = "";

    bancoInsumos.filter(i => filtro === "todos" || i.regiao === filtro).forEach(item => {
        listaInsumosTech.innerHTML += `
            <article class="card-insumo">
                <h4>📦 ${item.nome}</h4>
                <p>${item.desc}</p>
                <p class="status-positivo">✔ Disponível para Compra</p>
                <div class="container-loja">
                    <p><strong>🏬 Onde comprar:</strong> ${item.loja}</p>
                    <p><strong>📍 Endereço:</strong> ${item.endereco}</p>
                    <p><span class="badge-distancia">Aprox. ${item.distancia} km de você</span></p>
                </div>
            </article>
        `;
    });
}
if (seletorRegiao) seletorRegiao.addEventListener('change', renderizarVitrine);
renderizarVitrine();

/* ==========================================================================
   6. SIMULADOR DE QUALIDADE DE INSUMOS
   ========================================================================== */
const btnAnalisarInsumo = document.querySelector('#btn-analisar-insumo');
const inputNomeInsumo = document.querySelector('#nome-insumo-simulado');
const selectReputacao = document.querySelector('#reputacao-insumo');
const resultadoSimuladorInsumo = document.querySelector('#resultado-simulador-insumo');

if (btnAnalisarInsumo) {
    btnAnalisarInsumo.addEventListener('click', () => {
        const nome = inputNomeInsumo.value.trim();
        const nota = selectReputacao.value;
        const usuario = nomeDoProdutor || "Marcelo";

        if (nome === "" || nota === "") {
            resultadoSimuladorInsumo.innerHTML = "<p class='status-negativo'>Por favor, preencha o nome do insumo e escolha uma avaliação.</p>";
            resultadoSimuladorInsumo.className = "resultado-visivel";
            return;
        }

        let diagnostico = "";
        if (nota >= 4) {
            diagnostico = `Olá ${usuario}! A análise do <strong>${nome}</strong> indica excelente custo-benefício para investimento seguro no campo.`;
        } else {
            diagnostico = `Atenção ${usuario}, o produto <strong>${nome}</strong> possui ressalvas no mercado agrícola. Estude alternativas locais com a cooperativa.`;
        }

        resultadoSimuladorInsumo.innerHTML = `<div class="card-resultado"><p>${diagnostico}</p></div>`;
        resultadoSimuladorInsumo.className = "resultado-visivel";
    });
}

/* ==========================================================================
   7. AVALIAÇÃO SITE
   ========================================================================== */
const btnEnviaNotaSite = document.querySelector('#btn-enviar-nota-site');
const seletorNotaSite = document.querySelector('#nota-site');
const feedbackNotaSite = document.querySelector('#feedback-nota-site');

if (btnEnviaNotaSite) {
    btnEnviaNotaSite.addEventListener('click', () => {
        if (seletorNotaSite.value !== "") {
            feedbackNotaSite.innerHTML = "Obrigado por ajudar a aprimorar o PontoVerde!";
            feedbackNotaSite.className = "resultado-visivel status-positivo";
        }
    });
}
