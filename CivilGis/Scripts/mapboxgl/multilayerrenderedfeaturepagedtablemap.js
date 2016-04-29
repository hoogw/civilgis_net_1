




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
                                                                    
                                            
                                            


                            // -----------leaflet --------------
                                           
                                                


                            
                                           _current_geojson_layer.eachLayer(
                                                function (featureInstanceLayer) {

                                                    var click_row_geofeatureID = featureInstanceLayer.feature.properties.GeoFeatureID;
                                                    var click_row_geofeaturetype = featureInstanceLayer.feature.properties.GeoFeatureType;

                                                        

                                                        if (click_row_geofeatureID === _geo_ID) {


                                                                featureInstanceLayer.setStyle(
                                                                    geojson_clienttable_mouseover_highlight_style
                                                                    );


                                                        
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










function rendered_feature_property_table(_area, _subject) {



    // ----------- rendered feature table -----------
    _source_layer_group_id = _area + '_' + _subject;




                                   // ..................   build tabs  .....................
                                var _isFirstElement = true;
                                var _tab_nav_li = '';
                                var _tab_content_div = '';
                                var _property_id = '';

                                    for (var property in source_layer[_source_layer_group_id]) {
                                        if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {

                                            _property_id = property.replace('_','');

                                            if (_isFirstElement) {

                                                _tab_nav_li = '<li class="active"> <a href="#' + _property_id + '" data-toggle="tab">' + property + '</a></li>';

                                                _tab_content_div = '<div class="tab-pane fade in active" id="' + _property_id+ '">';

                                                _isFirstElement = false;
                                            }
                                            else {
                                                _tab_nav_li = '<li> <a href="#' + _property_id + '" data-toggle="tab">' + property + '</a></li>';


                                                _tab_content_div = '<div class="tab-pane fade" id="' + _property_id + '">';
                                            }




                                            $("#feature_property_tab_navigation").append(_tab_nav_li);


                                            $("#feature_property_tab_content").append(_tab_content_div);



                                        }//if
                                    }//for

                                    // .................End ........   build tabs  .....................    








                                        // ..................... populate tables under tabs .................................



                                    for (var property in source_layer[_source_layer_group_id]) {
                                        if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {























                                        }//if
                                    }//for




                                        // .....................End ............. populate tables under tabs .................................








    // ----------- End rendered feature table -----------


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

        init_vector_multilayer($("#areaID").val(), $("#subjectID").val());

        rendered_feature_property_table($("#areaID").val(), $("#subjectID").val());



    });//done



    // --------------End of ------- dynamic load javascript file based on area and ---------------------------






    add_area_boundary($("#areaID").val());





}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function





    
    
    
    
    
    
    
