📦 Inventario Pro
Inventario Pro es una aplicación web para la gestión eficiente de inventarios. Permite registrar productos, gestionar stock, analizar estadísticas y optimizar la administración de recursos mediante una interfaz intuitiva.

🚀 Características
✅ Gestión de productos: Agregar, modificar y eliminar productos.
🔍 Búsqueda avanzada: Encuentra productos fácilmente con un buscador global.
📊 Estadísticas interactivas: Gráficos de tendencias de stock y movimientos.
🏷 Gestión de proveedores: Registro y administración de proveedores.
🔔 Notificaciones: Avisos sobre stock bajo y movimientos recientes.
🔐 Control de usuarios: Roles y permisos para diferentes tipos de usuarios.

🛠 Tecnologías utilizadas
Frontend
Next.js (Framework de React para el frontend)

TypeScript (Tipado estático para mayor seguridad y escalabilidad)

Tailwind CSS (Estilos modernos y personalizables)

Recharts (Gráficos dinámicos y visualización de datos)

Backend
Spring Boot (API en Java para la gestión de datos)

MySQL (Base de datos para almacenamiento de productos y usuarios)

Spring Security + JWT (Autenticación y autorización)

📦 Instalación y ejecución
1️⃣ Clona este repositorio:
bash
Copiar
Editar
git clone https://github.com/jefergv28/inventario-app.git
cd inventario-app
2️⃣ Configura el Backend
Crea un archivo .env en la carpeta del backend (inventario-pro-api/) con el siguiente contenido:

env
Copiar
Editar
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/inventario_db
SPRING_DATASOURCE_USERNAME=tu_usuario
SPRING_DATASOURCE_PASSWORD=tu_contraseña
JWT_SECRET=clave_super_secreta
Luego, ejecuta:

bash
Copiar
Editar
cd inventario-pro-api
mvn spring-boot:run
3️⃣ Configura el Frontend
Instala las dependencias:

bash
Copiar
Editar
cd ../inventario-pro
npm install

# o

pnpm install
Inicia el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abre http://localhost:3000 en tu navegador.

📂 Estructura del Proyecto
bash
Copiar
Editar
/inventario-app
├── inventario-pro/ # Frontend con Next.js
│ ├── app/ # Directorio principal
│ ├── components/ # Componentes reutilizables
│ ├── services/ # Llamadas a API
│ ├── styles/ # Estilos globales
│ ├── public/ # Imágenes y recursos estáticos
│ ├── package.json # Dependencias
│ └── README.md # Documentación del frontend
├── inventario-pro-api/ # Backend con Spring Boot
│ ├── src/main/java/ # Código fuente
│ ├── src/main/resources/ # Configuración y properties
│ ├── pom.xml # Dependencias de Maven
│ └── README.md # Documentación del backend
└── README.md # Este documento
🔑 Roles y Permisos
👑 Administrador: Puede agregar, editar y eliminar productos, gestionar usuarios y visualizar estadísticas.

👤 Usuario estándar: Solo puede visualizar el inventario y realizar búsquedas.

📌 Ejemplo de Requests a la API
🔐 Autenticación (Login)
bash
Copiar
Editar
POST http://localhost:8000/auth/login
Content-Type: application/json

{
"email": "admin@email.com",
"password": "admin123"
}
📦 Obtener Productos
bash
Copiar
Editar
GET http://localhost:8000/api/productos
Authorization: Bearer <TOKEN>
🚀 Despliegue en Vercel
Para desplegar en Vercel:

Crea una cuenta en Vercel.

Conéctate con GitHub y selecciona el repositorio.

Configura las variables de entorno necesarias.

Haz clic en Deploy y espera a que se genere la URL.

📹 Demo y Capturas
🚀 Ver demo en video (Sube el video a YouTube y pon el enlace aquí)

📌 Capturas de pantalla:
(Aquí debes agregar imágenes de la aplicación en acción)

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Para colaborar:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature-nueva).

Realiza cambios y haz commit (git commit -m "Agrega nueva funcionalidad").

Sube los cambios (git push origin feature-nueva).

Abre un Pull Request en GitHub.

📄 Licencia
Este proyecto está bajo la licencia MIT, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente.
