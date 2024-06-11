# Use the official Node.js LTS image as the base
FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including development dependencies)
RUN npm install

# Copy the entire application code
COPY . .

# Copy the .env file
COPY .env .env

# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Set environment variables
ENV NODE_ENV=production \
    PORT=5003

# Expose the port
EXPOSE 5003

# Start the application
CMD ["node", "dist/server.js"]
