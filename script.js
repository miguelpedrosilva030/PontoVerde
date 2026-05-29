/**
 * PROJETO: Calculadora de Viabilidade Agrinho 2026
 * ARQUIVO: script.js
 * FUNÇÃO: Controlar a lógica de cálculo de ponto de equilíbrio e validação estrita.
 */

// 1. CAPTURA DOS ELEMENTOS DA INTERFACE (DOM)
const formulario = document.querySelector('#form-calculadora');
const btnCalcular = document.querySelector('#btn-calcular');
const areaResultado = document.querySelector('#resultado-container');
const containerErro = document.querySelector('#mensagem-erro');

// 2. ESCUTADOR DE EVENTOS (EVENT LISTENER)
formulario.addEventListener('submit', function (evento) {
    // Impede o recarregamento padrão da página ao submeter o formulário
    evento.preventDefault(); 
    
    // Limpa mensagens de erro e resultados anteriores
    limparMensagens();

    // Captura e conversão dos valores dos inputs
    const custoFixoInput = document.querySelector('#custo-fixo').value;
    const custoVariavelInput = document.querySelector('#custo-variavel').value;
    const receitaEstimadaInput = document.querySelector('#receita-estimada').value;

    const custoFixo = parseFloat(custoFixoInput);
    const custoVariavel = parseFloat(custoVariavelInput);
    const receitaEstimada = parseFloat(receitaEstimadaInput);

    // 3. VALIDAÇÃO ESTRITA DE DADOS
    if (
        custoFixoInput.trim() === '' || 
        custoVariavelInput.trim() === '' || 
        receitaEstimadaInput.trim() === ''
    ) {
        exibirErro('Atenção: Todos os campos são obrigatórios. Por favor, preencha todos os valores.');
        return; // Interrompe a execução do código
    }

    if (isNaN(custoFixo) || isNaN(custoVariavel) || isNaN(receitaEstimada)) {
        exibirErro('Erro: Caracteres inválidos detectados. Digite apenas números nos campos de valores.');
        return;
    }

    if (custoFixo < 0 || custoVariavel < 0 || receitaEstimada < 0) {
        exibirErro('Operação Inválida: O campo de custos ou receitas não pode conter números negativos.');
        return;
    }

    // 4. PROCESSAMENTO DOS DADOS (REGRAS DE NEGÓCIO)
    const custoTotal = custoFixo + custoVariavel;
    const saldoFinal = receitaEstimada - custoTotal;
    
    let statusViabilidade = "";
    let classeStatus = "";

    if (saldoFinal > 0) {
        statusViabilidade = "Operação Lucrativa (Sustentável)";
        classeStatus = "status-positivo";
    } else if (saldoFinal === 0) {
        statusViabilidade = "Ponto de Equilíbrio Atingido (Sem lucro, sem prejuízo)";
        classeStatus = "status-neutro";
    } else {
        statusViabilidade = "Alerta de Viabilidade: Operação em Prejuízo";
        classeStatus = "status-negativo";
    }

    // 5. RENDERIZAÇÃO ELEGANTE NA TELA
    renderizarResultado(custoTotal, saldoFinal, statusViabilidade, classeStatus);
});

// FUNÇÃO AUXILIAR: Exibe erro amigável na tela do usuário
function exibirErro(mensagem) {
    containerErro.textContent = mensagem;
    containerErro.style.display = 'block';
    containerErro.setAttribute('aria-live', 'assertive'); // Acessibilidade
    areaResultado.style.display = 'none'; // Oculta resultados se houver erro
}

// FUNÇÃO AUXILIAR: Renderiza o HTML do resultado final de forma dinâmica
function renderizarResultado(custoTotal, saldoFinal, status, classe) {
    // Formatação de valores para a moeda Real (R$)
    const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    areaResultado.innerHTML = `
        <div class="card-resultado">
            <h3>Relatório de Viabilidade Econômica</h3>
            <p><strong>Custo Total de Produção:</strong> ${formatador.format(custoTotal)}</p>
            <p><strong>Saldo Final Estimado:</strong> ${formatador.format(saldoFinal)}</p>
            <div class="badge-status ${classe}">
                <strong>Diagnóstico:</strong> ${status}
            </div>
        </div>
    `;
    areaResultado.style.display = 'block';
}

// FUNÇÃO AUXILIAR: Reseta o estado visual das mensagens
function limparMensagens() {
    containerErro.style.display = 'none';
    containerErro.textContent = '';
    areaResultado.innerHTML = '';
    areaResultado.style.display = 'none';
}
