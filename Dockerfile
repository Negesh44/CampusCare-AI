# Build stage using official Maven image with Temurin JDK 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source and build jar
COPY backend/src ./src
RUN mvn clean package -DskipTests -B

# Runtime stage using lightweight Temurin JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Run as non-root user
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE ${PORT}

# JVM tuning for Render 512MB free tier
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]
