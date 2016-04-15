



function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    mapboxgl.accessToken = mapboxgl_accessToken;
    map = new mapboxgl.Map({
        container: 'map-canvas', // container id
        //style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location

        //style: 'mapbox://styles/mapbox/emerald-v8',

        style: 'mapbox://styles/mapbox/satellite-v8',

        center: [initial_location[2], initial_location[1]], //  starting position[-74.50, 40],
        zoom: initial_location[3] // starting zoom
    });



            //--- geocoding ---------------
           // map.addControl(new mapboxgl.Geocoder());


    //---------------- end of  init - mapboxGL -----------



    add_area_boundary($("#areaID").val());



    
    add_vector_line($("#areaID").val(), $("#subjectID").val());


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function