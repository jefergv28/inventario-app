"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";

const movementsData = [
  { id: 1, date: "2025-03-20", user: "Admin", product: "Producto A", type: "Entrada", quantity: 10 },
  { id: 2, date: "2025-03-21", user: "Usuario1", product: "Producto B", type: "Salida", quantity: 5 },
  { id: 3, date: "2025-03-22", user: "Admin", product: "Producto C", type: "Entrada", quantity: 20 },
  { id: 4, date: "2025-03-23", user: "Usuario2", product: "Producto A", type: "Salida", quantity: 3 },
];

const MovementHistoryPage = () => {
  const [movements] = useState(movementsData);
  const [filters, setFilters] = useState({ date: "", user: "", product: "", type: "" });

  const filteredMovements = movements.filter(
    (movement) =>
      (!filters.date || movement.date === filters.date) &&
      (!filters.user || movement.user.includes(filters.user)) &&
      (!filters.product || movement.product.includes(filters.product)) &&
      (!filters.type || movement.type === filters.type),
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="title">Historial de Movimientos</h1>
      <p className="text-gray-600 dark:text-white/50">Registros de entradas y salidas de productos.</p>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <input
          type="date"
          className="input"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Usuario"
          className="input"
          onChange={(e) => setFilters({ ...filters, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Producto"
          className="input"
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
        />
        <select
          className="input"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>
      </div>

      {/* Tabla de Movimientos */}
      <div className="rounded-lg border p-4 shadow-md">
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-head">Fecha</th>
              <th className="table-head">Usuario</th>
              <th className="table-head">Producto</th>
              <th className="table-head">Tipo</th>
              <th className="table-head">Cantidad</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredMovements.map((movement, index) => (
              <motion.tr
                key={movement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b"
              >
                <td className="table-cell">{movement.date}</td>
                <td className="table-cell">{movement.user}</td>
                <td className="table-cell">{movement.product}</td>
                <td className={`table-cell font-bold ${movement.type === "Entrada" ? "text-green-500" : "text-red-500"}`}>{movement.type}</td>
                <td className="table-cell">{movement.quantity}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default MovementHistoryPage;
