const API_BASE_URL = 'http://localhost:5000';
        let token = localStorage.getItem('apiToken') || '';

        window.addEventListener('DOMContentLoaded', () => {
            if (token) {
                document.getElementById('apiToken').value = token;
            }
            carregarAlunos();
        });

        function salvarToken() {
            const novoToken = document.getElementById('apiToken').value.trim();
            if (!novoToken) {
                mostrarAlertaEmElemento('❌ Digite um token válido', 'error', 'tokenAlert');
                return;
            }
            token = novoToken;
            localStorage.setItem('apiToken', token);
            alert('✅ Token salvo com sucesso!\n\nVocê pode agora usar a API.');
        }

        function getHeaders() {
            return {
                'Content-Type': 'application/json',
                'x-internal-token': token
            };
        }

        async function criarAluno(e) {
            e.preventDefault();
            
            if (!token) {
                mostrarAlertaEmElemento('❌ Defina um token primeiro!', 'error', 'alunoAlert');
                return;
            }

            const dados = {
                nome: document.getElementById('nomeAluno').value,
                peso: parseFloat(document.getElementById('pesoAluno').value),
                altura: parseFloat(document.getElementById('alturaAluno').value),
                plano_id: parseInt(document.getElementById('planoAluno').value)
            };

            try {
                const response = await fetch(`${API_BASE_URL}/alunos`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(dados)
                });

                const resultado = await response.json();

                if (response.ok) {

                    mostrarAlertaEmElemento(
                        '✅ ' + resultado.mensagem,
                        'success',
                        'alunoAlert'
                    );

                    document.querySelector('form').reset();
                    carregarAlunos();

                } else if (response.status === 401) {

                    mostrarAlertaEmElemento(
                        '❌ Erro 401 — Token inválido',
                        'error',
                        'alunoAlert'
                    );

                } else {

                    mostrarAlertaEmElemento(
                        '❌ ' + (resultado.erro || 'Erro ao cadastrar'),
                        'error',
                        'alunoAlert'
                    );

                }
            } catch (erro) {
                mostrarAlertaEmElemento('❌ Erro de conexão com a API', 'error', 'alunoAlert');
            }
        }

        async function carregarAlunos() {
            const container = document.getElementById('listaAlunos');
            
            if (!token) {
                container.innerHTML = '<div class="empty-state">🔒 Configure o token para carregar os alunos</div>';
                return;
            }

            container.innerHTML = '<div class="empty-state"><div class="loading"></div><p>Carregando...</p></div>';

            try {
                const response = await fetch(`${API_BASE_URL}/alunos`, {
                    headers: getHeaders()
                });

                const alunos = await response.json();

                if (response.ok && alunos.length > 0) {
                    container.innerHTML = '';
                    alunos.forEach(aluno => {
                        const div = document.createElement('div');
                        div.className = 'student-item';
                        
                        const classeIMC = obterClasseIMC(aluno.categoria_imc);
                        const categoria = aluno.categoria_imc;

                        div.innerHTML = `
                            <h4>📍 ${aluno.nome}</h4>
                            <div class="student-info">
                                <div class="info-field">
                                    <span class="info-label">ID</span>
                                    <span class="info-value">#${aluno.id}</span>
                                </div>
                                <div class="info-field">
                                    <span class="info-label">Peso</span>
                                    <span class="info-value">${aluno.peso} kg</span>
                                </div>
                                <div class="info-field">
                                    <span class="info-label">Altura</span>
                                    <span class="info-value">${aluno.altura} m</span>
                                </div>
                                <div class="info-field">
                                    <span class="info-label">Plano</span>
                                    <span class="info-value">${aluno.plano_id === 1 ? '📅 Mensal R$99,99' : '📆 Anual R$ 129,99'}</span>
                                </div>
                            </div>
                            <span class="imc-badge ${classeIMC}">IMC: ${aluno.imc} - ${categoria}</span>
                            <div class="student-actions">
                                <button onclick="document.getElementById('alunoIdIMC').value = ${aluno.id}; calcularIMC();">Ver IMC</button>
                                <button class="btn-secondary" onclick="document.getElementById('alunoIdPlano').value = ${aluno.id};">Plano</button>
                                <button class="btn-delete" onclick="if(confirm('Deletar ${aluno.nome}?')) { document.getElementById('alunoIdDelete').value = ${aluno.id}; deletarAluno(); }">Deletar</button>
                            </div>
                        `;
                        container.appendChild(div);
                    });
                } else if (response.ok) {
                    container.innerHTML = '<div class="empty-state">📋 Nenhum aluno cadastrado ainda</div>';
                } else {
                    container.innerHTML = '<div class="empty-state alert alert-error">❌ Erro ao carregar alunos</div>';
                }
            } catch (erro) {
                container.innerHTML = '<div class="empty-state alert alert-error">❌ Erro de conexão</div>';
            }
        }

        async function calcularIMC() {
            const alunoId = document.getElementById('alunoIdIMC').value;
            
            if (!alunoId) {
                mostrarAlertaEmElemento('❌ Digite o ID do aluno', 'error', 'imcResultado');
                return;
            }

            if (!token) {
                mostrarAlertaEmElemento('❌ Defina um token primeiro!', 'error', 'imcResultado');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/alunos/${alunoId}/imc`, {
                    headers: getHeaders()
                });

                const resultado = await response.json();
                const container = document.getElementById('imcResultado');

                if (response.ok) {
                    const classeIMC = obterClasseIMC(resultado.categoria);
                    container.innerHTML = `
                        <div class="imc-badge ${classeIMC}">
                            <strong>IMC: ${resultado.imc}</strong><br>
                            ${resultado.categoria}
                        </div>
                    `;
                } else {
                    mostrarAlertaEmElemento('❌ ' + resultado.erro, 'error', 'imcResultado');
                }
            } catch (erro) {
                mostrarAlertaEmElemento('❌ Erro ao calcular IMC', 'error', 'imcResultado');
            }
        }

        async function carregarFaturamento() {
            if (!token) {
                mostrarAlertaEmElemento('❌ Defina um token primeiro!', 'error', 'faturamentoResultado');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/faturamento`, {
                    headers: getHeaders()
                });

                const resultado = await response.json();
                const container = document.getElementById('faturamentoResultado');

                if (response.ok) {
                    const valor = new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(resultado.faturamento_total);

                    container.innerHTML = `
                        <div class="stat-box">
                            <h3>${valor}</h3>
                            <p>Faturamento Mensal Total</p>
                        </div>
                    `;
                } else {
                    mostrarAlertaEmElemento('❌ ' + resultado.erro, 'error', 'faturamentoResultado');
                }
            } catch (erro) {
                mostrarAlertaEmElemento('❌ Erro ao carregar faturamento', 'error', 'faturamentoResultado');
            }
        }

        async function trocarPlano() {
            const alunoId = document.getElementById('alunoIdPlano').value;
            const novoPlano = document.getElementById('novoPlano').value;

            if (!alunoId || !novoPlano) {
                mostrarAlertaEmElemento('❌ Preencha todos os campos', 'error', 'planoAlert');
                return;
            }

            if (!token) {
                mostrarAlertaEmElemento('❌ Defina um token primeiro!', 'error', 'planoAlert');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/alunos/${alunoId}/trocar_plano`, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify({ plano_id: parseInt(novoPlano) })
                });

                const resultado = await response.json();

                if (response.ok) {
                    mostrarAlertaEmElemento('✅ ' + resultado.mensagem, 'success', 'planoAlert');
                    document.getElementById('alunoIdPlano').value = '';
                    document.getElementById('novoPlano').value = '';
                    carregarAlunos();
                } else {
                    mostrarAlertaEmElemento('❌ ' + resultado.erro, 'error', 'planoAlert');
                }
            } catch (erro) {
                mostrarAlertaEmElemento('❌ Erro ao trocar plano', 'error', 'planoAlert');
            }
        }

        async function deletarAluno() {
            const alunoId = document.getElementById('alunoIdDelete').value;

            if (!alunoId) {
                mostrarAlertaEmElemento('❌ Digite o ID do aluno', 'error', 'deleteAlert');
                return;
            }

            if (!token) {
                mostrarAlertaEmElemento('❌ Defina um token primeiro!', 'error', 'deleteAlert');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/alunos/${alunoId}`, {
                    method: 'DELETE',
                    headers: getHeaders()
                });

                const resultado = await response.json();

                if (response.ok) {
                    mostrarAlertaEmElemento('✅ ' + resultado.mensagem, 'success', 'deleteAlert');
                    document.getElementById('alunoIdDelete').value = '';
                    carregarAlunos();
                } else {
                    mostrarAlertaEmElemento('❌ ' + resultado.erro, 'error', 'deleteAlert');
                }
            } catch (erro) {
                mostrarAlertaEmElemento('❌ Erro ao deletar aluno', 'error', 'deleteAlert');
            }
        }

        function obterClasseIMC(categoria) {
            switch(categoria) {
                case 'Peso ideal': return 'imc-normal';
                case 'Sobrepeso': return 'imc-overweight';
                case 'Obesidade': return 'imc-obesity';
                case 'Abaixo do peso': return 'imc-underweight';
                default: return 'imc-normal';
            }
        }

        function mostrarAlertaEmElemento(mensagem, tipo, elementoId) {
            const elemento = document.getElementById(elementoId);
            elemento.innerHTML = `<div class="alert alert-${tipo}">${mensagem}</div>`;
            setTimeout(() => {
                elemento.innerHTML = '';
            }, 5000);
        }