"use client";

import Footer from "../layout/Footer";
import StockComparison from "./componest/StockComparison";
import SupplierBarChart from "./componest/SupplierBarChart";
import SupplierPieChart from "./componest/SupplierPieChart";
import { TrendOverTime, TrendStock } from "./componest/Trends";

const AnalyticsPage = () => (
  <div className="p-6">
    <h1 className="title">Analítica de Inventario</h1>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Productos más movidos */}
      <div className="card rounded-2xl p-4 shadow-md">
        <h2 className="cart-title">Productos más movidos</h2>
        <TrendStock />
      </div>

      {/* Entradas vs Salidas en el tiempo */}
      <div className="card rounded-2xl p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Entradas vs Salidas en el tiempo</h2>
        <TrendOverTime />
      </div>

      {/* Comparación de stock actual vs. histórico */}
      <div className="card col-span-1 rounded-2xl p-4 shadow-md md:col-span-2">
        <h2 className="mb-4 text-lg font-semibold">Comparación de stock actual vs. histórico</h2>
        <StockComparison />
      </div>

      {/* Distribución de proveedores */}
      <div className="card rounded-2xl p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Distribución de proveedores</h2>
        <SupplierPieChart />
      </div>

      {/* Productos más comprados por proveedor */}
      <div className="card rounded-2xl p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Productos más comprados por proveedor</h2>
        <SupplierBarChart />
      </div>
    </div>
    <Footer />
  </div>
);

export default AnalyticsPage;
