📦 SimpleStock – Inventory Management System

Aplicación de inventario desarrollada como prueba técnica, aplicando Clean Architecture, principios SOLID, DDD, persistencia con PostgreSQL, backend en Node.js + Express + TypeScript, y preparada para despliegue con Docker.

🎯 Objetivo

Demostrar la implementación de una aplicación backend robusta para gestión de inventario, priorizando:

Separación de responsabilidades

Reglas de negocio protegidas

Arquitectura mantenible y escalable

Buenas prácticas de desarrollo profesional

🏗️ Arquitectura

El proyecto sigue Clean Architecture, organizada en capas claramente definidas:


backend/
├─ prisma/
│  └─ schema.prisma
│
├─ src/
|    ├── application/
│       └── use-case/
│           ├── create-product.ts
│           ├── list-products.ts
│           ├── increase-stock.ts
│           └── decrease-stock.ts
│
|    ├── domain/
│       ├── entities/
│       │   └── Product.ts
│       └── repositories/
│         └── ProductRepository.ts
│
|    ├── infraestructure/
│       └── repositories/
│         └── PrismaProductRepository.ts
│
|    ├── interfaces/
│        └── http/
│           └── controllers/
│            └── ProductController.ts
│
│
|    ├── server.ts

