# 🏗️ Arquitetura do Sistema

Este documento descreve a arquitetura do apLIS, a organização de seus componentes e fluxo de dados.

## Visão Geral da Arquitetura

apLIS segue uma arquitetura **cliente-servidor** com separação clara entre frontend e backend:

```
┌─────────────────────┐
│   Frontend (React)  │
│   - Vite + React    │
│   - Bootstrap + CSS │
└──────────┬──────────┘
           │
           │ HTTP Requests
           │ (Axios)
           ▼
┌─────────────────────┐
│  Backend (PHP API)  │
│  - Controllers      │
│  - Models           │
│  - Routes           │
└──────────┬──────────┘
           │
           │ SQL Queries
           │ (PDO)
           ▼
┌─────────────────────┐
│    Database         │
│  (MySQL/Postgres)   │
└─────────────────────┘
```

## Frontend - React

### Estrutura de Componentes

```
src/
├── components/
│   ├── Header.jsx          # Cabeçalho com navegação
│   ├── Sidebar.jsx         # Menu lateral
│   ├── DataTable.jsx       # Tabela de dados
│   ├── Modal.jsx           # Modal para formulários
│   └── ActionButtons.jsx   # Botões de ação (editar, deletar)
├── pages/
│   ├── Medico.jsx          # Página de gerenciamento de médicos
│   └── Paciente.jsx        # Página de gerenciamento de pacientes
├── App.jsx                 # Componente raiz
└── main.jsx                # Ponto de entrada
```

### Fluxo de Dados Frontend

```
User Interaction
       │
       ▼
Component State (useState)
       │
       ▼
Form Hook (useForm/react-hook-form)
       │
       ▼
Validation & Submission
       │
       ▼
API Call (Axios)
       │
       ▼
Response Handling
       │
       ▼
Toast Notification + State Update
```

### Componentes Principais

#### **Header.jsx**
- Exibe título da página
- Botão para abrir modal de cadastro
- Recebe props: `page`, `openModal`

#### **Sidebar.jsx**
- Menu lateral de navegação
- Links para diferentes seções (Médicos, Pacientes, etc.)
- Roteamento via React Router

#### **DataTable.jsx**
- Exibe dados em formato tabular
- Cabeçalho configurável
- Responsive design com Bootstrap

#### **Modal.jsx**
- Componente reutilizável para formulários
- Suporta criar e editar registros
- Props: `title`, `children`, `onSubmit`, `closeModal`, `buttonState`

#### **ActionButtons.jsx**
- Botões de editar e deletar
- Recebe callbacks para ações
- Props: `openModal`, `deleteRecord`, `dataId`

### Gerenciamento de Formulários

O projeto utiliza **react-hook-form** para validação e gerenciamento de formulários:

```jsx
const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
        nome: '',
        CRM: '',
        UFCRM: ''
    }
});

// reset() - Limpa ou preenche o formulário
// register() - Registra campos
// handleSubmit() - Valida e submete
// errors - Mostra erros de validação
```

## Backend - PHP

### Estrutura de Pastas

```
backendphp/
├── src/
│   ├── Controllers/
│   │   └── MedicoController.php    # Lógica de negócio para Médicos
│   ├── Models/
│   │   └── Medico.php              # Interação com BD
│   ├── Database/
│   │   └── Connection.php          # Conexão PDO
│   └── Routes/
│       └── api.php                 # Definição de rotas
├── public/
│   └── index.php                   # Ponto de entrada (router)
└── composer.json
```

### Padrão MVC

O backend segue o padrão **Model-View-Controller**:

```
Request (HTTP)
    │
    ▼
public/index.php (Router)
    │
    ▼
Controller (MedicoController)
    │  - Valida entrada
    │  - Chama método do Model
    │
    ▼
Model (Medico)
    │  - Interage com banco
    │  - Retorna dados
    │
    ▼
Response (JSON)
```

### Controller - MedicoController.php

Métodos principais:

- `index()` - Lista todos os registros (GET)
- `show($id)` - Obtém um registro específico (GET)
- `store()` - Cria novo registro (POST)
- `update($id)` - Atualiza registro (PUT)
- `destroy($id)` - Deleta registro (DELETE)

Exemplo:
```php
public function index()
{
    try {
        $medico = new Medico();
        $data = $medico->list();
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(422);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
```

### Model - Medico.php

Responsável pela interação com o banco de dados:

```php
public function list()
{
    $sql = "SELECT * FROM medicos";
    $stmt = self::$conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function create($data)
{
    $sql = "INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)";
    $stmt = self::$conn->prepare($sql);
    $stmt->execute($data);
}
```

### Connection.php

Gerencia a conexão com o banco de dados usando PDO:

```php
public static function connect()
{
    // Singleton pattern - uma única conexão
    if (self::$conn === null) {
        // Estabelece conexão
    }
    return self::$conn;
}
```

### Router - api.php

Mapeia rotas HTTP para controllers:

```php
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($request_uri) {
    case '/api/medicos':
        if ($request_method === 'GET') {
            $controller->index();
        } elseif ($request_method === 'POST') {
            $controller->store();
        }
        break;
    // ... mais rotas
}
```

## Fluxo Completo - Exemplo: Criar Médico

```
1. Usuário preenche formulário no Frontend (Medico.jsx)
   └─ React Hook Form valida os dados

2. Usuário clica "Salvar"
   └─ handleSubmit(upsertMedico) é acionado

3. Frontend faz requisição POST
   └─ axios.post('http://localhost:3000/medicos', data)

4. Backend recebe requisição em public/index.php
   └─ Router identifica rota e chama MedicoController::store()

5. Controller valida dados
   └─ Instancia Model Medico e chama create($data)

6. Model Medico executa INSERT
   └─ Usa PDO para executar query no banco

7. Database insere registro
   └─ Retorna sucesso/erro

8. Model retorna resposta ao Controller
   └─ Controller converte para JSON

9. Backend retorna JSON para Frontend
   └─ axios recebe resposta

10. Frontend atualiza estado
    └─ Modal fecha, tabela atualiza, toast exibe mensagem
```

## Comunicação API

### Padrão de Requisição

```javascript
axios.post('http://localhost:3000/medicos', data)
    .then(res => {
        // Sucesso - atualiza UI
        toast.success(res.data.message);
        getMedicos(); // Recarrega dados
    })
    .catch(err => {
        // Erro - mostra mensagem
        toast.error('Erro ao processar');
    });
```

### Padrão de Resposta

**Sucesso (200/201):**
```json
{
    "status": "success",
    "message": "Médico criado com sucesso.",
    "data": { ... }
}
```

**Erro (422/500):**
```json
{
    "status": "error",
    "message": "Descrição do erro"
}
```

## Segurança

### Frontend
- Validação de entrada com React Hook Form
- Sanitização com Bootstrap Classes
- Proteção contra XSS via React

### Backend
- Prepared Statements (PDO) - Prevenção SQL Injection
- Validação de entrada em Controllers
- Tratamento de exceções
- HTTP Headers de segurança (CORS)

## Performance

### Frontend
- Code splitting com React Router
- Lazy loading de componentes
- Caching com Vite

### Backend
- Queries otimizadas com PDO
- Índices em banco de dados
- Cache de conexão (Singleton)

## Escalabilidade

Estrutura pronta para:
- Adicionar novos Controllers (ex: PacienteController)
- Adicionar novos Models (ex: Paciente)
- Implementar autenticação/autorização
- Adicionar middleware de logging
- Implementar paginação

---

**Versão**: 1.0.0  
**Atualizado em**: 20 de abril de 2026
