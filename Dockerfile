# Step 1: Use Node.js as the base image for building
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Use a lightweight image for serving static files
FROM nginx:alpine

# Create a non-root user for security
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup

# Copy the built files from the previous stage to the NGINX web server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optionally, copy a custom NGINX configuration file
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to make the container accessible
EXPOSE 80

# Switch to non-root user
USER appuser

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
