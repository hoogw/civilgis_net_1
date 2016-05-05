using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class MapBoxGlController : Controller
    {
        // GET: MapBox
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



        



        //----------------------- simple map section -------------------------------

                                        //................(1) Not highlight feature .......................     


                                    public ActionResult simplemap(string area, string subject)
                                    {

                                        ViewBag.Subject = subject; // for api call 
                                        ViewBag.Side_Bar = area;

                                        ViewBag.Area = area;


                                        return View();
                                    }


                                    public ActionResult simplecolormap(string area, string subject)
                                    {

                                        ViewBag.Subject = subject; // for api call 
                                        ViewBag.Side_Bar = area;

                                        ViewBag.Area = area;


                                        return View();
                                    }





                                    public ActionResult multilayersimplemap(string area, string subject)
                                    {

                                        ViewBag.Subject = subject; // for api call 
                                        ViewBag.Side_Bar = area;

                                        ViewBag.Area = area;


                                        return View();
                                    }


                                    public ActionResult multilayersimplecolormap(string area, string subject)
                                    {

                                        ViewBag.Subject = subject; // for api call 
                                        ViewBag.Side_Bar = area;

                                        ViewBag.Area = area;


                                        return View();
                                    }


                                    //................End ........... Not highlight feature .......................    



                                                         //....................(2) with highlight feature ..........................

                                                             public ActionResult singlelayersimplehighlightgeojsonmap(string area, string subject)
                                                        {

                                                            ViewBag.Subject = subject; // for api call 
                                                            ViewBag.Side_Bar = area;

                                                            ViewBag.Area = area;


                                                            return View();
                                                        }


                                                                public ActionResult singlelayersimplehighlightlayermap(string area, string subject)
                                                        {

                                                            ViewBag.Subject = subject; // for api call 
                                                            ViewBag.Side_Bar = area;

                                                            ViewBag.Area = area;


                                                            return View();
                                                        }



                                                                public ActionResult multilayersimplecolorhighlightlayermap(string area, string subject)
                                                                {

                                                                    ViewBag.Subject = subject; // for api call 
                                                                    ViewBag.Side_Bar = area;

                                                                    ViewBag.Area = area;


                                                                    return View();
                                                                }


                                                                public ActionResult multilayersimplehighlightlayermap(string area, string subject)
                                                                {

                                                                    ViewBag.Subject = subject; // for api call 
                                                                    ViewBag.Side_Bar = area;

                                                                    ViewBag.Area = area;


                                                                    return View();
                                                                }



                                                                public ActionResult multilayersimplecolorhighlightgeojsonmap(string area, string subject)
                                                                {

                                                                    ViewBag.Subject = subject; // for api call 
                                                                    ViewBag.Side_Bar = area;

                                                                    ViewBag.Area = area;


                                                                    return View();
                                                                }

                                                                public ActionResult multilayersimplehighlightgeojsonmap(string area, string subject)
                                                                {

                                                                    ViewBag.Subject = subject; // for api call 
                                                                    ViewBag.Side_Bar = area;

                                                                    ViewBag.Area = area;


                                                                    return View();
                                                                }


                                                            //....................End ............... with highlight feature ..........................


        //----------------------- End simple map section -------------------------------






        //----------------------- table map section -------------------------------


        // .... multi layer rendered
        public ActionResult multilayerrenderedfeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult multilayerrenderedfeaturepagedtablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult multilayerrenderedfeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult multilayerrenderedfeaturescrollertablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        //...........multi layer source


        public ActionResult multilayersourcefeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult multilayersourcefeaturepagedtablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult multilayersourcefeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult multilayersourcefeaturescrollertablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        // ......... multi layer both 

        public ActionResult multilayerpagedbothtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult multilayerpagedbothtablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult multilayerscrollerbothtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }

        public ActionResult multilayerscrollerbothtablecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }





        // .................... single layer  highlightlayer ................
        public ActionResult singlelayerrenderedfeaturepagedtablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerrenderedfeaturescrollertablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult singlelayersourcefeaturepagedtablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayersourcefeaturescrollertablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult singlelayerpagedbothtablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerscrollerbothtablehighlightlayermap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        // .................... single layer  highlightgeojson ................
        public ActionResult singlelayerrenderedfeaturepagedtablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerrenderedfeaturescrollertablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult singlelayersourcefeaturepagedtablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayersourcefeaturescrollertablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult singlelayerpagedbothtablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerscrollerbothtablehighlightgeojsonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }














        //-----------------------End  table map section -------------------------------




        //----------------------- classification map section -------------------------------
        public ActionResult classifycheckboxbuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult classifyradiobuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        //-----------------------end  classification map section -------------------------------






    }
}