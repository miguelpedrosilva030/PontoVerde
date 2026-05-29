/* ==========================================================================
   1. CONTROLE DE ABAS (Alternância Dinâmica de Telas)
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
   2. BANCO DE DADOS LOCAL: FORNECE INSUMOS AGRÍCOLAS E PECUÁRIOS GERAIS
   ========================================================================== */
const listaInsumosTech = document.querySelector('#lista-insumos-tech');
const seletorRegiao = document.querySelector('#regiao-produtor');

const bancoInsumosELojas = [
    { 
        nome: "Defensivos Biológicos e Protetores de Cultivo", 
        regiao: "sul",
        loja: "Distribuidora e Soluções Agro Pinhais & RMC",
        endereco: "Marginal da BR-277, Km 4 - Pinhais (Região de Curitiba)/PR",
        distanciaSimulada: 12,
        descricao: "Proteção biológica integrada de alta eficiência técnica para lavouras e cultivos diversos.",
        statusInsumo: "Item Indispensável"
    },
    { 
        nome: "Adubo Organomineral de Alta Performance", 
        regiao: "sul",
        loja: "Agropecuária Central Contenda / Lapa",
        endereco: "Av. Governador Moisés Lupion, 320 - Contenda/PR",
        distanciaSimulada: 18,
        descricao: "Fertilizante balanceado focado na recuperação do solo e aumento de produtividade da região.",
        statusInsumo: "Excelente Custo-Benefício"
    },
    { 
        nome: "Painel Solar Fotovoltaico Agro RMC", 
        regiao: "sul",
        loja: "EletroAgro Soluções Sustentáveis Curitiba",
        endereco: "Av. das Torres, 4500 - São José dos Pinhais/PR",
        distanciaSimulada: 9,
        descricao: "Placas solares de alta eficiência para reduzir o custo de energia de galpões, bombas de irrigação e maquinários.",
        statusInsumo: "Retorno Financeiro Rápido"
    },
    { 
        nome: "Fertilizante Foliar Quelatado Premium", 
        regiao: "campos-gerais",
        loja: "Cooperativa Foco Agrícola - Unidade Castro",
        endereco: "PR-340, Km 12 - Castro/PR",
        distanciaSimulada: 140,
        descricao: "Nutrição vegetal de rápida absorção para ganho de vigor em lavouras e pastagens.",
        statusInsumo: "Alta Eficiência Certificada"
    },
    { 
        nome: "Suplemento de Nutrição Concentrado de Alta Qualidade", 
        regiao: "oeste",
        loja: "Agro Comercial Cascavel & Cooperativas",
        endereco: "Av. Brasil, 4500 - Cascavel/PR",
        distanciaSimulada: 480,
        descricao: "Composição enriquecida com minerais essenciais para máxima conversão e produtividade.",
        statusInsumo: "Alta Eficiência Certificada"
    }
];

function renderizarGuiaInsumos() {
    if (!listaInsumosTech || !seletorRegiao) return;
    
    const regiaoSelecionada = seletorRegiao.value;
    listaInsumosTech.innerHTML = "";

    const produtosFiltrados = bancoInsumosELojas.filter(item => {
        return regiaoSelecionada === "todos" || item.regiao === regiaoSelecionada;
    });

    if (produtosFiltrados.length === 0) {
        listaInsumosTech.innerHTML = `<p style="color:#777; font-style:italic;">Nenhum fornecedor cadastrado para esta região ainda.</p>`;
        return;
    }

    produtosFiltrados.forEach(item => {
        listaInsumosTech.innerHTML += `
            <article class="card-insumo">
                <h4>📦 ${item.nome}</h4>
                <p>${item.descricao}</p>
                <span class="tag-indicacao tag-bom">${item.statusInsumo}</span>
                
                <div class="container-loja">
                    <p><strong>🏬 Onde encontrar:</strong> ${item.loja}</p>
                    <p><strong>📍 Endereço:</strong> ${item.endereco}</p>
                    <p><span class="badge-distancia">Aprox. ${item.distanciaSimulada} km de você</span> • Fornecedor Técnico Homologado</p>
                </div>
            </article>
        `;
    });
}

seletorRegiao.addEventListener('change', renderizarGuiaInsumos);
renderizarGuiaInsumos();


/* ==========================================================================
   3. SIMULADOR DE AVALIAÇÃO DE PRODUTOS
   ========================================================================== */
const btnAvaliar = document.querySelector('#btn-avaliar');
const inputNomeProduto = document.querySelector('#nome-produto');
const inputNotaProduto = document.querySelector('#nota-produto');
const painelResultadoProduto = document.querySelector('#resultado-produto');

if (btnAvaliar) {
    btnAvaliar.addEventListener('click', () => {
        const nome = inputNomeProduto.value.trim();
        const nota = parseInt(inputNotaProduto.value);

        if (nome === "" || isNaN(nota) || nota < 0 || nota > 5) {
            painelResultadoProduto.innerHTML = `<p class="status-negativo">Erro: Digite o nome do produto e escolha uma nota válida de 0 a 5.</p>`;
            painelResultadoProduto.className = "resultado-visivel";
            return;
        }

        let veredito = "";
        let classeVeredito = "";

        if (nota >= 4) {
            veredito = `<strong>Análise Técnica do ${nome}:</strong> Alta Viabilidade! Insumos com essa classificação reduzem custos de produção no longo prazo e contam com bom histórico de distribuição técnica nas cooperativas do Paraná.`;
            classeVeredito = "tag-bom";
        } else {
            veredito = `<strong>Análise Técnica do ${nome}:</strong> Alerta de Risco! Avaliações baixas indicam que o insumo pode render menos, forçando você a gastar uma quantidade maior para atingir o mesmo resultado.`;
            classeVeredito = "tag-regular";
        }

        painelResultadoProduto.innerHTML = `
            <div class="card-resultado">
                <p>${veredito}</p>
                <span class="tag-indicacao ${classeVeredito}">Análise Concluída</span>
            </div>
        `;
        painelResultadoProduto.className = "resultado-visivel";
    });
}


/* ==========================================================================
   4. CÁLCULO DA CALCULADORA PRINCIPAL
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

        if (
            isNaN(custoAlimentacao) || custoAlimentacao < 0 || 
            isNaN(custoEnergia) || custoEnergia < 0 || 
            isNaN(custoMaoObra) || custoMaoObra < 0 || 
            isNaN(precoVendaUnitario) || precoVendaUnitario <= 0
        ) {
            painelErro.textContent = "Erro: Preencha todos os campos da calculadora com números válidos e positivos.";
            painelErro.className = "erro-visivel";
            painelResultados.className = "resultado-oculto";
            return;
        }

        painelErro.className = "erro-oculto";
        
        const custoOperacionalTotal = custoAlimentacao + custoEnergia + custoMaoObra;
        const pontoEquilibrioVolume = Math.ceil(custoOperacionalTotal / precoVendaUnitario);

        txtCustoTotal.textContent = `Custo Operacional Total: R$ ${custoOperacionalTotal.toFixed(2).replace('.', ',')}`;
        txtPontoEquilibrio.textContent = `Meta de Produção Mínima: ${pontoEquilibrioVolume.toLocaleString('pt-BR')} unidades para cobrir o custo.`;
        
        if (pontoEquilibrioVolume > 4000) {
            txtAlertaStatus.textContent = "Status: Custo Elevado! Procure os insumos recomendados na aba ao lado para economizar e reduzir despesas perto de você.";
            txtAlertaStatus.className = "status-negativo";
        } else {
            txtAlertaStatus.textContent = "Status: Margem Operacional Saudável. Projeção dentro das médias da ATeG.";
            txtAlertaStatus.className = "status-positivo";
        }
        
        painelResultados.className = "resultado-visivel";
    });
}
