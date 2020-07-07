FROM openjdk:11.0.7-jre

COPY microdonuts/target/api-1.0-SNAPSHOT.jar /api-1.0-SNAPSHOT.jar
COPY microdonuts/tracer_config.properties /config/tracer_config.properties
COPY client/ /client/

EXPOSE 10001

ENTRYPOINT ["java", "-cp", "/api-1.0-SNAPSHOT.jar", "-Dorg.eclipse.jetty.util.log.classrg.eclipse.jetty.util.log.StdErrLog", "com.otsample.api.App", "/config/tracer_config.properties"]

