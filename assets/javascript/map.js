// Instantiate the Platform class with authentication and authorization credentials:
var platform = new H.service.Platform({
    'useCIT': true,
    'app_id': 'LQatUsUjSscjhLTGCDZv',
    'app_code': 'y6bzRWBz92OtxlG8xgLUnA'
});

// Instantiate a map inside the DOM element with id map. The map center is in San Francisco, the zoom level is 10:
var map = new H.Map(document.getElementById('map'),
    platform.createDefaultLayers().normal.map, {
        center: { lat: 37.7942, lng: -122.4070 },
        zoom: 15
});

// Create the default UI components:
var ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());

// Set a global latitude and longitude variable
var latitude;
var longitude;

// Function to center the map on the returned location
function locationSuccess(position) {
    // Set the latitude and longitude variables
    // These variables were initialized above
    // but now that we have the location
    // we are going to store the location in these variables
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // Center the map with the new longitude and latitude
    map.setCenter({ lat: latitude, lng: longitude }, true);
}

// Try to get the current location
navigator.geolocation.getCurrentPosition(locationSuccess);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
map.addEventListener('tap', function(evt) {
// Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type); 
});

// Instantiate the default behavior, providing the mapEvents object: 
var behavior = new H.mapevents.Behavior(mapEvents);


/**
 * Assuming that "map", "ui" and "platform" are already initialized
 */
// Create default map layers with POIs present:
maptypes = platform.createDefaultLayers(256, 160, false, false, null, /*pois*/ true);

// Add metainfo layer to the map:
map.addLayer(maptypes.normal.metaInfo);

// Store a reference to the metaInfo TileProvider:
var tileProvider = maptypes.normal.metaInfo.getProvider();

// Add a listener for pointerdown events -- it displays an info bubble with the POI
// name when the map user clicks on the POI:
tileProvider.addEventListener('pointerdown', function(e) {
  // Get the spatial object on which the user clicked:
  var spatial = e.target,
    // Get the meta data for the object:
    metadata = spatial.getData(),
    // Translate the screen coordinates of the click to lat/lon:
    coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);

  // Display an info bubble with the name of the object at the location of the click:
  if (metadata.category === 'POIs') {
    var bubble  =  new H.ui.InfoBubble(coord, {content : metadata.name});
    ui.addBubble(bubble);
  }
});


$("#query-button").on("click", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the category from the user's input
    var queryInput = $("#place-input").val();

    // Create a group object to hold map markers:
    var group = new H.map.Group();

    // Add the group object to the map:
    map.addObject(group);

    // Obtain a Search object through which to submit search
    // requests:
    var search = new H.places.Search(platform.getPlacesService()),
        searchResult, error;

    // Define search parameters:
    var params = {
        // Search for the category the user specified
        'q': queryInput,
        // Search near the current location
        'at': latitude + ',' + longitude
    };

    // Define a callback function to handle data on success:
    function onResult(data) {
        addPlacesToMap(data.results);
    }

    // Define a callback function to handle errors:
    function onError(data) {
        error = data;
    }

    // This function adds markers to the map, indicating each of
    // the located places:
    function addPlacesToMap(result) {
        group.addObjects(result.items.map(function (place) {
            var marker = new H.map.Marker({
                lat: place.position[0],
                lng: place.position[1]
            })
            return marker;
        }));
    }

    // Run a search request with parameters, headers (empty), and
    // callback functions:
    search.request(params, {}, onResult, onError);

    // Enable the event system on the map instance:
    var mapEvents = new H.mapevents.MapEvents(map);

    // Add event listeners:
    map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type); 
    });

    // Instantiate the default behavior, providing the mapEvents object: 
    var behavior = new H.mapevents.Behavior(mapEvents);      

    /**
     * Assuming that "map", "ui" and "platform" are already initialized
     */
    // Create default map layers with POIs present:
    maptypes = platform.createDefaultLayers(256, 160, false, false, null, /*pois*/ true);

    // Add metainfo layer to the map:
    map.addLayer(maptypes.normal.metaInfo);

    // Store a reference to the metaInfo TileProvider:
    var tileProvider = maptypes.normal.metaInfo.getProvider();

    // Add a listener for pointerdown events -- it displays an info bubble with the POI
    // name when the map user clicks on the POI:
    tileProvider.addEventListener('pointerdown', function(e) {
    // Get the spatial object on which the user clicked:
    var spatial = e.target,
        // Get the meta data for the object:
        metadata = spatial.getData(),
        // Translate the screen coordinates of the click to lat/lon:
        coord = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);

    // Display an info bubble with the name of the object at the location of the click:
    if (metadata.category === 'POIs') {
        var bubble  =  new H.ui.InfoBubble(coord, {content : metadata.name});
        ui.addBubble(bubble);
    }
    });



});