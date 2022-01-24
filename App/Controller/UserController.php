<?php

namespace App\Controller;

use App\Model\UserModel;
use Core\Controller\DefaultController;

class UserController extends DefaultController
{
    public function index($id)
    {
        $this->render('Compte/index', [
            'user' => (new UserModel())->find($id),
        ]);
    }

    public function connexion($user)
    {
        if (!empty($user)) {
            $user['mail'] = htmlspecialchars($user['mail']);
            $user['mdp'] = sha1($user['mdp']);
            $id = (new UserModel())->connexionUser($user);
            if ($id > 0) {
                $_SESSION['id'] = $id;
                header('Location: ?page=Compte&id=' . $_SESSION['id']);
            }
        } else {
            $this->render('Compte/Connexion');
        }
    }

    public function newaccount($user)
    {
        if (!empty($user)) {
            if ((new UserModel())->saveUser($user)) {
                $this->render('Compte/Connexion');
            }
        }

        $this->render('Compte/Creation');
    }

    public function indexModify($user)
    {
        if (!empty($user)) {
            $id = $_GET['id'];
            if ((new UserModel())->modifUser($user, $id) == $id) {
                header('Location: ?page=Compte');
            }
        }
    }
}

?>
