using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home

        string _view_path;

        public ActionResult corporate(string area)
        {

            ViewBag.Area = area;



             _view_path = "~/Views/Home/corporate/" + area + ".cshtml";

            return View(_view_path);
        }



        public ActionResult local(string area)
        {

           

            ViewBag.Area = area;

            _view_path = "~/Views/Home/local/" + area + ".cshtml";


            return View(_view_path);
        }






        public ActionResult mapboxgl(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/mapboxgl/" + area + ".cshtml";


            return View(_view_path);
        }



        public ActionResult mapbox(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/mapbox/" + area + ".cshtml";


            return View(_view_path);
        }

        public ActionResult mapquest(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/mapquest/" + area + ".cshtml";


            return View(_view_path);
        }



        public ActionResult heremap(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/heremap/" + area + ".cshtml";


            return View(_view_path);
        }




        public ActionResult bingmap(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/bingmap/" + area + ".cshtml";


            return View(_view_path);
        }




        public ActionResult googlemap(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/googlemap/" + area + ".cshtml";


            return View(_view_path);
        }



        public ActionResult leaflet(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/leaflet/" + area + ".cshtml";


            return View(_view_path);
        }



        public ActionResult leafletmvt(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/leafletmvt/" + area + ".cshtml";


            return View(_view_path);
        }





        public ActionResult openlayers(string area)
        {



            ViewBag.Area = area;

            _view_path = "~/Views/Home/openlayers/" + area + ".cshtml";


            return View(_view_path);
        }







        public ActionResult Index()
        {
            return View();
        }
    }
}