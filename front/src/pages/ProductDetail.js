import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <>
      {loading ? (
        <div>En cours de chargement...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div class="relative">
                <img
                  class="w-full relative z-10"
                  src={product.image}
                  alt={product.name}
                />
                <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
              <div class="mb-10">
                <h1 class="font-bold uppercase text-2xl mb-5">
                  {product.name}
                </h1>
                <p class="text-sm">{product.description} </p>
              </div>
              <div>
                <div class="inline-block align-bottom mr-5">
                  <span class="font-bold text-5xl leading-none align-baseline">
                    {product.price} €
                  </span>
                </div>
                <div class="inline-block align-bottom">
                  <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                    <i
                      className="fa fa-shopping-cart -ml-2 mr-2 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300"
                      aria-hidden="true"
                    >
                      {/* ml-2 text-black bg-yellow-500 hover:bg-yellow-400
                      focus:ring-4 focus:outline-none focus:ring-yellow-300
                      font-medium rounded-lg text-sm px-5 py-2.5 text-center
                      dark:bg-blue-600 dark:hover:bg-blue-700
                      dark:focus:ring-blue-800 Ajouter au panier */}
                      Ajouter au panier
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
