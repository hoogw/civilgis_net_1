



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


       // "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150
        scrollY: 200,
        scrollX: true,


        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    // ajax click row event show corespoinding data.feature[] on google map 
    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _geo_ID = table.cell(rowIdx, _dt_columns_count - 1).data();





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
        //map.data.revertStyle();
        _current_geojson_layer.setStyle(geojson_default_style);

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



            //--------------------------------------------


            //gmap.data.loadGeoJson(_apiURI);

            // Note: data is a string, not a javascript object.
            //the function addGeoJson needs a javascript object and not a string. so you must convert string to javascript object before feed into addGeoJson
            // if you use loadGeoJson(url), do not need any formate change, feed URL return string, the loadGeoJson will do with returning string.



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









            // determine feature is point or not point
            // var _geojson_feature_geometry_type = _geojson_object['features'][0]['geometry']['type'];










            //----------------  add new geojson, then remove last geojson --------------------




            _last_geojson_layer = _current_geojson_layer;

            _last_markers_cluster = _current_markers_cluster;




            _current_geojson_layer = L.geoJson(_geojson_object, {


                // for point feature, by default it use marker, but instead of use marker, here change marker to polygon (circle marker) 
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojson_Marker_style_Options);
                },


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
                        // hide 'utfgrid_info' <div>
                        $('#utfgrid_info').hide();


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

            //-------------------- add marker cluster layer too map -------------
            _current_markers_cluster = L.markerClusterGroup();
            _current_markers_cluster.addLayer(_current_geojson_layer);

            map.addLayer(_current_markers_cluster);


            //----------------------------------------------------------------





            // ---- after add new geojson, now remove last time old geojson -------------
            // don't use Array.ForEach is about 95% slower than for() in JavaScript.

            if (_last_geojson_layer) {



                map.removeLayer(_last_geojson_layer);

                map.removeLayer(_last_markers_cluster);

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





            });// get// end get process geojson




        }
            // returning number of count
        else {


            // ---------- if return number, should remove last time geojson -----------
            _last_geojson_layer = _current_geojson_layer;
            _last_markers_cluster = _current_markers_cluster;


            if (_last_geojson_layer) {

                map.removeLayer(_last_geojson_layer);

                map.removeLayer(_last_markers_cluster);


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




    init_base_map();


    //  ***** this add map listenner must be befor map.setView, *******************
    add_map_listener_idle();


    map.setView(new L.LatLng(initial_location[1], initial_location[2]), initial_location[3]);

    //  ***** end  **** this add map listenner must be befor map.setView, *******************





    add_area_boundary($("#areaID").val());



   



    //------tile[1] ---------
    init_tiling();







    geocoding();


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function