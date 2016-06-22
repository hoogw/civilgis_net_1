












function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {
    
    // Load a GeoJSON from the server 
   

          
        
            
            
            // test url if return a number means too many polygon to show.otherwise add polygon to map.
            $.get(_apiURI, function(data){
           
                        if(isNaN(data)){
                           
                            
                          
                          // ---------   processing data(geoJson) to fill datatables -----------------
                          
                          
                          
                          //--------------------------------------------
                          
                          
                          //gmap.data.loadGeoJson(_apiURI);

                            // Note: data is a string, not a javascript object.
                            //the function addGeoJson needs a javascript object and not a string. so you must convert string to javascript object before feed into addGeoJson
                            // if you use loadGeoJson(url), do not need any formate change, feed URL return string, the loadGeoJson will do with returning string.



                            var _geojson_object = JSON.parse(data);

                           //----- marker cluster  [2.1] ------each time before you add new point geojson, need to clear old last time marker clusters.
                           //   markerClusterer.clearMarkers();
                           //--------------------------------------------   

                             


                            //----------------  add new geojson, then remove last geojson --------------------

                              map.data.setStyle({
                                  fillOpacity: _default_fillOpacity,
                                  strokeColor: _default_strokeColor,
                                  strokeWeight: _default_strokeWeight

                              });

                              _last_geojson_layer = _current_geojson_layer;

                              _current_geojson_layer = map.data.addGeoJson(_geojson_object);

                              

                            // ---- after add new geojson, now remove last time old geojson -------------
                            // don't use Array.ForEach is about 95% slower than for() in JavaScript.

                              if (_last_geojson_layer){
                              
                                  for (var l = 0, len = _last_geojson_layer.length; l < len; l++)
                                  {
                                  
                                              gmap.data.remove(_last_geojson_layer[l]);

                                          }// for
                              }// if
                               

                            //------------------------end add new geojson, then remove last geojson------------------------- ---------------



                            //---------------marker cluster  [2.2]-------------------
                            /*
                              if (_cluster_in_use) {
                                  map.data.setMap(null);
                                  _cluster_in_use = false;
                            }
                            */
                            //-------------------------------------------------------
                           
                           
                           // hidden the title_info
                            document.getElementById("ajaxload").style.display = "none";
                            document.getElementById("title_info").style.display = "none";
                            document.getElementById("legend").style.display = "none";


                            // do not use this, because it have place holder for blank
                            //document.getElementById("title_info").style.visibility = "hidden";


                            document.getElementById("title_info").innerHTML = "";
                            document.getElementById("legend").innerHTML = "";
                            
                           
                            
                            /* styleFeature function is only in script block in city.cshtml
                                if (($("#subjectID").val() === 'zoning') || ($("#subjectID").val() === 'general_landuse'))
                            {              
                                // color the zoning and general land use.
                                gmap.data.setStyle(styleFeature);

                            }
                            */
                            


                            // ------------- map click event [3] -------------------
                            if (_map_click_event) {
                            }
                            else {
                                _mapclick_in_use = false;
                            }

                            //-------------------------------------------------------------



                          
                           
                        }
                             // returning number of count
                        else{ 
                            

                            // ---------- if return number, should remove last time geojson -----------
                            _last_geojson_layer = _current_geojson_layer;
                            if (_last_geojson_layer) {

                                for (var l = 0, len = _last_geojson_layer.length; l < len; l++) {

                                    gmap.data.remove(_last_geojson_layer[l]);

                                }// for
                            }// if
                            //-------------------- end remove last geojson ------------------------------
                            
                                                                                            
                                                                                                        
                            //---------------marker cluster  [2.3]-------------------
                            //  need to clear old last time marker clusters.
                           // markerClusterer.clearMarkers();
                            
                            
                            document.getElementById("ajaxload").style.display = "none";
                            document.getElementById("title_info").style.display = "inline";
                            document.getElementById("legend").style.display = "inline";
                            
                            if (data > 0) {
                                    
                                            document.getElementById("title_info").innerHTML = "Found [ " + data + " ] records ZOOM IN for Details  ";

                                         document.getElementById('legend').innerHTML = "Found [ " + data + " ] records ZOOM IN for Details ";

                                     } else {
                
                                            document.getElementById("title_info").innerHTML = "Nothing found";
                                            document.getElementById("legend").innerHTML = "Nothing found";
                            }



                            // ------------- map click event [4] -------------------

                            _mapclick_in_use = true;

                            //-------------------------------------------------------------


                        }// else return number only

            });// get
    
    
}// function ajax_GeoJSON




function initialize() {
    
    initial_location = set_initial_location($("#areaID").val());


    init_base_map();

    add_area_boundary($("#areaID").val());


    geocoding();

    init_tiling();

     
        //      add_mapdata_listener();

        //      add_map_listener_idle();
       
        
    }// initialize
    
    

$(document).ready(function () {

        
    // <script type='text/javascript' src='http://www.bing.com/api/maps/mapcontrol?branch=release&callback=initialize' async defer></script> 
    // callback function already define initialize, so no need here. 

   // initialize();
    
    

    }); // document ready function