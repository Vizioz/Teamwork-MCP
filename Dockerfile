FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port (though MCP typically doesn't need this, it's good practice)
EXPOSE 3000

# Set the command to run the built application
CMD ["node", "build/index.js"]
