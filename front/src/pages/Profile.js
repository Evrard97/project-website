import React from "react";
import { useContext, useEffect, useState, useReducer } from "react";
import { Store } from "./../Store";
import { toast } from "react-toastify";
import { getErrorFromBackend } from "./../utils";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [pseudo, setPseudo] = useState(userInfo.data.pseudo);
  const [fullname, setFullname] = useState(userInfo.data.fullname);
  const [email, setEmail] = useState(userInfo.data.email);
  const [password, setPassword] = useState();

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          pseudo,
          fullname,
          email,
          password,
        },
        {
          headers: { Authorization: `Verify${userInfo.data.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Information mis à jour");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getErrorFromBackend(err));
    }
  };

  return (
    <div className="container ml-80">
      <h1>Profile</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label
            for="pseudo"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="fullname"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Nom & Prenom
          </label>
          <input
            type="text"
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
