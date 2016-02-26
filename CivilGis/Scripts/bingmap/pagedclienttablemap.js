




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
                                            
                                            //var _Data_Feature =  map.data.getFeatureById(_geo_ID);
                                            map.data.forEach( function(_feature)
                                            {

                                                // GeoFeatureID define at ajax_geoJSON() 
                                                //alert(_feature.getProperty('GeoFeatureID'));
                                                //alert(_feature.getProperty('GeoFeatureType'));

                                                
                                                if (_feature.getProperty('GeoFeatureID') === _geo_ID)
                                                {
                                                    
                                                    
                                                    
                                                            if(_feature.getProperty('GeoFeatureType') === 'Point')
                                                            {
                                                                    
                                                                
                                                              // if (_feature instanceof google.maps.Data.Point) {
                                                                        if(_highlight_marker)
                                                                        {
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
                                                            else{
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
                                        map.data.revertStyle();
                                        
                                        
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

                                         map.data.setStyle({
                                             fillOpacity: _default_fillOpacity,
                                             strokeColor: _default_strokeColor,
                                             strokeWeight: _default_strokeWeight

                                         });
                                         _last_geojson_layer = _current_geojson_layer;

                                         _current_geojson_layer = map.data.addGeoJson(_geojson_object);

                            // ---- after add new geojson, now remove last time old geojson -------------
                            // don't use Array.ForEach is about 95% slower than for() in JavaScript.

                                         if (_last_geojson_layer) {

                                             for (var l = 0, len = _last_geojson_layer.length; l < len; l++) {

                                                 gmap.data.remove(_last_geojson_layer[l]);

                                             }// for
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

                                for (var l = 0, len = _last_geojson_layer.length; l < len; l++) {

                                    gmap.data.remove(_last_geojson_layer[l]);

                                }// for
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




function zoomToObject(obj){
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
}


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
                  //var _url = base_url + 'api/load/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
                //var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

                   var _url = "/api/geojson/feature/" + $("#areaID").val() + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";
            
                  document.getElementById("ajaxload").style.display = "block";
                  ajax_GeoJSON(map, _url, false);
    
    
    
}

function remove_map_listener(){
    
     google.maps.event.removeListener(listener_dragend);
     google.maps.event.removeListener(listener_zoom_changed);
    
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



    listener_idle = map.addListener('idle', function () {

        get_map_bound();


    });


    // ---------  map click event [1] ------ search for a single feature where clicked ------------
    listener_click = map.addListener('click', function (click_event_location) {

        get_click_latlng(click_event_location.latLng.lat(), click_event_location.latLng.lng());
    });


    listener_rightclick = map.addListener('rightclick', function () {

        back_full_extend();
    });

    //--------------------------End  map right click event ---------- back to full extend ----------------------


}


//------------------ End map click event [2] -------------------------------








function add_map_listener() {

    //map.addListener('bounds_changed', function() {  // does not work well
    listener_dragend = map.addListener('dragend', function () {

        get_map_bound();


    });






    listener_zoom_changed = map.addListener('zoom_changed', function () {

        get_map_bound();
    });

}



function add_mapdata_listener() {

    // click listener
    map.data.addListener('click', function (event) {
        //var myHTML = event.feature.getProperty("NAME_ABV_A");

        // map.data.overrideStyle(event.feature, {fillColor: 'yellow'});

        // info window table style
        var popup = "<table>";
        event.feature.forEachProperty(function (_value, _property) {
            popup = popup + "<tr><td>" + _property + "</td><td>" + _value + "</td></tr>";
        });
        popup = popup + "</table>";

        infowindow.setContent("<div style='width:200px; height:150px;text-align: center;'>" + popup + "</div>");
        infowindow.setPosition(event.latLng);
        infowindow.open(map);

    });    // click listener





    // mouse over listener
    map.data.addListener('mouseover', function (event) {
        //map.data.revertStyle();                 
        map.data.overrideStyle(event.feature, {
            strokeWeight: _highlight_strokeWeight,
            strokeColor: _highlight_strokeColor,
            fillOpacity: _highlight_fillOpacity
            //fillColor:''
        });

        var instant_info = "<ul>";
        event.feature.forEachProperty(function (_value, _property) {
            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";
        });
        instant_info = instant_info + "</ul>";


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;

    });


    // mouse out listener
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle(event.feature);

        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
        //infowindow.close();

    });


}




function initialize() {
    
       
          
            
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
        
        
        
        // --------  search address
     geocoder = new google.maps.Geocoder();

     document.getElementById('search_addr').addEventListener('click', function () {
         geocodeAddress(geocoder, map);
     });

    // ---------- 
        
        
        
        //  this is add-on polygon.getBounds()  calculate the extend and bound of polygon for zoom to extend later.
google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;        
    for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
            bounds.extend(path.getAt(ii));
        }
    }
    return bounds;
}// google
        
        
        
        
        
        
        infowindow = new google.maps.InfoWindow();
        
            // must stay to close info window if user click out side polygon 
         google.maps.event.addListener(map,'click',function() {
             infowindow.close();
              document.getElementById("info-table").innerHTML = "";
         });
     
         
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));
     
 
     
          add_mapdata_listener();
          add_map_listener_idle();
    
   
        
    }// initialize
    
    
function datatablesX(){
      //var base_url = document.getElementById('base_url').value;
      
      // maptabledata2 return arry of object [{name:aaa}, {age:19}...]
    // maptabledata return array [aaa, 19,....]
    // when they feed to datatables, different type of datasource. 

  
      
    var _urlx = '/api/geojson/maptabledata/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/';
    var _url_headerx = '/api/geojson/maptableheader/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/';
     
     
    //alert(_url_headerx);
     
     
     /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
   
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
     
     
     _dt_columns = [];
     _column_count = 0;
            // get column name and build table header and footer in DOM
        var  build_hearder =  $.ajax({
                                    "url": _url_headerx,
                                    "success": function(json) {
                                       
                                        // must define tableHeaders =""; otherwise, will output "undefineundefine" above header on page.
                                        var tableHeaders="";
                                        
                                        $.each(json.columns, function(i, val){
                                            tableHeaders += "<th>" + val + "</th>";
                                            
                                              //--------- build column.data def ------------
                                                _column = {};
                                                _column['data'] = val;
                                                _column_count = _column_count+1;
                                           
                                           
                                                _dt_columns.push(_column);   
                                            // ----------------------------------------
                                            
                                            
                                            
                                        });// each 

                                        $("#tableDivX").empty();
                                        $("#tableDivX").append('<table id="tabledataX" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>'+ tableHeaders + '</tr></tfoot></table>');
                                        //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
                                        //$("#tableDiv").find("table thead tr").append(tableHeaders);  

                                        //$('#displayTable').dataTable(json);
                                    },
                                    "dataType": "json"
                                });// ajax
       
       
       
       // must wait until header are build in DOM then can start datatable js
       $.when( build_hearder ).done(function()
                {
    
                            //  datatable
                            $('#tabledataX').DataTable({
                                            
                                           "pagingType": "full_numbers",
                                           
                                           //for input page number plugin
                                           //"sPaginationType": "input",
                                           //"sPaginationType": "scrolling",
                                           
                                                            "processing": true,
                                                            "serverSide": true,
                                                            "ajax":{
                                                                    url :_urlx, // json datasource
                                                                    type: "post",  // method  , by default get
                                                                    error: function(){  // error handling
                                                                            $(".tabledata-error").html("");
                                                                            $("#tabledata").append('<tbody class="tabledata-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                                                                            $("#tabledata_processing").css("display","none");

                                                                    }// error
                                                                    
                                                                    
                                                                  
                                                                },  // ajax
                                                                
                                                                                            
                                                              // column definition is above build column section
                                                               columns: _dt_columns,
               
                                                                
                                                                
                                                                scrollY: 200,
                                                                scrollX: true
                                                                
                                                                
                                                                
                                                                
                                                                
                                                        
                            }); // datatableX
                            
                            
                            
                           
                            var table = $('#tabledataX').DataTable();
                            
                            // last 2 columns are "geometry_type" and "coordinate" need to hide, set visible to false. but need to use them later.
                            table.columns( _column_count-1 ).visible( false );
                            table.columns( _column_count-2 ).visible( false );
                           
           
                             // ajax click row event fly to on map 
                            $('#tabledataX tbody').on('click', 'tr', function () 
                                   {
                                      
                                        //------ click select the row --------------
                                                    if ( $(this).hasClass('selected') ) {
                                                      //  $(this).removeClass('selected');
                                                    }
                                                    else {
                                                        table.$('tr.selected').removeClass('selected');
                                                        $(this).addClass('selected');
                                                    }
                                       //-------------------------------------
                                         
                                                                                    
                                      //------------ get current row data ( lat, long, geoFID)  -------------------------                                              
                                           
                                             var _rowIdx = table.row( this ).index();  
                                                                                     
                                           table.columns().every( function (cllmnIndex) 
                                                {                                 
                                                   // alert(table.cell(rowIdx, cllmnIndex ).data());
                                                            
                                                        var _header_tag_node = table.column(cllmnIndex).header();
                                                  
                                                        var _column_nm =   $(_header_tag_node).html();
                                                         
                                                        if (_column_nm === 'geometry_type')
                                                        {
                                                          _geometry_type = table.cell(_rowIdx, cllmnIndex ).data();
                                                        }//  
                                                      
                                                       if (_column_nm === 'coordinate')
                                                       {
                                                           // --------- this is PHP version ------------------------
                                                           //_geometry_coord = table.cell(_rowIdx, cllmnIndex).data();


                                                           /* 
                                                           
                                                            ---------------------- this bug fix is only for ASP.net version ---------

                                                                    php version, you get no quote for the value, regard as Array
                                                                           "coordinate": [[[-117.91489338267, 33.630434601366],....]]]
                                                                    asp.net when you serialize response you get quote for the value, regard as string, you must convert string to array, by JSON parse it.  
                                                                   "coordinate": "[[[-117.94588209420586, 33.666439395057623],....]]]"
                                                              --------------------------------------------------------------------------
                                                            */

                                                           var _geometry_coord_string = table.cell(_rowIdx, cllmnIndex).data();
                                                           _geometry_coord = JSON.parse(_geometry_coord_string);

                                                           // ----------------- end bug fix -------------------------------

                                                        } 
                                                      
                                                        if (_column_nm === 'geoFID')
                                                        {
                                                          _geoFID = table.cell(_rowIdx, cllmnIndex ).data();
                                                        }// if geoFID 
                                                                      
                                                } );// loop through each column for that specific row
                                                  
                                          //-----------------------------------------------------------------------  
                                
                                
                                /*        
                                 // this is another way to get _geometry_coord, by access last time json data. iterate through by geoFID.
                                
                                    var last_json = table.ajax.json();
                                    var last_json_data = last_json.data;
                                   // alert( json.data.length +' row(s) were loaded' );
                                    for (i = 0, len = last_json_data.length; i < len; ++i) {
                                           
                                               var _current_row = last_json_data[i];
                                               if (_current_row["geoFID"]===_geoFID )
                                               {
                                                   _geometry_coord = _current_row["coordinate"];
                                                   break; 
                                               }// if
                                        }// for
                                  */  
                                  
                                  
                                  // --------------- draw polygon line marker on map (red) -------------------
                                  
                                           
                                  
                                  if (_geometry_type === 'Polygon'){
                                      

                                     



                                      _click_coord = [];
                                     // assume each coordinate has only 1 polygon,
                                      for (i = 0, len = _geometry_coord[0].length; i < len; ++i)
                                      {
                                                   /*
                                                           var triangleCoords = [
                                                        {lat: 25.774, lng: -80.190},
                                                        {lat: 18.466, lng: -66.118},
                                                        {lat: 32.321, lng: -64.757},
                                                        {lat: 25.774, lng: -80.190}
                                                      ];
                                                   */
                                          
                                          

                                                 var  _new_lat = _geometry_coord[0][i][1];
                                                 var  _new_long = _geometry_coord[0][i][0];
                                                  var _latlng = {};
                                                        _latlng["lat"]=_new_lat; 
                                                        _latlng["lng"]=_new_long; 
                                                        _click_coord.push(_latlng);

                   


                                        }// for
                                      
                                      // Construct the polygon.
                                      
                                      if(_click_polygon)  //if is not null then clear last polygon
                                            {
                                                _click_polygon.setMap(null);

                                      }

                                      


                                        _click_polygon = new google.maps.Polygon({
                                          paths: _click_coord,
                                          strokeColor: '#FF0000',
                                          strokeOpacity: 0.8,
                                          strokeWeight: 12,
                                          fillColor: '#FF0000',
                                          fillOpacity: 0.01
                                        });

                                       

                                        _click_polygon.setMap(map);
                                      
                                      // zoom to bound
                                      
                                      // both getBounds() and zoomToObject works.
                                      //map.fitBounds(_click_polygon.getBounds());
                                      zoomToObject(_click_polygon);
                                      
                                  }
                                  else if (_geometry_type === 'LineString'){
                                      
                                        _click_coord = [];
                                        
                                       // alert(_geometry_coord.length);
                                       // alert(_geometry_coord[1][1]);
                                     // assume each coordinate has only 1 polygon,
                                      for (i = 0, len = _geometry_coord.length; i < len; ++i) {
                                           /*
                                                   var triangleCoords = [
                                                {lat: 25.774, lng: -80.190},
                                                {lat: 18.466, lng: -66.118},
                                                {lat: 32.321, lng: -64.757},
                                                {lat: 25.774, lng: -80.190}
                                              ];
                                           */
                                          
                                          var  _new_lat = _geometry_coord[i][1];
                                          var  _new_long = _geometry_coord[i][0];
                                          var _latlng = {};
                                                _latlng["lat"]=_new_lat; 
                                                _latlng["lng"]=_new_long; 
                                           _click_coord.push(_latlng);   
                                           
                                        }// for
                                        
                                        
                                        
                                       
                                        
                                        
                                      
                                      // Construct the polygon.
                                      
                                      if(_click_line)  //if is not null then clear last polygon
                                            {
                                                _click_line.setMap(null);

                                             }
                                       
                                             
                                        _click_line = new google.maps.Polyline({
                                          path: _click_coord,
                                          //geodesic: true,
                                          strokeColor: '#FF0000',
                                          strokeOpacity: 0.8,
                                          strokeWeight: 12
                                          
                                        });
                                        
                                        _click_line.setMap(map);
                                      
                                      
                                      
                                       zoomToObject(_click_line);
                                     
                                     /*          
                                      var bounds = new google.maps.LatLngBounds();
                                      
                                      //can't do polyline.getPath()[i] because it's a MVCArray
                                        _click_linestring.getPath().forEach(function(e){
                                            bounds.extend(e);
                                        })         
                                        map.fitBounds(bounds);
                                      
                                      alert(bounds);
                                      */
                                      
                                      
                                      
                                  }
                                  else if (_geometry_type === 'Point'){
                                      
                                      
                                       if(_click_point)  //if marker is not null then clear last marker
                                            {
                                                _click_point.setMap(null);

                                             }
                                     // add new marker 
                                             _click_point = new google.maps.Marker({
                                                map: map,
                                                
                                                position: {lat: _geometry_coord[1], lng: _geometry_coord[0]},
                                                // icon: iconBase + 'custome_icon.png'
                                                 //label: ' ', 
                                                 // must set zIndex to bring this marker to front, on top of other markers.other wise, it will hide behind.
                                                zIndex: google.maps.Marker.MAX_ZINDEX + 1
                                             });

                                            _click_point.setIcon('http://maps.google.com/mapfiles/ms/icons/ltblu-pushpin.png');
                                      
                                      var _center = new google.maps.LatLng(_geometry_coord[1], _geometry_coord[0]);
                                           
                                            //map.setCenter(_center);
                                             map.panTo(_center);
                                             
                                            map.setZoom(_flyto_zoomlevel);
                                      
                                      
                                      
                                  }
                                  else if (_geometry_type === 'No_Geometry'){
                                      
                                      //alert("No location");
                                      
                                  }
                                  
                                  
                                  
                                  
                                  //--------------------------------------------------------------------------------
                                
                                
                                
                                
                               
                                
                                
                                
                                          
                                   
                                
                        } ); // click cell event  
                              




           
           //================================ begin mouse over and mouse end high light polygon line marker, do not fly to , do not zoom in ==============================


         
                            $('#tabledataX tbody').on('mouseover', 'tr', function () {

                                //------ click select the row --------------
                                if ($(this).hasClass('selected')) {
                                    //  $(this).removeClass('selected');
                                }
                                else {
                                    table.$('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                }
                                //-------------------------------------


                                //------------ get current row data ( lat, long, geoFID)  -------------------------                                              

                                var _rowIdx = table.row(this).index();

                                table.columns().every(function (cllmnIndex) {
                                    // alert(table.cell(rowIdx, cllmnIndex ).data());

                                    var _header_tag_node = table.column(cllmnIndex).header();

                                    var _column_nm = $(_header_tag_node).html();

                                    if (_column_nm === 'geometry_type') {
                                        _geometry_type = table.cell(_rowIdx, cllmnIndex).data();
                                    }//  

                                    if (_column_nm === 'coordinate') {
                                        // --------- this is PHP version ------------------------
                                        //_geometry_coord = table.cell(_rowIdx, cllmnIndex).data();


                                        /* 
                                        
                                         ---------------------- this bug fix is only for ASP.net version ---------

                                                 php version, you get no quote for the value, regard as Array
                                                        "coordinate": [[[-117.91489338267, 33.630434601366],....]]]
                                                 asp.net when you serialize response you get quote for the value, regard as string, you must convert string to array, by JSON parse it.  
                                                "coordinate": "[[[-117.94588209420586, 33.666439395057623],....]]]"
                                           --------------------------------------------------------------------------
                                         */

                                        var _geometry_coord_string = table.cell(_rowIdx, cllmnIndex).data();
                                        _geometry_coord = JSON.parse(_geometry_coord_string);

                                        // ----------------- end bug fix -------------------------------

                                    }

                                    if (_column_nm === 'geoFID') {
                                        _geoFID = table.cell(_rowIdx, cllmnIndex).data();
                                    }// if geoFID 

                                });// loop through each column for that specific row

                                //-----------------------------------------------------------------------  


                                /*        
                                 // this is another way to get _geometry_coord, by access last time json data. iterate through by geoFID.
                                
                                    var last_json = table.ajax.json();
                                    var last_json_data = last_json.data;
                                   // alert( json.data.length +' row(s) were loaded' );
                                    for (i = 0, len = last_json_data.length; i < len; ++i) {
                                           
                                               var _current_row = last_json_data[i];
                                               if (_current_row["geoFID"]===_geoFID )
                                               {
                                                   _geometry_coord = _current_row["coordinate"];
                                                   break; 
                                               }// if
                                        }// for
                                  */


                                // --------------- draw polygon line marker on map (red) -------------------



                                if (_geometry_type === 'Polygon') {






                                    _mouseover_coord = [];
                                    // assume each coordinate has only 1 polygon,
                                    for (i = 0, len = _geometry_coord[0].length; i < len; ++i) {
                                        /*
                                                var triangleCoords = [
                                             {lat: 25.774, lng: -80.190},
                                             {lat: 18.466, lng: -66.118},
                                             {lat: 32.321, lng: -64.757},
                                             {lat: 25.774, lng: -80.190}
                                           ];
                                        */



                                        var _new_lat = _geometry_coord[0][i][1];
                                        var _new_long = _geometry_coord[0][i][0];
                                        var _latlng = {};
                                        _latlng["lat"] = _new_lat;
                                        _latlng["lng"] = _new_long;
                                        _mouseover_coord.push(_latlng);




                                    }// for

                                    // Construct the polygon.

                                    if (_mouseover_polygon)  //if is not null then clear last polygon
                                    {
                                        _mouseover_polygon.setMap(null);

                                    }




                                    _mouseover_polygon = new google.maps.Polygon({
                                        paths: _mouseover_coord,
                                        strokeColor: '#F7D358',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 12,
                                        fillColor: '#FF0000',
                                        fillOpacity: 0.01
                                    });



                                    _mouseover_polygon.setMap(map);

                                    

                                }
                                else if (_geometry_type === 'LineString') {

                                    _mouseover_coord = [];

                                    // alert(_geometry_coord.length);
                                    // alert(_geometry_coord[1][1]);
                                    // assume each coordinate has only 1 polygon,
                                    for (i = 0, len = _geometry_coord.length; i < len; ++i) {
                                        /*
                                                var triangleCoords = [
                                             {lat: 25.774, lng: -80.190},
                                             {lat: 18.466, lng: -66.118},
                                             {lat: 32.321, lng: -64.757},
                                             {lat: 25.774, lng: -80.190}
                                           ];
                                        */

                                        var _new_lat = _geometry_coord[i][1];
                                        var _new_long = _geometry_coord[i][0];
                                        var _latlng = {};
                                        _latlng["lat"] = _new_lat;
                                        _latlng["lng"] = _new_long;
                                        _mouseover_coord.push(_latlng);

                                    }// for







                                    // Construct the polyline.

                                    if (_mouseover_line)  //if is not null then clear last polygon
                                    {
                                        _mouseover_line.setMap(null);

                                    }


                                    _mouseover_line = new google.maps.Polyline({
                                        path: _mouseover_coord,
                                        //geodesic: true,
                                        strokeColor: '#F7D358',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 12

                                    });

                                    _mouseover_line.setMap(map);




                                }
                                else if (_geometry_type === 'Point') {


                                    if (_mouseover_point)  //if marker is not null then clear last marker
                                    {
                                        _mouseover_point.setMap(null);

                                    }
                                    // add new marker 
                                    _mouseover_point = new google.maps.Marker({
                                        map: map,

                                        position: { lat: _geometry_coord[1], lng: _geometry_coord[0] },
                                        // icon: iconBase + 'custome_icon.png'

                                    });

                                    _mouseover_point.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')

                                   

                                }
                                else if (_geometry_type === 'No_Geometry') {

                                    //alert("No location");

                                }




                                //--------------------------------------------------------------------------------


                            }); // click cell event  



                            $('#tabledataX tbody').on('mouseout', 'tr', function () {

                                if (_mouseover_point)  //if marker is not null then clear last marker
                                {
                                    _mouseover_point.setMap(null);

                                }

                                if (_mouseover_line)  //if is not null then clear last polygon
                                {
                                    _mouseover_line.setMap(null);

                                }

                                if (_mouseover_polygon)  //if is not null then clear last polygon
                                {
                                    _mouseover_polygon.setMap(null);

                                }

                                
                            });





           //============================== end mouse over and mouse end high light polygon line marker, do not fly to , do not zoom in========================================
                            
                            
                     /*   temperary  disable,    mouseover and mouseout event display row info on info-table div
                            
                            $('#tabledataX tbody').on('mouseover', 'td', function () 
                                   {
                                      
                                       
                                           var instant_info = "<ul>";
                                                                                    
                                           var colIdx = table.cell(this).index().column;
                                                                                     
                                           var rowIdx =  table.cell(this).index().row;
                                                                                     
                                          
                                                                                     
                                                                                     
                                                                                     
                                           table.columns().every( function (cllmnIndex) 
                                                {                                 
                                                   // alert(table.cell(rowIdx, cllmnIndex ).data());
                                                            
                                                  var _property = table.column(cllmnIndex).header();
                                                  var _value = table.cell(rowIdx, cllmnIndex ).data();
                                                    
                                                  instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;"+ $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "</li>";

                                                  instant_info = instant_info + "</ul>";
                                                                                      
                                                } );// loop through each column for that specific row
                                                   
                                                // update bottom <div>
                                             document.getElementById("info-tableX").innerHTML = instant_info;   
                                                                   
                                   } ); // mouseover cell event    
                            
                            
                         $('#tabledataX tbody').on('mouseout', 'td', function () 
                                   {
                                      
                                       
                                        // empty bottom <div>
                                         document.getElementById("info-tableX").innerHTML = "";
                            } ); 
                           
                           
                           
                         */  
                        
                            
                   
                }); // when done
        
        
        
        
    }
    
    
    
    


// datatables paged js
 $(document).ready(function () {

        


       


       //  load data for google map and lower datatable 
          google.maps.event.addDomListener(window, 'load', initialize);

    
    
        // load data for upper entire datatable
       //   datatablesX();
    

    }); // document ready function
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
