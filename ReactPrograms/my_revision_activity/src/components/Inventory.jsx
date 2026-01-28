{/*import { useState } from "react";

function Inventory() {
  const [stock, setStock] = useState(0);

  // add stock
  const addStock = () => {
    setStock(stock + 1);
  };

  // remove stock
  const removeStock = () => {
    if (stock > 0) {
      setStock(stock - 1);
    }
  };

  return (
    <div className="bg-rose-100 p-6 rounded-lg shadow-md w-80 text-center">
      <h1 className="text-2xl font-bold mb-4">Inventory Manager</h1>
      <p className="text-lg mb-2">Current Stock</p>
      <p className="text-3xl font-bold mb-6">{stock}</p>
      <div className="flex justify-center gap-4">

        <button
          onClick={addStock}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Stock
        </button>
        <button
          onClick={removeStock}
          disabled={stock === 0}
          className={`px-4 py-2 rounded text-white ${
            stock === 0
              ? "bg-violet-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Remove Stock
        </button>
      </div>
    </div>
  );
}
export default Inventory;*/}