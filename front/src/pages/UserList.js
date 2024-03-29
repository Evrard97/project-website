import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { getErrorFromBackend } from "./../utils";
import Loading from "./../components/Loading";
import DisplayMessage from "./../components/DisplayMessage";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default function UserList() {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users`, {
          headers: { Authorization: `Verify${userInfo.data.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getErrorFromBackend(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <DisplayMessage variant="danger">{error}</DisplayMessage>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PSEUDO</th>
              <th>NOM</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.pseudo}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "OUI" : "NON"}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
