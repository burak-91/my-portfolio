# Multi-stage build: Maven ile derle, ince JRE imajinda calistir
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Prod'da application-local.properties yok; sirlar ortam degiskenlerinden gelir
ENV SPRING_EXTRA_PROFILES=prod
CMD ["java", "-jar", "app.jar"]
