




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





        // -----------  **************   openlayers    ****************--------------
        var highlight;
        var feature;
        var highlightStyleCache = {};



        _highlight_featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: map,
            style: _clienttable_mouseover_row_highlight_feature_style


        });






        _geojson_vectorSource.forEachFeature(

            function (_each_feature) {


                var click_row_geofeatureID = _each_feature.getProperties().GeoFeatureID;

                if (click_row_geofeatureID === _geo_ID) {


                    // alert(click_row_geofeatureID);

                    feature = _each_feature;

                    if (feature !== highlight) {
                        if (highlight) {
                            _highlight_featureOverlay.getSource().removeFeature(highlight);

                        }
                        if (feature) {
                            _highlight_featureOverlay.getSource().addFeature(feature);
                        }
                        highlight = feature;

                        _current_highlight = highlight;
                    }//if


                }// if

            });// forEachFeature






        // -----------End   **************   openlayers    ****************--------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;

    }); // mouseover cell event    


    $('#tabledata tbody').on('mouseout', 'td', function () {

        // remove all high light feature 

        if (_current_highlight) {
            _highlight_featureOverlay.getSource().removeFeature(_current_highlight);
        }

        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    });






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





            _geojson_object = JSON.parse(data);




            // ================= append two column GeoFeatureType GeoFeatureID to properties. =========================
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

            // =================End of  append two column GeoFeatureType GeoFeatureID to properties. =========================

















            //...................... openlayers  add new geojson, then remove last geojson..........................


            _geojson_vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(_geojson_object, { featureProjection: 'EPSG:3857' })


            });



            _geojson_vectorLayer = new ol.layer.Vector({
                source: _geojson_vectorSource,
                style: styleFunction
            });


            map.addLayer(_geojson_vectorLayer);
            _current_geojson_layer = true;



            $('#utfgrid_info').hide();









            if (_last_geojson_layer) {

                // layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = last time geojson,  4 = current geojson  / so 3 = array.lenghth - 2

                _all_layers = map.getLayers().getArray();

                map.removeLayer(_all_layers[_all_layers.length - 2]);

            }
            else {

                _last_geojson_layer = true;


            }// if


            //---------------------------end    openlayers   add new geojson, then remove last geojson------------------------- ---------------



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


            });// get// end get process geojson


        }
            // returning number of count
        else {







            // ---------- if return number, should remove last time geojson -----------

            if (_last_geojson_layer) {


                _all_layers = map.getLayers().getArray();


                // layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = geojson = array.lenghth - 1


                map.removeLayer(_all_layers[_all_layers.length - 1]);


                _last_geojson_layer = false;
                _current_geojson_layer = false;

            }// if
            //-------------------- end remove last geojson ------------------------------



            // show 'utfgrid_info' <div>
            $('#utfgrid_info').show();
            // empty bottom <div>
            document.getElementById("info-table").innerHTML = "";


            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "inline";
            document.getElementById("legend").style.display = "inline";


            // empty bottom data table
            $('#tabledata').dataTable().fnClearTable();



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


    init_base_map_tiling();



}// initialize



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
            scrollX: true






        }); // datatableX




        var table = $('#tabledataX').DataTable();

        // last 2 columns are "geometry_type" and "coordinate" need to hide, set visible to false. but need to use them later.
        table.columns(_column_count - 1).visible(false);
        table.columns(_column_count - 2).visible(false);






        //+++++++++++++++++ openlayer  highlight+++++++++++++++


        //+++++++++++++ end highlight openlayer ++++++++++++++








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








            // ---------------when click draw polygon line marker on map (red) -------------------


            var _servertable_click_highlight;
            var _servertable_click_feature;
            var _servertable_click_highlightStyleCache = {};


            if (_servertable_click_highlight_featureOverlay) {

                //alert('remove last click highlight layer');

                _servertable_click_highlight_featureOverlay.getSource().clear();
            }



            _servertable_click_highlight_featureOverlay = new ol.layer.Vector({
                source: new ol.source.Vector(),
                map: map,
                style: _servertable_click_row_highlight_feature_style


            });






            _click_coord = [];

            if (_geometry_type === 'Polygon') {


                // assume each coordinate has only 1 polygon,
                for (i = 0, len = _geometry_coord[0].length; i < len; ++i) {




                    var _new_lat = _geometry_coord[0][i][1];
                    var _new_long = _geometry_coord[0][i][0];


                    var _latlng = [];
                    _latlng.push(_new_long);
                    _latlng.push(_new_lat);

                    _click_coord.push(_latlng);


                }// for


                _highlight_click_servertable_polygon = new ol.geom.Polygon([_click_coord]);

                _highlight_click_servertable_polygon.transform('EPSG:4326', 'EPSG:3857');

                // Create feature with polygon.
                _highlight_click_servertable_feature = new ol.Feature(_highlight_click_servertable_polygon);



                _servertable_click_highlight_featureOverlay.getSource().addFeature(_highlight_click_servertable_feature);





                // zoom the map to the polygon

                //var extent = _highlight_click_servertable_polygon.getExtent();
                //map.getView().fit(extent, map.getSize());

                map.getView().fit(_highlight_click_servertable_polygon, map.getSize());





            }// polygon
            else if (_geometry_type === 'LineString') {



                // assume each coordinate has only 1 polygon,
                for (i = 0, len = _geometry_coord.length; i < len; ++i) {


                    var _new_lat = _geometry_coord[i][1];
                    var _new_long = _geometry_coord[i][0];
                    var _latlng = [];

                    _latlng.push(_new_long);
                    _latlng.push(_new_lat);

                    _click_coord.push(_latlng);

                }// for



                _highlight_click_servertable_line = new ol.geom.LineString(_click_coord);

                _highlight_click_servertable_line.transform('EPSG:4326', 'EPSG:3857');




                // Create feature with polygon.
                _highlight_click_servertable_feature = new ol.Feature(_highlight_click_servertable_line);




                _servertable_click_highlight_featureOverlay.getSource().addFeature(_highlight_click_servertable_feature);





                // zoom the map to the polygon
                // alert(_highlight_click_servertable_line.getExtent());
                map.getView().fit(_highlight_click_servertable_line, map.getSize());


            }// linestring
            else if (_geometry_type === 'Point') {

                var _new_lat = _geometry_coord[1];
                var _new_long = _geometry_coord[0];
                var _latlng = [];

                _latlng.push(_new_long);
                _latlng.push(_new_lat);

                _click_coord = _latlng;


                //_click_coord = ol.proj.transform(_click_coord, 'EPSG:4326', 'EPSG:3857');




                // _highlight_click_servertable_point = new ol.geom.Circle(_click_coord);
                _highlight_click_servertable_point = new ol.geom.Point(_click_coord);



                _highlight_click_servertable_point.transform('EPSG:4326', 'EPSG:3857');





                // Create feature with polygon.
                _highlight_click_servertable_feature = new ol.Feature(_highlight_click_servertable_point);





                _servertable_click_highlight_featureOverlay.getSource().addFeature(_highlight_click_servertable_feature);



                // zoom the map to the polygon

                // alert(_highlight_click_servertable_point.getExtent());
                // fit() zoom too much, not use.
                //map.getView().fit(_highlight_click_servertable_point.getExtent(), map.getSize());  

                map.getView().setCenter(ol.proj.transform(_click_coord, 'EPSG:4326', 'EPSG:3857'));
                map.getView().setZoom(_flyto_zoomlevel);


            }// point






            // --------------End -when click draw polygon line marker on map (red) -------------------



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


            // -----------  **************   openlayers    ****************--------------


            var _servertable_highlight;
            var _servertable_feature;
            var _servertable_highlightStyleCache = {};


            if (_servertable_highlight_featureOverlay) {

                // remove last time mouse over highlight feature
                _servertable_highlight_featureOverlay.getSource().clear();
            }


            _servertable_highlight_featureOverlay = new ol.layer.Vector({
                source: new ol.source.Vector(),
                map: map,
                style: _servertable_mouseover_row_highlight_feature_style


            });





            _mouseover_coord = [];

            if (_geometry_type === 'Polygon') {

                //var ring = [
                //  [a[0].lng, a[0].lat], [a[1].lng, a[1].lat],
                //  [a[2].lng, a[2].lat], [a[0].lng, a[0].lat]
                //];

                //// A polygon is an array of rings, the first ring is
                //// the exterior ring, the others are the interior rings.
                //var polygon = new ol.geom.Polygon([ring]);


                // assume each coordinate has only 1 polygon,
                for (i = 0, len = _geometry_coord[0].length; i < len; ++i) {




                    var _new_lat = _geometry_coord[0][i][1];
                    var _new_long = _geometry_coord[0][i][0];


                    var _latlng = [];
                    _latlng.push(_new_long);
                    _latlng.push(_new_lat);

                    _mouseover_coord.push(_latlng);


                }// for





                _highlight_servertable_polygon = new ol.geom.Polygon([_mouseover_coord]);

                _highlight_servertable_polygon.transform('EPSG:4326', 'EPSG:3857');

                // Create feature with polygon.
                _highlight_servertable_feature = new ol.Feature(_highlight_servertable_polygon);




                _servertable_highlight_featureOverlay.getSource().addFeature(_highlight_servertable_feature);





            }// polygon
            else if (_geometry_type === 'LineString') {









                // assume each coordinate has only 1 line,
                for (i = 0, len = _geometry_coord.length; i < len; ++i) {


                    var _new_lat = _geometry_coord[i][1];
                    var _new_long = _geometry_coord[i][0];
                    var _latlng = [];

                    _latlng.push(_new_long);
                    _latlng.push(_new_lat);

                    _mouseover_coord.push(_latlng);





                }// for







                _highlight_servertable_line = new ol.geom.LineString(_mouseover_coord);

                _highlight_servertable_line.transform('EPSG:4326', 'EPSG:3857');


                //alert(_highlight_servertable_line.getFirstCoordinate());

                // Create feature with polygon.
                _highlight_servertable_feature = new ol.Feature(_highlight_servertable_line);




                _servertable_highlight_featureOverlay.getSource().addFeature(_highlight_servertable_feature);





            }// linestring
            else if (_geometry_type === 'Point') {






                var _new_lat = _geometry_coord[1];
                var _new_long = _geometry_coord[0];
                var _latlng = [];

                _latlng.push(_new_long);
                _latlng.push(_new_lat);



                // wrong:   _mouseover_coord.push(_latlng);   circle([[lng,lat]]) wrong, should be circle([lng,lat])
                _mouseover_coord = _latlng;

                //_mouseover_coord = ol.proj.transform(_mouseover_coord, 'EPSG:4326', 'EPSG:3857');



                // circle style does not working, so use point
                //_highlight_servertable_point = new ol.geom.Circle(_mouseover_coord);
                _highlight_servertable_point = new ol.geom.Point(_mouseover_coord);



                _highlight_servertable_point.transform('EPSG:4326', 'EPSG:3857');





                // Create feature with polygon.
                _highlight_servertable_feature = new ol.Feature(_highlight_servertable_point);





                _servertable_highlight_featureOverlay.getSource().addFeature(_highlight_servertable_feature);


            }// point



            //--------------------------------------------------------------------------------


        }); // mouseover cell event  



        $('#tabledataX tbody').on('mouseout', 'tr', function () {


            // remove all high light feature 

            if (_servertable_highlight_featureOverlay) {

                _servertable_highlight_featureOverlay.getSource().clear();
            }




        });

        // -----------End   **************   openlayers    ****************--------------



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


    // load data for upper entire datatable
    datatablesX();

    initialize();



}); // document ready function















