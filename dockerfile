# Use the official Node.js LTS image as the base
FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the entire application code
COPY . .

# Build the application (if necessary)
# RUN npm run build

# Set environment variables
ENV NODE_ENV=production \
    PORT=5003

# Expose the port
EXPOSE 5003

# Use a non-root user for better security
# Replace 'userId' with a valid user ID or username
USER userId

# Start the application
CMD ["node", "entrypoint.sh"]