<?php

class Autoload {

    // Une méthode qui a le même nom que la class est considérée comme un construct.
    // Il faut faire attention aux noms utilisés
    public static function autoloader($class)
    {
        var_dump($class);
        $class = str_replace("\\", "/", $class);
        require ROOT."/$class.php";
    }

    public static function register()
    {
        // Dès qu'on met l'autoloader dans une class, la méthode ne peut plus accéder 
        // au nom de la class et nous retourne une erreur.
        // Pour l'éviter, on passe en paramètre un tableau contenant la constante magique __CLASS__
        // et le nom de la méthode autoloader
        spl_autoload_register(array(__CLASS__, 'autoloader'));
    }
}