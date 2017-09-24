# Use alpine light distro
FROM node:alpine

# Start in app directory
WORKDIR usr/src/app

# Copy package json config
COPY package.json .

# Update existing packages
RUN apk update && apk upgrade

# Core utils
RUN \
    echo -e "\nInstalling Core utilities..." && \
    apk add \
        git

# Install deps.
RUN npm install

# Copy other files
COPY . .

# Ports
EXPOSE 3000