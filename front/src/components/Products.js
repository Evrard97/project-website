import { Link } from "react-router-dom";
import Rating from "./Rating";

function Products(props) {
  const { product } = props;
  return (
    <>
      <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-2 border-2 border-black hover:scale-105 transition duration-500 cursor-pointer">
        <Link to={`/product/${product._id}`}>
          <img
            className="p-8 rounded-t-lg"
            src={product.image}
            alt={product.name}
          />
        </Link>
        {/* detail produits */}
        <div className="px-5 pb-5">
          <Link to={`/product/${product._id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <p className="font-bold">{product.mark} </p>
          <div className="flex items-center mt-2.5 mb-5">
            <span className="bg-blue-100 text-yellow-500 text-[15px] font-semibold mr-2 py-0.5 rounded dark:bg-blue-200 dark:text-yellow-400">
              <Rating rating={product.rating} reviews={product.nbreviews} />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.price}€
            </span>
            <Link
              to="#"
              className="ml-2 text-black bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ajouter au panier
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
