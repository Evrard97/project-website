import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import HeadNav from "./components/HeadNav";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import DeliveryAddress from "./pages/DeliveryAddress";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <BrowserRouter>
      <>
        <ToastContainer position="bottom-center" limit={1} />
        <header className="py-4 shadow-sm bg-white">
          <HeadNav />
        </header>
        <nav className="bg-gray-800">
          <NavBar />
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:reference" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/deliveryAdress" element={<DeliveryAddress />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orderlist" element={<OrderList />}></Route>
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </>
    </BrowserRouter>
  );
}

export default App;
