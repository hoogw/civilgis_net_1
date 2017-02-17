using System;
using System.Collections.Generic;
//using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using System.Text.RegularExpressions;
//using System.Net.Http.Headers;
using MongoDB.Driver;
using MongoDB.Bson;
//using MongoDB.Shared;
using System.Configuration;
//using System.Data.Entity.Infrastructure;
using System.Data.Entity;

using MongoDB.Driver.GeoJsonObjectModel;
// builders is in mongodb legacy package, you have to install it 
//using MongoDB.Driver.Builders;

using System.Threading.Tasks;
using CivilGis.Models;
//using System.Text.RegularExpressions;

//using System.Data;
//using System.Data.SqlClient;
using System.Collections;
using System.Web;

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
       
        [AcceptVerbs("GET", "POST")]     
        public async Task<HttpResponseMessage> maptableheader(string area, string subject)
        {


            String result = "{ \"columns\":";

            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
            var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);

            var table_name = area + "_" + subject;



            // var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);
            var _mongoCollection = _mongoDatabase.GetCollection<BsonDocument>(table_name);


            // get all the column name
            // can't use array here, because array can't use add(item), however need to convert list to array, in order to sort array 
            List<string> _columns = new List<string>();


            // -------------  findone() ---------------  

            var _first_document = await _mongoCollection.Find(new BsonDocument()).FirstOrDefaultAsync();


             //var propertiesBsonArray = _first_document["properties"].AsBsonArray;
            var propertiesBsonDoc = _first_document["properties"].AsBsonDocument;

            foreach (var _property in propertiesBsonDoc)
            {

                // BsonElement (key-value) pair,     key -> _property.Name;  value ->_property.Value;
                _columns.Add(_property.Name);

            }

            // sort columns
            _columns.Sort();

            _columns.Add("geoFID");
            _columns.Add("geometry_type");
            _columns.Add("coordinate");



            result = result + _columns.ToJson();

            result = result + "}";



            //result output should be:    {"columns":["ADNUM",...,"geoFID","geometry_type","coordinate"]}
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }




        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> maptabledata(string area, string subject)
        {



            BsonDocument geometryBsonDoc;
            string geometryTypeBsonDoc;
            BsonArray coordinatesBsonArray;
            string coordinatesBsonDoc;




            //=============================    processing request parameters  =================================================

            /* ---------  handle request from datatables post ajax call, api reference  ----------------
            * http://datatables.net/manual/server-side
            * http://coderexample.com/datatable-demo-server-side-in-phpmysql-and-ajax/
            * 
            *  draw:2
               columns[0][data]:0
               columns[0][name]:
               columns[0][searchable]:true
               columns[0][orderable]:true
               columns[0][search][value]:
               columns[0][search][regex]:false
               columns[1][data]:1
               columns[1][name]:
               columns[1][searchable]:true
               columns[1][orderable]:true
               columns[1][search][value]:
               columns[1][search][regex]:false
               columns[2][data]:2
               columns[2][name]:
               columns[2][searchable]:true
               columns[2][orderable]:true
               columns[2][search][value]:
               columns[2][search][regex]:false
               columns[3][data]:3
               columns[3][name]:
               columns[3][searchable]:true
               columns[3][orderable]:true
               columns[3][search][value]:
               columns[3][search][regex]:false
               columns[4][data]:4
               columns[4][name]:
               columns[4][searchable]:true
               columns[4][orderable]:true
               columns[4][search][value]:
               columns[4][search][regex]:false
               order[0][column]:0
               order[0][dir]:asc
               start:964
               length:81
               search[value]:
               search[regex]:false
            * 
            * 
            *      For POST request:

                   string sEcho = Request.Params["draw"];
                   int iDisplayStart = Convert.ToInt32(Request.Params["start"]);
                   string searchValue = Request.Params["search[value]"];
                   int orderColumn = Convert.ToInt32(Request.Params["order[0][column]"]);
                   string orderDir = Request.Params["order[0][dir]"];

            * For GET request:


                   NameValueCollection nvc = HttpUtility.ParseQueryString(Request.Url.Query);
                   string sEcho = nvc["draw"];
                   int iDisplayStart = Convert.ToInt32(nvc["start"]);
                   string searchValue = nvc["search[value]"];
                   int orderColumn = Convert.ToInt32(nvc["order[0][column]"]);
                   string orderDir = nvc["order[0][dir]"];
            * 
            * 
            * 
            *  Below is response  format,  data should be array of array.
                           "data":[{"0":"ABBOTT,  BETTY L","Name":"ABBOTT,  BETTY L","1":"FOSTER GRANDPARENT","Position_Title":"FOSTER GRANDPARENT", ....},{row 1},{row 2}...]

           */


            //var parameters = HttpContext.Current.Request.Form;

            var httpContext = (HttpContextWrapper)Request.Properties["MS_HttpContext"];

            string sEcho = httpContext.Request.Params["draw"];


            //int iDisplayStart = Convert.ToInt32(httpContext.Request.Params["start"]);
            // int iDisplayLength = Convert.ToInt32(httpContext.Request.Params["length"]);   
            int orderColumn = Convert.ToInt32(httpContext.Request.Params["order[0][column]"]);


            string iDisplayStart = httpContext.Request.Params["start"];
            string iDisplayLength = httpContext.Request.Params["length"];
            // string orderColumn = httpContext.Request.Params["order[0][column]"];


            string orderDir = httpContext.Request.Params["order[0][dir]"];
            string searchValue = httpContext.Request.Params["search[value]"];

            //================================  end processing request parameters   ==============================




            //--------------  initialize value,  database connections ------------------------

            ArrayList columns;
            string result = "";
            long totalData = 0;
            long totalFiltered = 0;
            BsonDocument propertiesBsonDoc;

            // use dictionary, do not use list<keyValuePair>
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
           // List<List<KeyValuePair<string, string>>> rows = new List<List<KeyValuePair<string, string>>>();

            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
            var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);

            var table_name = area + "_" + subject;
            
            var _mongoCollection = _mongoDatabase.GetCollection<BsonDocument>(table_name);

            //--------------------------------------------------------







            // --------------- get all the column name -----------------------------

           
            // can't use array here, because array can't use add(item), however need to convert list to array, in order to sort array 
            List<string> _columns = new List<string>();
            

            // findone() document

            var _first_document = await _mongoCollection.Find(new BsonDocument()).FirstOrDefaultAsync();


            //var propertiesBsonArray = _first_document["properties"].AsBsonArray;
             propertiesBsonDoc = _first_document["properties"].AsBsonDocument;

            foreach (var _property in propertiesBsonDoc)
            {

                // BsonElement (key-value) pair,     key -> _property.Name;  value ->_property.Value;
                _columns.Add(_property.Name);

            }

            List<string> _columns_original = _columns;

            // sort columns
            _columns.Sort();

            _columns.Add("geoFID");
            _columns.Add("geometry_type");
            _columns.Add("coordinate");


            // colums is arraylist, _columns is list, need to transfer
             columns = new ArrayList(_columns);

            //-----------------------  end get all column name ----------------------------------------




                        //  -----------------  just get total count --------------------

                        var _filter_all = new BsonDocument();

                        // count only, does not select
                        var temp = _mongoCollection.CountAsync(_filter_all);
                        temp.Wait();
            
                        totalData = temp.Result;
                        totalFiltered = totalData;
            

                       //----------------------end just get total count    ------------------







                // +++++++++++++++   filtered result by search value  ++++++++++++++++++++++++++++++++
                if (!(string.IsNullOrEmpty(searchValue)))
                {



                                            var _sort_by_column = "properties." + columns[orderColumn].ToString();
                                            var _sort = Builders<BsonDocument>.Sort.Ascending(_sort_by_column);


                                            if (orderDir.Equals("asc"))
                                            {
                                                _sort = Builders<BsonDocument>.Sort.Ascending(_sort_by_column);
                                            }
                                            else if (orderDir.Equals("desc"))
                                            {
                                                _sort = Builders<BsonDocument>.Sort.Descending(_sort_by_column);
                                            }






                                            rows = new List<Dictionary<string, object>>();




                // ------------------- search value filter ----------------------------------------

                


                string _properties_search = "";
                foreach (string _field in _columns_original) // Loop through List with foreach.
                {


                    _properties_search = _properties_search + "{ 'properties." + _field + "':{'$regex': '" + searchValue + "', '$options': 'i' }},";

                }

                // remove last ','
                _properties_search = _properties_search.TrimEnd(',');


                //--- working sample -----------
                //string _searchValue_filter = @"{ 'properties.STNAME_ALF':'GISLER'}";
                //  string _searchValue_filter = @"{ 'properties.STNAME_ALF':{ $regex: 'GISLER' }}";
                //string _searchValue_filter = @"{ 'properties.STNAME_ALF':{ '$regex': 'GISLER' }}";
                //string _searchValue_filter = @"{ 'properties.STNAME_ALF':{ '$regex': 'isl', '$options': 'i' }}";
                //string _searchValue_filter = @"{ 'properties.STNAME_ALF':{ '$regex': '" + searchValue + "', '$options': 'i' }}";

                string _searchValue_filter = @"{ $or: [" + _properties_search + "] }";

                //-------------------- end search value filer ---------------------------------------------


                totalFiltered = await _mongoCollection.CountAsync(_searchValue_filter);



                //var _listBsonDoc = await _mongoCollection.Find(_searchValue_filter).ToListAsync();
                //var _listBsonDoc = await _mongoCollection.Find(_searchValue_filter).Sort(_sort).ToListAsync();
                var _listBsonDoc = await _mongoCollection.Find(_searchValue_filter).Sort(_sort).Limit(Convert.ToInt16(iDisplayLength)).Skip(Convert.ToInt16(iDisplayStart)).ToListAsync();



                                                            foreach (var bsonDocument in _listBsonDoc)
                                                            {

                                                                // each row from each bsonDocument, batch are all rows, or all bsonDocument.

                                                                //var row = new List<KeyValuePair<string, string>>();
                                                                Dictionary<string, object> row = new Dictionary<string, object>();

                                                                propertiesBsonDoc = bsonDocument["properties"].AsBsonDocument;

                                                                var objectIdBsonDoc = bsonDocument["_id"].AsObjectId;
                                                                var idBsonDoc = objectIdBsonDoc.ToString();



                                                                foreach (var _property in propertiesBsonDoc)
                                                                {

                                                                    // BsonElement (key-value) pair,     key -> _property.Name;  value ->_property.Value;

                                                                    //row.Add(new KeyValuePair<string, string>(_property.Name, _property.Value.ToString()));

                                                                    // for dictionary type





                                                                                if (_property.Value.IsBsonNull)
                                                                                {
                                                                                    row.Add(_property.Name, "");
                                                                                }


                                                                                else {
                                                                                    row.Add(_property.Name, _property.Value.ToString());
                                                                                }

                                                                }// foreach each row






                                                                            // if geometry is Bsonnull, must do special 
                                                                            if (bsonDocument["geometry"].IsBsonNull)
                                                                            {
                                                                                row.Add("geoFID", "");
                                                                                row.Add("geometry_type", "");
                                                                                row.Add("coordinate", "");

                                                                            }
                                                                            else {


                                                                                geometryBsonDoc = bsonDocument["geometry"].AsBsonDocument;

                                                                                geometryTypeBsonDoc = geometryBsonDoc["type"].AsString;

                                                                                coordinatesBsonArray = geometryBsonDoc["coordinates"].AsBsonArray;
                                                                                coordinatesBsonDoc = coordinatesBsonArray.ToJson();


                                                                                // for dictionary type
                                                                                row.Add("geoFID", idBsonDoc);
                                                                                row.Add("geometry_type", geometryTypeBsonDoc);
                                                                                row.Add("coordinate", coordinatesBsonDoc);

                                                                            }//else




                                                            rows.Add(row);


                                                        }// foreach





               


            }
                else
                {

                        // no search value,  sort by column name dec ace start from how many rows
                        //sql = "SELECT * FROM " + tabledata_name + "  ";

                        // sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " + iDisplayLength + "  ROWS ONLY  ";



                        //var _sort = Builders<BsonDocument>.Sort.Ascending("properties.NAME");
                        var _sort_by_column = "properties." + columns[orderColumn].ToString();
                        var _sort = Builders<BsonDocument>.Sort.Ascending(_sort_by_column);


                       if (orderDir.Equals("asc"))
                                                {
                                                         _sort = Builders<BsonDocument>.Sort.Ascending(_sort_by_column);
                                                    }
                        else if (orderDir.Equals("desc"))
                                                        {
                                                            _sort = Builders<BsonDocument>.Sort.Descending(_sort_by_column);
                                                        }






                // rows = new List<Dictionary<string, object>>();
                rows = new List<Dictionary<string, dynamic>>();



                // ------------------- use Find ----------------------------------------
                //var _listBsonDoc = await _mongoCollection.Find(_filter_all).ToListAsync();
                //var _listBsonDoc = await _mongoCollection.Find(_filter_all).Sort(_sort).ToListAsync();
                //var _listBsonDoc = await _mongoCollection.Find(_filter_all).Sort(_sort).Limit(Convert.ToInt16(iDisplayLength)).Skip(Convert.ToInt16(iDisplayStart)).ToListAsync();
                var _listBsonDoc = await _mongoCollection.Find(_filter_all).Sort(_sort).Limit(Convert.ToInt32(iDisplayLength)).Skip(Convert.ToInt32(iDisplayStart)).ToListAsync();


                foreach (var bsonDocument in _listBsonDoc)
                                        {

                                            // each row from each bsonDocument, batch are all rows, or all bsonDocument.

                                            //var row = new List<KeyValuePair<string, string>>();
                                            //Dictionary<string, object> row = new Dictionary<string, object>();
                                            Dictionary<string, dynamic> row = new Dictionary<string, dynamic>();

                                            propertiesBsonDoc = bsonDocument["properties"].AsBsonDocument;

                                            var objectIdBsonDoc = bsonDocument["_id"].AsObjectId;
                                            var idBsonDoc = objectIdBsonDoc.ToString();


                                            foreach (var _property in propertiesBsonDoc)
                                            {

                                                // BsonElement (key-value) pair,     key -> _property.Name;  value ->_property.Value;

                                                //row.Add(new KeyValuePair<string, string>(_property.Name, _property.Value.ToString()));

                                                // for dictionary type


                                                        if (_property.Value.IsBsonNull)
                                                                {
                                                                    row.Add(_property.Name, "");
                                                                }


                                                                    else { 
                                                                                row.Add(_property.Name, _property.Value.ToString());
                                                                        }



                                                }// foreach each row





                                        // if geometry is Bsonnull, must do special 
                                        if (bsonDocument["geometry"].IsBsonNull)
                                                    {
                                                        row.Add("geoFID", "");
                                                        row.Add("geometry_type", "");
                                                        row.Add("coordinate", "");

                                                    }
                                                    else {
                                                        geometryBsonDoc = bsonDocument["geometry"].AsBsonDocument;

                                                         geometryTypeBsonDoc = geometryBsonDoc["type"].AsString;



                                                         coordinatesBsonArray = geometryBsonDoc["coordinates"].AsBsonArray;
                                                         coordinatesBsonDoc = coordinatesBsonArray.ToJson();

                                                        // coordinatesBsonDoc = geometryBsonDoc["coordinates"].AsBsonArray;



                                                        // add last 3 columns, only geoFID column will be visible, the other two are used to fly on map and draw polygon/line/marker on location
                                                        /*

                                                        row.Add(new KeyValuePair<string, string>("geoFID", idBsonDoc));
                                                       row.Add(new KeyValuePair<string, string>("geometry_type", geometryTypeBsonDoc));
                                                       row.Add(new KeyValuePair<string, string>("coordinate", coordinatesBsonDoc));
                                                        */

                                                        // for dictionary type
                                                        row.Add("geoFID", idBsonDoc);
                                                        row.Add("geometry_type", geometryTypeBsonDoc);
                                                        row.Add("coordinate", coordinatesBsonDoc);


                                                          }//else

                                        


                                            rows.Add(row);



                    // current no need sort, because column_def in datatable js used. 
                    // why need sort because mongoDB do not like mysql sqlserver, column order on each row varied. mysql and sqlserver, column order are fixed for each row 
                    // fore each row, sort by columns(key) both "sort" "orderby" works

                    //_row.OrderBy(o => o.Key);
                    //row.Sort((x, y) => x.Key.CompareTo(y.Key));

                    // row is dictionary, can't use this way to sort. 
                    //row.OrderBy(key => key.Key);




                }// foreach


                //------------------- end use Find ------------------------



            }//else


                                // +++++++++++++++ end filtered result by search value  ++++++++++++++++++++++++++++++++





                                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

                                // use dynamic or object both works 
                                Dictionary<string, dynamic> _response = new Dictionary<string, dynamic>();
                                //Dictionary<string, object> _response = new Dictionary<string, object>();



                                _response["draw"] = Convert.ToInt16(sEcho);

                                _response["recordsTotal"] = totalData;
                                _response["recordsFiltered"] = totalFiltered;


                                _response["data"] = rows;



                                result = serializer.Serialize(_response);




                                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



                                return response;



}// 





        private Task<IDisposable> ToListAsync(IFindFluent<BsonDocument, BsonDocument> findFluent)
        {
            throw new NotImplementedException();
        }


        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> maparealimit(string area, string subject)
        {
            // subject is always = limit 
            var table_name = area + "_Limit";


            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
            var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);
            
            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);


            // empty filter match everything, select all record from table
            BsonDocument filter = new BsonDocument();

            string result = "";

            
                result = @"{ ""type"": ""FeatureCollection"",""features"": ";



                // ------------------- use Find ----------------------------------------
                var _listBsonDoc = await _mongoCollection.Find(filter).ToListAsync();


                //--------------------- 1 ---------------------------------------------------
                var batch_json = _listBsonDoc.ToJson();

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

            


                // batch.toString() has bug, 
                // -------- temp fix the bug, there are one ][ occur between {1}][{2}, it should be {1},{2}, so ][ need to replace with , -------------
                result = result.Replace("][", ",");
                //================================================== bug fix {}][{} ====================================================================


                result = result + "}";




            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }







        // need to use 'async task<>' for await method (mongodb api require)
        // this is current version in use
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
{





            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);         
                    _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
                    var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);

                    var table_name = area + "_" + subj;



                            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);
                            

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
                
                
                
                // ------------------- use Find ----------------------------------------
                         var _listBsonDoc = await _mongoCollection.Find(filter).ToListAsync();

                
                            //--------------------- 1 ---------------------------------------------------
                            var batch_json = _listBsonDoc.ToJson();

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



        // this is in use, for mobile, return small amount max 300
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature_mobile(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
        {



            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
            var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count_mobile"]);

            var table_name = area + "_" + subj;



            var _mongoCollection = _mongoDatabase.GetCollection<FeatureDoc>(table_name);


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



                // ------------------- use Find ----------------------------------------
                var _listBsonDoc = await _mongoCollection.Find(filter).ToListAsync();


                //--------------------- 1 ---------------------------------------------------
                var batch_json = _listBsonDoc.ToJson();

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


        // Not in use, FindAsync is old api, should use new api Find
        [AcceptVerbs("GET", "POST")]
        public async Task<HttpResponseMessage> feature2(string area, string subj, double SWlong, double SWlat, double NElong, double NElat)
        {


            // embeded connection string in code
            //_mongoClient = new MongoClient("mongodb://localhost:27017");
            // _mongoDatabase = _mongoClient.GetDatabase("civilgis");


            // set connection string in web.config 
            _mongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["MongoDBContext"].ConnectionString);
            _mongoDatabase = _mongoClient.GetDatabase(ConfigurationManager.AppSettings["civilgisDBname"]);
            var _max_row_count = Convert.ToInt16(ConfigurationManager.AppSettings["max_row_count"]);

            var table_name = area + "_" + subj;



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




    }
}
