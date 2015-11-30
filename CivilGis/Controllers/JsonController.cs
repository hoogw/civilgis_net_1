using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Net.Http.Headers;

using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

using System.Data;
using System.Data.SqlClient;

using System.Threading.Tasks;
using CivilGis.Models;
using System.Web.Script.Serialization;
using System.Collections;
using System.Web;

namespace CivilGis.Controllers
{
    public class JsonController : ApiController
    {



        public HttpResponseMessage listcontent(string area)
        {


            /*
             * select TABLE_NAME
                from INFORMATION_SCHEMA.COLUMNS
                where TABLE_CATALOG = 'civilgis'
                and TABLE_NAME like '%chicago%'
                group by TABLE_NAME;
             */





            var httpContext = (HttpContextWrapper)Request.Properties["MS_HttpContext"];

            string sEcho = httpContext.Request.Params["draw"];

            int orderColumn = Convert.ToInt32(httpContext.Request.Params["order[0][column]"]);

            string iDisplayStart = httpContext.Request.Params["start"];
            string iDisplayLength = httpContext.Request.Params["length"];
           
            string orderDir = httpContext.Request.Params["order[0][dir]"];
            string searchValue = httpContext.Request.Params["search[value]"];

            //-------------------------------------------



           
            string result = "";
            int totalData = 0;
            int totalFiltered = 0;
            string sql = "";
            DataTable dt_tablename;

            
            string connectionString = ConfigurationManager.ConnectionStrings["SqlserverContext"].ConnectionString;

            


            using (SqlConnection con = new SqlConnection(connectionString))
            {

                con.Open();

                
                
                //  -----------------  just get total count --------------------

                //sql = "select table_name from INFORMATION_SCHEMA.COLUMNS where TABLE_CATALOG = 'civilgis' and table_name like '%" + area + "%'  group by table_name;";

                sql = "select count(table_name) from INFORMATION_SCHEMA.COLUMNS where TABLE_CATALOG = 'civilgis' and table_name like '%" + area + "%'  group by table_name;";

                using (SqlCommand commandRowCount = new SqlCommand(sql, con))
                        
                {
                    commandRowCount.CommandType = CommandType.Text;
                    
                    object countStart = commandRowCount.ExecuteScalar();
                    int? _count = (int?)(!Convert.IsDBNull(countStart) ? countStart : null);
                    //int _count = int.Parse(commandRowCount.ExecuteScalar().ToString());

                    totalData = Convert.ToInt32(_count);
                    totalFiltered = totalData;

                }  // sqlcommand



                //----------------------just get total count    ------------------



                // filtered result by search value
                if (!(string.IsNullOrEmpty(searchValue)))
                {

                    // if there is a search parameter

                    sql = "select table_name from INFORMATION_SCHEMA.COLUMNS where TABLE_CATALOG = 'civilgis' and table_name like '%" + area + "%' ";

                    sql = sql + " and TABLE_NAME like '%" + searchValue + "%' ";
                    sql = sql + " group by TABLE_NAME ";
                    sql = sql + " ORDER BY TABLE_NAME " + "   " + orderDir + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " + iDisplayLength + "  ROWS ONLY  ";



                    /*
                     * select TABLE_NAME
                        from INFORMATION_SCHEMA.COLUMNS
                        where TABLE_CATALOG = 'civilgis'
                        and TABLE_NAME like '%area%'
                     *  and TABLE_NAME like '%searchValue%'
                     *  order by TABLE_NAME OFFSET  1 ROWS 
                              FETCH NEXT 10 ROWS ONLY  
                        group by TABLE_NAME;
                     */
                    


                    

                    using (SqlCommand cmd = new SqlCommand(sql, con))
                    {

                        dt_tablename = new DataTable();
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt_tablename);

                        totalFiltered = dt_tablename.Rows.Count;

                       


                    }// sqlcommand



                }// if search value
                else
                {

                    sql = "select table_name from INFORMATION_SCHEMA.COLUMNS where TABLE_CATALOG = 'civilgis' and table_name like '%" + area + "%' ";

                    sql = sql + " group by TABLE_NAME ";
                    sql = sql + " ORDER BY TABLE_NAME " + "   " + orderDir + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " + iDisplayLength + "  ROWS ONLY  ";
                    
                           using (SqlCommand cmd = new SqlCommand(sql, con))
                           {
                               dt_tablename = new DataTable();
                               SqlDataAdapter da = new SqlDataAdapter(cmd);
                               da.Fill(dt_tablename);

                               totalFiltered = dt_tablename.Rows.Count;
                              

                    

                           }// sqlcommand
                



                }





            }//sqlconnection using 


            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();

            // use dynamic or object both works 
            Dictionary<string, dynamic> _response = new Dictionary<string, dynamic>();
            //Dictionary<string, object> _response = new Dictionary<string, object>();



            _response["draw"] = Convert.ToInt16(sEcho);

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



            result = serializer.Serialize(_response);


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
            string connectionString = ConfigurationManager.ConnectionStrings["SqlserverContext"].ConnectionString;

            DataTable dt_body;
            
            
            using (SqlConnection con = new SqlConnection(connectionString))
            {

                con.Open();

                        
                        string sql = "select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='" + tabledata_name + "'";
                        using (SqlCommand cmd = new SqlCommand(sql, con))
                        {
                            DataTable dt_header = new DataTable();
                            SqlDataAdapter da = new SqlDataAdapter(cmd);
                            da.Fill(dt_header);

                            
                            columns = new ArrayList();

                            //create arraylsit from DataTable
                            foreach (DataRow dr in dt_header.Rows)
                            {
                                columns.Add(dr["COLUMN_NAME"]);
                            }

                        }// sqlcommand





                        //  -----------------  just get total count --------------------

                        sql = "SELECT count(*) FROM " + tabledata_name;
                        using (SqlCommand commandRowCount = new SqlCommand(sql, con))
                        {
                            commandRowCount.CommandType = CommandType.Text;

                            object countStart = commandRowCount.ExecuteScalar();
                            int? _count = (int?)(!Convert.IsDBNull(countStart) ? countStart : null);
                            //int _count = int.Parse(commandRowCount.ExecuteScalar().ToString());

                            totalData = Convert.ToInt32(_count);
                            totalFiltered = totalData;

                        }  // sqlcommand

                        //----------------------end just get total count    ------------------







                      // filtered result by search value
                      if (!(string.IsNullOrEmpty(searchValue))) 
                        {

                                     // if there is a search parameter
                                   
                                                   sql = "SELECT * FROM " + tabledata_name +" WHERE ";
                                                  
                                                   
                                                   for (int i = 0; i < columns.Count; i++) 
                                                   {
                                        
                                                        if (i > 0) 
                                                               { 
                                                                  sql= sql + " OR "; 
                                                  
                                                               }// if

                                                           sql= sql +  columns[i]+ " LIKE '%"+ searchValue +"%' ";
                                            
                                                       }// for




                                                                       /*
                                                                                select * from Chicago_Current_Employee_Salaries
                                                                                 where name like '%terry%'
                                                                                 order by Name OFFSET  5 ROWS 
                                                                                 FETCH NEXT 5 ROWS ONLY  
                                                                        */


                                          sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir  + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " +iDisplayLength + "  ROWS ONLY  "; 
                                          
                                        using (SqlCommand cmd = new SqlCommand(sql, con))
                                        {

                                            dt_body = new DataTable();
                                            SqlDataAdapter da = new SqlDataAdapter(cmd);
                                            da.Fill(dt_body);

                                            totalFiltered = dt_body.Rows.Count;
                                            

                                        }// sqlcommand

                                                  
                                    
                            } else 
                                 {	

                                            sql = "SELECT * FROM " + tabledata_name +"  ";


                                            sql = sql + " ORDER BY " + columns[orderColumn] + "   " + orderDir + "  OFFSET " + iDisplayStart + "  ROWS FETCH NEXT  " + iDisplayLength + "  ROWS ONLY  "; 



                                            using (SqlCommand cmd = new SqlCommand(sql, con))
                                            {

                                                dt_body = new DataTable();
                                                SqlDataAdapter da = new SqlDataAdapter(cmd);
                                                da.Fill(dt_body);

                                              


                                            }// sqlcommand
                                            

                                   }//else


                              


                      }//sqlconnection using 


                      System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                     
                     // use dynamic or object both works 
                      Dictionary<string, dynamic> _response = new Dictionary<string, dynamic>();
                      //Dictionary<string, object> _response = new Dictionary<string, object>();
                      
              

                      _response["draw"] = Convert.ToInt16(sEcho);
                     
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



                      result = serializer.Serialize(_response);




            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;
        
        }









        [AcceptVerbs("GET", "POST")]
        public HttpResponseMessage tableheader(string area, string subject)
        {


            string result = "";


            
            string  tabledata_name = area+"_"+ subject;
            string connectionString = ConfigurationManager.ConnectionStrings["SqlserverContext"].ConnectionString;

            string sql = "select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='" + tabledata_name + "'";

            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);

                    System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                    
                    ArrayList arrayList = new ArrayList();
                               //create arraylsit from DataTable
                               foreach (DataRow dr in dt.Rows)
                               {
                                   arrayList.Add(dr["COLUMN_NAME"]);
                               }


                     Dictionary<string, ArrayList> dict = new Dictionary<string, ArrayList>();
                     dict["columns"] = arrayList;

                     result = serializer.Serialize(dict);


                    /*  loop through all rows all cells
                     
                    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                    Dictionary<string, object> row;
                    foreach (DataRow dr in dt.Rows)
                    {
                        row = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                        rows.Add(row);
                    }// for
                     
                    result = serializer.Serialize(rows);
                     */





                }// sqlcommand
            }//sqlconnection

            

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result, "text/plain");



            return response;

        }

       




    }// class
}// namespace
