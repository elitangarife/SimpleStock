# 1. Imagen base
FROM node:20-alpine

# 2. Crear directorio de la app
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código
COPY . .

# 6. Construir TypeScript
RUN npm run build

# 7. Exponer puerto
EXPOSE 3000

# 8. Comando para correr la app
CMD ["node", "dist/server.js"]
