"use client";

import { Button } from "@/components/ui/button";
import { Filter, Edit, Trash2 } from "lucide-react";
import Footer from "../layout/Footer";
import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Juan Pérez", role: "Administrador" },
  { id: 2, name: "María Gómez", role: "Empleado" },
  { id: 3, name: "Carlos López", role: "Empleado" },
  { id: 4, name: "Ana Rodríguez", role: "Administrador" },
];

const UsersPage = () => {
  const [filter, setFilter] = useState("Todos");

  const filteredUsers = filter === "Todos" ? mockUsers : mockUsers.filter((user) => user.role === filter);

  return (
    <div className="mt-0 space-y-6 p-6">
      <div className="card-header">
        <p className="title">Usuarios</p>
      </div>

      {/* Filtros por roles */}
      <div className="flex items-center gap-4">
        <select
          className="rounded border p-2 text-black dark:text-white"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="Todos">Todos</option>
          <option value="Administrador">Administradores</option>
          <option value="Empleado">Empleados</option>
        </select>
        <Button variant="outline">
          <Filter className="mr-2 h-5 w-5" />
          Filtrar
        </Button>
      </div>

      {/* Tabla de usuarios */}
      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Nombre</th>
                  <th className="table-head">Rol</th>
                  <th className="table-head">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="table-row"
                  >
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.role}</td>
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

      <Footer />
    </div>
  );
};

export default UsersPage;
