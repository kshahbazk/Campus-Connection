name := "ScalaAnalyticsEngine"

version := "1.0"

scalaVersion := "2.11.4"

libraryDependencies += "org.apache.spark" % "spark-core_2.11" % "1.6.1"

libraryDependencies += "org.apache.spark" % "spark-core_2.11" % "1.6.1"

unmanagedBase := baseDirectory.value / "custom_libs"
