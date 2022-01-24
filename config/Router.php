<?php

use App\Controller\HomeController;
use App\Controller\UserController;
use App\Controller\AdminController;
use App\Controller\CarteController;
use App\Controller\ProduitController;

// if (isset($_GET['page']) && !empty($_GET['page'])) {
//     switch ($_GET['page']) {
//         case 'DashboardAdmin':
//             // if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
//             //     if ($_SESSION['role'] === 1) {
//             (new AdminController())->manager();
//             //     } else {
//             //         echo ("Vous n'avez pas les droits");
//             //         (new HomeController)->index();
//             //     }
//             // } else {
//             //     (new HomeController)->index();
//             // }
//             break;

//         case 'ProduitDelete':
//             (new AdminController())->deleteProduit();
//             break;
//         case 'UpdateProduit':
//             (new AdminController())->editerProtuit();
//             break;

//         case 'UpdateCategorie':
//             (new AdminController())->editerCategorie();
//             break;

//         case 'DeleteCategorie':
//             (new AdminController())->deleteCategorie();
//             break;

//         case 'Compte':
//             if (!isset($_GET['id']) > 0) {
//                 if (isset($_GET['newaccount'])) {
//                     (new UserController())->newaccount($_POST);
//                 } else {
//                     (new UserController())->connexion($_POST);
//                 }
//             } elseif (!isset($_GET['modify'])) {
//                 (new UserController())->index($_GET['id']);
//             } else {
//                 (new UserController())->indexModify($_POST);
//             }
//             break;

//         case 'Carte':
//             (new CarteController())->index();
//             break;

//         default:
//             (new HomeController())->index();
//             break;
//     }
// } else {
//     (new HomeController())->index();
// }

// $path = $_SERVER['PATH_INFO'] ?? '/home/index';
// $path = explode('/', $path);

// $controller = 'App\Controller\\' . ucfirst($path[1]) . 'Controller';
// $method = $path[2];

// (new $controller())->$method();
