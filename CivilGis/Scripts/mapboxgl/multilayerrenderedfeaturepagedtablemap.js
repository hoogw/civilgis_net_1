




function populate_property_tables(_layer_name, _features_array) {
    
   // alert(_features_array.length);
  //alert(_layer_name);



    var _table_div_id = '#'+ _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';
      
      
      // get the key [column name]
    var _properties = _features_array[0].properties;
      

    
      
      var tableHeaders="";
      //$("#tableDiv").empty();
      $(_table_div_id).empty();
     
    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
      _dt_columns_count[_table_id] = 0;
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
                            
                            
                            tableHeaders += "<th>" + k + "</th>";
                            
                            // build column.data def
                            _column0 = {};
                            _column0['data'] = 'properties.' + k;

          //---------- hide last 2 column geoFID, geoFeatureType---------
                            //if ((k === 'GeoFeatureID') || (k === 'GeoFeatureType')) {

                            //    _column0['visible'] = false;

                            //}
          //--------------------------------------------------------


                            _column_def.push(_column0);   
                               
                            _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;
                               
                            
                        }); // object key
          
         /* define last column as geo feaure ID
         tableHeaders += "<th> Geo.Feature.ID</th>";   
         _column0 = {};
         _column0['data'] = '_id.$id';
         _column_def.push(_column0); 
         */
         
    //  alert(_table_div_id);


      $(_table_div_id).append('<table id="' + _layer_name.replace('_', '') + 'tbl' + '" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
      //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
      //$("#tableDiv").find("table thead tr").append(tableHeaders); 
      
                         
      
      
           //  datatable
          //$('#tabledata').DataTable({
          $(_table_id).DataTable({
                                   // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
                                   destroy: true,
                                   data: _features_array,
                                   
                                   
                                   columns: _column_def,
                                    
                                    
                                    "pagingType": "full_numbers",    
                                    
                                    // resize the datatables height here scrollY:150,   
                                    scrollY: 160,
                                    scrollX: true
                                    
                                    
                                                    
                            }); // datatable
                            
                            
                            
                            
                           
    //  mouseover row event show corespoinding data.feature[] on map 
                 var table = $(_table_id).DataTable();
                            
                 //$('#tabledata tbody').on('mouseover', 'td', function () 
                 $(_table_id+' tbody').on('mouseover', 'td', function ()
                        {

                            
                                           var instant_info = "<ul>";
                                                                                    
                                           var colIdx = table.cell(this).index().column;
                                                                                     
                                           var rowIdx =  table.cell(this).index().row;
                                                                                     
                                           var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();
                                                                    
                                            
                                            


                            // -----------Mapbox GL  --------------
                                           
                                                
                     

                            
                     //.............................................................. highlight add geojson layer ..............................................................

                           // loop through all element of the features array, find the one with uid = _u_ID


                                           var features = [];
                                           var element = null;        
                                           for (var i = 0; i < _features_array.length; i++) {
                                                element = _features_array[i];  
                                               if (element.properties.uid === _u_ID) {

                                                   features.push(element);
                                                   break;
                                               } // if
                                           }// for

                                          
                                      

                                           var _highlight_features_geojson = {
                                               "type": "FeatureCollection",
                                               "features": features

                                           }



                     // remove last time highlight source and layer
                                           if (highlight_geojson_source) {

                                               map.removeSource("highlight_geojson");
                                               map.removeLayer('highlight_geojson_layer');

                                           }//if


                     // add current new highlight source
                                           highlight_geojson_source = map.addSource("highlight_geojson", {
                                               "type": "geojson",
                                               "data": _highlight_features_geojson

                                           });




                     // add current new highlight layer
                                           if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

                                               highlight_geojson_layer = map.addLayer({
                                                   'id': 'highlight_geojson_layer',
                                                   'type': 'circle',
                                                   'source': 'highlight_geojson',

                                                   "layout": {
                                                       'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                                                   },

                                                   "paint": {
                                                       "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                                                       "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                                                       "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                                                   }
                                               });





                                           }//if point, circle

                                           else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


                                               highlight_geojson_layer = map.addLayer({
                                                   'id': 'highlight_geojson_layer',
                                                   'type': 'line',
                                                   'source': 'highlight_geojson',
                                                   'layout': {},
                                                   'paint': {

                                                       "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                                                       "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                                                   }
                                               });



                                           }//else line


                                           else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


                                               highlight_geojson_layer = map.addLayer({
                                                   'id': 'highlight_geojson_layer',
                                                   'type': 'fill',
                                                   'source': 'highlight_geojson',
                                                   'layout': {},
                                                   'paint': {
                                                       'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                                                   }
                                               });




                                           }// else polygon fill



                     //...............ENd ........................................... highlight add geojson layer .................
                    

                     //------------ end of Mapbox GL ----------------



                                                          
                            
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
                                         
                                        



                                   } ); // mouse over   
                            

                           

                            
                 //$('#tabledata tbody').on('mouseout', 'td', function ()
                 $(_table_id + ' tbody').on('mouseout', 'td', function ()
                 {


                                       
                     // remove last time highlight source and layer
                     //if (highlight_geojson_source) {

                     //    map.removeSource("highlight_geojson");
                     //    map.removeLayer('highlight_geojson_layer');

                     //}//if




                                        // empty bottom <div>
                                         document.getElementById("info-table").innerHTML = "";
                            } ); // mouse out
                           
                         
                  
    
 
    
}










function property_tab(_area, _subject) {


    

       
        _source_layer_group_id = _area + '_' + _subject;




        // ..................   build tabs  .....................
        var _isFirstElement = true;
        var _tab_nav_li = '';
        var _tab_content_div = '';
        var _tab_content_id = '';

        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {

                _tab_content_id = property.replace('_', '');

                if (_isFirstElement) {

                    _tab_nav_li = '<li class="active"> <a href="#' + _tab_content_id + '" data-toggle="tab">' + property + '</a></li>';

                    //_tab_content_div = '<div class="tab-pane fade in active" id="' + _tab_content_id + '"> <h4> ' + property + '</h4><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
                    _tab_content_div = '<div class="tab-pane fade in active" id="' + _tab_content_id + '"><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';

                    _isFirstElement = false;
                }
                else {
                    _tab_nav_li = '<li> <a href="#' + _tab_content_id + '" data-toggle="tab">' + property + '</a></li>';


                    // must put "active" otherwise, datatable layout will be shrinked.
                    //_tab_content_div = '<div class="tab-pane fade active" id="' + _tab_content_id + '"> <h4> ' + property + '</h4><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
                    _tab_content_div = '<div class="tab-pane fade active" id="' + _tab_content_id + '"><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
                }




                $("#feature_property_tab_navigation").append(_tab_nav_li);


                $("#feature_property_tab_content").append(_tab_content_div);



            }//if
        }//for

        // .................End ........   build tabs  .....................    




}




function binding_property_table() {

    
    // only first time load map data need this event. 
     //map.on('render', function () {

     //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

     //   //  alert(_rendered_features.length);

     //    if (_rendered_features.length > 0) {
     //        populate_property_tables('city_address', _rendered_features);

     //    }
     //});

         


       
    map.on('moveend', function () {



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {


                


                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _rendered_features = map.queryRenderedFeatures({ layers: [property] });

                //  alert(_rendered_features.length);

                if (_rendered_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    populate_property_tables(property, _rendered_features);

                }//if 





            }//if
        }//for

       





    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


       map.fire('moveend');

      //  map.off('render');


    }, 2000);
    
    
   

}







function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    init_base_map();



    // add var geocoder
    geocoder();

    //---------------- end of  init - mapboxGL -----------






    // --------------------- dynamic load javascript file based on area and ---------------------------





    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + $("#areaID").val() + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + $("#areaID").val() + ".js";

    $.when(
             $.getScript(_vector_style_js)


    ).done(function () {





        init_checkbox_menu_simple($("#areaID").val(), $("#subjectID").val());
        property_tab($("#areaID").val(), $("#subjectID").val());

        
     
        multilayer_vector_property($("#areaID").val(), $("#subjectID").val());

        

        binding_property_table();


        


        


    });//done



    // --------------End of ------- dynamic load javascript file based on area and ---------------------------






    add_area_boundary($("#areaID").val());


   

    



}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function





    
    
    
    
    
    
    
