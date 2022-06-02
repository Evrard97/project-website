import data from "./data";

function App() {
  return (
    <>
      <header className="p-4 bg-black">
        <a className="text-gray-50 text-2xl font-bold" href="/">
          Ecommerce
        </a>
      </header>
      <main className="p-4">
        <h1 className="text-blue-700 text-[33px] text-center">
          Liste des produits
        </h1>
        {/* products div */}
        <div className="flex flex-wrap justify-center">
          {data.products.map((product) => (
            // product div
            <div
              className="border-solid border-2 border-black m-4"
              key={product.name}
            >
              <a href={`/products/${product.name}`}>
                <img
                  className="w-[150px] h-[150px]"
                  src={product.image}
                  alt={product.name}
                />
              </a>
              {/* detail produits */}
              <div className="p-4">
                <a href={`/products/${product.name}`}>
                  <p className="text-[20px] font-semibold text-blue-800">
                    {product.name}
                  </p>
                </a>
                <p className="font-bold">{product.mark} </p>
                <p>
                  Prix: <span className="font-bold">{product.price} €</span>
                </p>
                <p>Stock: {product.stock} </p>
                <p>{product.category} </p>
                <p>Note: {product.rating} </p>
                <p>Description: {product.description} </p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
