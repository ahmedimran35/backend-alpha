# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file to the working directory
COPY .env .env

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5003

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD [ "node", "dist/server.js" ]
