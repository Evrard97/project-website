import data from "../data";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <h1 className="text-blue-700 text-[33px] text-center">
        Liste des produits
      </h1>
      {/* products div */}
      <div className="flex flex-wrap justify-center">
        {data.products.map((product) => (
          // product div
          <div
            className="border-solid border-2 border-black m-4"
            key={product.name}
          >
            <Link to={`/product/${product.name}`}>
              <img
                className="w-[150px] h-[150px]"
                src={product.image}
                alt={product.name}
              />
            </Link>
            {/* detail produits */}
            <div className="p-4">
              <Link to={`/products/${product.name}`}>
                <p className="text-[20px] font-semibold text-blue-800">
                  {product.name}
                </p>
              </Link>
              <p className="font-bold">{product.mark} </p>
              <p>
                Prix: <span className="font-bold">{product.price} €</span>
              </p>
              {/* <p>Stock: {product.stock} </p> */}
              {/* <p>{product.category} </p> */}
              <p>Note: {product.rating} </p>
              {/* <p>Description: {product.description} </p> */}
              <button class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
