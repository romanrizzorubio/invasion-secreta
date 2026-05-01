# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY packages/back/package*.json ./packages/back/

# Install dependencies
RUN npm install

# Copy backend source
COPY packages/back ./packages/back

# Build backend
RUN npm run build --workspace=packages/back

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY packages/back/package*.json ./packages/back/

# Install only production dependencies
RUN npm install --production

# Copy built files
COPY --from=builder /app/packages/back/dist ./packages/back/dist

EXPOSE 4000

CMD ["npm", "run", "start:back"]