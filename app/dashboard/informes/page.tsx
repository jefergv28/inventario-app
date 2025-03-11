"use client";
import { mockReports } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Download, Upload, Filter } from "lucide-react";
import Image from "next/image";
import Footer from "../layout/Footer";

const ReportsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="card-header">
        <p className="title">Informes</p>
      </div>

      {/* Filtros avanzados */}
      <div className="flex items-center gap-4">
        <input
          type="date"
          placeholder="Fecha inicio"
          className="text-black dark:text-white"
        />
        <input
          type="date"
          placeholder="Fecha fin"
          className="text-black dark:text-white"
        />
        <Button variant="outline">
          <Filter className="mr-2 h-5 w-5" />
          Filtrar
        </Button>
      </div>

      {/* Tabla de informes */}
      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Fecha</th>
                  <th className="table-head">Tipo</th>
                  <th className="table-head">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {mockReports.map((report) => (
                  <tr
                    key={report.id}
                    className="table-row"
                  >
                    <td className="table-cell">{report.date}</td>
                    <td className="table-cell">{report.type}</td>
                    <td className="table-cell">
                      <Button variant="outline">
                        <Download className="mr-2 h-5 w-5" />
                        PDF
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-5 w-5" />
                        Excel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botones de Importación y Exportación */}
      <div className="mt-6 flex flex-wrap gap-4 text-black dark:text-white">
        <Button variant="secondary">
          <Upload className="mr-2 h-5 w-5" />
          Importar desde Google Drive
          <Image
            src="/integrations/google_drive.svg"
            alt="Google Drive"
            width={20} // Ajusta el tamaño según necesites
            height={20}
            className="ml-2"
          />
        </Button>
        <Button variant="secondary">
          <Upload className="mr-2 h-5 w-5" />
          Importar desde Dropbox
          <Image
            src="/integrations/dropbox.svg"
            alt="Google Drive"
            width={20} // Ajusta el tamaño según necesites
            height={20}
            className="ml-2"
          />
        </Button>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-black dark:text-white">
        <Button variant="secondary">
          <Download className="mr-2 h-5 w-5" />
          Exportar a Google Drive
          <Image
            src="/integrations/google_drive.svg"
            alt="Google Drive"
            width={20} // Ajusta el tamaño según necesites
            height={20}
            className="ml-2"
          />
        </Button>
        <Button variant="secondary">
          <Download className="mr-2 h-5 w-5" />
          Exportar a Dropbox
          <Image
            src="/integrations/dropbox.svg"
            alt="Google Drive"
            width={20} // Ajusta el tamaño según necesites
            height={20}
            className="ml-2"
          />
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ReportsPage;
