// GIS SITES INFO SIDEBAR

$("#gisSitesClose-sidebarBTN").click(function(){
  gisSitesSidebar.hide();
});


var gisSitesSidebar = L.control.sidebar("gisSitesSidebar", {
    closeButton: false,
    position: "right"
}).addTo(map);


$("#gisSitesTable-btn").click(function(){
  $("#map-container").hide();
  $("#gisSitesTable-container").show();
  $("#gisSegmentsTable-container").hide();
  $("#gisRoutesTable-container").hide();
  gisSitesDataTable.search(sessionStorage.getItem("site_name")).draw();
  $(window).resize();
});


// GIS SITES SEARCH SIDEBAR

$("#gisSites_list-btn").click(function(){
  gisSitesSearch.show();
  gisSegmentsSearch.hide();
  gisRoutesSearch.hide();
  map.invalidateSize();
});


$("#gisSites_sidebar-hide-btn").click(function() {
  gisSitesSearch.hide();
  map.invalidateSize();
});


var gisSitesSearch = L.control.sidebar("gisSitesSearch", {
    closeButton: false,
    position: "left"
}).addTo(map);



// GIS SEGMENTS INFO SIDEBAR

$("#gisSegmentsClose-sidebarBTN").click(function(){
  gisSegmentsSidebar.hide();
});


var gisSegmentsSidebar = L.control.sidebar("gisSegmentsSidebar", {
    closeButton: false,
    position: "right"
}).addTo(map);


$("#gisSegmentsTable-btn").click(function(){
  $("#map-container").hide();
  $("#gisSitesTable-container").hide();
  $("#gisSegmentsTable-container").show();
  $("#gisRoutesTable-container").hide();
  gisSegmentsDataTable.search(sessionStorage.getItem("fqn_id")).draw();
  $(window).resize();
});



// GIS SEGMENTS SEARCH SIDEBAR

$("#gisSegments_list-btn").click(function(){
  gisSegmentsSearch.show();
  gisSitesSearch.hide();
  gisRoutesSearch.hide();
  map.invalidateSize();
});


$("#gisSegments_sidebar-hide-btn").click(function() {
  gisSegmentsSearch.hide();
  map.invalidateSize();
});


var gisSegmentsSearch = L.control.sidebar("gisSegmentsSearch", {
    closeButton: false,
    position: "left"
}).addTo(map);



// GIS ROUTES INFO SIDEBAR

$("#gisRoutesClose-sidebarBTN").click(function(){
  gisRoutesSidebar.hide();
});


var gisRoutesSidebar = L.control.sidebar("gisRoutesSidebar", {
    closeButton: false,
    position: "right"
}).addTo(map);


$("#gisRoutesTable-btn").click(function(){
  $("#map-container").hide();
  $("#gisSitesTable-container").hide();
  $("#gisSegmentsTable-container").hide();
  $("#gisRoutesTable-container").show();
  gisRoutesDataTable.search(sessionStorage.getItem("fqn_id")).draw();
  $(window).resize();
});


// GIS ROUTES SEARCH SIDEBAR

$("#gisRoutes_list-btn").click(function(){
  gisRoutesSearch.show();
  gisSegmentsSearch.hide();
  gisSitesSearch.hide();
  map.invalidateSize();
});


$("#gisRoutes_sidebar-hide-btn").click(function() {
  gisRoutesSearch.hide();
  map.invalidateSize();
});


var gisRoutesSearch = L.control.sidebar("gisRoutesSearch", {
    closeButton: false,
    position: "left"
}).addTo(map);

