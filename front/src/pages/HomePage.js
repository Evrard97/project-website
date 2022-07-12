import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Products from "../components/Products";
import { Helmet } from "react-helmet-async";
import Loading from "./../components/Loading";
import { getErrorFromBackend } from "./../utils";
import DisplayMessage from "./../components/DisplayMessage";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products/");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getErrorFromBackend(err) });
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Market - Accueil</title>
      </Helmet>
      <h1 className="text-blue-700 text-[33px] text-center">
        Liste des produits
      </h1>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <DisplayMessage variant="danger">{error}</DisplayMessage>
        ) : (
          products.map((product) => (
            <Products key={product.reference} product={product}></Products>
          ))
        )}
      </div>
    </>
  );
}

export default HomePage;
