set -e
java -cp microdonuts/target/api-1.0-SNAPSHOT.jar -Dorg.eclipse.jetty.util.log.classrg.eclipse.jetty.util.log.StdErrLog com.otsample.api.App
