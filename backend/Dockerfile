# -----------------------------
# Stage 1: Build Stage
# -----------------------------

# Use Node.js 18 with Alpine Linux (lightweight image)
# This stage will be used to install dependencies and prepare the app
FROM node:18-alpine AS builder

# Set the working directory inside the container
# All commands after this will run inside /app
WORKDIR /app

# Copy dependency files first (improves Docker caching)
# If package.json doesn't change, Docker won't reinstall dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
# npm ci ensures clean installation using package-lock.json
# --only=production skips devDependencies like nodemon, eslint etc.
RUN npm ci --only=production

# Copy the rest of the application source code into the container
COPY . .


# -----------------------------
# Stage 2: Production Stage
# -----------------------------

# Start a fresh lightweight Node.js image
# This keeps the final image smaller and cleaner
FROM node:18-alpine

# Set working directory again in the new image
WORKDIR /app

# Copy installed dependencies from the builder stage
# This avoids reinstalling npm packages again
COPY --from=builder /app/node_modules ./node_modules

# Copy the application source code from the builder stage
COPY --from=builder /app ./

# Set environment variable for production mode
# This improves performance and disables dev features
ENV NODE_ENV=production

# Tell Docker that the application listens on port 5000
# (Actual port mapping happens during docker run)
EXPOSE 5000

# Command that runs when the container starts
# This executes "npm start" which should start your Node.js server
CMD ["npm", "start"]
