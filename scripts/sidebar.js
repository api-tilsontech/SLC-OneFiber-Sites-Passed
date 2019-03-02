// GIS INFO SIDEBAR

$("#gisSitesClose-sidebarBTN").click(function(){
  gisSitesSidebar.hide();
});


var gisSitesSidebar = L.control.sidebar("gisSitesSidebar", {
    closeButton: false,
    position: "right"
}).addTo(map);


// GIS SEARCH SIDEBAR

$("#list-btn").click(function(){
  gisSitesSearch.show();
  map.invalidateSize();
});


$("#sidebar-hide-btn").click(function() {
  gisSitesSearch.hide();
  map.invalidateSize();
});


var gisSitesSearch = L.control.sidebar("sidebar", {
    closeButton: false,
    position: "left"
}).addTo(map);
