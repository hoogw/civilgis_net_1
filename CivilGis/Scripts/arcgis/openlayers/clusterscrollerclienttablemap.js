

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


            last_geojson_vectorLayer = _geojson_vectorLayer;
            last_geojson_vectorLayer_pointcluster = _geojson_vectorLayer_pointcluster;




            _geojson_vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(_geojson_object, { featureProjection: 'EPSG:3857' })


            });



            //############# openlayer cluster ##############
            clusterSource = new ol.source.Cluster({
                distance: 60,
                source: _geojson_vectorSource
            });



            var styleCache = {};
            _geojson_vectorLayer_pointcluster = new ol.layer.Vector({
                //source: _geojson_vectorSource,
                source: clusterSource,


                style: function (feature) {
                    var size = feature.get('features').length;
                    var style = styleCache[size];
                    if (!style) {
                        style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 10,
                                stroke: new ol.style.Stroke({
                                    color: '#fff'
                                }),
                                fill: new ol.style.Fill({
                                    color: '#3399CC'
                                })
                            }),
                            text: new ol.style.Text({
                                text: size.toString(),
                                fill: new ol.style.Fill({
                                    color: '#fff'
                                })
                            })
                        });
                        styleCache[size] = style;
                    }
                    return style;
                }
            });


            map.addLayer(_geojson_vectorLayer_pointcluster);


            //############# End openlayer cluster ##############



            _geojson_vectorLayer = new ol.layer.Vector({
                source: _geojson_vectorSource,
                style: styleFunction
            });


            map.addLayer(_geojson_vectorLayer);
            _current_geojson_layer = true;



            $('#utfgrid_info').hide();









            if (_last_geojson_layer) {

                ////......................... remove layer .........................

                //// layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = last time geojson(cluster),  4 = last time geojson, 5 = current geojson (cluster) 6 = current geojson  / so 3 = array.lenghth - 4

                //_all_layers = map.getLayers().getArray();



                ////remove last time cluster and last time geosjon 3, and 4 

                //map.removeLayer(_all_layers[_all_layers.length - 4]);
                //map.removeLayer(_all_layers[_all_layers.length - 3]);
                ////.........................End  remove layer .........................





                //............... remove source ........................


                last_geojson_vectorLayer.getSource().clear();
                last_geojson_vectorLayer_pointcluster.getSource().clear();






                //...............End remove source ........................

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


                ////................. remove layer ................
                //_all_layers = map.getLayers().getArray();



                //// layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = geojson(cluster)  4 = geojson  

                //map.removeLayer(_all_layers[_all_layers.length - 1]);
                //map.removeLayer(_all_layers[_all_layers.length - 2]);
                ////.................End remove layer ................




                //.............. remove source ................
                _geojson_vectorLayer.getSource().clear();
                _geojson_vectorLayer_pointcluster.getSource().clear();
                //..............End remove source ................



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





$(document).ready(function () {



    initialize();

}); // document ready function






