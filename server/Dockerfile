# Use a modern Node version
FROM node:18-alpine

# Install Python and build tools required for native modules
RUN apk add --no-cache python3 py3-pip make g++

WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install

# Set environment variables
ENV BACKEND_URL="http://159.198.47.173:8084/api"

# Expose your app port
EXPOSE 8084

CMD ["npm", "start"]