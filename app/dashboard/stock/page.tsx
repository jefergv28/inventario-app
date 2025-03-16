"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LowStockPage = () => {
  const [lowStockProducts] = useState([
    { id: 1, name: "Producto A", stock: 2, provider: "Proveedor X" },
    { id: 2, name: "Producto B", stock: 5, provider: "Proveedor Y" },
    { id: 3, name: "Producto C", stock: 10, provider: "Proveedor Z" },
    { id: 4, name: "Producto D", stock: 15, provider: "Proveedor A" },
    { id: 5, name: "Producto E", stock: 20, provider: "Proveedor B" },
    { id: 6, name: "Producto F", stock: 25, provider: "Proveedor C" },
    { id: 7, name: "Producto G", stock: 30, provider: "Proveedor D" },
    { id: 8, name: "Producto H", stock: 35, provider: "Proveedor E" },
    { id: 9, name: "Producto I", stock: 40, provider: "Proveedor F" },
    { id: 10, name: "Producto J", stock: 45, provider: "Proveedor G" },
  ]);

  useEffect(() => {
    // Aquí podrías cargar los productos con bajo stock desde una API
  }, []);

  const handleRestock = (id: number) => {
    console.log(`Solicitar reabastecimiento para producto con ID ${id}`);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="title">Stock Bajo</h1>
      <p className="text-gray-600 dark:text-white/50">Lista de productos que requieren reabastecimiento.</p>
      <div className="rounded-lg border p-4 shadow-md">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-head">Producto</th>
              <th className="table-head">Stock</th>
              <th className="table-head">Proveedor</th>
              <th className="table-head">Acción</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="table-row"
              >
                <td className="table-cell">{product.name}</td>
                <td className="table-cell font-bold text-red-500">{product.stock}</td>
                <td className="table-cell">{product.provider}</td>
                <td className="table-cell">
                  <Button
                    onClick={() => handleRestock(product.id)}
                    variant="secondary"
                  >
                    Reabastecer
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockPage;
