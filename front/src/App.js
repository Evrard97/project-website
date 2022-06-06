import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <>
        <header className="p-4 bg-black">
          <Link className="text-gray-50 text-2xl font-bold" to="/">
            Ecommerce
          </Link>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:name" element={<ProductDetail />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
