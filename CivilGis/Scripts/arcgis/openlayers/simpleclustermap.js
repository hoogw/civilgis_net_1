

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

            //...................... openlayers ..........................


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


                            style: function(feature) {
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


            //------------------------end add new geojson, then remove last geojson------------------------- ---------------





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