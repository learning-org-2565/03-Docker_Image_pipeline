# Step 1: Use Node.js to build the frontend
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

# Copy the built files from the previous stage to the NGINX web server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to make the container accessible
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
