using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Net.Http.Headers;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Shared;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

using MongoDB.Driver.GeoJsonObjectModel;
// builders is in mongodb legacy package, you have to install it 
using MongoDB.Driver.Builders;

using System.Threading.Tasks;
using CivilGis.Models;
using System.Text.RegularExpressions;

namespace CivilGis.Controllers
{



   






    public class GeojsonController : ApiController
    {

        protected static IMongoClient _mongoClient;
        protected static IMongoDatabase _mongoDatabase;





        // get all collection name from mongodb by area
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> maplistcontent(string area)
        {


            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);

            //_mongoDatabase.ListCollectionsAsync
           // List<BsonDocument> list = _mongoDatabase.ListCollectionsAsync().Result.ToListAsync().Result;

            string result = "[";
            int count = 0;
            area = area + "_";
            using (var cursor = await _mongoDatabase.ListCollectionsAsync())
            {
                while (await cursor.MoveNextAsync())
                {
                    var batch = cursor.Current;
                    foreach (var bsonDocument in batch)
                    {
                        var _collection_nm = bsonDocument.GetValue("name");
                        
                        
                        string rd = _collection_nm.ToString();

                        if (rd.Contains(area) == true)
                        {
                            // output format: [[1,"oc_address"],[2,"oc_bounds"],[3,"oc_cities"],[4,"oc_education_facility"],[5,"oc_fire_grid"],[6,"oc_fire_stations"],[7,"oc_hospitals"],[8,"oc_hwy_majorrd"],[9,"oc_rails"],[10,"oc_streets"],[11,"oc_water"]]

                            count++;
                            result = result + '[' + Convert.ToString(count)+ ',' + '"' +rd + '"' +"],";
                            
                        }//if
                    }
                }



            }// using

            // remove last ","
            result = result.Remove(result.Length - 1);

            result = result + "]";



            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }









        // need to use 'async task<>' for await method (mongodb api require)
        // this is current version in use
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
        {


            // embeded connection string in code
            //_mongoClient = new MongoClient("mongodb://localhost:27017");
           // _mongoDatabase = _mongoClient.GetDatabase("civilgis");


            // set connection string in web.config 
             _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);         
             _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
             var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);

             var table_name = area + "_" + subj;


             if (area.Equals("city"))
             {
                 table_name = subj;
             }

             if (area.Equals("county"))
             {
                 table_name = "oc_"+ subj;
             }

             
            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);
           


           // GeoJson2DGeographicCoordinates position = new GeoJson2DGeographicCoordinates(-117.6767, 33.456);
          //  GeoJsonPoint<GeoJson2DGeographicCoordinates> point = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(position);


            

            if ((SWlong == 0) || (SWlat == 0) || (NElong == 0) || (NElat == 0))
            {
                SWlong = -117.963690;
                SWlat = 33.634180;
                NElong = -117.854780;
                NElat = 33.702970;
            }



            GeoJson2DGeographicCoordinates bottomleft = new GeoJson2DGeographicCoordinates(SWlong, SWlat);
            GeoJson2DGeographicCoordinates topleft = new GeoJson2DGeographicCoordinates(SWlong, NElat);
            GeoJson2DGeographicCoordinates topright = new GeoJson2DGeographicCoordinates(NElong, NElat);
            GeoJson2DGeographicCoordinates bottomright = new GeoJson2DGeographicCoordinates(NElong, SWlat);
            GeoJson2DGeographicCoordinates[] coord_array = new GeoJson2DGeographicCoordinates[] { bottomleft, topleft, topright, bottomright, bottomleft };
            GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates> ringcoord = new GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates>(coord_array);
            GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates> boxcoord = new GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates>(ringcoord);
            GeoJsonPolygon<GeoJson2DGeographicCoordinates> box = new GeoJsonPolygon<GeoJson2DGeographicCoordinates>(boxcoord);


            var filter = Builders<FeatureDoc>.Filter.GeoIntersects(x => x.geometry, box);



            long count = 0;
            string result = "";




            // count only, not select
            var temp = _mongoCollection.CountAsync(filter);
            temp.Wait();
            count = temp.Result;



            if ((count > 0) && (count < _max_row_count))
            { 

                    //var result = "{ \"type\": \"FeatureCollection\",\"features\": [";
                    // result = @"{ ""type"": ""FeatureCollection"",""features"": [";
                     result = @"{ ""type"": ""FeatureCollection"",""features"": ";

                    //here use FindAsync() with cursor to iterate through each record.
                    using (var cursor = await _mongoCollection.FindAsync(filter))
                    {
                        while (await cursor.MoveNextAsync())
                        {
                            var batch = cursor.Current;
                            
                            

                      
                            //--------------------- 1 ---------------------------------------------------
                            var batch_json = batch.ToJson();
                            
                              //ObjectId("55c532cf21167708171b02a2") must change to  "55c532cf21167708171b02a2"
                              // below use 1.1    1.2 is alternative
                             

                             //----------------- 1.1 ok ---------------------------
                             batch_json = batch_json.Replace("ObjectId(\"", "\"");
                             batch_json = batch_json.Replace("\")", "\"");
                             //----------------------------------------------------
                           
                            /*
                                    //--------------------1.2 ---------------------------------
                                     batch_json = Regex.Replace(batch_json, "ObjectId", "");
                                     batch_json = Regex.Replace(batch_json, @"(", "");
                                     batch_json = Regex.Replace(batch_json, @")", "");
                                    //----------------------------------------------------------
                             */
                             
                             result = result + batch_json;

                            //----------------------------------- end 1 --------------------------------------
                            

                         
                           
                        }// while await

                    }// using

                    
                // batch.toString() has bug, 
                // -------- temp fix the bug, there are one ][ occur between {1}][{2}, it should be {1},{2}, so ][ need to replace with , -------------
                    result = result.Replace("][", ",");
                //================================================== bug fix {}][{} ====================================================================


                    result = result + "}";

            }

            else if (count == 0)
            {
                // no record
                result = count.ToString();
               
            }
            else
            {
                // more than limit
                result = count.ToString();
            }

            
            
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");

           

            return response;

        }




        // version 1, iterate through bsondocument, foreach remove all () in objectID   
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature1(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
        {


            // embeded connection string in code
            //_mongoClient = new MongoClient("mongodb://localhost:27017");
            // _mongoDatabase = _mongoClient.GetDatabase("civilgis");


            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);


            var table_name = area + "_" + subj;


            if (area.Equals("city"))
            {
                table_name = subj;
            }

            if (area.Equals("county"))
            {
                table_name = "oc_" + subj;
            }


            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);



            // GeoJson2DGeographicCoordinates position = new GeoJson2DGeographicCoordinates(-117.6767, 33.456);
            //  GeoJsonPoint<GeoJson2DGeographicCoordinates> point = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(position);




            if ((SWlong == 0) || (SWlat == 0) || (NElong == 0) || (NElat == 0))
            {
                SWlong = -117.963690;
                SWlat = 33.634180;
                NElong = -117.854780;
                NElat = 33.702970;
            }



            GeoJson2DGeographicCoordinates bottomleft = new GeoJson2DGeographicCoordinates(SWlong, SWlat);
            GeoJson2DGeographicCoordinates topleft = new GeoJson2DGeographicCoordinates(SWlong, NElat);
            GeoJson2DGeographicCoordinates topright = new GeoJson2DGeographicCoordinates(NElong, NElat);
            GeoJson2DGeographicCoordinates bottomright = new GeoJson2DGeographicCoordinates(NElong, SWlat);
            GeoJson2DGeographicCoordinates[] coord_array = new GeoJson2DGeographicCoordinates[] { bottomleft, topleft, topright, bottomright, bottomleft };
            GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates> ringcoord = new GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates>(coord_array);
            GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates> boxcoord = new GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates>(ringcoord);
            GeoJsonPolygon<GeoJson2DGeographicCoordinates> box = new GeoJsonPolygon<GeoJson2DGeographicCoordinates>(boxcoord);


            var filter = Builders<FeatureDoc>.Filter.GeoIntersects(x => x.geometry, box);



            long count = 0;
            string result = "";




            // count only, not select
            var temp = _mongoCollection.CountAsync(filter);
            temp.Wait();
            count = temp.Result;



            if ((count > 0) && (count < 2000))
            {

                //var result = "{ \"type\": \"FeatureCollection\",\"features\": [";
                result = @"{ ""type"": ""FeatureCollection"",""features"": [";

                //here use FindAsync() with cursor to iterate through each record.
                using (var cursor = await _mongoCollection.FindAsync(filter))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        var batch = cursor.Current;
                        foreach (var bsonDocument in batch)
                        {

                            //bsonDocument objectID field convert to non-string style, like ObjectId("000000000000000000000000")", replace remove 'objectId(' and ')'

                           

                            string rd = bsonDocument.ToJson();
                            
                             rd = rd.Replace("ObjectId(\"", "\"");
                             rd = rd.Replace("\")", "\"");

                            result = result + rd + ",";
                            count++;
                        }
                    }
                }// using

                // remove last ","
                result = result.Remove(result.Length - 1);

                result = result + "]}";

            }

            else if (count == 0)
            {
                // no record
                result = count.ToString();

            }
            else
            {
                // more than limit
                result = count.ToString();
            }



            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }



        // version 0 is origianl working copy, replace all objectID to null as 0  
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature0(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
        {


            // embeded connection string in code
            //_mongoClient = new MongoClient("mongodb://localhost:27017");
            // _mongoDatabase = _mongoClient.GetDatabase("civilgis");


            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);


            var table_name = area + "_" + subj;


            if (area.Equals("city"))
            {
                table_name = subj;
            }

            if (area.Equals("county"))
            {
                table_name = "oc_" + subj;
            }


            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);



            // GeoJson2DGeographicCoordinates position = new GeoJson2DGeographicCoordinates(-117.6767, 33.456);
            //  GeoJsonPoint<GeoJson2DGeographicCoordinates> point = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(position);




            if ((SWlong == 0) || (SWlat == 0) || (NElong == 0) || (NElat == 0))
            {
                SWlong = -117.963690;
                SWlat = 33.634180;
                NElong = -117.854780;
                NElat = 33.702970;
            }



            GeoJson2DGeographicCoordinates bottomleft = new GeoJson2DGeographicCoordinates(SWlong, SWlat);
            GeoJson2DGeographicCoordinates topleft = new GeoJson2DGeographicCoordinates(SWlong, NElat);
            GeoJson2DGeographicCoordinates topright = new GeoJson2DGeographicCoordinates(NElong, NElat);
            GeoJson2DGeographicCoordinates bottomright = new GeoJson2DGeographicCoordinates(NElong, SWlat);
            GeoJson2DGeographicCoordinates[] coord_array = new GeoJson2DGeographicCoordinates[] { bottomleft, topleft, topright, bottomright, bottomleft };
            GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates> ringcoord = new GeoJsonLinearRingCoordinates<GeoJson2DGeographicCoordinates>(coord_array);
            GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates> boxcoord = new GeoJsonPolygonCoordinates<GeoJson2DGeographicCoordinates>(ringcoord);
            GeoJsonPolygon<GeoJson2DGeographicCoordinates> box = new GeoJsonPolygon<GeoJson2DGeographicCoordinates>(boxcoord);


            var filter = Builders<FeatureDoc>.Filter.GeoIntersects(x => x.geometry, box);



            long count = 0;
            string result = "";




            // count only, not select
            var temp = _mongoCollection.CountAsync(filter);
            temp.Wait();
            count = temp.Result;



            if ((count > 0) && (count < 2000))
            {

                //var result = "{ \"type\": \"FeatureCollection\",\"features\": [";
                result = @"{ ""type"": ""FeatureCollection"",""features"": [";

                //here use FindAsync() with cursor to iterate through each record.
                using (var cursor = await _mongoCollection.FindAsync(filter))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        var batch = cursor.Current;
                        foreach (var bsonDocument in batch)
                        {

                            //bsonDocument objectID field convert to non-string style, like ObjectId(""000000000000000000000000"")", must remove it or change it to "0"

                            ObjectId nullID = new ObjectId();
                            bsonDocument.id = nullID;

                            string rd = bsonDocument.ToJson();
                            string nullstr = @"ObjectId(""000000000000000000000000"")";
                            string rd1 = rd.Replace(nullstr, "0");


                            result = result + rd1 + ",";
                            count++;
                        }
                    }
                }// using

                // remove last ","
                result = result.Remove(result.Length - 1);

                result = result + "]}";

            }

            else if (count == 0)
            {
                // no record
                result = count.ToString();

            }
            else
            {
                // more than limit
                result = count.ToString();
            }



            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }




    }
}
