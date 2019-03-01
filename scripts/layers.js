// STREET MAP LAYER

var mapboxOSM = L.tileLayer('http://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNvdHJ1c3QiLCJhIjoibGo4TG5nOCJ9.QJnT2dgjL4_4EA7WlK8Zkw', {
    maxZoom: 22,
    opacity: 0.7
});


// SATELLITE MAP LAYER

var mapboxSat = L.tileLayer('https://api.mapbox.com/v4/cfritz1387.573ca1ee/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZyaXR6MTM4NyIsImEiOiJjaWphZTZ0eHkwMDVwdWlseGx5aWhhbXlwIn0._lgb3vbGMSx1-jdZCufdgg', {
    maxZoom: 22,
    opacity: 0.7
});


// HIGHLIGHT LAYERS

var highlightLayer = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#FF0000",
      weight: 8,
      opacity: 1,
      fillColor: "#FF0000",
      fillOpacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      click: function (e) {
        if (feature.properties.sitetracker_id.toLowerCase().indexOf("slc_sit") === 0) {
          gisSitesInfo(L.stamp(layer));
          gisSitesInfoModal.show();
        }
      }
    });
  }
});



// BASE LAYERS

var baseLayers = {
  "Street Map": mapboxOSM,
  "Satellite Map": mapboxSat
};


// OVERLAY LAYERS

var overlayLayers = {
  "<span id='layer-name'>GIS Sites</span>": gisSitesLayer,
};


// ADD LAYERS TO MAP

var map = L.map("map", {
  layers: [mapboxOSM, gisSitesLayer, highlightLayer],
  minZoom: 5,
  zoomControl: false
}).fitWorld();


// MAP CLICKING

map.clicked = 0;

map.on('click', function(event){
    map.clicked = map.clicked + 1;
    setTimeout(function(){
        if(map.clicked == 1){             
            map.clicked = 0;
        }
     }, 300);
});
map.on('dblclick', function(event){
    map.clicked = 0;
    highlightLayer.clearLayers();
    gisSitesInfoModal.hide();
});


map.doubleClickZoom.disable();


// LARGER SCREENS

if (document.body.clientWidth <= 767) {
  isCollapsed = true;
} else {
  isCollapsed = false;
}


// INFO SIDEBAR

var gisSitesInfoModal = L.control.sidebar("gisSitesInfoModal", {
    closeButton: false,
    position: "right"
}).addTo(map);


// CREATED BY

L.control.attribution({
  prefix: "Created By: Tanner Anz",
  position: "bottomright"
}).addTo(map);


// EXPAND LAYERS

if (L.Browser.mobile) {
  isCollapsed = true;
} else {
  isCollapsed = false;
}


// LAYERS

var layerControl = L.control.layers(baseLayers, overlayLayers, {
  collapsed: isCollapsed
}).addTo(map);


// MAP SCALE

L.control.scale().addTo(map);