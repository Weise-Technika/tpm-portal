# Step 1: Build Stage
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Astro project
RUN npm run build

# Step 2: Production Stage
FROM node:20-slim AS runner

# Set the working directory
WORKDIR /app

# Copy the built files and necessary package files from the builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --production

RUN npm install -g astro && astro preferences disable devToolbar

# Expose the default port Astro uses
EXPOSE 3000

# Start the application
CMD ["npm", "start"]