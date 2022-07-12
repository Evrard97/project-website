import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import HeadNav from "./components/HeadNav";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <>
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
