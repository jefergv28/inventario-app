"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import useProductos from "@/app/hooks/useProductos";

const ProductsPage = () => {
  const { productos = [], loading, error } = useProductos();
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [filterProvider, setFilterProvider] = useState("Todos");

  console.log("📌 Productos en ProductsPage:", productos);

  if (loading) return <p aria-live="polite">Cargando productos...</p>;
  if (error) return <p className="text-red-500">Error al cargar productos: {error}</p>;

  const safeProductos = Array.isArray(productos) ? productos : [];

  const categorias = ["Todos", ...new Set(safeProductos.map((p) => p.categoria || "Desconocida"))];
  const proveedores = ["Todos", ...new Set(safeProductos.map((p) => p.proveedor || "Desconocido"))];

  const filteredProducts = safeProductos.filter((product) => {
    return (
      (filterCategory === "Todos" || product.categoria === filterCategory) && (filterProvider === "Todos" || product.proveedor === filterProvider)
    );
  });

  return (
    <div className="space-y-6 p-6">
      <div className="card-header">
        <p className="title">Productos</p>
      </div>

      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>

        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilterProvider(e.target.value)}
          value={filterProvider}
        >
          {proveedores.map((proveedor) => (
            <option
              key={proveedor}
              value={proveedor}
            >
              {proveedor}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          onClick={() => {
            setFilterCategory("Todos");
            setFilterProvider("Todos");
          }}
        >
          <Filter className="mr-2 h-5 w-5" />
          Limpiar Filtros
        </Button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No hay productos disponibles con los filtros seleccionados.</p>
            ) : (
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
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      className="table-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="table-cell">{product.nombreProducto}</td>
                      <td className="table-cell">{product.cantidadProducto}</td>
                      <td className="table-cell">${product.precioProducto.toLocaleString()}</td>
                      <td className="table-cell">{product.categoria}</td>
                      <td className="table-cell">{product.proveedor}</td>
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
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
