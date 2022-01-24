<?php

namespace App\Entity;

use Core\Entity\DefaultEntity;

class Utilisateur extends DefaultEntity
{
    private int $id;
    private string $mail;
    private string $name;
    private string $password;
    private int $grade;
}
