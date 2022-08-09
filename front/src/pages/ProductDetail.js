import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import { getErrorFromBackend } from "../utils";
import DisplayMessage from "../components/DisplayMessage";
import { Store } from "../Store";
import { useContext } from "react";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const params = useParams();
  const { reference } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/reference/${reference}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getErrorFromBackend(err),
        });
      }
    };
    fetchProducts();
  }, [reference]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCart = async () => {
    const itemExist = cart.cartItems.find((item) => item._id === product._id);
    const quantity = itemExist ? itemExist.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      toast.error("Produit en rupture de stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <DisplayMessage variant="danger">{error}</DisplayMessage>
      ) : (
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            {/*Product image */}
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img
                  className="w-full relative z-10"
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </div>
            {/* product informations */}
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1 className="font-bold uppercase text-2xl mb-5">
                  {product.name}
                </h1>
                <span className="bg-blue-100 text-yellow-500 text-[15px] font-semibold mr-2 py-0.5 rounded dark:bg-blue-200 dark:text-yellow-400">
                  <Rating
                    rating={product.rating}
                    reviews={product.reviews}
                  ></Rating>
                </span>
                <p>
                  Status:{" "}
                  {product.stock > 0 ? (
                    <span className="font-bold text-[15px] text-green-700">
                      Disponible
                    </span>
                  ) : (
                    <span className="font-bold text-[15px] text-red-700">
                      Non disposible
                    </span>
                  )}
                </p>
                <p>
                  <span className="text-[15px] font-bold"> Description: </span>
                  {product.description}{" "}
                </p>
              </div>
              <div>
                <div className="inline-block align-bottom mr-5">
                  <span className="font-bold text-5xl leading-none align-baseline">
                    {product.price} {"€"}
                  </span>
                </div>
                {product.stock > 0 && (
                  <div className="inline-block align-bottom">
                    <button
                      onClick={addToCart}
                      className="bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-full px-10 py-2 font-semibold"
                    >
                      <i
                        className="fa fa-shopping-cart -ml-2 mr-2"
                        aria-hidden="true"
                      >
                        Ajouter au panier
                      </i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ******************************** */}
          {/* <div class="">test</div> */}
        </div>
      )}
    </>
  );
}

export default Product;
