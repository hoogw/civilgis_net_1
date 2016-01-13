using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class ThemeMapController : Controller
    {


        string _view_path;

        // GET: themeMap
        public ActionResult Index()
        {
            return View();
        }


        public string GetBaseUrl()
        {

            var request = System.Web.HttpContext.Current.Request;

            var appUrl = HttpRuntime.AppDomainAppVirtualPath;

            if (appUrl != "/")
            {
                appUrl += "/";
            }

            var baseUrl = string.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);

            return baseUrl;
        }



        public ActionResult thememaplistpaged(string area, string subject)
        {
            ViewBag.Subject = subject;
            ViewBag.Side_Bar = subject;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult thememaplistscroller(string area, string subject)
        {
            ViewBag.Subject = subject;
            ViewBag.Side_Bar = subject;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult themesimplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            

            ViewBag.Area = area;

            ViewBag.Side_Bar = subject;

            _view_path = "~/Views/LocalMap/localsimplemap.cshtml";
            return View(_view_path);
        }

        public ActionResult themesimpleclustermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = subject;

            ViewBag.Area = area;

            _view_path = "~/Views/LocalMap/localsimpleclustermap.cshtml";
            return View(_view_path);
        }

        public ActionResult themecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = subject;

            ViewBag.Area = area;
            
                _view_path = "~/Views/LocalMap/localcolormap.cshtml";
            return View(_view_path);
        }

    }
}