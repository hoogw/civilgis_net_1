












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





function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {

    // Load a GeoJSON from the server 


    // test url if return a number means too many polygon to show.otherwise add polygon to map.
    $.get(_apiURI, function (data) {

        if (isNaN(data)) {



            // ---------   processing data(geoJson) to fill datatables -----------------


            // ************ bing map geojson loader pushpin(point) bug fix************

            // raw geojson string has "_id":  as point(works fine with polygon/line), bing map will fail display pushpin( marker/icon ), only display first one, hidden the rest.
            // Fix by replace all "_id" to "id", you must have "id" field, if no 'id' field, failed show pushpin. 


            var data_fix_id = data.replace(/_id/g, 'id');



            // ************  End bing map geojson loader point bug fix ************


            // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format  
            var _geojson_object = JSON.parse(data_fix_id);




            //----------------Bing map  add new geojson, then remove last geojson --------------------


            _geojson_layer.clear();


            




            //   ***********    this is geojson module   ****************

                    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {


                        // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format, google only accept javascript object format, no string.
                        // featureCollection is array of shapes(Pushpin, Polyline, Polygon)
                        //featureCollection = Microsoft.Maps.GeoJson.read(_geojson_object, default_geojson_style);
                        featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id, default_geojson_style);
                        //featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id);

                        _geojson_layer.add(featureCollection);



                    }); // loadmodule
            //   *********** END  geojson module   ****************




            //   ***********    this is cluster(for point only) module   ****************

                    Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {

                         clusterLayer = new Microsoft.Maps.ClusterLayer(featureCollection, { gridSize: 100 });
                        map.layers.insert(clusterLayer);
                    });

            //   ***********   END cluster(for point only) module   ****************




            //------------------------Bing map  end add new geojson, then remove last geojson------------------------- ---------------

            // hidden the title_info
            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "none";
            // document.getElementById("legend").style.display = "none";


            // do not use this, because it have place holder for blank
            //document.getElementById("title_info").style.visibility = "hidden";


            document.getElementById("title_info").innerHTML = "";
            // document.getElementById("legend").innerHTML = "";

            // ------------- map click event [3] -------------------
            if (_map_click_event) {
            }
            else {
                _mapclick_in_use = false;
            }

            //-------------------------------------------------------------





        }
            // returning number of count
        else {


            // ---------- if return number, should remove last time geojson -----------



            _geojson_layer.clear();


            //-------------------- end remove last geojson ------------------------------



            //---------------marker cluster  [2.3]-------------------
            //  need to clear old last time marker clusters.
            // markerClusterer.clearMarkers();


            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "inline";
            //  document.getElementById("legend").style.display = "inline";

            if (data > 0) {

                document.getElementById("title_info").innerHTML = "Found [ " + data + " ] records ZOOM IN for Details  ";

                // document.getElementById('legend').innerHTML = "Found [ " + data + " ] records ZOOM IN for Details ";

            } else {

                document.getElementById("title_info").innerHTML = "Nothing found";
                //   document.getElementById("legend").innerHTML = "Nothing found";
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

    //bing map layer data event
    add_mapdata_listener();

    add_map_listener();


    // first time load geojson
    get_map_bound();


}// initialize



$(document).ready(function () {


    // <script type='text/javascript' src='http://www.bing.com/api/maps/mapcontrol?branch=release&callback=initialize' async defer></script> 
    // callback function already define initialize, so no need here. 

    // initialize();



}); // document ready function
