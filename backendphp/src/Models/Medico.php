<?php

namespace Models;

use Database\Connection;
use PDO;

class Medico
{
    // Lista todos os médicos ordenados por nome
    public function list()
    {
        $conn = Connection::getConnection();

        $stmt = $conn->prepare("SELECT * FROM medicos ORDER BY nome");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Cria um novo médico no banco de dados
    public function create($data)
    {
        $conn = Connection::getConnection();

        $query = "INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':CRM', $data['CRM']);
        $stmt->bindParam(':UFCRM', $data['UFCRM']);

        return $stmt->execute();
    }

    // Busca um médico específico pelo ID
    public function findById($id)
    {
        $conn = Connection::getConnection();

        $query = "SELECT * FROM medicos WHERE id = :id";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(':id', $id);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Atualiza os dados de um médico existente
    public function edit($id, $data)
    {
        $conn = Connection::getConnection();

        $query = "UPDATE medicos SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM, updated_at = now() WHERE id = :id";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':CRM', $data['CRM']);
        $stmt->bindParam(':UFCRM', $data['UFCRM']);

        return $stmt->execute();
    }

    // Deleta um médico do banco de dados
    public function delete($id)
    {
        $conn = Connection::getConnection();

        $query = "DELETE FROM medicos WHERE id = :id";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }
}