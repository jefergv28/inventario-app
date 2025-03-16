"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";

const InventoryPage = () => {
  const [search, setSearch] = useState("");
  const [products] = useState([
    { id: 1, name: "Producto A", stock: 10, category: "Categoría 1", provider: "Proveedor X" },
    { id: 2, name: "Producto B", stock: 3, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 3, name: "Producto C", stock: 20, category: "Categoría 1", provider: "Proveedor Z" },
    { id: 4, name: "Producto D", stock: 5, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 5, name: "Producto E", stock: 0, category: "Categoría 1", provider: "Proveedor X" },
    { id: 6, name: "Producto F", stock: 15, category: "Categoría 1", provider: "Proveedor X" },
    { id: 7, name: "Producto G", stock: 25, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 8, name: "Producto H", stock: 10, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 9, name: "Producto I", stock: 5, category: "Categoría 2", provider: "Proveedor Y" },
    { id: 10, name: "Producto J", stock: 20, category: "Categoría 1", provider: "Proveedor X" },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="title">Inventario</h1>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={handleSearch}
        className="w-80 rounded-md border p-2 text-black dark:text-white"
      />
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-head">Nombre</th>
            <th className="table-head">Stock</th>
            <th className="table-head">Categoría</th>
            <th className="table-head">Proveedor</th>
            <th className="table-head">Acciones</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products
            .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            .map((product, index) => (
              <motion.tr
                key={product.id}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="table-head">{product.name}</td>
                <td className={`table-head ${product.stock < 5 ? "font-bold text-red-500" : ""}`}>{product.stock}</td>
                <td className="table-head">{product.category}</td>
                <td className="table-head">{product.provider}</td>
                <td className="table-head">
                  <button className="mr-2 rounded bg-blue-500 px-2 py-1 text-white">Editar</button>
                  <button className="rounded bg-red-500 px-2 py-1 text-white">Eliminar</button>
                </td>
              </motion.tr>
            ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default InventoryPage;
