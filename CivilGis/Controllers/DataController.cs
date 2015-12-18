
using System.Web.Mvc;



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



        public ActionResult tablelistpaged(string area)
        {


            if (area == "")
            {
                
                area = "chicago";
            }


            ViewBag.Area = area;
           



            return View();
        }



        public ActionResult tablelistscroller(string area)
        {


            if (area == "")
            {
               
                area = "chicago";
            }


            ViewBag.Area = area;
            //ViewBag.Subject = subject; // for api call 





            return View();
        }






        public ActionResult tablepaged(string area, string subject)
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



        public ActionResult tablescroller(string area, string subject)
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