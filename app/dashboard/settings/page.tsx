"use client";

import Image from "next/image";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaUserCog, FaBell, FaGlobe, FaLock } from "react-icons/fa";

const SettingsPage = () => {
  const [user, setUser] = useState({
    profilePicture: "",
    password: "",
    language: "es",
    notifications: true,
    role: "Usuario",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const checked = "checked" in target ? target.checked : undefined;

    setUser((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-lg bg-gray-100 p-8 shadow-lg">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <FaUserCog /> Configuración
      </h1>

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Perfil de Usuario</h2>
        <div className="flex items-center gap-4">
          <Image
            src={user.profilePicture || "/profile-image.jpg"}
            alt="Foto de perfil"
            width={80}
            height={80}
            className="rounded-full border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="rounded-md border p-2"
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={user.password}
          onChange={handleChange}
          className="mt-2 w-full rounded border p-2"
        />
      </div>

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
          <FaGlobe /> Preferencias
        </h2>
        <label className="flex items-center gap-2">
          <span>Idioma:</span>
          <select
            name="language"
            value={user.language}
            onChange={handleChange}
            className="rounded border p-2"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </label>
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaBell /> Recibir notificaciones
          </span>
          <Switch
            checked={user.notifications}
            onChange={() => setUser((prev) => ({ ...prev, notifications: !prev.notifications }))}
            className={`${user.notifications ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${user.notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </label>
      </div>

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
          <FaLock /> Gestión de Permisos
        </h2>
        <p className="text-gray-600">
          Rol actual: <strong className="text-gray-800">{user.role}</strong>
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
