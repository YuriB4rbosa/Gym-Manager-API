<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Gym Manager API</title>
    
</head>
<body>

<h1>🏋️‍♂️ Gym Manager API</h1>

<p>
API para gerenciamento de academias, focada em controle de alunos,
autenticação de rotas e organização modular do backend.
</p>

<div class="card">
<h2>📁 Estrutura do Projeto</h2>

<pre>
gym-manager/
│
├ auth/
├ controllers/
├ templates/
├ static/
├ db.py
├ database.db
├ utils.py
├ app.py
├ .env.example
├ requirements.txt
</pre>
</div>

<div class="card">
<h2>🚀 Tecnologias</h2>
<ul>
<li>Python</li>
<li>Flask</li>
<li>SQLite</li>
<li>Virtualenv</li>
<li>HTML / CSS / JS</li>
</ul>
</div>

<div class="card">
<h2>🛠️ Instalação</h2>

<h3>Clonar projeto</h3>
<pre>
git clone https://github.com/seu-usuario/gym-manager.git
cd gym-manager
</pre>

<h3>Criar ambiente virtual</h3>
<pre>
python -m venv venv
</pre>

<h3>Ativar</h3>
<pre>
Windows:
.\venv\Scripts\activate

Linux/Mac:
source venv/bin/activate
</pre>

<h3>Instalar dependências</h3>
<pre>
pip install -r requirements.txt
</pre>

<h3>Rodar aplicação</h3>
<pre>
python app.py
</pre>
</div>

<div class="card">
<h2>🔐 Autenticação</h2>

<p>Enviar no header:</p>

<pre>
x-internal-token: SEU_TOKEN
</pre>
</div>

<div class="card">
<h2>📊 Funcionalidades</h2>
<ul>
<li>Cadastro de alunos</li>
<li>Cálculo automático de IMC</li>
<li>Troca de plano</li>
<li>Faturamento total</li>
<li>Deletar alunos</li>
<li>Rotas protegidas</li>
</ul>
</div>

<div class="card">
<h2>📄 Requisitos</h2>
<p>Veja o arquivo <code>requirements.md</code></p>
</div>

<div class="card">
<h2>⚠️ Observações</h2>
<ul>
<li>database.db é só para desenvolvimento</li>
<li>Não subir .env real para o GitHub</li>
</ul>
</div>

<div class="card">
<h2>👨‍💻 Equipe</h2>

<p>
Fernanda<br>
<a href="https://www.linkedin.com/in/fernanda-teicheira-aa1858201/" target="_blank">
LinkedIn
</a>
</p>

<p>
Gabriel<br>
gabrielrod039@gmail.com
</p>

<p>
Marcos<br>
vmarcos2007@gmail.com
</p>

</div>

</body>
</html>
