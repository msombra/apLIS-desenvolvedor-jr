# 📡 Documentação da API

Documentação completa dos endpoints disponíveis na API REST do apLIS.

## URL Base

```
http://localhost:3000
```

## Endpoints

### Médicos

#### 1. Listar Todos os Médicos

```http
GET /api/medicos
```

**Descrição**: Retorna lista de todos os médicos cadastrados.

**Response (200):**
```json
[
    {
        "id": 1,
        "nome": "Dr. João Silva",
        "CRM": "123456",
        "UFCRM": "SP",
        "created_at": "2024-04-20 10:30:00",
        "updated_at": "2024-04-20 10:30:00"
    },
    {
        "id": 2,
        "nome": "Dra. Maria Santos",
        "CRM": "789012",
        "UFCRM": "RJ",
        "created_at": "2024-04-20 11:45:00",
        "updated_at": "2024-04-20 11:45:00"
    }
]
```

**Exemplo de Uso (Frontend):**
```javascript
axios.get('http://localhost:3000/api/medicos')
    .then(res => {
        console.log(res.data); // Array de médicos
    })
    .catch(err => console.error(err));
```

---

#### 2. Obter Médico Específico

```http
GET /api/medicos/{id}
```

**Parâmetros:**
- `id` (path) - ID do médico

**Response (200):**
```json
[
    {
        "id": 1,
        "nome": "Dr. João Silva",
        "CRM": "123456",
        "UFCRM": "SP",
        "created_at": "2024-04-20 10:30:00",
        "updated_at": "2024-04-20 10:30:00"
    }
]
```

**Response (404):**
```json
{
    "status": "error",
    "message": "Médico não encontrado"
}
```

**Exemplo de Uso:**
```javascript
axios.get('http://localhost:3000/api/medicos/1')
    .then(res => console.log(res.data[0]))
    .catch(err => console.error(err));
```

---

#### 3. Criar Novo Médico

```http
POST /api/medicos
Content-Type: application/json
```

**Body:**
```json
{
    "nome": "Dr. Carlos Costa",
    "CRM": "456789",
    "UFCRM": "MG"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Médico criado com sucesso."
}
```

**Response (422):**
```json
{
    "status": "error",
    "message": "CRM já cadastrado no sistema"
}
```

**Campos Obrigatórios:**
- `nome` (string) - Nome completo do médico
- `CRM` (string) - Número do CRM
- `UFCRM` (string) - UF do CRM (ex: SP, RJ, MG)

**Exemplo de Uso:**
```javascript
const novoMedico = {
    nome: "Dr. Carlos Costa",
    CRM: "456789",
    UFCRM: "MG"
};

axios.post('http://localhost:3000/api/medicos', novoMedico)
    .then(res => {
        console.log(res.data.message);
        // Recarregar lista
    })
    .catch(err => console.error(err.response.data.message));
```

---

#### 4. Atualizar Médico

```http
PUT /api/medicos/{id}
Content-Type: application/json
```

**Parâmetros:**
- `id` (path) - ID do médico

**Body:**
```json
{
    "nome": "Dr. Carlos Costa Atualizado",
    "CRM": "456789",
    "UFCRM": "SP"
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Médico atualizado com sucesso."
}
```

**Response (404):**
```json
{
    "status": "error",
    "message": "Médico não encontrado"
}
```

**Campos Atualizáveis:**
- `nome` (opcional)
- `CRM` (opcional)
- `UFCRM` (opcional)

**Exemplo de Uso:**
```javascript
const dadosAtualizados = {
    nome: "Dr. Carlos Costa Atualizado",
    CRM: "456789",
    UFCRM: "SP"
};

axios.put('http://localhost:3000/api/medicos/1', dadosAtualizados)
    .then(res => console.log(res.data.message))
    .catch(err => console.error(err));
```

---

#### 5. Deletar Médico

```http
DELETE /api/medicos/{id}
```

**Parâmetros:**
- `id` (path) - ID do médico

**Response (200):**
```json
{
    "status": "success",
    "message": "Médico deletado com sucesso."
}
```

**Response (404):**
```json
{
    "status": "error",
    "message": "Médico não encontrado"
}
```

**Exemplo de Uso:**
```javascript
axios.delete('http://localhost:3000/api/medicos/1')
    .then(res => console.log(res.data.message))
    .catch(err => console.error(err));
```

---

### Pacientes

#### 1. Listar Todos os Pacientes

```http
GET /api/pacientes
```

**Descrição**: Retorna lista de todos os pacientes cadastrados.

**Response (200):**
```json
[
    {
        "id": 1,
        "nome": "João da Silva",
        "dataNasc": "1985-03-15",
        "carteirinha": "123456789",
        "cpf": "12345678901",
        "created_at": "2024-04-20 10:30:00",
        "updated_at": "2024-04-20 10:30:00"
    }
]
```

---

#### 2. Obter Paciente Específico

```http
GET /api/pacientes/{id}
```

**Parâmetros:**
- `id` (path) - ID do paciente

**Response (200):**
```json
[
    {
        "id": 1,
        "nome": "João da Silva",
        "dataNasc": "1985-03-15",
        "carteirinha": "123456789",
        "cpf": "12345678901",
        "created_at": "2024-04-20 10:30:00",
        "updated_at": "2024-04-20 10:30:00"
    }
]
```

---

#### 3. Criar Novo Paciente

```http
POST /api/pacientes
Content-Type: application/json
```

**Body:**
```json
{
    "nome": "Maria Santos",
    "dataNasc": "1990-07-22",
    "carteirinha": "987654321",
    "cpf": "98765432100"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Paciente criado com sucesso."
}
```

**Campos Obrigatórios:**
- `nome` (string) - Nome completo do paciente
- `dataNasc` (date) - Data de nascimento (formato: YYYY-MM-DD)
- `carteirinha` (string) - Número da carteirinha
- `cpf` (string) - CPF (deve ser único)

**Exemplo de Uso:**
```javascript
const novoPaciente = {
    nome: "Maria Santos",
    dataNasc: "1990-07-22",
    carteirinha: "987654321",
    cpf: "98765432100"
};

axios.post('http://localhost:3000/api/pacientes', novoPaciente)
    .then(res => console.log(res.data.message))
    .catch(err => console.error(err));
```

---

#### 4. Atualizar Paciente

```http
PUT /api/pacientes/{id}
Content-Type: application/json
```

**Body:**
```json
{
    "nome": "Maria Santos Silva",
    "dataNasc": "1990-07-22",
    "carteirinha": "987654321",
    "cpf": "98765432100"
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Paciente atualizado com sucesso."
}
```

---

#### 5. Deletar Paciente

```http
DELETE /api/pacientes/{id}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Paciente deletado com sucesso."
}
```

---

## Tratamento de Erros

### Erro de Validação

```http
POST /api/medicos
Content-Type: application/json
```

**Body:**
```json
{
    "nome": "Dr",
    "CRM": "123456"
}
```

**Response (422):**
```json
{
    "status": "error",
    "message": "UFCRM é obrigatório"
}
```

### Recurso Não Encontrado

```http
GET /api/medicos/999
```

**Response (404):**
```json
{
    "status": "error",
    "message": "Médico não encontrado"
}
```

### Erro Interno

```
Response (500)
```

```json
{
    "status": "error",
    "message": "Erro interno do servidor. Contate o administrador."
}
```

## Testing

### cURL

```bash
# Listar médicos
curl -X GET http://localhost:3000/api/medicos

# Criar médico
curl -X POST http://localhost:3000/api/medicos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Dr. Teste","CRM":"123456","UFCRM":"SP"}'

# Atualizar médico
curl -X PUT http://localhost:3000/api/medicos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Dr. Teste Atualizado","CRM":"123456","UFCRM":"RJ"}'

# Deletar médico
curl -X DELETE http://localhost:3000/api/medicos/1
```

### Postman

Importe a collection Postman (arquivo: `postman_collection.json` - TODO)

---

**Versão**: 1.0.0  
**Atualizado em**: 20 de abril de 2026
