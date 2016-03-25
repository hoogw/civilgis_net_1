using System;
using System.Collections.Generic;
using System.Configuration;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections;
using System.Web;

using System.Data;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;



// Json controller connect to mysql ( Current In USE )

namespace CivilGis.Controllers
{

    
    public class JsonController : ApiController
    {


        [AcceptVerbs("GET", "POST")]
        public HttpResponseMessage listcontent(string area)
        {

            // -------------------- request parameter -------------------------------
            
            var httpContext = (HttpContextWrapper)Request.Properties["MS_HttpContext"];

            string sEcho = httpContext.Request.Params["draw"];

            int orderColumn = Convert.ToInt32(httpContext.Request.Params["order[0][column]"]);

            string iDisplayStart = httpContext.Request.Params["start"];
            string iDisplayLength = httpContext.Request.Params["length"];
           
            string orderDir = httpContext.Request.Params["order[0][dir]"];
            string searchValue = httpContext.Request.Params["search[value]"];

            //---------------------------------------------------------------------------------



           
            string result = "";
            int totalData = 0;
            int totalFiltered = 0;
            string sql = "";
            DataTable dt_tablename;

            
            string connectionString = ConfigurationManager.ConnectionStrings["MySQLContext"].ConnectionString;
            

                    using (MySqlConnection con = new MySqlConnection(connectionString))
                    {
                
                                //  ----------------- get total count --------------------

                      
                                    sql = "SELECT count(table_name) FROM information_schema.COLUMNS ";
                                    sql = sql + " where table_schema = 'civilgis' "; 
                                    sql = sql + "  and table_name like '"+ area + "_%' ";
                                    sql = sql + "  group by table_name";

                                 
                                        using (MySqlCommand cmd = new MySqlCommand(sql, con))
                                        {
                                            con.Open();
                    
                                            totalData = Convert.ToInt32(cmd.ExecuteScalar());
                                            totalFiltered = totalData;
                    

                                    }  // sqlcommand
                                        
                                  //---------------------- end of get total count    ------------------



                // filtered result by search value
                if (!(string.IsNullOrEmpty(searchValue)))
                {

                    // if there is a search parameter

                    sql = "SELECT table_name FROM information_schema.COLUMNS ";
                    sql = sql + " where table_schema = 'civilgis' ";
                    sql = sql + "  and table_name like '" + area + "_%' ";
                  
                    
                    sql = sql + " and TABLE_NAME like '%" + searchValue + "%' ";
                    sql = sql + " group by TABLE_NAME ";
                    sql = sql + " ORDER BY TABLE_NAME " + "   " + orderDir + "  LIMIT " + iDisplayStart + "  , " + iDisplayLength;
                    
                    using (MySqlCommand cmd = new MySqlCommand(sql, con))
                    {

                        dt_tablename = new DataTable();

                        using (MySqlDataAdapter sda = new MySqlDataAdapter())
                        {

                            cmd.Connection = con;
                            sda.SelectCommand = cmd;

                            sda.Fill(dt_tablename);


                            totalFiltered = dt_tablename.Rows.Count;
                        }// mysql adapter
                       


                    }// mysqlcommand



                }// if search value
                else
                {

                    sql = "SELECT table_name FROM information_schema.COLUMNS ";
                    sql = sql + " where table_schema = 'civilgis' ";
                    sql = sql + "  and table_name like '" + area + "_%' ";
                    
                    sql = sql + " group by TABLE_NAME ";
                    sql = sql + " ORDER BY TABLE_NAME " + "   " + orderDir + "  LIMIT " + iDisplayStart + "  , " + iDisplayLength;
                    

                           using (MySqlCommand cmd = new MySqlCommand(sql, con))
                            {

                                    dt_tablename = new DataTable();

                                    using (MySqlDataAdapter sda = new MySqlDataAdapter())
                                    {

                                        cmd.Connection = con;
                                        sda.SelectCommand = cmd;

                                        sda.Fill(dt_tablename);
                            
                                        totalFiltered = dt_tablename.Rows.Count;
                            
                                    }// mysql adapter

                                }// mysqlcommand
                
                }//else





            }//sqlconnection using 


           // System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

            // use dynamic or object both works 
            Dictionary<string, dynamic> _response = new Dictionary<string, dynamic>();
            //Dictionary<string, object> _response = new Dictionary<string, object>();



            _response["draw"] = Convert.ToInt32(sEcho);

            _response["recordsTotal"] = totalData;
            _response["recordsFiltered"] = totalFiltered;
            

            // datatable to list <dictionary> to Json 
            // datatables use columns[0], columns[1] instead of columns[name].... must add index start from 0


            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt_tablename.Rows)
            {
                int k = 0;
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt_tablename.Columns)
                {

                    row.Add(Convert.ToString(k), dr[col]);
                    row.Add(col.ColumnName, dr[col]);
                    k = k + 1;
                }
                rows.Add(row);
            }



            _response["data"] = rows;



            

            // do not use javascript serializer, becaue datetime formate will not show correctly, instead use new newtonsoft.json converter below 
            //  result = serializer.Serialize(_response);
            result = JsonConvert.SerializeObject(_response);


            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }




    


         //[AcceptVerbs("GET", "POST")]
        public HttpResponseMessage tabledata(string area, string subject) {

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
             * 
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

            //-------------------------------------------



            ArrayList columns;
            string result = "";
            int totalData = 0;
            int totalFiltered = 0;

            // get all the column name
            
            string tabledata_name = area + "_" + subject;
            string connectionString = ConfigurationManager.ConnectionStrings["MySQLContext"].ConnectionString;





            //+++++++++++++++++++++++++++++++++= mysqlconnection ==++++++++++++++++++++++++++
            DataTable dt_header = new DataTable();
            DataTable dt_body = new DataTable();

            string sql = "SHOW COLUMNS FROM " + tabledata_name;

            using (MySqlConnection con = new MySqlConnection(connectionString))
            {

                   
                        // --------------   get all column name    ---------------------  
                        using (MySqlCommand cmd = new MySqlCommand(sql, con))
                        {

                            using (MySqlDataAdapter sda = new MySqlDataAdapter())
                            {

                                cmd.Connection = con;
                                sda.SelectCommand = cmd;

                                sda.Fill(dt_header);



                                columns = new ArrayList();

                                //create arraylsit from DataTable
                                foreach (DataRow dr in dt_header.Rows)
                                {
                                    columns.Add(dr["Field"]);
                                }
                            }// adapter
                         }// sqlcommand
                        //------------------------------ end all column name ----------------------




                        //  -----------------  just get total count --------------------

                       string sql_count = "SELECT count(*) FROM " + tabledata_name;
                        using (MySqlCommand cmd = new MySqlCommand(sql_count, con))
                        {
                            con.Open();

                    

                            totalData = Convert.ToInt32(cmd.ExecuteScalar());
                            totalFiltered = totalData;

                        }  // sqlcommand

                        //----------------------end just get total count    ------------------







                      // filtered result by search value
                      if (!(string.IsNullOrEmpty(searchValue))) 
                        {

                                     // if there is a search parameter
                                   
                                                   sql = "SELECT * FROM " + tabledata_name +" WHERE ";
                                                   sql_count = sql_count + " WHERE ";


                                                 for (int i = 0; i < columns.Count; i++) 
                                                   {
                                        
                                                        if (i > 0) 
                                                               { 
                                                                  sql= sql + " OR ";
                                                                 sql_count = sql_count + " OR ";
                                                                }// if

                                                           sql= sql +  columns[i]+ " LIKE '%"+ searchValue +"%' ";
                                                           sql_count = sql_count + columns[i] + " LIKE '%" + searchValue + "%' ";

                    }// for





                    //  -----------------   get filtered count --------------------

                    
                    using (MySqlCommand cmd = new MySqlCommand(sql_count, con))
                    {
                       // con.Open();



                      
                        totalFiltered = Convert.ToInt32(cmd.ExecuteScalar());

                    }  // sqlcommand

                    //----------------------end filtered count   ------------------






                    /*
                             select * from Chicago_Current_Employee_Salaries
                              where name like '%terry%'
                              order by Name OFFSET  5 ROWS 
                              FETCH NEXT 5 ROWS ONLY  
                     */


                    // sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir  + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " +iDisplayLength + "  ROWS ONLY  "; 
                    sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir + "  LIMIT " + iDisplayStart + " ," + iDisplayLength + "   ";

                                                        using (MySqlCommand cmd = new MySqlCommand(sql, con))
                                                        {

                                                            using (MySqlDataAdapter sda = new MySqlDataAdapter())
                                                            {

                                                                cmd.Connection = con;
                                                                sda.SelectCommand = cmd;

                                                                sda.Fill(dt_body);

                                                            


                        }// mysqlcommand

                                                        }// mysql adapter                   
                                    
                            } else 
                                 {	
                                        // No search value

                                            sql = "SELECT * FROM " + tabledata_name +"  ";


                    //sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " + iDisplayLength + "  ROWS ONLY  "; 
                      sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir + "  LIMIT " + iDisplayStart + " ," + iDisplayLength + "   ";


                                                using (MySqlCommand cmd = new MySqlCommand(sql, con))
                                                {

                                                    using (MySqlDataAdapter sda = new MySqlDataAdapter())
                                                    {

                                                            cmd.Connection = con;
                                                            sda.SelectCommand = cmd;

                                                            sda.Fill(dt_body);
                           




                                                    }// mysqlcommand

                                                }// mysql adapter  


                }//else


                              


                      }//sqlconnection using 

                      // do not use this, becaue datetime formate will not show correctly, instead use new newtonsoft.json converter below 
                     // System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                      


            // use dynamic or object both works 
            Dictionary<string, dynamic> _response = new Dictionary<string, dynamic>();
                      //Dictionary<string, object> _response = new Dictionary<string, object>();
                      
              

                      _response["draw"] = Convert.ToInt32(sEcho);
                     
                      _response["recordsTotal"] = totalData;
                      _response["recordsFiltered"] = totalFiltered;


                     


                      // datatable to list <dictionary> to Json 
                      // datatables use columns[0], columns[1] instead of columns[name].... must add index start from 0
                     

                      List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                      Dictionary<string, object> row;
                      foreach (DataRow dr in dt_body.Rows)
                      {
                          int k = 0;
                          row = new Dictionary<string, object>();
                          foreach (DataColumn col in dt_body.Columns)
                          {
                              
                              row.Add(Convert.ToString(k), dr[col]);
                              row.Add(col.ColumnName, dr[col]);
                              k = k + 1;
                          }
                          rows.Add(row);
                      }



                      _response["data"] = rows;


            // do not use javascript serializer, becaue datetime formate will not show correctly, instead use new newtonsoft.json converter below 
            // result = serializer.Serialize(_response);
            result = JsonConvert.SerializeObject(_response);



            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;
        
        }









        [AcceptVerbs("GET", "POST")]
        public HttpResponseMessage tableheader(string area, string subject)
        {


            string result = "";


            
            string  tabledata_name = area+"_"+ subject;
            string connectionString = ConfigurationManager.ConnectionStrings["MySQLContext"].ConnectionString;
          
            string sql = "SHOW COLUMNS FROM " + tabledata_name;


            DataTable dt = new DataTable();


            //=======================================mysqlconnection===========+++++++++++++++++++++++++++++++++++++++++=============
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, con))
                {

                    using (MySqlDataAdapter sda = new MySqlDataAdapter())
                    {

                        cmd.Connection = con;
                        sda.SelectCommand = cmd;
                       
                        sda.Fill(dt);
                            
                        

                       

                        //System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

                        ArrayList arrayList = new ArrayList();
                        //create arraylsit from DataTable
                        foreach (DataRow dr in dt.Rows)
                        {
                            arrayList.Add(dr["Field"]);
                        }


                        Dictionary<string, ArrayList> dict = new Dictionary<string, ArrayList>();
                        dict["columns"] = arrayList;


                        // do not use javascript serializer, becaue datetime formate will not show correctly, instead use new newtonsoft.json converter below 
                        //  result = serializer.Serialize(dict);
                        result = JsonConvert.SerializeObject(dict);



                    }// mysqldata adaper

                }// mysqlcommand
            }// ============================================ mysqlconnection ========================================

            

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }

       




    }// class
}// namespace
