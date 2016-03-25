




function feed_datatables(_geojson_obj){
    
    

     
       //_geojson_obj_array = _geojson_object.features;
       _geojson_obj_array = _geojson_obj["features"];
      
      
      // get the key [column name]
      var _properties =  _geojson_obj_array[0].properties;
      
      
      var tableHeaders="";
      $("#tableDiv").empty();
     
    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
     _dt_columns_count = 0;
     var _column_def = [];
     var _column0 = {};
     /*
      _column0['data'] = 'properties.LANDNAME';
      _column_def.push(_column0);
      _column0 = {};
      _column0['data'] = 'properties.ID';
      _column_def.push(_column0);
      _column0 = {};
      _column0['data'] = 'properties.COUNTY';
      _column_def.push(_column0);
      _column0 = {};
      _column0['data'] = 'properties.CFCC';
      _column_def.push(_column0);
     */
      
      Object.keys(_properties).forEach(function(k) 
                        {
                            //alert(k);
                            //_dt_columns.push(k);
                            
                            tableHeaders += "<th>" + k + "</th>";
                            
                            // build column.data def
                            _column0 = {};
                            _column0['data'] = 'properties.' + k;

          //---------- hide last 2 column geoFID, geoFeatureType---------
                            if ((k === 'GeoFeatureID') || (k === 'GeoFeatureType')) {

                                _column0['visible'] = false;

                            }
          //--------------------------------------------------------


                            _column_def.push(_column0);   
                               
                             _dt_columns_count = _dt_columns_count +1;  
                               
                            
                        }); // object key
          
         /* define last column as geo feaure ID
         tableHeaders += "<th> Geo.Feature.ID</th>";   
         _column0 = {};
         _column0['data'] = '_id.$id';
         _column_def.push(_column0); 
         */
         
         $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>'+ tableHeaders + '</tr></tfoot></table>');
      //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
      //$("#tableDiv").find("table thead tr").append(tableHeaders); 
      
                         
      
      
           //  datatable
          $('#tabledata').DataTable({
                                   // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
                                   destroy: true,
                                   data: _geojson_obj_array,
                                   
                                   
                                   columns: _column_def,
                                    
                                    
                                    "pagingType": "full_numbers",    
                                    
                                    // resize the datatables height here scrollY:150
                                    scrollY: 200,
                                    scrollX: true
                                    
                                    
                                                    
                            }); // datatable
                            
                            
                            
                            
                           
                            // ajax click row event show corespoinding data.feature[] on google map 
                  var table = $('#tabledata').DataTable();
                            
                        $('#tabledata tbody').on('mouseover', 'td', function () 
                        {

                            
                                           var instant_info = "<ul>";
                                                                                    
                                           var colIdx = table.cell(this).index().column;
                                                                                     
                                           var rowIdx =  table.cell(this).index().row;
                                                                                     
                                           var _geo_ID = table.cell(rowIdx, _dt_columns_count-1 ).data();           
                                                                    
                                            // high light yellow the feature polygon on google map
                                            
                                          
                                                    
                                                    
                                                            //if(_feature.getProperty('GeoFeatureType') === 'Point')
                                                            //{
                                                                    
                                                                
                                                            //  // if (_feature instanceof google.maps.Data.Point) {
                                                            //            if(_highlight_marker)
                                                            //            {
                                                            //                   _highlight_marker.setMap(null);
                                                            //               }
                                                            //           // alert(_feature.getGeometry());
                                                            //          var _feature_geometry = _feature.getGeometry();
                                                            //          var _latlng = _feature_geometry.get();
                                                            //            _highlight_marker = new google.maps.Marker({
                                                            //               map: map,
                                                            //               position: _latlng,
                                                            //               // icon: iconBase + 'custome_icon.png'
                                                            //                //label: ' ', 
                                                            //                // must set zIndex to bring this marker to front, on top of other markers.other wise, it will hide behind.
                                                            //               zIndex: google.maps.Marker.MAX_ZINDEX + 1

                                                            //            }); // marker

                                                                        
                                                            //            _highlight_marker.setIcon('http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png');
                                                            //   //  }//if feature
                                                                    
                                                                      
                                                            
                                                               

                                                            //}
                                                           
                                            


                            // -----------leaflet --------------
                                           
                                                


                            
                                           _current_geojson_layer.eachLayer(
                                                function (featureInstanceLayer) {

                                                    var click_row_geofeatureID = featureInstanceLayer.feature.properties.GeoFeatureID;
                                                    var click_row_geofeaturetype = featureInstanceLayer.feature.properties.GeoFeatureType;

                                                        

                                                        if (click_row_geofeatureID === _geo_ID) {



                                                            if (click_row_geofeaturetype === 'Point') {

                                                                }
                                                            else {

                                                                

                                                                                

                                                                featureInstanceLayer.setStyle(
                                                                    geojson_clienttable_mouseover_highlight_style
                                                                    );



                                                        }




                                                        
                                                    }// if

                                                }// function

                                                );


                            //------------ end of leaflet ----------------



                                                           
                            
                                           table.columns().every( function (cllmnIndex) 
                                                {                                 
                                                   // alert(table.cell(rowIdx, cllmnIndex ).data());
                                                            
                                                  var _property = table.column(cllmnIndex).header();
                                                  var _value = table.cell(rowIdx, cllmnIndex ).data();
                                                    
                                                  instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;"+ $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "</li>";

                                                  instant_info = instant_info + "</ul>";
                                                                                      
                                                } );// loop through each column for that specific row
                                                   
                                                // update bottom <div>
                                             document.getElementById("info-table").innerHTML = instant_info;   
                                                                   
                                   } ); // click cell event    
                            
                            
                         $('#tabledata tbody').on('mouseout', 'td', function () 
                                   {
                                       
                                        // remove all high light yellow the feature polygon on google map
                                       // Remove custom styles.
                                        //map.data.revertStyle();
                             _current_geojson_layer.setStyle(geojson_default_style);
                                        
                                        // empty bottom <div>
                                         document.getElementById("info-table").innerHTML = "";
                            } ); 
                           
                         
                  
    
    
    
}








function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {
    
    // Load a GeoJSON from the server 
   
            
            
            //------tile[3] ---------
                            add_tiles();
                            
                            
            
            
            
               
            
            // test url if return a number means too many polygon to show.otherwise add polygon to map.
           
            $.get(_apiURI, function(data){
           
                        if(isNaN(data)){
                             
                        
                          
                           

                            _geojson_object = JSON.parse(data);


                            //-------------    php format add each _id:{"$id": "55e8c24e382f9fe337f0d8fe"}  to properties before draw on map. -------------
                            //-------------asp.net format add each  {"_id" : "55c532cf21167708171b02a2"}  to properties before draw on map. -------------

                                         var _features_array = _geojson_object['features'];

                                         var _id_obj;
                                         var _id_obj_id;
                                         var _propty_obj;

                                         _features_array.forEach( function (eachFeatueItem)
                                             {
                                                  
                                             
                                             /*
                                               // --- php format ------
                                               
                                                  _id_obj = eachFeatueItem['_id'];
                                                  _id_obj_id = _id_obj['$id'];
                                                 _propty_obj = eachFeatueItem['properties'];
                                                 var _geo_type = eachFeatueItem['geometry'];
                                                 
                                                 _propty_obj['GeoFeatureType']=_geo_type['type'];
                                                 _propty_obj['GeoFeatureID'] = _id_obj_id;



                                           
                                                 // ---end  php format ------
                                              */


                                             // ------ asp.net format -----------
                                             var _geo_type = eachFeatueItem['geometry'];



                                             _propty_obj = eachFeatueItem['properties'];

                                             _propty_obj['GeoFeatureType'] = _geo_type['type'];
                                             _propty_obj['GeoFeatureID'] = eachFeatueItem['_id'];


                                             });// features_array_foreach

                                         _geojson_object['features'] = {};
                                         _geojson_object['features'] = _features_array;
                                        //---------------------------------------------------------------



                            //----------------  add new geojson, then remove last geojson --------------------

                                        

                                         _last_geojson_layer = _current_geojson_layer;

                                         _current_geojson_layer = L.geoJson(_geojson_object, {

                                             style: geojson_default_style,

                                             onEachFeature: function onEachFeature(feature, layer) {







                                                 //bind click
                                                 layer.on('mouseover', function (e) {
                                                     // e = event
                                                     // console.log(e); 

                                                     // You can make your ajax call declaration here
                                                     //$.ajax(... 


                                                     layer.setStyle(geojson_mouseover_highlight_style);



                                                     var instant_info = "<ul>";


                                                     for (var _key in layer.feature.properties) {
                                                         var _value = String(layer.feature.properties[_key]);
                                                         instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                                                     }


                                                     instant_info = instant_info + "</ul>";


                                                     // update bottom <div>
                                                     document.getElementById("info-table").innerHTML = instant_info;



                                                 });// layer.on mouseover


                                                 layer.on('mouseout', function (e) {

                                                     layer.setStyle(geojson_default_style);

                                                     // empty bottom <div>
                                                     document.getElementById("info-table").innerHTML = "";
                                                     //infowindow.close();

                                                 });// layer.on mouseout

                                             }// oneach function

                                         }).bindPopup(function (layer) {


                                             // when user click each feature, it will popup a info window by the feature.


                                             var popup = "<table>";
                                             for (var _key in layer.feature.properties) {
                                                 var _value = String(layer.feature.properties[_key]);
                                                 // popup = popup + "<tr><td>" + _key + "</td><td>" + _value + "</td></tr>";

                                                 popup = popup + "<tr><td><span style=\'background-color: #454545;\'><font color=\'white\'>" + _key + "</span>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;" + _value + "</td></tr>";

                                             }
                                             popup = popup + "</table>";


                                             return popup;


                                         }).addTo(map);


                                                 // ---- after add new geojson, now remove last time old geojson -------------
                                                    // don't use Array.ForEach is about 95% slower than for() in JavaScript.

                                         if (_last_geojson_layer) {

                                             //alert("remove last geojson");

                                             map.removeLayer(_last_geojson_layer);

                                         }// if


                            //------------------------end add new geojson, then remove last geojson------------------------- ---------------



                           
                           feed_datatables(_geojson_object);
                           
                           
                           
                           // hidden the title_info
                            document.getElementById("ajaxload").style.display = "none";
                            document.getElementById("title_info").style.display = "none";
                            document.getElementById("legend").style.display = "none";


                            // do not use this, because it have place holder for blank
                            //document.getElementById("title_info").style.visibility = "hidden";


                            document.getElementById("title_info").innerHTML = "";
                            document.getElementById("legend").innerHTML = "";
                            
                           
                            
                            // ------------- map click event [3] -------------------
                            if (_map_click_event) {
                            }
                            else {
                                _mapclick_in_use = false;
                            }

                            //-------------------------------------------------------------
                            
                            
                          
                           
                        }
                             // returning number of count, no geojson, clean the datatables
                        else{ 
                            
                            // ---------- if return number, should remove last time geojson -----------
                            _last_geojson_layer = _current_geojson_layer;
                            if (_last_geojson_layer) {

                                map.removeLayer(_last_geojson_layer);


                            }// if
                            //-------------------- end remove last geojson ------------------------------
                            
                            
                            document.getElementById("ajaxload").style.display = "none";
                            document.getElementById("title_info").style.display = "inline";
                            document.getElementById("legend").style.display = "inline";
                            
                            // empty bottom data table
                            $('#tabledata').dataTable().fnClearTable();
                            
                            if (data > 0) {
                                    
                                            document.getElementById("title_info").innerHTML = "Found [ " + data + " ] records ZOOM IN for Details  ";

                                         document.getElementById('legend').innerHTML = "Found [ " + data + " ] records ZOOM IN for Details ";

                                     } else {
                                             // data = 0 nothing found clear datatables
                                            // $('#tabledata').dataTable().fnClearTable();
                                             //$('#tabledata').dataTable().clear();  // this is api bug, for some reason it failed to clean data.
                                             //$('#tabledata').dataTable().clear().draw();
                                             
                                            document.getElementById("title_info").innerHTML = "Nothing found";
                                            document.getElementById("legend").innerHTML = "Nothing found";
                                }
                            // ------------- map click event [4] -------------------

                            _mapclick_in_use = true;

                            //-------------------------------------------------------------




                        }// if else



                     });// get // promist.then
    
                 
                
                
                
                
                
}// function ajax_GeoJSON





function get_map_bound(){
    
      //document.getElementById("title_info").innerHTML = "MAP BOUNDS [SouthWest, NorthEast] "+ map.getBounds();
              // get current map bounds as URL parameters. 
                 
                 
                 
                 

    bounds = map.getBounds();
    southWest = bounds.getSouthWest();
    northEast = bounds.getNorthEast();
    SWlong = southWest.lng;
    SWlat = southWest.lat;
    NElong = northEast.lng;
    NElat = northEast.lat;

    //alert(SWlong);

    // http://localhost:10/civilgis/api/load/general_landuse/SWlong/SWlat/NElong/NElat/   This is sample URI
    //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
    var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

    document.getElementById("ajaxload").style.display = "block";
    ajax_GeoJSON(map, _url, false);
    
    
    
}


// ---------  map click event [2] -------------------------------

function get_click_latlng(_click_event_lat, _click_event_lng) {


    if (_mapclick_in_use) {


        // --- current use 2X2 grid boundary (as click event latlong is on center point), you can use 3x3 grid or adjust house length to make larger/smaller select area. 
        var _square_house_length = 0.0004;


        SWlong = _click_event_lng - _square_house_length;
        SWlat = _click_event_lat - _square_house_length;
        NElong = _click_event_lng + _square_house_length;
        NElat = _click_event_lat + _square_house_length;



        //var _url_click_event = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
        var _url_click_event = "/api/geojson/feature/" + $("#areaID").val() + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

        document.getElementById("ajaxload").style.display = "block";
        ajax_GeoJSON(map, _url_click_event, true);

    }


}





function back_full_extend() {

    map.setZoom(initial_location[3]);
    map.setCenter(new google.maps.LatLng(initial_location[1], initial_location[2]));
}




function add_map_listener_idle() {





    listener_idle = map.on('moveend', function (e) {
        //alert(e.latlng);
        get_map_bound();


    });









    // ---------  map click event [1] ------ search for a single feature where clicked ------------
    listener_click = map.on('click', function (click_event_location) {

        //alert(click_event_location.latlng.lat);
        get_click_latlng(click_event_location.latlng.lat, click_event_location.latlng.lng);
    });


    listener_rightclick = map.on('rightclick', function () {

        back_full_extend();
    });

    //--------------------------End  map right click event ---------- back to full extend ----------------------


}


//------------------ End map click event [2] -------------------------------










function initialize() {
    
       
          
            


    initial_location = set_initial_location($("#areaID").val());




    // set up the map
    map = new L.Map('map-canvas');


    add_map_listener_idle();


    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &#169; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 3, maxZoom: 22, attribution: osmAttrib });

    // start the map
    map.setView(new L.LatLng(initial_location[1], initial_location[2]), initial_location[3]);



    base_map_tile_layer = map.addLayer(osm);



    add_area_boundary($("#areaID").val());



    // first time load geojson when map first time loaded.
    get_map_bound();



    //------tile[1] ---------
    init_tiling();
    
   
        
    }// initialize
    
    
    
    


// datatables paged js
 $(document).ready(function () {


     initialize();

    

    }); // document ready function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
