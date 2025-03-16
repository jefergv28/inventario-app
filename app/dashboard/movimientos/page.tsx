"use client";

import { useState } from "react";

interface Movement {
  id: number;
  date: string;
  user: string;
  product: string;
  type: "entrada" | "salida";
  quantity: number;
}

const MovementsPage = () => {
  const [movements, setMovements] = useState<Movement[]>([
    { id: 1, date: "2025-03-15", user: "Admin", product: "Laptop", type: "entrada", quantity: 10 },
    { id: 2, date: "2025-03-14", user: "Empleado1", product: "Mouse", type: "salida", quantity: 5 },
  ]);
  const [filters, setFilters] = useState({ date: "", user: "", product: "", type: "" });
  const [newMovement, setNewMovement] = useState({ product: "", type: "entrada", quantity: 0 });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredMovements = movements.filter((m) =>
    (filters.date ? m.date.includes(filters.date) : true) &&
    (filters.user ? m.user.includes(filters.user) : true) &&
    (filters.product ? m.product.includes(filters.product) : true) &&
    (filters.type ? m.type === filters.type : true)
  );

  const handleNewMovement = () => {
    if (!newMovement.product || newMovement.quantity <= 0) return;
    setMovements([
      ...movements,
      {
        id: movements.length + 1,
        date: new Date().toISOString().split("T")[0],
        user: "Admin",
        product: newMovement.product,
        type: newMovement.type as "entrada" | "salida",
        quantity: newMovement.quantity,
      },
    ]);
    setNewMovement({ product: "", type: "entrada", quantity: 0 });
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Movimientos de Inventario</h1>

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="input" />
        <input type="text" name="user" placeholder="Usuario" value={filters.user} onChange={handleFilterChange} className="input" />
        <input type="text" name="product" placeholder="Producto" value={filters.product} onChange={handleFilterChange} className="input" />
        <select name="type" value={filters.type} onChange={handleFilterChange} className="input">
          <option value="">Todos</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
      </div>

      {/* Tabla de movimientos */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Fecha</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Producto</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovements.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.date}</td>
              <td className="p-2">{m.user}</td>
              <td className="p-2">{m.product}</td>
              <td className={`p-2 ${m.type === "salida" ? "text-red-500" : "text-green-500"}`}>{m.type}</td>
              <td className="p-2">{m.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregar nuevo movimiento */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold">Registrar Movimiento</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <input type="text" placeholder="Producto" value={newMovement.product} onChange={(e) => setNewMovement({ ...newMovement, product: e.target.value })} className="input" />
          <select value={newMovement.type} onChange={(e) => setNewMovement({ ...newMovement, type: e.target.value })} className="input">
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
          <input type="number" placeholder="Cantidad" value={newMovement.quantity} onChange={(e) => setNewMovement({ ...newMovement, quantity: parseInt(e.target.value) || 0 })} className="input" />
        </div>
        <button onClick={handleNewMovement} className="button mt-4">Registrar Movimiento</button>
      </div>
    </div>
  );
};

export default MovementsPage;
