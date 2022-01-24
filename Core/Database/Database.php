<?php
namespace Core\Database;

use PDO;

class Database
{
    protected $pdo;

    public function __construct()
    {
        include ROOT . '/config/configDB.php';

        $this->pdo = new PDO(
            'mysql:host=' .
                $config['host'] .
                ';dbname=' .
                $config['dbname'] .
                ';charset=utf8',
            $config['user'],
            $config['pwd'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]
        );
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}
