import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <BrowserRouter>
      <>
        <header className="p-4 bg-black">
          <NavBar></NavBar>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
