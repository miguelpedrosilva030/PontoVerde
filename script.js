/* ==========================================================================
   1. CONTROLE DE ANIMAÇÃO DA TELA DE ABERTURA E FOCO DO ASSISTENTE
   ========================================================================== */
const telaEntrada = document.querySelector('#tela-entrada');
const btnEntrarSite = document.querySelector('#btn-entrar-site');
const containerAssistente = document.querySelector('#container-assistente');
const textoAssistente = document.querySelector('#texto-assistente');

if (btnEntrarSite && telaEntrada) {
    btnEntrarSite.addEventListener('click', () => {
        // 1. Esconde a splash screen com o trator
        telaEntrada.classList.add('ocultar');
        
        // 2. Animação: O assistente vai automaticamente para o centro da tela ganhar o foco
        if (containerAssistente) {
            containerAssistente.classList.add('centro-foco');
        }
        
        // 3. Modifica a fala inicial do assistente chamando a atenção
        textoAssistente.innerHTML = "Olá, produtor! Seja bem-vindo à nossa propriedade digital. Para que eu possa te atender de forma personalizada, digite o seu nome abaixo para começarmos:";
    });
}

/* ==========================================================================
   2. ASSISTENTE PESSOAL - SALVAR NOME, RETORNAR POSIÇÃO E AJUDA AUTOMÁTICA
   ========================================================================== */
const btnSalvarNome = document.querySelector('#btn-salvar-nome');
const inputNomeUsuario = document.querySelector('#nome-usuario');
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
            textoAssistente.innerHTML = "Por favor, digite seu nome antes de prosseguirmos!";
            return;
        }
        
        nomeDoProdutor = nomeInformado;
        
        // Assistente fala o nome do produtor e pergunta se ele quer ajuda
        textoAssistente.innerHTML = "Registro feito com sucesso, " + nomeDoProdutor + "! Agora, você precisa da minha ajuda para gerenciar sua propriedade hoje? Se quiser ver o que o site oferece, basta clicar em mim aqui no cantinho inferior!";
        
        // 4. Animação: O assistente volta automaticamente para o seu canto original (remove a classe de foco)
        if (containerAssistente) {
            containerAssistente.classList.remove('centro-foco');
        }

        // Esconde os campos de nome e exibe as dúvidas
        controleNome.style.display = "none"; 
        controleDuvidas.style.display = "block";
    });
}

// Resposta automática com tudo o que o site tem a oferecer para consumo e compra ideal
function gerarTextoApresentacaoCompleta() {
    return "Olá " + (nomeDoProdutor || "produtor") + "! O PontoVerde foi feito para te dar total controle de mercado. Aqui você encontra: <br><br>" +
           "<strong>1. Calculadora de Viabilidade:</strong> Descubra a meta exata de vendas para cobrir as contas da fazenda.<br>" +
           "<strong>2. Guia de Insumos:</strong> Encontre as cooperativas e lojas mais próximas da sua região no Paraná para poupar no frete.<br>" +
           "<strong>3. Simulador de Produtos:</strong> Escolha a alternativa ideal para consumo com preço acessível e descubra o diagnóstico técnico antes de comprar.";
}

// Evento ao clicar no avatar do assistente "PontoVerde"
if (avatarPonto) {
    avatarPonto.addEventListener('click', () => {
        resetarEstadoLeitura();
        textoAssistente.innerHTML = gerarTextoApresentacaoCompleta();
        aguardandoLeitura = true;
        btnAvancarLeitura.style.display = "block";
    });
}

function buscarRespostaAgro(pergunta) {
    const texto = pergunta.toLowerCase();

    if (texto.includes("ponto de equilibrio") || texto.includes("equilibrio") || texto.includes("meta")) {
        return "O ponto de equilíbrio é a meta mínima que sua propriedade precisa vender para pagar todos os custos operacionais. Tudo o que você vender acima desse valor vira lucro limpo. Use a nossa calculadora na aba ao lado para descobrir o seu valor.";
    }
    if (texto.includes("custo") || texto.includes("gasto") || texto.includes("caro") || texto.includes("economizar")) {
        return "No campo, existem os custos fixos e flutuantes (como sementes, adubo e diesel). Uma ótima forma de economizar é comprar insumos em cooperativas locais da sua região para diminuir o frete. Veja nossa aba Guia de Fornecedores para encontrar opções parceiras.";
    }
    if (texto.includes("senar") || texto.includes("ateg") || texto.includes("ajuda") || texto.includes("curso")) {
        return "O SENAR do Paraná tem o programa ATeG (Assistência Técnica e Gerencial). Eles enviam um técnico especializado de forma gratuita até a sua propriedade para acompanhar a sua produção todo mês e te ajudar a lucrar mais. Entre em contato com o Sindicato Rural da sua cidade.";
    }
    if (texto.includes("adubo") || texto.includes("fertilizante") || texto.includes("calcario")) {
        return "A nutrição do solo é fundamental. Antes de comprar adubo, faça uma análise de solo para saber o que a terra precisa. Usar calcário para corrigir a acidez costuma ser o primeiro passo barato para fazer a plantação render mais.";
    }
    if (texto.includes("ajuda") || texto.includes("tudo") || texto.includes("site") || texto.includes("oferece")) {
        return gerarTextoApresentacaoCompleta();
    }

    return "Entendi a sua dúvida! No setor agropecuário, cada detalhe importa para o lucro. Recomendo usar a nossa Calculadora de Viabilidade para checar seus números ou olhar nosso Guia de Insumos para simular as melhores opções.";
}

if (btnPerguntar) {
    btnPerguntar.addEventListener('click', () => {
        const pergunta = campoPergunta.value.trim();
        if (pergunta === "") return;

        resetarEstadoLeitura();
        textoAssistente.className = "pensando";
        textoAssistente.innerHTML = "Analisando dados agrícolas...";
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
        textoAssistente.innerHTML = "Estou pronto para ajudar, " + (nomeDoProdutor || "amigo") + ". Pode mandar sua próxima dúvida!";
        resetarEstadoLeitura();
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
   4. VITRINE DE PRODUTOS E LOCALIDADES (BANCO DE DADOS LOCAL)
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
        descricao: "Fertilizante balanceado para nutrição do solo e aumento de produtividade.",
        statusInsumo: "Disponível para Compra"
    },
    { 
        nome: "Sementes de Milho Híbrido Tecnológico (Saca)", 
        regiao: "campos-gerais",
        loja: "Cooperativa Foco Agrícola - Unidade Castro",
        endereco: "PR-340, Km 12 - Castro/PR",
        distanciaSimulada: 140,
        descricao: "Sementes certificadas de alta germinação com resistência climática.",
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
   5. SIMULADOR DE QUALIDADE DE INSUMOS
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
            veredito = "Olá " + usuarioAtual + "! A análise do " + nome + " indica classificação Excelente! O investimento é altamente seguro e evita o desperdício.";
            classeVeredito = "tag-bom";
        } else if (nota === 4) {
            veredito = "Olá " + usuarioAtual + "! A análise do " + nome + " indica classificação Boa. Produto confiável amplamente utilizado no Paraná.";
            classeVeredito = "tag-bom";
        } else {
            veredito = "Atenção " + usuarioAtual + "! O item " + nome + " exige maior cautela no preço ou na dosagem para não comprometer sua rentabilidade.";
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
   6. LÓGICA DE CÁLCULO DA CALCULADORA DE PRODUTIVIDADE
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
            txtAlertaStatus.textContent = "Status: Production Viável e Saudável! Retorno financeiro positivo projetado, " + usuarioAtual + ".";
            txtAlertaStatus.className = "status-positivo";
        }
        
        painelResultados.className = "resultado-visivel";
    });
}

/* ==========================================================================
   7. AVALIAÇÃO DA PLATAFORMA (0 A 10)
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
        feedbackNotaSite.innerHTML = "Obrigado pelo feedback, " + usuarioAtual + "! Você avaliou o PontoVerde com nota " + nota + "/10. Isso ajuda muito nosso projeto!";
        feedbackNotaSite.className = "resultado-visivel";
    });
}
