# Use a lightweight and official Node.js image as the base
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install TypeScript globally
RUN npm install -g typescript

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Set the environment variable for the port
ENV PORT=5003

# Expose the port
EXPOSE 5003

# Use a non-root user for better security
# Replace 'userId' with a valid user ID or username
USER userId

# Start the application
CMD ["node", "dist/server.js"]