using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class ThemeMapController : Controller
    {
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



        public ActionResult thememaplistpaged(string area)
        {



            ViewBag.Area = area;


            return View();
        }

        public ActionResult thememaplistscroller(string area)
        {



            ViewBag.Area = area;


            return View();
        }


        public ActionResult themesimplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

        public ActionResult themesimpleclustermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

        public ActionResult themecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

    }
}