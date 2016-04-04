



function just_add_tiles() {


    init_tiling();


    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";



}



function initialize() {








    initial_location = set_initial_location($("#areaID").val());




    // set up the map
    map = new L.Map('map-canvas');




    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &#169; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 3, maxZoom: 22, attribution: osmAttrib });

    // start the map
    map.setView(new L.LatLng(initial_location[1], initial_location[2]), initial_location[3]);



    base_map_tile_layer = map.addLayer(osm);



    add_area_boundary($("#areaID").val());




    just_add_tiles();



    geocoding();


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function