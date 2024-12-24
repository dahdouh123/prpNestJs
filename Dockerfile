# Stage 1: Build the application
FROM node:20.16.0-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20.16.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on (default is 3000, change if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]













