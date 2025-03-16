"use client";

import { Button } from "@/components/ui/button";
import { Check, X, Filter } from "lucide-react";
import Footer from "../layout/Footer";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Denied";
};

// Datos de ejemplo
const mockVerifiedUsers: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", status: "Pending" },
  { id: 2, name: "Ana López", email: "ana@example.com", status: "Approved" },
  { id: 3, name: "Carlos Gómez", email: "carlos@example.com", status: "Denied" },
];

const VerifiedUsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockVerifiedUsers);

  const updateStatus = (id: number, newStatus: User["status"]) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Encabezado */}
      <div className="card-header">
        <p className="title">Usuarios Verificados</p>
      </div>

      {/* Botón de filtro */}
      <div className="flex items-center gap-4">
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
                  <th className="table-head">Correo</th>
                  <th className="table-head">Estado</th>
                  <th className="table-head">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="table-row"
                  >
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.email}</td>
                    <td
                      className={`table-cell font-semibold ${user.status === "Approved" ? "text-green-600" : user.status === "Denied" ? "text-red-600" : "text-yellow-600"}`}
                    >
                      {user.status}
                    </td>
                    <td className="table-cell">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          disabled={user.status === "Approved"}
                          onClick={() => updateStatus(user.id, "Approved")}
                        >
                          <Check className="mr-2 h-5 w-5" />
                          Aprobar
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={user.status === "Denied"}
                          onClick={() => updateStatus(user.id, "Denied")}
                        >
                          <X className="mr-2 h-5 w-5" />
                          Denegar
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

export default VerifiedUsersPage;
