﻿using System;
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



        public ActionResult Index()
        {
            return View();
        }
    }
}