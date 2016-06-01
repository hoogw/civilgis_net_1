



function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {


   

    // Load a GeoJSON from the server 


    




    // test url if return a number means too many polygon to show.otherwise add polygon to map.
    $.get(_apiURI, function (data) {

        if (isNaN(data)) {



            // ---------   processing data(geoJson) to fill datatables -----------------





             _geojson_object = JSON.parse(data);

            //...................... openlayers ..........................


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