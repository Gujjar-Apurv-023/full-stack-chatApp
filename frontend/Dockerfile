# -----------------------------
# Stage 1: Build the frontend
# -----------------------------

# Use Node.js to build the React/Vite application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first (for Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the production frontend
# This creates the /dist folder (Vite build output)
RUN npm run build


# -----------------------------
# Stage 2: Serve with Nginx
# -----------------------------

# Use lightweight Nginx image to serve static files
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
