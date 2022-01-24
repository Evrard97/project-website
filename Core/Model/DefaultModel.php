<?php

namespace Core\Model;

use Core\Database\Database;
use PDO;

class DefaultModel extends Database
{
    protected $table;

    private $entity;

    public function __construct()
    {
        parent::__construct();
        $this->entity = 'App\Entity\\' . ucfirst($this->table);
        if ($this->table == 'utilisateur') {
            $this->entity = 'App\Entity\User';
        }
    }

    public function findAll()
    {
        $query = $this->pdo->query("SELECT * FROM $this->table");
        $query->setFetchMode(PDO::FETCH_CLASS, $this->entity);
        return $query->fetchAll();
    }

    public function find(int $id)
    {
        $query = $this->pdo->query("SELECT * FROM $this->table WHERE id=$id");
        $query->setFetchMode(PDO::FETCH_CLASS, $this->entity); // retourne les valeurs liés à la class
        return $query->fetch();
    }

    protected function save(string $statement, array $data)
    {
        $prepare = $this->pdo->prepare($statement);
        return $prepare->execute($data);
    }

    public function checkMail($mail)
    {
        $query = $this->pdo->query(
            "SELECT * FROM $this->table WHERE mail = '$mail'"
        );

        $query->setFetchMode(\PDO::FETCH_CLASS, $this->entity);
        if ($query->fetch()) {
            return 'n';
        } else {
            return 'y';
        }
    }
    protected function delete(string $statement, array $data)
    {
        $prepare = $this->pdo->prepare($statement);
        return $prepare->execute($data);
    }

    protected function update(string $statement, array $data)
    {
        $prepare = $this->pdo->prepare($statement);
        return $prepare->execute($data);
    }

    public function checkUser($mail, $mdp)
    {
        $query = $this->pdo->query(
            "SELECT * FROM $this->table WHERE mail = '$mail' AND mdp = '$mdp'"
        );
        $query->setFetchMode(\PDO::FETCH_CLASS, $this->entity);
        $data = $query->fetch();
        return $data['id'];
    }
}
