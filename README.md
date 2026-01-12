# 📦 SimpleStock – Inventory Management System

Aplicación de inventario desarrollada como prueba técnica, aplicando **Clean Architecture**, principios **SOLID**, **DDD**, persistencia con **PostgreSQL**, backend en **Node.js + Express + TypeScript**, y frontend en **Next.js + TypeScript + Tailwind CSS**, lista para despliegue con **Docker**.

---

## 🎯 Objetivo

Demostrar la implementación de una aplicación de gestión de inventario, priorizando:

- Separación de responsabilidades
- Reglas de negocio protegidas
- Arquitectura mantenible y escalable
- Buenas prácticas de desarrollo profesional

---

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture**, organizada en capas claramente definidas:

**backend/**

prisma/

└─ schema.prisma

src/

├─ application/

│ └─ use-case/

│ ├─ create-product.ts

│ ├─ list-products.ts

│ ├─ increase-stock.ts

│ └─ decrease-stock.ts

├─ domain/

│ ├─ entities/

│ │ └─ Product.ts

│ └─ repositories/

│ └─ ProductRepository.ts

├─ infraestructure/

│ └─ repositories/

│ └─ PrismaProductRepository.ts

├─ interfaces/

│ └─ http/

│ └─ controllers/

│ └─ ProductController.ts

└─ server.ts


**frontend/**

src/

├─ app/

│ ├─ sales/

│ ├─ stock/

│ └─ page.tsx

├─ components/

│ ├─ dashboard/

│ ├─ layout/ (Navbar, Header)

│ ├─ sales/ (SalesTable, CreateSaleForm)

│ └─ stock/ (StockGrid, CreateProductForm)

├─ services/

│ └─ api/ (products.ts, sales.ts)

└─ types/ (TypeScript interfaces, ZodSchema)

---

## 💻 Tecnologías

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express, TypeScript, Prisma  
- **Base de Datos:** PostgreSQL  
- **Control de Versiones:** Git + GitHub  
- **Despliegue:** Docker (backend), Vercel (frontend)  
- **IA:** Asistencia en generación de componentes, tipado y optimización de código

---

## ⚙️ Funcionalidades

1. **Gestión de Inventario**
   - Crear productos
   - Incrementar/Disminuir stock
   - Registrar ventas y calcular stock restante

2. **UI Profesional**
   - Tarjetas de productos y tablas de ventas
   - Indicadores de cambios de stock con colores
   - Modales para crear productos y ventas

3. **Validación**
   - Zod + React Hook Form para formularios
   - Feedback visual en caso de error de stock

4. **Persistencia**
   - Prisma ORM con PostgreSQL
   - Registro histórico de productos y ventas

---

## 🐳 Docker (Backend)

El backend está dockerizado y se conecta a la base de datos PostgreSQL alojada en **Render**.


### Construir contenedor del backend
docker build -t simplestock-backend ./backend

### Correr contenedor del backend
docker run -d -p 3000:3000 simplestock-backend

---

## 🚀 Despliegue

Frontend en Vercel: https://simple-stock-seven.vercel.app

Backend:https://simplestock.onrender.com

---

## 🤖 Uso de IA

Se utilizó ChatGPT como apoyo en:

- Generación de componentes React y modales
- Validación de tipado TypeScript
- Optimización de hooks y estructura de carpetas
- Diseño de mensajes de feedback y manejo de errores
- Realizar debug

----

## 🔧 Cómo correr localmente

Clonar el repositorio:

git clone https://github.com/elitangarife/SimpleStock.git
cd SimpleStock


### Backend:

- cd backend
- npm install
- npx prisma migrate dev
- npm run dev


### Frontend:

- cd frontend-inventario
- npm install
- npm run dev



```bash
