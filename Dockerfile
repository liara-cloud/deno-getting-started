# Use the official Deno image from Docker Hub
FROM denoland/deno:alpine-1.30.0

# Set the working directory inside the container
WORKDIR /app

# Copy the Deno app code into the container
COPY . .

# Allow Deno to read and write the necessary files
RUN deno cache server.ts

# # Expose the port the app will run on (e.g., 8000)
# EXPOSE 8000

# Command to run the Deno app when the container starts
CMD ["deno", "run", "--allow-net", "--allow-read", "server.ts"]
