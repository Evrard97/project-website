import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import { getErrorFromBackend } from "./../utils";
import DisplayMessage from "./../components/DisplayMessage";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function ProductEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [mark, setMark] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setReference(data.reference);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setStock(data.stock);
        setMark(data.mark);
        setDescription(data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getErrorFromBackend(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          reference,
          price,
          image,
          category,
          mark,
          stock,
          description,
        },
        {
          headers: { Authorization: `Verify${userInfo.data.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      navigate("/admin/productList");
    } catch (err) {
      toast.error(getErrorFromBackend(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Editer Produit ${productId}</title>
      </Helmet>

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <DisplayMessage variant="danger">{error}</DisplayMessage>
      ) : (
        <>
          <div className="container mx-auto mt-10">
            <Helmet>
              <title>Modifier produit</title>
            </Helmet>
            <h1 className="font-bold text-[40px] pt-4">
              Editer Produit {productId}
            </h1>
            <div className="row top">
              <div className="col-1">
                <form onSubmit={submitHandler}>
                  <ul>
                    <li>
                      <div className="card card-body">
                        <p className="font-semibold text-sm">
                          <label
                            htmlFor="first-name"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Nom
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full h-[35px] border text-lg border-indigo-500 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />
                          <br />
                          <label
                            htmlFor="reference"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Reference
                          </label>
                          <input
                            type="text"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />
                          <br />
                          <label
                            htmlFor="price"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Prix
                          </label>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />

                          <br />
                          <label
                            htmlFor="image"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Image
                          </label>
                          <input
                            type="img"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />

                          <br />
                          <label
                            htmlFor="category"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Categorie
                          </label>
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />

                          <br />
                          <label
                            htmlFor="stock"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Quantité
                          </label>
                          <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />

                          <br />
                          <label
                            htmlFor="mark"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Marque
                          </label>
                          <input
                            type="text"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />

                          <br />
                          <label
                            htmlFor="description"
                            className="block text-xl font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                          />
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      disabled={loadingUpdate}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modifier
                    </button>
                    {loadingUpdate && <Loading></Loading>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
