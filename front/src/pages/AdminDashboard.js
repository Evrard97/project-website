import React, { useContext, useEffect, useReducer } from "react";
import Chart from "react-google-charts";
import axios from "axios";
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
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function AdminDashboard() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/orders/summary", {
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
      <h1>Tableau de bord</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <DisplayMessage variant="danger">{error}</DisplayMessage>
      ) : (
        <>
          <div>
            <div md={4}>
              <div>
                <div>
                  <div>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </div>
                  <div> Utilisateur(s)</div>
                </div>
              </div>
            </div>
            <div md={4}>
              <div>
                <div>
                  <div>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </div>
                  <div> Commandes</div>
                </div>
              </div>
            </div>
            <div md={4}>
              <div>
                <div>
                  <div>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                    €
                  </div>
                  <div> Ventes</div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-3">
            <h2>Ventes</h2>
            {summary.dailyOrders.length === 0 ? (
              <DisplayMessage>Pas de vente</DisplayMessage>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="BarChart"
                loader={<div>Chargement Chart...</div>}
                data={[
                  ["Date", "Ventes"],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <DisplayMessage>Pas de categories</DisplayMessage>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Chargement Chart...</div>}
                data={[
                  ["Categorie", "Produits"],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
