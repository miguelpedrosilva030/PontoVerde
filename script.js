/* ==========================================================================
   1. ASSISTENTE PESSOAL INTELIGENTE (Bolinha Interativa)
   ========================================================================== */
const btnSalvarNome = document.querySelector('#btn-salvar-nome');
const inputNomeUsuario = document.querySelector('#nome-usuario');
const textoAssistente = document.querySelector('#texto-assistente');
const controleNome = document.querySelector('#controle-nome');

let nomeDoProdutor = "";

if (btnSalvarNome) {
    btnSalvarNome.addEventListener('click', () => {
        const nomeInformado = inputNomeUsuario.value.trim();
        if (nomeInformado === "") {
            textoAssistente.innerHTML = "Por favor, me diga seu nome para podermos conversar de forma personalizada!";
            return;
        }
        
        nomeDoProdutor = nomeInformado;
        // Transforma o diálogo tornando o assistente pessoal do produtor
        textoAssistente.innerHTML = `Prazer em conhecer você, **${nomeDoProdutor}**! 👋 Eu sou o seu assistente pessoal **PontoVerde**. Estou aqui para lhe ajudar a organizar as finanças e escolher os melhores insumos. Pode navegar pelas abas acima!`;
        controleNome.style.display = "none"; // Oculta os campos de input de nome
    });
}

/* ==========================================================================
   2. CONTROLE DE ABAS
   ========================================================================== */
const botoesAbas = document.querySelectorAll('.btn-aba');
const conteudosAbas = document.querySelectorAll('.conteudo-aba');

botoesAbas.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesAbas.forEach(b => b.classList.remove('ativa'));
        conteudosAbas.forEach(c => c.classList.remove('ativa'));
        
        botao.classList.add('ativa');
        const abaAlvo = botao.getAttribute('data-aba');
        document.querySelector(`#aba-${abaAlvo}`).classList.add('ativa');
    });
});

/* ==========================================================================
   3. EXPANSÃO DO BANCO DE DADOS DA VITRINE DE PRODUTOS PARA COMPRA
   ========================================================================== */
const listaInsumosTech = document.querySelector('#lista-insumos-tech');
const seletorRegiao = document.querySelector('#regiao-produtor');

const bancoInsumosELojas = [
    { 
        nome: "Defensivos Biológicos e Protetores de Cultivo", 
        regiao: "sul",
        loja: "Distribuidora e Soluções Agro Pinhais & RMC",
        endereco: "Marginal da BR-277, Km 4 - Pinhais/PR",
        distanciaSimulada: 12,
        descricao: "Proteção contra pragas e doenças para lavouras e cultivos diversos.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Adubo Organomineral de Alta Performance (Saca 50kg)", 
        regiao: "sul",
        loja: "Agropecuária Central Contenda / Lapa",
        endereco: "Av. Governador Moisés Lupion, 320 - Contenda/PR",
        distanciaSimulada: 18,
        descricao: "Fertilizante balanceado para nutrição do solo e aumento de produtividade da sua lavoura.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Calcário Agrícola Corretivo de Solo (Tonelada)", 
        regiao: "sul",
        loja: "Calcário Sul Paraná S/A",
        endereco: "Rodovia do Calcário, Km 10 - Almirante Tamandaré/PR",
        distanciaSimulada: 22,
        descricao: "Corretivo de acidez de solo de alta qualidade, essencial para o plantio na RMC.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Painel Solar Fotovoltaico Agro RMC", 
        regiao: "sul",
        loja: "EletroAgro Soluções Sustentáveis Curitiba",
        endereco: "Av. das Torres, 4500 - São José dos Pinhais/PR",
        distanciaSimulada: 9,
        descricao: "Reduza os custos de energia elétrica de galpões, bombas de irrigação ou maquinários.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Sementes de Milho Híbrido Tecnológico (Saca)", 
        regiao: "campos-gerais",
        loja: "Cooperativa Foco Agrícola - Unidade Castro",
        endereco: "PR-340, Km 12 - Castro/PR",
        distanciaSimulada: 140,
        descricao: "Sementes certificadas de alta germinação com resistência a pragas climáticas.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Suplemento de Nutrição Concentrado de Alta Qualidade", 
        regiao: "oeste",
        loja: "Agro Comercial Cascavel & Cooperativas",
        endereco: "Av. Brasil, 4500 - Cascavel/PR",
        distanciaSimulada: 480,
        descricao: "Nutrição e minerais essenciais para ganho de peso saudável e produtividade animal.",
        statusInsumo: "Disponível para Compra"
    }
];

function renderizarGuiaInsumos() {
    if (!listaInsumosTech || !seletorRegiao) return;
    
    const regiaoSelecionada = seletorRegiao.value;
    listaInsumosTech.innerHTML = "";

    const produtosFiltrados = bancoInsumosELojas.filter(item => {
        return regiaoSelecionada === "todos" || item.regiao === regiaoSelecionada;
    });

    produtosFiltrados.forEach(item => {
        listaInsumosTech.innerHTML += `
            <article class="card-insumo">
                <h4>📦 ${item.nome}</h4>
                <p>${item.descricao}</p>
                <span class="tag-indicacao tag-bom">${item.statusInsumo}</span>
                <div class="container-loja">
                    <p><strong>🏬 Onde comprar:</strong> ${item.loja}</p>
                    <p><strong>📍 Endereço:</strong> ${item.endereco}</p>
                    <p><span class="badge-distancia">Aprox. ${item.distanciaSimulada} km de você</span></p>
                </div>
            </article>
        `;
    });
}

seletorRegiao.addEventListener('change', renderizarGuiaInsumos);
renderizarGuiaInsumos();

/* ==========================================================================
   4. SIMULADOR DE QUALIDADE DE INSUMOS
   ========================================================================== */
const btnAvaliar = document.querySelector('#btn-avaliar');
const inputNomeProduto = document.querySelector('#nome-produto');
const inputNotaProduto = document.querySelector('#nota-produto');
const painelResultadoProduto = document.querySelector('#resultado-produto');

if (btnAvaliar) {
    btnAvaliar.addEventListener('click', () => {
        const nome = inputNomeProduto.value.trim();
        const notaSelecionada = inputNotaProduto.value;

        if (nome === "" || notaSelecionada === "") {
            painelResultadoProduto.innerHTML = `<p class="status-negativo">Erro: Informe o nome do produto e escolha uma alternativa.</p>`;
            painelResultadoProduto.className = "resultado-visivel";
            return;
        }

        const nota = parseInt(notaSelecionada);
        let veredito = "";
        let classeVeredito = "";
        const usuarioAtual = nomeDoProdutor ? nomeDoProdutor : "Produtor";

        if (nota === 5) {
            veredito = `<strong>Olá ${usuarioAtual}!</strong> A análise técnica do "${nome}" indica classificação Excelente! O investimento é altamente seguro, gera excelente conversão e evita o desperdício de recursos.`;
            classeVeredito = "tag-bom";
        } else if (nota === 4) {
            veredito = `<strong>Olá ${usuarioAtual}!</strong> A análise do "${nome}" indica classificação Boa. Produto confiável amplamente utilizado no Paraná, garantindo estabilidade financeira.`;
            classeVeredito = "tag-bom";
        } else if (nota === 3) {
            veredito = `<strong>Atenção ${usuarioAtual}!</strong> O item "${nome}" possui classificação Regular. Funciona, mas fique de olho no preço de compra para a margem não ficar apertada.`;
            classeVeredito = "tag-regular";
        } else {
            veredito = `<strong>Alerta ${usuarioAtual}!</strong> O item "${nome}" apresenta classificação de Baixo Retorno. Exige maior dosagem ou aplicação, o que eleva seus custos e prejudica o lucro.`;
            classeVeredito = "tag-regular";
        }

        painelResultadoProduto.innerHTML = `
            <div class="card-resultado">
                <p>${veredito}</p>
                <span class="tag-indicacao ${classeVeredito}">Simulação Concluída</span>
            </div>
        `;
        painelResultadoProduto.className = "resultado-visivel";
    });
}

/* ==========================================================================
   5. CÁLCULO DA CALCULADORA PRINCIPAL
   ========================================================================== */
const inputAlimentacao = document.querySelector('#alimentacao');
const inputEnergia = document.querySelector('#energia');
const inputMaoObra = document.querySelector('#mao-obra');
const inputPrecoVenda = document.querySelector('#preco-venda');
const btnCalcular = document.querySelector('#btn-calcular');
const painelResultados = document.querySelector('#resultado-calculo');
const painelErro = document.querySelector('#mensagem-erro');
const txtCustoTotal = document.querySelector('#res-custo-total');
const txtPontoEquilibrio = document.querySelector('#res-ponto-equilibrio');
const txtAlertaStatus = document.querySelector('#res-alerta-status');

if (btnCalcular) {
    btnCalcular.addEventListener('click', () => {
        const custoAlimentacao = parseFloat(inputAlimentacao.value);
        const custoEnergia = parseFloat(inputEnergia.value);
        const custoMaoObra = parseFloat(inputMaoObra.value);
        const precoVendaUnitario = parseFloat(inputPrecoVenda.value);

        if (isNaN(custoAlimentacao) || custoAlimentacao < 0 || isNaN(custoEnergia) || custoEnergia < 0 || isNaN(custoMaoObra) || custoMaoObra < 0 || isNaN(precoVendaUnitario) || precoVendaUnitario <= 0) {
            painelErro.textContent = "Erro: Preencha todos os campos corretamente.";
            painelErro.className = "erro-visivel";
            painelResultados.className = "resultado-oculto";
            return;
        }

        painelErro.className = "erro-oculto";
        const custoOperacionalTotal = custoAlimentacao + custoEnergia + custoMaoObra;
        const pontoEquilibrioVolume = Math.ceil(custoOperacionalTotal / precoVendaUnitario);
        const usuarioAtual = nomeDoProdutor ? nomeDoProdutor : "Produtor";

        txtCustoTotal.textContent = `Custo Operacional Total: R$ ${custoOperacionalTotal.toFixed(2).replace('.', ',')}`;
        txtPontoEquilibrio.textContent = `Meta de Vendas Mínima: ${pontoEquilibrioVolume.toLocaleString('pt-BR')} unidades para cobrir o custo.`;
        
        if (pontoEquilibrioVolume > 4000) {
            txtAlertaStatus.textContent = `${usuarioAtual}, a meta para cobrir despesas está elevada. Verifique os fornecedores locais na aba ao lado para reduzir custos com frete.`;
            txtAlertaStatus.className = "status-negativo";
        } else {
            txtAlertaStatus.textContent = `Parabéns ${usuarioAtual}! Seus custos estão equilibrados e a propriedade apresenta excelente projeção de retorno financeiro.`;
            txtAlertaStatus.className = "status-positivo";
        }
        
        painelResultados.className = "resultado-visivel";
    });
}

/* ==========================================================================
   6. AVALIAÇÃO DA PLATAFORMA (0 A 10 ESTRELAS)
   ========================================================================== */
const btnEnviarNotaSite = document.querySelector('#btn-enviar-nota-site');
const seletorNotaSite = document.querySelector('#nota-site');
const feedbackNotaSite = document.querySelector('#feedback-nota-site');

if (btnEnviarNotaSite) {
    btnEnviarNotaSite.addEventListener('click', () => {
        const nota = seletorNotaSite.value;
        if (nota === "") {
            feedbackNotaSite.innerHTML = "Por favor, selecione uma nota antes de enviar.";
            feedbackNotaSite.style.color = "var(--cor-erro)";
            feedbackNotaSite.className = "resultado-visivel";
            return;
        }

        const usuarioAtual = nomeDoProdutor ? nomeDoProdutor : "Produtor";
        feedbackNotaSite.style.color = "var(--cor-sucesso)";
        feedbackNotaSite.innerHTML = `Obrigado pelo feedback, ${usuarioAtual}! Você avaliou o PontoVerde com nota ${nota}/10. Isso nos ajuda muito no Concurso Agrinho! 🌾✨`;
        feedbackNotaSite.className = "resultado-visivel";
    });
}
