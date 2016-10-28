using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class ArcgisController : Controller
    {
        // GET: Arcgis
        public ActionResult Index()
        {
            return View();
        }



        //----------------------- simple map section -------------------------------
        public ActionResult simplemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/simplemap.cshtml");
        }



        public ActionResult justtiles(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/justtiles.cshtml");
        }



        public ActionResult justtiles_old_slider_switch(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/justtiles_old_slider_switch.cshtml");
        }


        public ActionResult simpleclustermap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/simpleclustermap.cshtml");
        }


        public ActionResult clusterpagedclienttablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/clusterpagedclienttablemap.cshtml");
        }


        public ActionResult clusterscrollerclienttablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/clusterscrollerclienttablemap.cshtml");
        }



        public ActionResult colormap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/colormap.cshtml");
        }



        //----------------------- End simple map section -------------------------------




        //----------------------- table map section -------------------------------

        public ActionResult pagedclienttablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/pagedclienttablemap.cshtml");
        }




        public ActionResult scrollerclienttablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/scrollerclienttablemap.cshtml");
        }


        public ActionResult pagedservertablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/pagedservertablemap.cshtml");
        }




        public ActionResult scrollerservertablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/scrollerservertablemap.cshtml");
        }



        public ActionResult pagedfulltablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/pagedfulltablemap.cshtml");
        }




        public ActionResult scrollerfulltablemap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/scrollerfulltablemap.cshtml");
        }



        //-----------------------End  table map section -------------------------------




        //----------------------- classification map section -------------------------------
        public ActionResult classifycheckboxbuttonmap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/classifycheckboxbuttonmap.cshtml");
        }


        public ActionResult classifyradiobuttonmap(string frontmap, string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View("~/Views/Arcgis/" + frontmap + "/classifyradiobuttonmap.cshtml");
        }




        //-----------------------end  classification map section -------------------------------







    }
}