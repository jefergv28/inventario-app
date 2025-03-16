"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Edit, Trash2 } from "lucide-react";

// Datos de ejemplo
const mockProducts = [
  { id: 1, name: "Laptop HP", quantity: 10, price: 2500000, category: "Electrónica", provider: "HP" },
  { id: 2, name: "Mouse Logitech", quantity: 50, price: 80000, category: "Accesorios", provider: "Logitech" },
  { id: 3, name: "Teclado Redragon", quantity: 30, price: 150000, category: "Accesorios", provider: "Redragon" },
  { id: 4, name: "Monitor Samsung", quantity: 15, price: 1200000, category: "Electrónica", provider: "Samsung" },
];

const ProductsPage = () => {
  const [products] = useState(mockProducts);
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [filterProvider, setFilterProvider] = useState("Todos");

  // Aplicar filtros
  const filteredProducts = products.filter((product) => {
    return (filterCategory === "Todos" || product.category === filterCategory) && (filterProvider === "Todos" || product.provider === filterProvider);
  });

  return (
    <div className="space-y-6 p-6">
      <div className="card-header">
        <p className="title">Productos</p>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          <option value="Todos">Todas las Categorías</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Accesorios">Accesorios</option>
        </select>

        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterProvider(e.target.value)}
          value={filterProvider}
        >
          <option value="Todos">Todos los Proveedores</option>
          <option value="HP">HP</option>
          <option value="Logitech">Logitech</option>
          <option value="Redragon">Redragon</option>
          <option value="Samsung">Samsung</option>
        </select>

        <Button variant="outline">
          <Filter className="mr-2 h-5 w-5" />
          Filtrar
        </Button>
      </div>

      {/* Tabla de productos */}
      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Nombre</th>
                  <th className="table-head">Cantidad</th>
                  <th className="table-head">Precio</th>
                  <th className="table-head">Categoría</th>
                  <th className="table-head">Proveedor</th>
                  <th className="table-head">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="table-row"
                  >
                    <td className="table-cell">{product.name}</td>
                    <td className="table-cell">{product.quantity}</td>
                    <td className="table-cell">${product.price.toLocaleString()}</td>
                    <td className="table-cell">{product.category}</td>
                    <td className="table-cell">{product.provider}</td>
                    <td className="table-cell">
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Edit className="mr-2 h-5 w-5" />
                          Editar
                        </Button>
                        <Button variant="destructive">
                          <Trash2 className="mr-2 h-5 w-5" />
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
