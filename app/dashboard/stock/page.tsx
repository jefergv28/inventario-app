"use client";

import { useState, useEffect } from "react";

const LowStockPage = () => {
  const [lowStockProducts] = useState([
    { id: 1, name: "Producto A", stock: 2, provider: "Proveedor X" },
    { id: 2, name: "Producto B", stock: 5, provider: "Proveedor Y" },
  ]);

  useEffect(() => {
    // Aquí podrías cargar los productos con bajo stock desde una API
  }, []);

  const handleRestock = (id: number) => {
    console.log(`Solicitar reabastecimiento para producto con ID ${id}`);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Stock Bajo</h1>
      <p className="text-gray-600">Lista de productos que requieren reabastecimiento.</p>
      <div className="rounded-lg border p-4 shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Producto</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Proveedor</th>
              <th className="p-2 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="p-2">{product.name}</td>
                <td className="p-2 font-bold text-red-500">{product.stock}</td>
                <td className="p-2">{product.provider}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleRestock(product.id)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Reabastecer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockPage;
