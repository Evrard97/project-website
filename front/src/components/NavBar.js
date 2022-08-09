import { Link } from "react-router-dom";
import { Store } from "./../Store";
import { useContext } from "react";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // const [navbar, setNavbar] = useState(false);

  const logout = (e) => {
    ctxDispatch({ type: "USER_SIGN_OUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <div className="container flex">
      {/* category  */}
      <div className="px-8 py-4 bg-indigo-500 hover:bg-indigo-700 flex items-center cursor-pointer relative group">
        <span className="text-white text-lg">
          <i className="fas fa-bars"></i>
        </span>
        <span className="capitalize ml-2 text-white ">Tous les categories</span>
        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
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
          <Link
            to="#"
            className="px-4 py-2 text-gray-200 rounded-md shadow hover:bg-gray-200 hover:text-black"
          >
            Accueil
          </Link>
          <Link
            to="/"
            className="px-4 py-2 text-gray-200 rounded-md shadow hover:bg-gray-200 hover:text-black"
          >
            Boutique
          </Link>
        </div>
        {userInfo ? (
          <button
            onClick={logout}
            className="px-4 py-2 text-gray-200 rounded-md shadow hover:bg-gray-200 hover:text-black"
          >
            Deconnection
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-gray-200 rounded-md shadow hover:bg-gray-200 hover:text-black"
          >
            Connexion/Inscription
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
