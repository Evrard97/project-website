<?php

namespace App\Model;

use Core\Model\DefaultModel;

class UserModel extends DefaultModel
{
    protected $table = 'utilisateur';

    public function saveUser($data)
    {
        if ($this->checkMail($data['mail']) == 'y') {
            $statement = "INSERT INTO $this->table (mail, prenom, nom, mdp) VALUES (:mail, :prenom, :nom, :mdp)";

            $data['mdp'] = sha1($data['mdp']);

            return $this->save($statement, $data);
        } else {
            return;
        }
    }

    public function connexionUser($data)
    {
        $id = $this->checkUser($data['mail'], $data['mdp']);
        return $id;
    }

    public function modifUser($data, $id)
    {
        $statement = "UPDATE $this->table SET mail = :mail, prenom = :prenom, nom = :nom WHERE id = $id";
        $this->update($statement, $data);
        return $id;
    }
}

?>
