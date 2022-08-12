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
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ProductList from "./pages/ProdutsList";
import ProductEdit from "./pages/ProductEdit";
import UserList from "./pages/UserList";

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
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route path="/orderlist" element={<OrderList />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/productList"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEdit />
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            ></Route>
          </Routes>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
