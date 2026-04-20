# 📦 Setup e Instalação

Guia completo para instalar e configurar o apLIS em sua máquina.

## Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **PHP** 8+ ([Download](https://www.php.net/downloads.php))
- **Composer** ([Download](https://getcomposer.org/))
- **Git** ([Download](https://git-scm.com/))
- Um banco de dados (MySQL, PostgreSQL, SQLite, etc.)

## Instalação Rápida

### 1. Clone o Repositório

```bash
git clone <seu-repositorio>
cd apLIS-desenvolvedor-jr
```

### 2. Frontend (React)

```bash
cd app
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### 3. Backend (PHP)

```bash
cd ../backendphp
composer install
php -S localhost:3000 -t public
```

A API estará disponível em `http://localhost:3000`

## Configuração Detalhada

### Frontend

#### Instalação de Dependências

```bash
cd app
npm install
```

#### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do diretório `app/`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=apLIS
```

#### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa ESLint para verificar qualidade do código

### Backend (PHP)

#### Instalação de Dependências

```bash
cd backendphp
composer install
```

#### Configuração do Banco de Dados

Edite o arquivo `src/Database/Connection.php`:

```php
<?php

namespace Database;

use PDO;
use Exception;

class Connection
{
    private static $conn;

    public static function connect()
    {
        if (self::$conn === null) {
            $host = 'localhost';
            $db = 'seu_banco_dados';
            $user = 'seu_usuario';
            $password = 'sua_senha';
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

            try {
                self::$conn = new PDO($dsn, $user, $password);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (\PDOException $e) {
                throw new Exception('Erro ao conectar ao banco de dados: ' . $e->getMessage());
            }
        }

        return self::$conn;
    }
}
```

#### Estrutura do Banco de Dados

Execute os seguintes scripts SQL para criar as tabelas:

**Tabela de Médicos:**
```sql
CREATE TABLE medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    CRM VARCHAR(50) NOT NULL UNIQUE,
    UFCRM VARCHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Tabela de Pacientes:**
```sql
CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    dataNasc DATE NOT NULL,
    carteirinha VARCHAR(100),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Iniciando o Projeto

### Terminal 1 - Frontend
```bash
cd app
npm run dev
```

### Terminal 2 - Backend
```bash
cd backendphp
php -S localhost:3000 -t public
```

### Acessar Aplicação
Abra o navegador e acesse: `http://localhost:5173`

## Troubleshooting

### Erro de Conexão com API (CORS)

Se receber erro de CORS, adicione headers no arquivo `public/index.php`:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

### Erro ao Conectar ao Banco de Dados

- Verifique se o banco de dados está rodando
- Confirme credenciais em `Connection.php`
- Verifique se as tabelas foram criadas com sucesso

### Módulos PHP Faltando

```bash
# Verifique extensões necessárias
php -m

# Instale extensões (exemplo para PDO MySQL)
# Windows: Descomente em php.ini
# Linux: sudo apt-get install php-mysql
```

## Estrutura de Pastas Importantes

```
app/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas principais
│   └── App.jsx        # Componente raiz

backendphp/
├── src/
│   ├── Controllers/   # Lógica de negócio
│   ├── Models/        # Interação com BD
│   ├── Database/      # Configuração BD
│   └── Routes/        # Definição de rotas
└── public/
    └── index.php      # Ponto de entrada
```

## Próximos Passos

1. Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura
2. Consulte [API.md](./API.md) para documentação dos endpoints
3. Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para diretrizes de desenvolvimento

---

**Versão**: 1.0.0  
**Atualizado em**: 20 de abril de 2026
