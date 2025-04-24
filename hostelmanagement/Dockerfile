# Use Maven with JDK 21 for building
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml and resolve dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source files
COPY src ./src

# Build the application, skipping tests
RUN mvn clean package -DskipTests

# Use JDK 21 to run the built JAR
FROM eclipse-temurin:21-jdk-jammy

# Set working directory
WORKDIR /app

# Copy the jar from the builder
COPY --from=build /app/target/hostelmanagementServer-0.0.1-SNAPSHOT.jar .

# Expose the Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/hostelmanagementServer-0.0.1-SNAPSHOT.jar"]
