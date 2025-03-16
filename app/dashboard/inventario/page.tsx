"use client";

import { useState } from "react";

const InventoryPage = () => {
  const [search, setSearch] = useState("");
  const [products] = useState([
    { id: 1, name: "Producto A", stock: 10, category: "Categoría 1", provider: "Proveedor X" },
    { id: 2, name: "Producto B", stock: 3, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 3, name: "Producto C", stock: 20, category: "Categoría 1", provider: "Proveedor Z" },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Inventario</h1>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={handleSearch}
        className="w-80 rounded-md border p-2"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Categoría</th>
            <th className="border p-2">Proveedor</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <tr
                key={product.id}
                className="text-center"
              >
                <td className="border p-2">{product.name}</td>
                <td className={`border p-2 ${product.stock < 5 ? "font-bold text-red-500" : ""}`}>{product.stock}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.provider}</td>
                <td className="border p-2">
                  <button className="mr-2 rounded bg-blue-500 px-2 py-1 text-white">Editar</button>
                  <button className="rounded bg-red-500 px-2 py-1 text-white">Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
