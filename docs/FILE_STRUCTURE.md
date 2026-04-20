# 📁 Estrutura de Arquivos

Mapa detalhado de todos os arquivos do projeto apLIS.

## Árvore Completa

```
apLIS-desenvolvedor-jr/
│
├── 📁 app/                                # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   │   ├── ActionButtons.jsx          # Botões de editar/deletar
│   │   │   ├── DataTable.jsx              # Tabela genérica de dados
│   │   │   ├── Header.jsx                 # Cabeçalho com título e botão novo
│   │   │   ├── Modal.jsx                  # Modal para formulários
│   │   │   └── Sidebar.jsx                # Menu lateral de navegação
│   │   ├── 📁 pages/
│   │   │   ├── Medico.jsx                 # Página de gerenciamento de médicos
│   │   │   └── Paciente.jsx               # Página de gerenciamento de pacientes
│   │   ├── App.css                        # Estilos globais
│   │   ├── App.jsx                        # Componente raiz com rotas
│   │   ├── Appold.jsx                     # Versão antiga (descontinuada)
│   │   ├── index.css                      # Estilos de reset
│   │   └── main.jsx                       # Ponto de entrada React
│   ├── 📁 public/                         # Assets públicos estáticos
│   ├── .gitignore                         # Arquivos ignorados pelo Git
│   ├── eslint.config.js                   # Configuração ESLint
│   ├── index.html                         # HTML principal
│   ├── package.json                       # Dependências e scripts
│   ├── package-lock.json                  # Lock de versões
│   ├── README.md                          # README da app
│   └── vite.config.js                     # Configuração Vite
│
├── 📁 backendphp/                         # Backend PHP
│   ├── 📁 src/
│   │   ├── 📁 Controllers/
│   │   │   └── MedicoController.php       # Lógica de negócio para Médicos
│   │   ├── 📁 Models/
│   │   │   └── Medico.php                 # Modelo de dados Médico
│   │   ├── 📁 Database/
│   │   │   └── Connection.php             # Conexão PDO com BD
│   │   └── 📁 Routes/
│   │       └── api.php                    # Roteador da API
│   ├── 📁 public/
│   │   └── index.php                      # Ponto de entrada (router principal)
│   ├── 📁 vendor/                         # Dependências Composer
│   │   ├── autoload.php
│   │   └── composer/
│   ├── composer.json                      # Dependências PHP
│   ├── composer.lock                      # Lock de versões PHP
│   └── README.md                          # README do backend
│
├── 📁 backendjs/                          # Backend Node.js (opcional/experimental)
│   ├── 📁 src/
│   │   ├── api.js                         # Rotas da API
│   │   └── db_config.js                   # Configuração de banco
│   ├── package.json                       # Dependências Node
│   └── package-lock.json
│
├── 📁 docs/                               # Documentação do projeto
│   ├── README.md                          # Índice da documentação
│   ├── SETUP.md                           # Instalação e configuração
│   ├── ARCHITECTURE.md                    # Arquitetura do sistema
│   ├── API.md                             # Documentação dos endpoints
│   ├── CONTRIBUTING.md                    # Guia de contribuição
│   ├── TROUBLESHOOTING.md                 # Resolução de problemas
│   └── FILE_STRUCTURE.md                  # Este arquivo
│
├── .gitignore                             # Configuração Git
└── README.md                              # README principal
```

## Descrição Detalhada dos Arquivos

### Frontend - app/

#### `app/index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>apLIS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
- Arquivo HTML principal
- Define o elemento root onde React será renderizado
- Carrega o script JavaScript principal

#### `app/src/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
- Ponto de entrada do React
- Renderiza App no elemento root
- Importa estilos globais

#### `app/src/App.jsx`
- Componente raiz
- Define rotas com React Router
- Layout principal (Sidebar + conteúdo)
- Configuração de temas/contexto

#### `app/src/components/`

**ActionButtons.jsx**
- Props: `openModal`, `deleteRecord`, `dataId`
- Botões: Editar, Deletar
- Callbacks para ações na tabela

**DataTable.jsx**
- Props: `header` (array de títulos), `children` (linhas)
- Renderiza tabela HTML com Bootstrap
- Responsive e reutilizável

**Header.jsx**
- Props: `page` (nome da página), `openModal`
- Título da página
- Botão "Novo registro"

**Modal.jsx**
- Props: `title`, `children`, `onSubmit`, `closeModal`, `buttonState`
- Modal Bootstrap reutilizável
- Botões: Cancelar, Salvar/Atualizar
- Estado dos botões (desabilitado durante save)

**Sidebar.jsx**
- Menu lateral de navegação
- Links para Médicos, Pacientes, etc.
- Usa React Router para navegar

#### `app/src/pages/`

**Medico.jsx**
```javascript
// Features principais:
- useState: showModal, formType, medicos
- useForm: Gerenciamento de formulário
- useEffect: Carregar dados ao montar
- Funções: getMedicos, openModal, upsertMedico, deleteMedico
- Endpoints: 
  * GET /api/medicos - listar
  * GET /api/medicos/{id} - obter
  * POST /api/medicos - criar
  * PUT /api/medicos/{id} - atualizar
  * DELETE /api/medicos/{id} - deletar
```

**Paciente.jsx**
```javascript
// Estrutura idêntica a Medico.jsx
// Gerencia pacientes ao invés de médicos
// Campos: nome, dataNasc, carteirinha, cpf
// Endpoints: /api/pacientes
```

#### `app/vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
- Configuração do bundler Vite
- Plugin React ativado
- Pode adicionar alias, proxy, etc.

#### `app/package.json`
```json
{
  "name": "app",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-hook-form": "^7.72.1",
    "axios": "^1.15.0",
    "bootstrap": "^5.3.8",
    "react-toastify": "^11.0.5"
  }
}
```
- Lista todas as dependências
- Define scripts de desenvolvimento
- Versões das libraries

---

### Backend - backendphp/

#### `public/index.php`
```php
<?php
// Ponto de entrada principal
// - CORS headers
// - Router das requisições
// - Inclui rotas da API

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../src/Routes/api.php';
```
- Arquivo principal do servidor
- Define headers CORS
- Carrega roteador

#### `src/Routes/api.php`
```php
<?php
// Roteador da API
// Mapeia URLs para Controllers

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$controller = new MedicoController();

switch ($request_uri) {
    case '/api/medicos':
        if ($request_method === 'GET') $controller->index();
        // ... mais casos
        break;
}
```
- Define todas as rotas
- Mapeia método + URL → Controller + método
- Trata paramétros dinâmicos (id, etc.)

#### `src/Controllers/MedicoController.php`
```php
<?php
namespace Controllers;

use Models\Medico;

class MedicoController
{
    public function index() { ... }  // GET /api/medicos
    public function show($id) { ... } // GET /api/medicos/{id}
    public function store() { ... }   // POST /api/medicos
    public function update($id) { ... } // PUT /api/medicos/{id}
    public function destroy($id) { ... } // DELETE /api/medicos/{id}
}
```
- Lógica de negócio
- Valida entrada
- Chama Model
- Retorna JSON

#### `src/Models/Medico.php`
```php
<?php
namespace Models;

use Database\Connection;

class Medico
{
    private $conn;
    
    public function __construct()
    {
        $this->conn = Connection::connect();
    }
    
    public function list() { ... }    // SELECT * FROM medicos
    public function findById($id) { ... } // SELECT * WHERE id = ?
    public function create($data) { ... } // INSERT INTO medicos
    public function update($id, $data) { ... } // UPDATE medicos SET ...
    public function delete($id) { ... } // DELETE FROM medicos
}
```
- Interação com banco de dados
- Métodos CRUD
- Usa PDO para queries seguras

#### `src/Database/Connection.php`
```php
<?php
namespace Database;

use PDO;

class Connection
{
    private static $conn;
    
    public static function connect()
    {
        // Singleton - uma conexão para toda app
        // Retorna instância PDO
    }
}
```
- Gerencia conexão com BD
- Singleton pattern
- PDO com prepared statements

#### `composer.json`
```json
{
  "name": "aplis/backend",
  "autoload": {
    "psr-4": {
      "": "src/"
    }
  }
}
```
- Dependências PHP
- Configuração Composer
- Autoload PSR-4

---

### Documentação - docs/

#### `docs/README.md`
- Índice principal da documentação
- Links para outros docs
- Visão geral do projeto

#### `docs/SETUP.md`
- Como instalar projeto
- Configuração de BD
- Scripts iniciais
- Troubleshooting básico

#### `docs/ARCHITECTURE.md`
- Arquitetura cliente-servidor
- Padrão MVC no backend
- Fluxo de dados
- Componentes React

#### `docs/API.md`
- Documentação de todos endpoints
- Request/response examples
- Status codes
- Tratamento de erros

#### `docs/CONTRIBUTING.md`
- Como contribuir
- Padrões de código
- Git workflow
- Commit messages

#### `docs/TROUBLESHOOTING.md`
- Problemas comuns
- Soluções
- Tips de debug
- Quando contactar suporte

#### `docs/FILE_STRUCTURE.md`
- Este arquivo
- Mapeia cada arquivo
- Descreve propósito

---

## Fluxo de Requisições

### GET - Listar Médicos

```
Frontend (Medico.jsx)
    ↓ axios.get('/api/medicos')
HTTP Request
    ↓ GET /api/medicos
Backend (public/index.php)
    ↓ Router identifica rota
MedicoController::index()
    ↓ new Medico()
Medico::list()
    ↓ SELECT * FROM medicos
Database
    ↓ Retorna array de registros
JSON Response
    ↓ echo json_encode($data)
Frontend
    ↓ res.data
setMedicos(res.data)
    ↓ Component re-renders
DataTable exibe dados
```

### POST - Criar Médico

```
Frontend (Modal)
    ↓ handleSubmit({nome, CRM, UFCRM})
axios.post('/api/medicos', data)
    ↓ HTTP POST /api/medicos
Backend (public/index.php)
    ↓ Router
MedicoController::store()
    ↓ json_decode(file_get_contents('php://input'))
Medico::create($data)
    ↓ INSERT INTO medicos
Database
    ↓ Confirma inserção
JSON Response {status: 'success'}
    ↓
Frontend
    ↓ toast.success()
setShowModal(false)
getMedicos() // Reload
    ↓
DataTable atualiza
```

---

## Como Adicionar Nova Página

### 1. Criar arquivo de página
```
app/src/pages/NovaPagina.jsx
```

### 2. Adicionar rota em App.jsx
```javascript
import NovaPagina from './pages/NovaPagina'

<Routes>
  <Route path="/nova" element={<NovaPagina />} />
</Routes>
```

### 3. Adicionar link na Sidebar
```javascript
// Sidebar.jsx
<Link to="/nova">Nova Página</Link>
```

### 4. Criar Controller no backend
```
backendphp/src/Controllers/NovoController.php
```

### 5. Criar Model no backend
```
backendphp/src/Models/Novo.php
```

### 6. Adicionar rotas em api.php
```php
case '/api/novo':
    // rotas...
    break;
```

---

## Dependências Principais

### Frontend
- **react**: UI library
- **react-dom**: DOM rendering
- **react-router-dom**: Navegação
- **react-hook-form**: Formulários
- **axios**: HTTP client
- **bootstrap**: CSS framework
- **react-toastify**: Notificações

### Backend
- **PHP 8+**: Runtime
- **Composer**: Gerenciador de pacotes
- **PDO**: Database abstraction

---

## Variáveis de Ambiente

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=apLIS
```

### Backend (hardcoded em `Connection.php`)
```php
$host = 'localhost';
$db = 'seu_banco';
$user = 'root';
$password = '';
```

---

## Checklist para Novos Desenvolvedor

- [ ] Clonou repositório
- [ ] Instalou dependências (`npm install`, `composer install`)
- [ ] Configurou banco de dados
- [ ] Executou scripts SQL
- [ ] Iniciou frontend (`npm run dev`)
- [ ] Iniciou backend (`php -S localhost:3000`)
- [ ] Acessou `http://localhost:5173`
- [ ] Consegue listar médicos/pacientes
- [ ] Consegue criar novo registro
- [ ] Consegue editar registro
- [ ] Consegue deletar registro
- [ ] Leu documentação em `/docs`

---

**Versão**: 1.0.0  
**Atualizado em**: 20 de abril de 2026
