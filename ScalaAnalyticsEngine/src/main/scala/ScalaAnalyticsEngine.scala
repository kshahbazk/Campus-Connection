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
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql._

/** The Big Data engine behind the PPVCache */

object ScalaAnalyticsEngine {
  def main(args: Array[String]) {
    // initiliaze all spark contexts
    val conf = new SparkConf().setAppName("ScalaAnalyticsEngine")
    val spark = new SparkContext(conf)
    val sqlContext = new SQLContext(spark)
    // initialize all the authentication parameters
    val user = "ccUser"
    val database = "campusconnection"
    val password = "SlatfatfSsih2c2t"
    val inTable = "ads"
    val outTable = "ppvCacheTest"
    val mongoDBhost = "campusconnection.us:27017"
    val credentials = user + "," + database + "," + password
    /** Pull in the ads table from MongoDB **/
    val adsMongoConfig = MongodbConfigBuilder(Map(Host -> List("campusconnection.us:27017"), 
        Credentials -> List(com.stratio.datasource.mongodb.config.MongodbCredentials(user, database, password.toCharArray)), 
        Database -> "campusconnection", Collection ->"ads", SamplingRatio -> 1.0, WriteConcern -> "normal"))
    val readConfig = adsMongoConfig.build()
    val mongoRDD = sqlContext.fromMongoDB(readConfig)
    /** Use the PPV caluclation algorithm on ads Dataframe **/
    val orderbyPPVpointer = mongoRDD.groupBy("ppvPointer").agg("price" -> "avg")
    // Now get the PPV cache
    val ppvMongoConfig = MongodbConfigBuilder(Map(Host -> List("campusconnection.us:27017"), 
        Credentials -> List(com.stratio.datasource.mongodb.config.MongodbCredentials(user, database, password.toCharArray)), 
        Database -> "campusconnection", Collection ->"ppvcaches", SamplingRatio -> 1.0, WriteConcern -> "normal"))
    val readConfigPPV = ppvMongoConfig.build()
    val ppvRDD = sqlContext.fromMongoDB(readConfigPPV)
    // Do a join of new ppv values and ppc cache
    val joined = orderbyPPVpointer.join(ppvRDD, orderbyPPVpointer("ppvPointer")===ppvRDD("_id"))
    // Drop ppv pointer and old ppv value
    val dropPPVandPPVPointer = joined.drop("ppvPointer").drop("ppv")
    // Update ppv and drop __v
    val ppvCache = dropPPVandPPVPointer.withColumnRenamed("avg(price)","ppv").drop("__v")
    /** Prepare Dataframe to be written into MongoDB **/
    val saveConfig = MongodbConfigBuilder(Map(Host -> List("campusconnection.us:27017"), 
        Credentials -> List(com.stratio.datasource.mongodb.config.MongodbCredentials(user, database, password.toCharArray)), 
        Database -> "campusconnection", Collection ->"ppvcaches", SamplingRatio -> 1.0, WriteConcern -> "normal", SplitSize -> 8,
        SplitKey -> "_id"))    
    // Write our ppvCache Dataframe into MongoDB
    ppvCache.saveToMongodb(saveConfig.build)
    // Close the Spark Context when we are done.
    spark.stop()
  }
}
