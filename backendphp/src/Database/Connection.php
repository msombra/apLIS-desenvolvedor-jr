<?php

namespace Database;

use PDO;

class Connection
{
    public static function getConnection()
    {
        $host = "yamabiko.proxy.rlwy.net";
        $port = "49653";
        $dbname = "railway";
        $user = "root";
        $pass = "lfQorqBOiSbPswLmdBoQeyNhnmHaLTgt";

        return new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $user, $pass);
    }
}