




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
                                                                    





                            // high light yellow the feature polygon on bing map



                                           var array_shapes = _geojson_layer.getPrimitives();

                                           var length = array_shapes.length;
                                           var element = null;

                                          // alert(length);

                                           for (var x = 0; x < length; x++) {
                                               element = array_shapes[x];

                                             
                                               var _meta = element.metadata;

                                               //alert(_meta['GeoFeatureID']);
                                               
                                                
                                               if (element.metadata['GeoFeatureID'] === _geo_ID)
                                                {
                                                    
                                                  
                                                    
                                                   if(element.metadata['GeoFeatureType'] === 'Point')
                                                            {
                                                                    
                                                                
                                                            // alert(element.metadata['GeoFeatureID']);
                                                             element.setOptions(highlight_pushpin_option);
                                                            
                                                               

                                                            }
                                                            else { // if not point, highlight shape or line,

                                                       element.setOptions(click_highlight_geojson_style);
                                                       

                                                                   }//else
                                                }// if _geo_ID
                                                
                                                

                                           }// for loop array_shapes
                                                        
                            




                            
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
                                       
                                        // remove all high light feature 
                                       // Remove custom styles.
                                       


                             var instant_info = "<ul>";

                             var colIdx = table.cell(this).index().column;

                             var rowIdx = table.cell(this).index().row;

                             var _geo_ID = table.cell(rowIdx, _dt_columns_count - 1).data();



                             var array_shapes = _geojson_layer.getPrimitives();
                             var length = array_shapes.length;
                             var element = null;

                             // alert(length);

                             for (var x = 0; x < length; x++) {
                                 element = array_shapes[x];


                                 var _meta = element.metadata;

                                 //alert(_meta['GeoFeatureID']);


                                 if (element.metadata['GeoFeatureID'] === _geo_ID) {



                                     if (element.metadata['GeoFeatureType'] === 'Point') {


                                         // alert(element.metadata['GeoFeatureID']);
                                         element.setOptions(default_pushpin_option);



                                     }
                                     else { // if not point, remove highlight shape or line,

                                         element.setOptions(default_geojson_style_option);


                                     }//else
                                 }// if _geo_ID



                             }// for loop array_shapes

                                        
                                        
                                        // empty bottom <div>
                                         document.getElementById("info-table").innerHTML = "";
                            } ); 
                           
                         
                  
    
    
    
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
                    var _geo_type = eachFeatueItem['geometry'];
                    
                    _propty_obj['GeoFeatureType']=_geo_type['type'];
                    _propty_obj['GeoFeatureID'] = _id_obj_id;



              
                    // ---end  php format ------
                 */


                // ------ asp.net format -----------
                var _geo_type = eachFeatueItem['geometry'];



                _propty_obj = eachFeatueItem['properties'];

                _propty_obj['GeoFeatureType'] = _geo_type['type'];

                // for bing map only, because above replace _id with id
                //_propty_obj['GeoFeatureID'] = eachFeatueItem['_id'];
                _propty_obj['GeoFeatureID'] = eachFeatueItem['id'];

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




            feed_datatables(_geojson_object);




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
    
    
    
    
    
    
    
    
    
    
    
