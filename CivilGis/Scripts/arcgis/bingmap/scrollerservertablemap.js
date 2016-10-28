


function datatablesX() {
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
    var build_hearder = $.ajax({
        "url": _url_headerx,
        "success": function (json) {

            // must define tableHeaders =""; otherwise, will output "undefineundefine" above header on page.
            var tableHeaders = "";

            $.each(json.columns, function (i, val) {
                tableHeaders += "<th>" + val + "</th>";

                //--------- build column.data def ------------
                _column = {};
                _column['data'] = val;

                //---------- hide last 2 column geoFID, geoFeatureType---------
                if ((val === 'geometry_type') || (val === 'geoFID')) {

                    _column['visible'] = false;

                }
                //--------------------------------------------------------

                _column_count = _column_count + 1;


                _dt_columns.push(_column);
                // ----------------------------------------



            });// each 

            $("#tableDivX").empty();
            $("#tableDivX").append('<table id="tabledataX" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
            //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
            //$("#tableDiv").find("table thead tr").append(tableHeaders);  

            //$('#displayTable').dataTable(json);
        },
        "dataType": "json"
    });// ajax



    // must wait until header are build in DOM then can start datatable js
    $.when(build_hearder).done(function () {

        //  datatable
        $('#tabledataX').DataTable({

            "pagingType": "full_numbers",

            //for input page number plugin
            //"sPaginationType": "input",
            //"sPaginationType": "scrolling",

            "processing": true,
            "serverSide": true,
            "ajax": {
                url: _urlx, // json datasource
                type: "post",  // method  , by default get
                error: function () {  // error handling
                    $(".tabledata-error").html("");
                    $("#tabledata").append('<tbody class="tabledata-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#tabledata_processing").css("display", "none");

                }// error



            },  // ajax


            // column definition is above build column section
            columns: _dt_columns,



            scrollY: 200,
            scrollX: true,

            // ------------ scroller section --------     

            deferRender: true,
            scrollCollapse: true,
            scroller: true

            // ------------ scroller section end--------  




        }); // datatableX




        var table = $('#tabledataX').DataTable();

        // last 2 columns are "geometry_type" and "coordinate" need to hide, set visible to false. but need to use them later.
        table.columns(_column_count - 1).visible(false);
        table.columns(_column_count - 2).visible(false);


        // ajax click row event fly to on map 
        $('#tabledataX tbody').on('click', 'tr', function () {

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






                _click_coord = [];
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
                    var _latlng = new Microsoft.Maps.Location(_new_lat, _new_long);

                    _click_coord.push(_latlng);




                }// for

                // Construct the polygon.

                if (_click_polygon)  //if is not null then clear last polygon
                {

                    map.entities.remove(_click_polygon);
                }




                _click_polygon = new Microsoft.Maps.Polygon(_click_coord,


                    {

                        strokeColor: '#FF0000',

                        strokeThickness: 12,
                        //fillColor: '#FF0000'

                        fillColor: new Microsoft.Maps.Color(0.1, 0, 0, 0)



                    });


                map.entities.push(_click_polygon);


                // zoom to bound

                // both getBounds() and zoomToObject works.
                //map.fitBounds(_click_polygon.getBounds());
                zoomToObject(_click_polygon);

            }
            else if (_geometry_type === 'LineString') {

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

                    var _new_lat = _geometry_coord[i][1];
                    var _new_long = _geometry_coord[i][0];
                    var _latlng = new Microsoft.Maps.Location(_new_lat, _new_long);

                    _click_coord.push(_latlng);

                }// for







                // Construct the polygon.

                if (_click_line)  //if is not null then clear last polygon
                {

                    map.entities.remove(_click_line);

                }


                _click_line = new Microsoft.Maps.Polyline(_click_coord,
                    {
                        strokeColor: '#FF0000',

                        strokeThickness: 12

                    });


                map.entities.push(_click_line);


                zoomToObject(_click_line);





            }
            else if (_geometry_type === 'Point') {


                if (_click_point)  //if marker is not null then clear last marker
                {

                    map.entities.remove(_click_point);

                }


                // add new marker (pushpin)
                _click_point = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(_geometry_coord[1], _geometry_coord[0]), {

                    icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',

                });


                map.entities.push(_click_point);




                map.setView({
                    center: new Microsoft.Maps.Location(_geometry_coord[1], _geometry_coord[0]),

                    zoom: 17

                });




            }
            else if (_geometry_type === 'No_Geometry') {

                //alert("No location");

            }




            //--------------------------------------------------------------------------------











        }); // click cell event  






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
                    var _latlng = new Microsoft.Maps.Location(_new_lat, _new_long);

                    _mouseover_coord.push(_latlng);





                }// for

                // Construct the polygon.

                if (_mouseover_polygon)  //if is not null then clear last polygon
                {
                    map.entities.remove(_mouseover_polygon);
                }




                _mouseover_polygon = new Microsoft.Maps.Polygon(_mouseover_coord,


                    {

                        strokeColor: '#8A2BE2',

                        strokeThickness: 12,

                        fillColor: new Microsoft.Maps.Color(0.5, 255, 140, 0)



                    });


                map.entities.push(_mouseover_polygon);







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
                    var _latlng = new Microsoft.Maps.Location(_new_lat, _new_long);

                    _mouseover_coord.push(_latlng);

                }// for







                // Construct the polyline.

                if (_mouseover_line)  //if is not null then clear last polygon
                {

                    map.entities.remove(_mouseover_line);
                }


                _mouseover_line = new Microsoft.Maps.Polyline(
                    _mouseover_coord,
                    {

                        strokeColor: '#F7D358',

                        strokeThickness: 12

                    });


                map.entities.push(_mouseover_line);



            }
            else if (_geometry_type === 'Point') {


                if (_mouseover_point)  //if marker is not null then clear last marker
                {

                    map.entities.remove(_mouseover_point);

                }
                // add new marker 


                var base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wQbECUudScMXAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACGUlEQVRIx+3Wy2sTURTH8e/NTDIzaZMxadMWhyBUSheiiyo+QPpHuHIhdOfSP8GlbkXEhTv/gNau3LgRurEIUqlWU2ubh7evPEg6NjOZJHNdlIgLo11YRcj5A84Hfpx7zxFKKcUJlw7gOM6JAVLKIwTg4avbfxy4c/UJABH+Qg2QAfKfI98f48vc/CCuATJA/iEilFKq3/q98XTk2I0W5qp916/41SHhOM6xoIW5KlLK/t/K6oNbwlAdknELYSZpxTMkxrO4XoCUUv0O6gHlYkjHWxF+yyWTsKit57CGbbTMGSJWepTh05PIRof3mxLNjNP0Pdp+i9ziIyGl7BtFD1hdOqRdei5ijW2shkSvS8LAJTM2gh4JiWzvFNksFdAsA3s0Ram4TrtZJxnXCLwKWSF+CvWAt89czmffiEQ0gGYZzSuTX3tNx60Q1Pcxwyb67JUL7Jb38VsdojETz2ux8W6JqG6iJaOoGLTr98WP0fWAsZgQ849v8mnZYeriLNinwAup722RsW12cysYiRT62voGwymbbsQgMZREcMD1yzN4nkctrNEV4HbrTKeFKNeOJlFKiXtwV2ganJvKkF8rsvxiEd8P0FSTiXQa2wxJxEz2yl/QA2Mc2Qihq7NdqdE5rJAc2ufsZBbTiIIGXWXTVeCIa0glMQwh8vl7hMDHD5+Zmb7E16ZPtVrFilnsFLY42CngTDhEohbfALpF/s+4JwbyAAAAAElFTkSuQmCC';

                _mouseover_point = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(_geometry_coord[1], _geometry_coord[0]), {
                    icon: base64Image
                    // color: 'green'

                });

                map.entities.push(_mouseover_point);

            }
            else if (_geometry_type === 'No_Geometry') {

                //alert("No location");

            }




            //--------------------------------------------------------------------------------


        }); // click cell event  



        $('#tabledataX tbody').on('mouseout', 'tr', function () {

            if (_mouseover_point)  //if marker is not null then clear last marker
            {

                map.entities.remove(_mouseover_point);

            }

            if (_mouseover_line)  //if is not null then clear last polygon
            {

                map.entities.remove(_mouseover_line);

            }

            if (_mouseover_polygon)  //if is not null then clear last polygon
            {
                map.entities.remove(_mouseover_polygon);

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





function ajax_GeoJSON(gmap,_apiURI_returncountonly,_apiURI,_map_click_event) {
    
    // Load a GeoJSON from the server 
   
   
    $.get(_apiURI_returncountonly, function(data_count_only){
                
                
        //{"type":"FeatureCollection","properties":{"count":24362},"features":[]}  
        var data = JSON.parse(data_count_only).properties.count;
                
        if (parseInt(data) < max_return_feature_limit)
                
        {
             


            // test url if return a number means too many polygon to show.otherwise add polygon to map.
            $.get(_apiURI, function (data) {


            // ---------   processing data(geoJson) to fill datatables -----------------


            // ************ bing map geojson loader pushpin(point) bug fix************

            // raw geojson string has "_id":  as point(works fine with polygon/line), bing map will fail display pushpin( marker/icon ), only display first one, hidden the rest.
            // Fix by replace all "_id" to "id", you must have "id" field, if no 'id' field, failed show pushpin. 


            var data_fix_id = data.replace(/_id/g, 'id');



            // ************  End bing map geojson loader point bug fix ************


            // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format  
            var _geojson_object = JSON.parse(data_fix_id);


            //-------------    php format add each _id:{"$id": "55e8c24e382f9fe337f0d8fe"}  to properties before draw on map. -------------
            //-------------asp.net format add each  {"_id" : "55c532cf21167708171b02a2"}  to properties before draw on map. -------------

            var _features_array = _geojson_object['features'];

                // var _id_obj;
            var _id_obj_id =0;
            var _propty_obj;


                                         

            _features_array.forEach( function (eachFeatueItem)
            {
                // _id_obj = eachFeatueItem['_id'];
                // _id_obj_id = _id_obj['$id'];
                                                  
                _id_obj_id = _id_obj_id + 1;
                                                  
                _propty_obj = eachFeatueItem['properties'];
                var _geo_type = eachFeatueItem['geometry'];
                                                 
                _propty_obj['GeoFeatureType']=_geo_type['type'];
                _propty_obj['GeoFeatureID']=_id_obj_id;

            });// features_array_foreach

            _geojson_object['features'] = {};
            _geojson_object['features'] = _features_array;
            //---------------------------------------------------------------









            //----------------Bing map  add new geojson, then remove last geojson --------------------


            _geojson_layer.clear();





            Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {


                // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format, google only accept javascript object format, no string.
                // featureCollection is array of shapes(Pushpin, Polyline, Polygon)
                featureCollection = Microsoft.Maps.GeoJson.read(_geojson_object, default_geojson_style);
                //featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id, default_geojson_style);
                //featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id);

                _geojson_layer.add(featureCollection);





            }); // loadmodule

            //------------------------Bing map  end add new geojson, then remove last geojson------------------------- ---------------




            // feed_datatables(_geojson_object);




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



            });// get// end get process geojson

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


    // load data for upper entire datatable
    datatablesX();



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




// datatables paged js
$(document).ready(function () {






    //  load data for google map and lower datatable 
    //  google.maps.event.addDomListener(window, 'load', initialize);






}); // document ready function



