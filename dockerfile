FROM node:lts-alpine3.19

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's layer caching mechanism
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy environment file
# COPY .env .env

# Run the build command
RUN npm run build

# Expose the port
EXPOSE 5003

# Change permission of entrypoint script
#RUN ["chmod", "+x", "./entrypoint.sh"]

# Set the entrypoint
ENTRYPOINT ["sh", "./entrypoint.sh"]

