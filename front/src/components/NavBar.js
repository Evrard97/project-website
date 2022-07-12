import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="container flex">
      {/* category  */}
      <div className="px-8 py-4 bg-indigo-500 flex items-center cursor-pointer relative group">
        <span className="text-white text-lg">
          <i className="fas fa-bars"></i>
        </span>
        <span className="capitalize ml-2 text-white">Tous les categories</span>
        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <Link
            to="#"
            className="flex items-center px-6 py-3 hover:bg-yellow-600 transition"
          >
            <i className="fas fa-gamepad w-5 h-5 object-contain"></i>
            <span className="ml-6 text-gray-600 text-sm">Jeux</span>
          </Link>

          <Link
            to="#"
            className="flex items-center px-6 py-3 hover:bg-yellow-600 transition"
          >
            <i className="fas fa-shirt w-5 h-5 object-contain"></i>
            <span className="ml-6 text-gray-600 text-sm">Vetements</span>
          </Link>

          <Link
            to="#"
            className="flex items-center px-6 py-3 hover:bg-yellow-600 transition"
          >
            <i className="fas fa-laptop w-5 h-5 object-contain"></i>
            <span className="ml-6 text-gray-600 text-sm">Ordinateurs</span>
          </Link>

          <Link
            to="#"
            className="flex items-center px-6 py-3 hover:bg-yellow-600 transition"
          >
            <i className="fas fa-tv w-5 h-5 object-contain"></i>
            <span className="ml-6 text-gray-600 text-sm">Televisions</span>
          </Link>
        </div>
      </div>
      {/* nav items */}
      <div className="flex items-center justify-between flex-grow pl-12">
        <div className="flex items-center space-x-6 capitalize">
          <Link to="#" className="text-gray-200 hover:text-white transition">
            Accueil
          </Link>
          <Link to="/" className="text-gray-200 hover:text-white transition">
            Boutique
          </Link>
        </div>
        <Link to="/login" className="text-gray-200 hover:text-white transition">
          Connexion/Inscription
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
