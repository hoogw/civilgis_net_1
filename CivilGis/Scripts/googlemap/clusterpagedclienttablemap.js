





function feed_datatables(_geojson_obj) {




    //_geojson_obj_array = _geojson_object.features;
    _geojson_obj_array = _geojson_obj["features"];


    // get the key [column name]
    var _properties = _geojson_obj_array[0].properties;


    var tableHeaders = "";
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

    Object.keys(_properties).forEach(function (k) {
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

        _dt_columns_count = _dt_columns_count + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
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

    $('#tabledata tbody').on('mouseover', 'td', function () {
        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _geo_ID = table.cell(rowIdx, _dt_columns_count - 1).data();

        // high light yellow the feature polygon on google map

        //var _Data_Feature =  map.data.getFeatureById(_geo_ID);
        map.data.forEach(function (_feature) {

            if (_feature.getProperty('GeoFeatureID') === _geo_ID) {

                //alert(_feature.getProperty('GeoFeatureID'));

                if (_feature.getProperty('GeoFeatureType') === 'Point') {

                    // if (_feature instanceof google.maps.Data.Point) {
                    if (_highlight_marker) {
                        _highlight_marker.setMap(null);
                    }
                    // alert(_feature.getGeometry());
                    var _feature_geometry = _feature.getGeometry();
                    var _latlng = _feature_geometry.get();
                    _highlight_marker = new google.maps.Marker({
                        map: map,
                        position: _latlng,
                        // icon: iconBase + 'custome_icon.png'
                        //label: ' ', 
                        // must set zIndex to bring this marker to front, on top of other markers.other wise, it will hide behind.
                        zIndex: google.maps.Marker.MAX_ZINDEX + 1

                    }); // marker
                    _highlight_marker.setIcon('http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png');
                    //  }//if feature





                }
                else {
                    map.data.revertStyle();
                    map.data.overrideStyle(_feature, {
                        strokeWeight: 5,
                        strokeColor: 'blue',
                        fillOpacity: 0
                    });// overrideStyle

                }//else
            }//map foreach

            /*
                    var _a="";
                   _feature.forEachProperty(function(_value, _property){
                        _a = _a +_property + ':' + _value + '   ';
                        
                        });// forEachProperty
             */

        });// map.data.foreach



        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;

    }); // click cell event    


    $('#tabledata tbody').on('mouseout', 'td', function () {

        // remove all high light yellow the feature polygon on google map
        // Remove custom styles.
        map.data.revertStyle();


        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    });






}








function ajax_GeoJSON(gmap,_apiURI) {
    
    // Load a GeoJSON from the server 
   

    //------tile[3] ---------
    add_tiles();
          
        
            
            
            // test url if return a number means too many polygon to show.otherwise add polygon to map.
            $.get(_apiURI, function(data){
           
                        if(isNaN(data)){
                            //------tile[2] ---------- returning geoJSON, need to remove previously tiling layers.  
                            
                           // map.overlayMapTypes.removeAt(0); // if no tile layer before, this will error, use clear() instead. solve the error
                          //  map.overlayMapTypes.clear();
                            
                            
                          
                          // ---------   processing data(geoJson) to fill datatables -----------------
                          
                          
                          
                          //--------------------------------------------
                          
                          
                          //gmap.data.loadGeoJson(_apiURI);

                            // Note: data is a string, not a javascript object.
                            //the function addGeoJson needs a javascript object and not a string. so you must convert string to javascript object before feed into addGeoJson
                            // if you use loadGeoJson(url), do not need any formate change, feed URL return string, the loadGeoJson will do with returning string.



                            _geojson_object = JSON.parse(data);


                            //-------------    php format add each _id:{"$id": "55e8c24e382f9fe337f0d8fe"}  to properties before draw on map. -------------
                            //-------------asp.net format add each  {"_id" : "55c532cf21167708171b02a2"}  to properties before draw on map. -------------

                            var _features_array = _geojson_object['features'];

                            var _id_obj;
                            var _id_obj_id;
                            var _propty_obj;

                            _features_array.forEach(function (eachFeatueItem) {


                                /*
                                  // --- php format ------
                                  
                                     _id_obj = eachFeatueItem['_id'];
                                     _id_obj_id = _id_obj['$id'];
                                    _propty_obj = eachFeatueItem['properties'];
                                    
                                    
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




                           //----- marker cluster  [2.1] ------each time before you add new point geojson, need to clear old last time marker clusters.
                              markerClusterer.clearMarkers();
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
                            if(_cluster_in_use) {
                                  map.data.setMap(null);
                                  _cluster_in_use = false;
                            }
                            //-------------------------------------------------------
                           
                           

                            feed_datatables(_geojson_object);


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
                            
                                                                                            
                                                                                                        
                            
                            //  need to clear old last time marker clusters.
                            markerClusterer.clearMarkers();
                            
                            
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
         
        
        
        
        
        
        clustering_point();
        
        
        
        
        
        geocoding();
        
        
     
         
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));
     
 
     
           

         
               
             
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

       

       


       //  load data for google map and lower datatable 
          google.maps.event.addDomListener(window, 'load', initialize);

    
    
    

    }); // document ready function