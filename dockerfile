# Use the official Node.js image as the base image
FROM node:lts-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install application dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your application listens on
EXPOSE 5003

# Start the application
CMD [ "node", "dist/server.js" ]