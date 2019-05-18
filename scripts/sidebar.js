// GIS SITES INFO SIDEBAR

$("#gisSitesClose-sidebarBTN").click(function(){
  gisSitesSidebar.hide();
});


var gisSitesSidebar = L.control.sidebar("gisSitesSidebar", {
    closeButton: false,
    position: "right",
    autoPan: false
}).addTo(map);


$("#gisSitesTable-btn").click(function(){
  $("#map-container").hide();
  $("#gisSitesTable-container").show();
  $("#gisSegmentsTable-container").hide();
  gisSitesDataTable.search(sessionStorage.getItem("site_name")).draw();
  $(window).resize();
});

$("#gisSitesEdit-btn").click(function(){
  $('#gisSitesPassed').modal('show')
});

$("#gisSitesPassed-Submit").click(function(){
  var ST_ID = sessionStorage.getItem("siteSiteTrackerID")
  var SP_F = document.getElementById('sitePassedF').value
  var SP_A = document.getElementById('sitePassedA').value

  $.ajax({
    type: "POST",
    url: "https://hook.integromat.com/9r2patwgnkzyzvywg2y6bht89zalos6x",
    contentType: "application/x-www-form-urlencoded",
    data: {
        "Forecast": SP_F,
        "Actual": SP_A,
        "API": ST_ID,
        "Email": sessionStorage.getItem("user")
    }
  });

  $('#gisSitesPassed').modal('hide');

  alert("Success!!");

  gisSitesLayer.clearLayers();

  $('#gisSitesTable').DataTable().clear().draw();

  setTimeout(function(){
    $.getJSON(gisSitesConfig.geojson, function (data) {
      gisSitesData = data;
      gisSitesFeatures = $.map(gisSitesData.features, function(feature) {
        return feature.properties;
      });
      gisSitesLayer.addData(data);
      gisSitesList = new List("gisSites_features", {valueNames: ["gisSites_feature-name"]});
      gisSitesList.sort("gisSites_feature-name", {order:"asc"});
      gisSitesBuildConfig()
    }).error(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
        alert("error " + textStatus);
    });
  }, 5000);
});


// GIS SITES SEARCH SIDEBAR

$("#gisSites_list-btn").click(function(){
  gisSitesSearch.show();
  gisSegmentsSearch.hide();
  map.invalidateSize();
});


$("#gisSites_sidebar-hide-btn").click(function() {
  gisSitesSearch.hide();
  map.invalidateSize();
});


var gisSitesSearch = L.control.sidebar("gisSitesSearch", {
    closeButton: false,
    position: "left",
    autoPan: false
}).addTo(map);



// GIS SEGMENTS INFO SIDEBAR

$("#gisSegmentsClose-sidebarBTN").click(function(){
  gisSegmentsSidebar.hide();
});


var gisSegmentsSidebar = L.control.sidebar("gisSegmentsSidebar", {
    closeButton: false,
    position: "right",
    autoPan: false
}).addTo(map);


$("#gisSegmentsTable-btn").click(function(){
  $("#map-container").hide();
  $("#gisSitesTable-container").hide();
  $("#gisSegmentsTable-container").show();
  gisSegmentsDataTable.search(sessionStorage.getItem("fqn_id")).draw();
  $(window).resize();
});



// GIS SEGMENTS SEARCH SIDEBAR

$("#gisSegments_list-btn").click(function(){
  gisSitesSearch.hide();
  gisSegmentsSearch.show();
  map.invalidateSize();
});


$("#gisSegments_sidebar-hide-btn").click(function() {
  gisSegmentsSearch.hide();
  map.invalidateSize();
});


var gisSegmentsSearch = L.control.sidebar("gisSegmentsSearch", {
    closeButton: false,
    position: "left",
    autoPan: false
}).addTo(map);