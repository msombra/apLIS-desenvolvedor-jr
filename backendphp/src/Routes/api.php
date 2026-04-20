<?php

use Controllers\MedicoController;

// Extrai a URI da requisição (caminho do URL)
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Obtém o método HTTP da requisição
$method = $_SERVER['REQUEST_METHOD'];

$controller = new MedicoController();

// Rota: GET /medicos - Lista todos os médicos
if ($uri === '/medicos' && $method === 'GET') {
    $controller->index();
}

// Rota: POST /medicos - Cria um novo médico
if ($uri === '/medicos' && $method === 'POST') {
    $controller->store();
}

// Divide a URI em segmentos para processar rotas com parâmetros
$segments = explode('/', trim($uri, '/'));

// Rota: GET /medicos/{id} - Obtém um médico específico por ID
if ($segments[0] === 'medicos' && $method === 'GET') {
    if (isset($segments[1])) {
        $controller->show($segments[1]);
    }
}

// Rota: PUT /medicos/{id} - Atualiza um médico existente
if ($segments[0] === 'medicos' && $method === 'PUT') {
    if (isset($segments[1])) {
        $controller->update($segments[1]);
    }
}

// Rota: DELETE /medicos/{id} - Deleta um médico específico
if ($segments[0] === 'medicos' && $method === 'DELETE') {
    if (isset($segments[1])) {
        $controller->destroy($segments[1]);
    }
}