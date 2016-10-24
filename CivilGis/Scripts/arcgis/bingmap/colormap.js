










// ---------- map click event [3]--------add _map_click --------

function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {

    // Load a GeoJSON from the server 


   



    // test url if return a number means too many polygon to show.otherwise add polygon to map.
    $.get(_apiURI, function (data) {

        if (isNaN(data)) {



            // ---------   processing data(geoJson) to fill datatables -----------------



            //--------------------------------------------


            //gmap.data.loadGeoJson(_apiURI);

            // Note: data is a string, not a javascript object.
            //the function addGeoJson needs a javascript object and not a string. so you must convert string to javascript object before feed into addGeoJson
            // if you use loadGeoJson(url), do not need any formate change, feed URL return string, the loadGeoJson will do with returning string.



            var _geojson_object = JSON.parse(data);

            //----- marker cluster  [2.1] ------each time before you add new point geojson, need to clear old last time marker clusters.
            //   markerClusterer.clearMarkers();
            //--------------------------------------------   




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



            //---------------marker cluster  [2.2]-------------------
            /*
              if (_cluster_in_use) {
                  map.data.setMap(null);
                  _cluster_in_use = false;
            }
            */
            //-------------------------------------------------------


            // hidden the title_info
            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "none";
            document.getElementById("legend").style.display = "none";


            // do not use this, because it have place holder for blank
            //document.getElementById("title_info").style.visibility = "hidden";


            document.getElementById("title_info").innerHTML = "";
            document.getElementById("legend").innerHTML = "";



            /* styleFeature function is only in script block in city.cshtml
                if (($("#subjectID").val() === 'zoning') || ($("#subjectID").val() === 'general_landuse'))
            {              
                // color the zoning and general land use.
                gmap.data.setStyle(styleFeature);

            }
            */



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
            _last_geojson_layer = _current_geojson_layer;
            if (_last_geojson_layer) {

                for (var l = 0, len = _last_geojson_layer.length; l < len; l++) {

                    gmap.data.remove(_last_geojson_layer[l]);

                }// for
            }// if
            //-------------------- end remove last geojson ------------------------------



            //---------------marker cluster  [2.3]-------------------
            //  need to clear old last time marker clusters.
            // markerClusterer.clearMarkers();


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

function get_map_bound() {

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
    //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
    var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

    document.getElementById("ajaxload").style.display = "block";
    ajax_GeoJSON(map, _url, false);



}


function remove_map_listener() {

    google.maps.event.removeListener(listener_dragend);
    google.maps.event.removeListener(listener_zoom_changed);

}










// ---------  map click event [2] -------------------------------

function get_click_latlng(_click_event_lat, _click_event_lng) {


    if (_mapclick_in_use) {


        // --- current use 2X2 grid boundary (as click event latlong is on center point), you can use 3x3 grid or adjust house length to make larger/smaller select area. 
        var _square_house_length = 0.0004; // average is 0.0003-0.0004


        SWlong = _click_event_lng - _square_house_length;
        SWlat = _click_event_lat - _square_house_length;
        NElong = _click_event_lng + _square_house_length;
        NElat = _click_event_lat + _square_house_length;




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




    infowindow = new google.maps.InfoWindow();



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





    //---------- marker cluster [1]------------
    // clustering_point();





    // --------  search address
    geocoder = new google.maps.Geocoder();

    document.getElementById('search_addr').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });

    // ---------- 




    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));





    add_mapdata_listener();

    add_map_listener_idle();





}// initialize










$(document).ready(function () {





    //  load data for google map and lower datatable 
    google.maps.event.addDomListener(window, 'load', initialize);





}); // document ready function