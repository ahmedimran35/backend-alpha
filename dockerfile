# Use a lightweight and official Node.js image as the base
FROM node:18-slim

# Use the official Node.js 14 image as base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the built files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5003

# Command to run the application
CMD ["node", "server.js"]
