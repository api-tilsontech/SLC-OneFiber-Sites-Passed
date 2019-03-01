// INFO CONTROL
var info = L.control({
  position: "bottomleft"
});



// CUSTOM INFO HOVER
info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info-control");
  this.update();
  return this._div;
};
info.update = function (props) {
  this._div.innerHTML = "";
};
info.addTo(map);
$(".info-control").hide();




// SWITCH VIEW TO MAP OR TABLE

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#gisSitesTable-container").show();
    $("#gisSitesTable-container").css("height", "40%");
    $("#map-container").show();
    $("#map-container").css("height", "60%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#gisSitesTable-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#gisSitesTable-container").show();
    $("#gisSitesTable-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
    map.flyToBounds(gisSitesLayer.getBounds());
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});