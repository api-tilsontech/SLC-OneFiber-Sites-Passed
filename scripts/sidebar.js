// GIS SITES INFO SIDEBAR

$("#gisSitesClose-sidebarBTN").click(function(){
  gisSitesSidebar.hide();
});

var sidebar = L.control.sidebar({ container: 'gisSitesSidebar' })
    .addTo(map)
    .open('home');
// add panels dynamically to the sidebar
sidebar
    .addPanel({
        id:   'js-api',
        tab:  '<i class="fa fa-gear"></i>',
        title: 'JS API',
        pane: '<p>The Javascript API allows to dynamically create or modify the panel state.<p/><p><button onclick="sidebar.enablePanel(\'mail\')">enable mails panel</button><button onclick="sidebar.disablePanel(\'mail\')">disable mails panel</button></p><p><button onclick="addUser()">add user</button></b>',
    })
    // add a tab with a click callback, initially disabled
    .addPanel({
        id:   'mail',
        tab:  '<i class="fa fa-envelope"></i>',
        title: 'Messages',
        button: function() { alert('opened via JS callback') },
        disabled: true,
    })
// be notified when a panel is opened
sidebar.on('content', function (ev) {
    switch (ev.id) {
        case 'autopan':
        sidebar.options.autopan = true;
        break;
        default:
        sidebar.options.autopan = false;
    }
});
var userid = 0
function addUser() {
    sidebar.addPanel({
        id:   'user' + userid++,
        tab:  '<i class="fa fa-user"></i>',
        title: 'User Profile ' + userid,
        pane: '<p>user ipsum dolor sit amet</p>',
    });
}


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
  var GIS_ID = sessionStorage.getItem("objectid")
  var CF = sessionStorage.getItem("current_forecast")
  var CA = sessionStorage.getItem("current_actual")
  var SITE = sessionStorage.getItem("site_name")
  var SP_F = document.getElementById('sitePassedF').value
  var SP_A = document.getElementById('sitePassedA').value

  $.ajax({
    type: "POST",
    url: "https://hook.integromat.com/9r2patwgnkzyzvywg2y6bht89zalos6x",
    contentType: "application/x-www-form-urlencoded",
    data: {
      "Current Forecast": CF,
      "Current Actual": CA,
      "Forecast": SP_F,
      "Actual": SP_A,
      "API": ST_ID,
      "Email": sessionStorage.getItem("user"),
      "ObjectID": GIS_ID,
      "Name": SITE
    }
  });

  $('#gisSitesPassed').modal('hide');

  setTimeout(function(){
    $.getJSON(gisSitesConfig.geojson, function (data) {
      gisSitesData = data;
      gisSitesFeatures = $.map(gisSitesData.features, function(feature) {
        return feature.properties;
      });
      gisSitesLayer.clearLayers();
      gisSitesLayer.addData(data);
    }).error(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
        alert("error " + textStatus);
    });
  }, 7000);

  document.getElementById('sitePassedF').value = "";
  document.getElementById('sitePassedA').value = "";
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