<?php

namespace Database;

use PDO;

class Connection
{
    public static function getConnection()
    {
        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $dbname = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $pass = $_ENV['DB_PASSWORD'];

        return new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $user, $pass);
    }
}