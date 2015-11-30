using CivilGis.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Net.Http.Headers;


//using System.Web.HttpContext.Current;

namespace CivilGis.Controllers
{
    public class DataController : Controller
    {
        // GET: Map
        public ActionResult Index()
        {


           

            return View();
          
        }



        public ActionResult listpaged(string area)
        {


            if (area == "")
            {
                
                area = "chicago";
            }


            ViewBag.Area = area;
           



            return View();
        }



        public ActionResult listscroller(string area)
        {


            if (area == "")
            {
               
                area = "chicago";
            }


            ViewBag.Area = area;
            //ViewBag.Subject = subject; // for api call 





            return View();
        }






        public ActionResult paged(string area, string subject)
        {
            
            
            if (subject == "")
            {
                //string _redi_url = "/data/listpaged/" + area + "/";
                //return Redirect(_redi_url);
            }


            ViewBag.Area = area;
            ViewBag.Subject = subject; // for api call 
            




            return View();
        }



        public ActionResult scroller(string area, string subject)
        {

            
            if (subject == "")
            {
                //string _redi_url = "/data/listpaged/" + area + "/";
               // return Redirect(_redi_url);
            }


            ViewBag.Area = area;
            ViewBag.Subject = subject; // for api call 





            return View();
        }





    }
}