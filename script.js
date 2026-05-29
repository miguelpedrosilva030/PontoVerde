/* ==========================================================================
   1. CONTROLE DA TELA DE ABERTURA E MÚSICA DE FUNDO
   ========================================================================== */
const telaEntrada = document.querySelector('#tela-entrada');
const btnEntrarSite = document.querySelector('#btn-entrar-site');
const audioFundo = document.querySelector('#musica-fundo');

if (btnEntrarSite && telaEntrada && audioFundo) {
    btnEntrarSite.addEventListener('click', () => {
        // 1. Oculta a Splash Screen com efeito suave
        telaEntrada.classList.add('ocultar');
        
        // 2. Toca a música "Café Coado" local como som de fundo controlado
        audioFundo.volume = 0.4; 
        audioFundo.play().catch(error => {
            console.log("O áudio precisou de interação inicial:", error);
        });
    });
}

/* ==========================================================================
   2. ASSISTENTE PESSOAL INTERATIVO (CHAT AGRÍCOLA & TEMPO DE LEITURA)
   ========================================================================== */
const btnSalvarNome = document.querySelector('#btn-salvar-nome');
const inputNomeUsuario = document.querySelector('#nome-usuario');
const textoAssistente = document.querySelector('#texto-assistente');
const controleNome = document.querySelector('#controle-nome');
const controleDuvidas = document.querySelector('#controle-duvidas');
const btnPerguntar = document.querySelector('#btn-perguntar');
const campoPergunta = document.querySelector('#campo-pergunta');
const btnAvancarLeitura = document.querySelector('#btn-avancar-leitura');
const avatarPonto = document.querySelector('#avatar-ponto');

let nomeDoProdutor = "";
let aguardandoLeitura = false;

if (btnSalvarNome) {
    btnSalvarNome.addEventListener('click', () => {
        const nomeInformado = inputNomeUsuario.value.trim();
        if (nomeInformado === "") {
            textoAssistente.innerHTML = "Por favor, digite seu nome para começarmos.";
            return;
        }
        
        nomeDoProdutor = nomeInformado;
        // Texto livre de marcações ou asteriscos para leitura fácil
        textoAssistente.innerHTML = "Prazer em conhecer você, " + nomeDoProdutor + "! Eu sou o seu assistente PontoVerde. Estou pronto para conversar sobre plantio, colheita, gado, mercado paranaense e custos de produção. O que você quer saber hoje?";
        
        controleNome.style.display = "none"; 
        controleDuvidas.style.display = "block";
    });
}

function buscarRespostaAgro(pergunta) {
    const texto = pergunta.toLowerCase();

    if (texto.includes("ponto de equilibrio") || texto.includes("equilibrio") || texto.includes("meta")) {
        return "O ponto de equilíbrio é a meta mínima que sua propriedade precisa vender para empatar o jogo, ou seja, pagar todos os custos operacionais. Tudo o que você vender acima desse valor vira lucro limpo. Use a nossa calculadora na aba ao lado para descobrir o seu valor exato.";
    }
    if (texto.includes("custo") || texto.includes("gasto") || texto.includes("caro") || texto.includes("economizar")) {
        return "No campo, existem os custos fixos (como terra e impostos) e flutuantes (como sementes, adubo e diesel). Uma ótima forma de economizar é comprar insumos em cooperativas locais da sua região para diminuir o frete. Dê uma olhada na nossa aba Guia de Fornecedores para ver opções de mercado parceiras.";
    }
    if (texto.includes("senar") || texto.includes("ateg") || texto.includes("ajuda") || texto.includes("assistencia") || texto.includes("curso")) {
        return "O SENAR do Paraná tem o programa ATeG, que significa Assistência Técnico-Gerencial. Eles enviam um técnico especializado de forma gratuita até a sua propriedade para acompanhar a sua produção todo mês e te ajudar a lucrar mais. Vale a pena entrar em contato com o Sindicato Rural da sua cidade.";
    }
    if (texto.includes("adubo") || texto.includes("fertilizante") || texto.includes("calcario") || texto.includes("solo")) {
        return "A nutrição do solo é a base de tudo. Antes de comprar adubo, faça uma análise de solo para saber exatamente o que a terra precisa. Usar calcário para corrigir a acidez costuma ser o primeiro passo barato e eficiente para fazer qualquer plantação render mais.";
    }
    if (texto.includes("safra") || texto.includes("clima") || texto.includes("chuva") || texto.includes("tempo")) {
        return "Fique sempre atento ao calendário oficial de plantio do Paraná e ao zoneamento climático. Planejar a época certa evita que você perca insumos caros com secas ou geadas repentinas.";
    }
    if (texto.includes("obrigado") || texto.includes("valeu") || texto.includes("obrigada")) {
        return "De nada, " + (nomeDoProdutor || "companheiro") + "! Minha missão é ajudar quem trabalha na terra. Se tiver mais dúvidas sobre lavoura, criação ou contas, estarei por aqui.";
    }

    return "Entendi a sua dúvida! No setor agropecuário, cada detalhe importa para a sua margem de lucro. Recomendo usar a nossa Calculadora de Viabilidade para checar a saúde dos seus números e olhar nosso Guia de Insumos para simular as melhores compras.";
}

if (btnPerguntar) {
    btnPerguntar.addEventListener('click', () => {
        const pergunta = campoPergunta.value.trim();
        if (pergunta === "") return;

        resetarEstadoLeitura();
        textoAssistente.className = "pensando";
        textoAssistente.innerHTML = "Processando dados agrícolas, aguarde...";
        campoPergunta.value = "";

        setTimeout(() => {
            textoAssistente.className = "";
            textoAssistente.innerHTML = buscarRespostaAgro(pergunta);
            aguardandoLeitura = true;
            btnAvancarLeitura.style.display = "block";
        }, 1200);
    });
}

function resetarEstadoLeitura() {
    aguardandoLeitura = false;
    btnAvancarLeitura.style.display = "none";
}

if (btnAvancarLeitura) {
    btnAvancarLeitura.addEventListener('click', () => {
        textoAssistente.innerHTML = "Estou pronto para a próxima pergunta, " + (nomeDoProdutor || "amigo") + ". Do que você precisa agora?";
        resetarEstadoLeitura();
    });
}

if (avatarPonto) {
    avatarPonto.addEventListener('click', () => {
        if (aguardandoLeitura) {
            textoAssistente.innerHTML = "Perfeito! Pode mandar a sua próxima dúvida.";
            resetarEstadoLeitura();
        } else {
            textoAssistente.innerHTML = "Estou ouvindo! Digite sua pergunta na caixinha para conversarmos.";
        }
    });
}

/* ==========================================================================
   3. CONTROLE DE ABAS (Navegação Interna)
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
   4. VITRINE DE PRODUTOS EXPANDIDA (Banco de Dados Local)
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
   5. SIMULADOR DE QUALIDADE DE INSUMOS DOS USUÁRIOS
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
            veredito = "Olá " + usuarioAtual + "! A análise técnica do " + nome + " indica classificação Excelente! O investimento é altamente seguro, gera excelente conversão e evita o desperdício de recursos.";
            classeVeredito = "tag-bom";
        } else if (nota === 4) {
            veredito = "Olá " + usuarioAtual + "! A análise do " + nome + " indica classificação Boa. Produto confiável amplamente utilizado no Paraná, garantindo estabilidade financeira.";
            classeVeredito = "tag-bom";
        } else if (nota === 3) {
            veredito = "Atenção " + usuarioAtual + "! O item " + nome + " possui classificação Regular. Funciona, mas fique de olho no preço de compra para a margem não ficar apertada.";
            classeVeredito = "tag-regular";
        } else {
            veredito = "Alerta " + usuarioAtual + "! O item " + nome + " apresenta classificação de Baixo Retorno. Exige maior dosagem ou aplicação, o que eleva seus custos e prejudica o lucro.";
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
   6. CÁLCULO DA CALCULADORA PRINCIPAL
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
            txtAlertaStatus.textContent = usuarioAtual + ", a meta para cobrir despesas está elevada. Verifique os fornecedores locais na aba ao lado para reduzir custos com frete.";
            txtAlertaStatus.className = "status-negativo";
        } else {
            txtAlertaStatus.textContent = "Status: Produção Viável e Saudável! Seus custos estão equilibrados e a propriedade apresenta excelente projeção de retorno financeiro, " + usuarioAtual + ".";
            txtAlertaStatus.className = "status-positivo";
        }
        
        painelResultados.className = "resultado-visivel";
    });
}

/* ==========================================================================
   7. AVALIAÇÃO DA PLATAFORMA (0 A 10 ESTRELAS)
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
        feedbackNotaSite.innerHTML = "Obrigado pelo feedback, " + usuarioAtual + "! Você avaliou o PontoVerde com nota " + nota + "/10. Isso nos ajuda muito no Concurso Agrinho!";
        feedbackNotaSite.className = "resultado-visivel";
    });
}
