name := "ScalaAnalyticsEngine"

version := "1.0"

scalaVersion := "2.11.4"

libraryDependencies += "org.apache.spark" %% "spark-core" % "1.6.1" % "provided"

libraryDependencies += "org.apache.spark" %% "spark-sql" % "1.6.1" % "provided"

unmanagedBase := baseDirectory.value / "custom_libs"