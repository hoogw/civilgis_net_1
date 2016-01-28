
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class LocalMapController : Controller
    {
        // GET: LocalMap
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



        //-------------------------------- maplist section -------------------------------- 

        public ActionResult localmaplistpaged(string area)
        {

            

            ViewBag.Area = area;


            return View();
        }

        public ActionResult localmaplistscroller(string area)
        {



            ViewBag.Area = area;


            return View();
        }

        //-------------------------------- End maplist section -------------------------------- 



        //----------------------- simple map section -------------------------------
        public ActionResult localsimplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult localsimpleclustermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult localclusterpagedclienttablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult localclusterscrollerclienttablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult localcolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        //----------------------- End simple map section -------------------------------




        //----------------------- table map section -------------------------------

        public ActionResult localpagedfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult localscrollerfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        //-----------------------End  table map section -------------------------------




        //----------------------- classification map section -------------------------------
        public ActionResult localclassifycheckboxbuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult localclassifyradiobuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        //-----------------------end  classification map section -------------------------------



    }
}