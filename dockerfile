FROM node   
#directly use node image

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install application dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build
#build 
EXPOSE 5003

ENTRYPOINT [ "node", "dist/server.js" ]