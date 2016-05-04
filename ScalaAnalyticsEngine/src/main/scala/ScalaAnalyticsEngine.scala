import org.apache.spark.sql._
import sqlContext._
import com.mongodb.casbah.{WriteConcern => MongodbWriteConcern}
import com.stratio.datasource.mongodb._
import com.stratio.datasource.mongodb.config._
import com.stratio.datasource.mongodb.config.MongodbConfig._
import com.stratio.datasource._
import com.stratio.datasource.mongodb.schema._
import com.stratio.datasource.mongodb.writer._
import com.stratio.datasource.mongodb.config._
import org.apache.spark.sql.SQLContext
import com.stratio.datasource.util.Config._

/** The Big Data engine behind the PPVCache */

object ScalaAnalyticsEngine {

  def main(args: Array[String]) {

    //User defined function to use to convert initail DataFrame fields from string to int
    val toInt    = udf[Int, String]( _.toInt)

    //User defined function to use to convert initail DataFrame fields from string to int
    val addColumn = udf[Column a , Column b]=>(a+b)

    // initiliaze all spark contexts
    val conf = new SparkConf().setAppName("ScalaAnalyticsEngine")
    val spark = new SparkContext(conf)
    val sqlContext = new SQLContext(spark)

    val username = "ccUser"
    val database = "campusconnection"
    val password = "SlatfatfSsih2c2t"
    val inTable = "ads"
    val outTable = "ppvCacheTest"
    val mongoDBhost = "campusconnection.us:27017"
    val credentials = username + "," + database + "," + password 

    spark.stop()
  }
}