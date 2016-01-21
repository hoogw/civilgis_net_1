











function ajax_GeoJSON(gmap,_apiURI) {
    
    // Load a GeoJSON from the server 
   

    //------tile[3] ---------
    add_tiles();
          
        
            
            
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
                                  fillOpacity: 0,
                                  strokeColor: 'yellow',
                                  strokeWeight: 1

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
                        }

                     });// get
    
    
}// function ajax_GeoJSON

function get_map_bound(){
    
      //document.getElementById("title_info").innerHTML = "MAP BOUNDS [SouthWest, NorthEast] "+ map.getBounds();
              // get current map bounds as URL parameters. 
                 
                 
                 
                 
                 
                 bounds = map.getBounds();
                 southWest = bounds.getSouthWest();
                 northEast = bounds.getNorthEast();
                 SWlong = southWest.lng();
                 SWlat = southWest.lat();
                 NElong = northEast.lng();
                 NElat = northEast.lat();
                  
                  // http://localhost:10/civilgis/api/load/general_landuse/SWlong/SWlat/NElong/NElat/   This is sample URI
                 //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
                 var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";
            
                  document.getElementById("ajaxload").style.display = "block";
                  ajax_GeoJSON(map,_url);
    
    
    
}


function remove_map_listener(){
    
     google.maps.event.removeListener(listener_dragend);
     google.maps.event.removeListener(listener_zoom_changed);
    
}

function add_map_listener(){
    
      //map.addListener('bounds_changed', function() {  // does not work well
          listener_dragend =  map.addListener('dragend', function() {   
                
                 get_map_bound();
                 
                 
             });
         
         
         
             
         
         
         listener_zoom_changed = map.addListener('zoom_changed', function() {   
              
               get_map_bound();
             });
    
    
    
    
}

function clustering_point(){
    /*  ----------- marker cluster  [1]--------------
            add each marker to it when the data layer fires the addfeature event.

            markerClusterer.addMarker(marker);
            hide the data layer markers.
         */
        
            // must stay to close info window if user click out side polygon 
         google.maps.event.addListener(map,'click',function() {
             // cluster marker infobox
             //alert("close infowindow");
             //infobox.close();
             infowindow.close();
             document.getElementById("info-table").innerHTML = "";
              
              
         });
         
       
     // maxZoom level = 17 means more than 17 will No cluster.
       var markers = []; 
       var mcOptions = {gridSize: 50, maxZoom: 17};
          markerClusterer=new MarkerClusterer(map,markers, mcOptions);



                /*
                  map.data.addListener('addfeature',function(e){
                   var geo=  e.feature.getGeometry();

                   if(geo.getType()==='Point'){

                    markerClusterer.addMarker(new google.maps.Marker
                                                                    ({
                                                                        position:geo.get(),
                                                                        title   :e.feature.getProperty('name')
                                                                        })
                                               );
                     map.data.remove(e.feature);
                   }
                  });
                */
        
        
           
        /*
        
                            boxText = document.createElement("div");
                            boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
                           
                             infobox = new InfoBox({
                                content: boxText,
                                disableAutoPan: false,
                                maxWidth: 0,
                                pixelOffset: new google.maps.Size(-140, 0),
                                zIndex: null,
                                boxStyle: {
                                    background: "url('tipbox.gif') no-repeat",
                                    opacity: 0.75,
                                    width: "280px"
                                },
                                closeBoxMargin: "10px 2px 2px 2px",
                                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                                infoBoxClearance: new google.maps.Size(1, 1),
                                isHidden: false,
                                pane: "floatPane",
                                enableEventPropagation: false
                            });
        */
        
        
            google.maps.event.addListener(map.data, 'addfeature', function (e) 
            {
                
                                if (e.feature.getGeometry().getType() === 'Point') 
                                {
                                          // [1] create marker
                                                    var marker = new google.maps.Marker({
                                                        position: e.feature.getGeometry().get(),
                                                        //title: e.feature.getProperty('FULL_ADDRE'),
                                                        map: map
                                                    }); // if


                                           // [2] add marker click event open infoBox when the marker is clicked
                                                    google.maps.event.addListener(marker, 'click', function (marker, e) {
                                                        return function () 
                                                        {
                                                            var infobox_popup ="<div style='width:200px; height:150px;text-align: center;'><table>";                
                                                            e.feature.forEachProperty(function(_value, _property){
                                                                infobox_popup = infobox_popup + "<tr><td>"+ _property + "</td><td>"+  _value + "</td></tr>";
                                                              });            
                                                             infobox_popup = infobox_popup + "</table></div>";     


                                                            //var myHTML = e.feature.getProperty('FULL_ADDRE');
                                                            //boxText.innerHTML = "<div style='text-align: center;'><b>" + myHTML + "</b></div>";
                                                            /*
                                                            boxText.innerHTML = infobox_popup;
                                                            infobox.setPosition(e.feature.getGeometry().get());
                                                            infobox.setOptions({
                                                                pixelOffset: new google.maps.Size(0, 0)
                                                            });
                                                            infobox.open(map);
                                                            */

                                                                infowindow.setContent("<div style='width:200px; height:150px;text-align: center;'>"+ infobox_popup +"</div>");
                                                                infowindow.setPosition(e.feature.getGeometry().get());
                                                                infowindow.open(map);


                                                            };
                                                        }(marker, e));



                                              // [3] add marker mouseover listener
                                                       google.maps.event.addListener(marker, 'mouseover', function (marker, e) {
                                                        return function () 
                                                        {
                                                            var instant_info = "<ul>";
                                                                         
                                                            
                                                            e.feature.forEachProperty(function(_value, _property)
                                                            {
                                                               
                                                                instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;"+ _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" +_value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "</li>";
                                                                                
                                                              });   
                                                              
                                                            
                                                             instant_info = instant_info + "</ul>";

                                                                // update bottom <div>
                                                              document.getElementById("info-table").innerHTML = instant_info;


                                                            };
                                                        }(marker, e));


                                              // [4] add marker mouseout listener
                                              
                                                       google.maps.event.addListener(marker, 'mouseout', function (marker, e) {
                                                        return function () 
                                                        {
                                                           // empty bottom <div>
                                                            document.getElementById("info-table").innerHTML = "";
                                                            //infowindow.close();

                                                            };
                                                        }(marker, e));





                                                        markerClusterer.addMarker(marker);

                                                        // remove below 3 line, do not zoom to marker extend.
                                                          //bounds.extend(e.feature.getGeometry().get());
                                                        //map.fitBounds(bounds);
                                                       // map.setCenter(e.feature.getGeometry().get());


                                                       _cluster_in_use = true;
                                    }// if point
                
            }); // google map event
            
        
        // ---------------- end of marker cluster [1]-----------------------
}


function initialize() {
    
    infowindow = new google.maps.InfoWindow();

    
            
             initial_location = set_initial_location($("#areaID").val());
           

    // load classification button
             init_classification_buttons($("#areaID").val(), $("#subjectID").val());


            
        var mapOptions = {
                            
                             //center: new google.maps.LatLng(33.65992448007282, -117.91505813598633),
                             center: new google.maps.LatLng(initial_location[1], initial_location[2]),
                             //mapTypeId: google.maps.MapTypeId.ROADMAP
                             mapTypeId: google.maps.MapTypeId.HYBRID
                           };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.setZoom(initial_location[3]);
        
        add_area_boundary($("#areaID").val());



        //------tile[1] ---------
        init_tiling();
         
        
        
        
        
        //---------- marker cluster [1]------------
       // clustering_point();
        
        
        
        
        
        // --------  search address
     geocoder = new google.maps.Geocoder();

     document.getElementById('search_addr').addEventListener('click', function () {
         geocodeAddress(geocoder, map);
     });

    // ---------- 
        
        
     
         
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));
     
 
     
            // click listener
            map.data.addListener('click', function(event) {
                //var myHTML = event.feature.getProperty("NAME_ABV_A");

                // map.data.overrideStyle(event.feature, {fillColor: 'yellow'});

                // info window table style
                var popup ="<table>";                
                event.feature.forEachProperty(function(_value, _property){
                    popup = popup + "<tr><td>"+ _property + "</td><td>"+  _value + "</td></tr>";
                  });            
                 popup = popup + "</table>";

                infowindow.setContent("<div style='width:200px; height:150px;text-align: center;'>"+ popup +"</div>");
                infowindow.setPosition(event.latLng);
                infowindow.open(map);

                });    // click listener
  
  
 
  
  
            // mouse over listener
              map.data.addListener('mouseover', function (event) {                  
                  map.data.revertStyle();                 
                  map.data.overrideStyle(event.feature, {
                      strokeWeight: 8,
                      //strokeColor: '#fff',
                      fillOpacity: 0.01
                      //fillColor:''
                  });
                  
                    var instant_info = "<ul>";
                    event.feature.forEachProperty(function(_value, _property){                  
                    instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;"+ _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" +_value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "</li>";
                    });                            
                    instant_info = instant_info + "</ul>";
                  
                  
                  // update bottom <div>
                    document.getElementById("info-table").innerHTML = instant_info;
                
              });


                // mouse out listener
              map.data.addListener('mouseout', function (event) {
                  map.data.revertStyle();
                  
                   // empty bottom <div>
               document.getElementById("info-table").innerHTML = "";
               //infowindow.close();
               
              });

         
               
             
      // ----- idle event conflict with marker cluster. so if you use marker cluster, then do not use idle , use  add map listener instead.   =====   
      
            add_map_listener();
            
           // initial load all geoJSON feature.    
            //var _url_init = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + initial_location[4];
            
            var _url_init = '/api/geojson/feature/' + initial_location[0] + '/' + $("#subjectID").val() + initial_location[4];

            ajax_GeoJSON(map,_url_init);
      //---------------------------------------------------------------------------------------------------------------------------------------------- 
   
    



         
        /* ------------No need zoom_changed and dragend listener, because idle listener can handle them all.  ==============================================            
                // map.getBounds() have to be inside of addlistener, if you only call map.getBounds, will get error bounds undefined  -Cannot read property 'getSouthWest' of undefined
                // so I put it in idle event, this event is fired when the map becomes idle after panning or zooming
           // idle event conflict with marker cluster. so if you use marker cluster, then do not use idle , use above add map listener instead.      
           
                listener_idle =  map.addListener('idle', function() {   

                        get_map_bound();


                    });
            
        //---------------------------------------------------------------------------------------------------------------------------------------------------
        */
    
   
   
            
        
    }// initialize
    
    
    
    
    
    
    



$(document).ready(function () {

        // base_url = document.getElementById('base_url').value;


       


       //  load data for google map and lower datatable 
          google.maps.event.addDomListener(window, 'load', initialize);

    
    
    

    }); // document ready function