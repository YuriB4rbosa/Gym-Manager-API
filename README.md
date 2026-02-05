🏋️‍♂️ Gym Manager API
Uma API robusta para gerenciamento de academias, focada em controle de acessos, rotas autenticadas e gestão de dados. Este projeto utiliza uma arquitetura organizada para separar responsabilidades de autenticação, lógica de rotas e utilitários.



📁 Estrutura do Projeto
Abaixo está uma visão geral dos principais componentes do sistema:

auth/: Contém a lógica de segurança e o auth_decorator.py, responsável por proteger as rotas da aplicação.

controllers/: Onde reside o routes.py, gerenciando os endpoints e a orquestração das requisições.

db.py & database.db: Configuração e persistência de dados (SQLite).

app.py: Ponto de entrada (entry point) da aplicação.

utils.py: Funções auxiliares para reaproveitamento de código.

index.html: Interface frontal ou página de documentação da API.

🚀 Tecnologias Utilizadas
Python: Linguagem principal.

SQLite: Banco de dados relacional leve.

Flask

Virtualenv: Gerenciamento de ambiente isolado.

🛠️ Como Instalar e Rodar
Clone o repositório:

Bash
git clone https://github.com/seu-usuario/gym-manager.git
cd gym-manager
Configure o ambiente virtual:

Bash
# Criar o venv
python -m venv venv

# Ativar o venv (Windows)
.\venv\Scripts\activate

# Ativar o venv (Linux/Mac)
source venv/bin/activate
Instale as dependências:

Bash
pip install -r requirements.txt
Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto (use o .env existente como base) e adicione suas chaves secretas e configurações de banco de dados.

Inicie a aplicação:

Bash
python app.py
🔐 Autenticação
A API utiliza um sistema de decoradores para proteção de rotas. Certifique-se de enviar o token necessário no header das requisições para acessar as funcionalidades dentro de controllers.

📄 Documentação de Requisitos
Para detalhes técnicos sobre as regras de negócio e funcionalidades esperadas, consulte o arquivo:

requirements.md

Nota: Este projeto inclui um arquivo de banco de dados local (database.db) para fins de desenvolvimento. Em produção, certifique-se de utilizar variáveis de ambiente seguras.


Equipe: 
https://www.linkedin.com/in/fernanda-teicheira-aa1858201/
gabrielrod039@gmail.com
vmarcos2007@gmail.com
