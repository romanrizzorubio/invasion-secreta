# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY packages/front/package*.json ./packages/front/

# Install dependencies
RUN npm install

# Copy frontend source
COPY packages/front ./packages/front

# Build frontend
RUN npm run build --workspace=packages/front

# Production stage with nginx
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/packages/front/build /usr/share/nginx/html

# Copy nginx configuration
COPY packages/front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]