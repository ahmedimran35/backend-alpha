# Use the official Node.js 14 image as base
FROM node 

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code into the container
COPY . .

# Build your application
RUN npm run build

# Use a lighter image for your application
FROM node 

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy built files and dependencies from the previous stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 5003

# Command to run the application
CMD ["node", "./build/server.js"]

