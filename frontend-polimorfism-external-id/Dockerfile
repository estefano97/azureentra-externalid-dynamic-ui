# Etapa única: build + serve con vite preview
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock (si lo tienes)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Build de producción
RUN npm run build

# Vite preview usa por defecto el puerto 4173
EXPOSE 4173

# Comando para servir el build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
