# Stage 1: Build the application
FROM maven:3.8.6-eclipse-temurin-17-alpine as builder
WORKDIR /app

# Copy only the necessary files for dependency resolution
COPY pom.xml .

# Copy the rest of the application source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Stage 2: Create the final image
FROM eclipse-temurin:17-alpine
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /app/target/*.jar application.jar

# Example: Copy logging configuration file (adjust paths)
# COPY logback.xml /app/logback.xml

# Command to run the application
CMD ["java", "-jar", "application.jar"]
