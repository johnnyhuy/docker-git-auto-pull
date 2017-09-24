# Use alpine light distro
FROM node:alpine

# Start in app directory
WORKDIR usr/src/app

# Copy package json config
COPY package.json .

# Install deps.
RUN npm install

# Copy other files
COPY . .

# Ports
EXPOSE 3000