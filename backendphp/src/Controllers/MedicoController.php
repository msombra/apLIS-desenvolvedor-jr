<?php

namespace Controllers;

use Exception;
use Models\Medico;

class MedicoController
{
    // Lista todos os médicos
    public function index()
    {
        try {
            $medico = new Medico();
            $data = $medico->list();

            echo json_encode($data);
        } catch (\Exception $e) {
            http_response_code(422);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    // Cria um novo médico
    public function store()
    {
        try {
            $request = json_decode(file_get_contents("php://input"), true);

            $medico = new Medico();
            $medico->create($request);

            echo json_encode([
                'status'    => 'success',
                'message'   => 'Médico criado com sucesso.'
            ]);
        } catch (\Exception $e) {
            http_response_code(422);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    // Obtém um médico específco pelo ID
    public function show($id)
    {
        try {
            $medico = new Medico();
            $data = $medico->findById($id);

            if (!$id) {
                throw new \Exception("Médico não encontrado");
            }

            echo json_encode($data);
        } catch (\Exception $e) {
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    // Atualiza um médico existente
    public function update($id)
    {
        try {
            $request = json_decode(file_get_contents("php://input"), true);

            if (!$id) {
                throw new \Exception("Médico não encontrado");
            }

            $medico = new Medico();
            $medico->edit($id, $request);

            echo json_encode([
                'status'    => 'success',
                'message'   => 'Médico atualizado com sucesso.'
            ]);
        } catch (\Exception $e) {
            http_response_code(422);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    // Deleta um médico
    public function destroy($id)
    {
        try {
            $medico = new Medico();

            if (!$id) {
                throw new \Exception("Médico não encontrado");
            }

            $medico->delete($id);

            echo json_encode([
                'status'    => 'success',
                'message'   => 'Médico removido com sucesso.'
            ]);
        } catch (\Exception $e) {
            http_response_code(422);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}