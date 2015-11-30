
var map;
var markersArray = [];
var apiURI;
var infowindow;
var base_url;
var point_icon_url;

var initial_location = [];





var bounds;
var southWest;
var northEast;
var SWlong;
var SWlat;
var NElong;
var NElat;
var _url;


function ajax_GeoJSON(gmap, _apiURI) {

    
    


    // before load new geoJSON feature, need to remove all current geoJSON feature.

    var callback = function (feature) {
        //If you want, check here for some constraints.
        gmap.data.remove(feature);
    };
    gmap.data.forEach(callback);

    

   // alert(_apiURI);

    // test url if return a number means too many polygon to show.otherwise add polygon to map.
    $.get(_apiURI, function (data) {

        //alert(data);

        if (isNaN(data)) {
            // returning geoJSON 
            

            gmap.data.loadGeoJson(_apiURI);

            // hidden the title_info
            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "none";
            document.getElementById("legend").style.display = "none";


            // do not use this, because it have place holder for blank
            //document.getElementById("title_info").style.visibility = "hidden";


            document.getElementById("title_info").innerHTML = "";
            document.getElementById("legend").innerHTML = "";




           
        }
            // returning number of count
        else {

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
        }

    });// get

    

}// function ajax_GeoJSON






function initialize() {


    initial_location = set_initial_location();
    
   
    var mapOptions = {
        
        //center: new google.maps.LatLng(33.65992448007282, -117.91505813598633),
        center: new google.maps.LatLng(initial_location[1], initial_location[2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    map.setZoom(initial_location[3]);


   


    infowindow = new google.maps.InfoWindow();

    // must stay to close info window if user click out side polygon 
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
        document.getElementById("info-table").innerHTML = "";
    });


    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('legend'));



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
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {
            strokeWeight: 8,
            //strokeColor: '#fff',
            fillOpacity: 0.01
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
        map.data.revertStyle();

        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
        //infowindow.close();

    });



    //map.addListener('bounds_changed', function() {  // does not work well
    map.addListener('dragend', function () {
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
        // http://localhost:100/api/geojson/schools/-117.963690/33.634180/-117.854780/33.702970/
        _url = '/api/geojson/' + initial_location[0] + '/'+$("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';

         document.getElementById("ajaxload").style.display = "block";

        ajax_GeoJSON(map, _url);
    });



    map.addListener('zoom_changed', function () {
        //   document.getElementById("title_info").innerHTML = "MAP BOUNDS [SouthWest, NorthEast] "+ map.getBounds();
        // get current map bounds as URL parameters. 
        bounds = map.getBounds();
        southWest = bounds.getSouthWest();
        northEast = bounds.getNorthEast();
        SWlong = southWest.lng();
        SWlat = southWest.lat();
        NElong = northEast.lng();
        NElat = northEast.lat();

        // http://localhost:10/civilgis/api/load/general_landuse/SWlong/SWlat/NElong/NElat/   This is sample URI
        _url = "/api/geojson/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

        document.getElementById("ajaxload").style.display = "block";
        ajax_GeoJSON(map, _url);
    });




    // initial load all geoJSON feature.

    //var _url_init = "/api/geojson/" + initial_location[0] + '/' + $("#subjectID").val() + "-117.963690/33.634180/-117.854780/33.702970/";
    var _url_init = "/api/geojson/" + initial_location[0] + '/' + $("#subjectID").val() + initial_location[4];

    
    ajax_GeoJSON(map, _url_init);


}// initialize








