# Use alpine light distro
FROM node:alpine

# Start in app directory
WORKDIR usr/src/app

# Copy package json config
COPY package.json .

# Update existing packages
RUN \
    echo -e "\nUpdating packages..." && \
    apk update && apk upgrade

# Core utils
RUN \
    echo -e "\nInstalling Core utilities..." && \
    apk add \
        git

# Install deps.
RUN \
    echo -e "\nInstalling Node packages..." && \
    npm install

# Copy other files
COPY . .

# Ports
EXPOSE 3000