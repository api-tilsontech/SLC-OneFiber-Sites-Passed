// GIS SITES REST URL

var gisSitesConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/2/query?where=objectid+IS+NOT+NULL&outFields=*&f=geojson&token=" + gis_token,
  layerName: "Sites",
  hoverProperty: "site_name"
};




// GIS SITES PROPERTIES

var gisSitesProperties = [{
  value: "sitetracker_id",
  label: "SiteTracker ID",
  table: {
    visible: true
  },
  filter: {
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["equal"],
    values: []
  }
},
{
  value: "type",
  label: "Type",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "tower_type",
  label: "Tower Type",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "carrier_sector_count",
  label: "Sector Count",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "city",
  label: "City",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal", "contains"],
    values: []
  }
},
{
  value: "spoke",
  label: "Spoke",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    input: "radio",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "clustername",
  label: "Cluster Name",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "site_name",
  label: "Site Name",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal", "contains"],
    values: []
  }
},
{
  value: "nfid",
  label: "Site NFID",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal", "contains"],
    values: []
  }
}];



// GIS SITES CONFIG

var gisSitesConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/2/query?where=objectid+IS+NOT+NULL&outFields=*&f=geojson&token=" + gis_token,
  layerName: "Sites",
  hoverProperty: "site_name"
};


function gisSitesBuildConfig() {
  table = [{
    field: "action",
    title: "<i class='fa fa-gear'></i>&nbsp;Action",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
          '<i class="fa fa-search-plus"></i>',
        '</a>',
        '<a class="identify" href="javascript:void(0)" title="Identify" style="margin-right: 10px;">',
          '<i class="fa fa-info-circle"></i>',
        '</a>'
      ].join("");
    },
    events: {
      "click .zoom": function (e, value, row, index) {
        map.fitBounds(gisSitesLayer.getLayer(row.leaflet_stamp).getBounds());
        highlightLayer.clearLayers();
        highlightLayer.addData(gisSitesLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }
    }
  }];

  $.each(gisSitesProperties, function(index, value) {
    if (value.table) {
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {
          table[index+1][key] = val;
        }
      });
    }
  });
  map.flyToBounds(gisSitesLayer.getBounds());
}




// GIS SITES LAYER

var gisSitesLayer = L.geoJson(null, {
  filter: function (feature) {
    if (feature.properties.clustername.toLowerCase().indexOf("loop") === -1) {
      return true
    };
  },
  onEachFeature: function (feature, layer) {
    layer.bindTooltip(feature.properties.nfid + "--" + feature.properties.site_name, {sticky: 'true', direction: 'top'});

    if (feature.properties) {
      var title = feature.properties.site_name;
      var content = "<table class='table table-striped table-bordered table-condensed'>";
      content += "<table>";
      layer.on({
        click: function (e) {
          $("#gisSitesInfo_Title").html(feature.properties.nfid);
          gisSitesInfo(L.stamp(layer));
          activeRecord = feature.properties.site_name;
          highlightLayer.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#FF0000",
            fillOpacity: 1,
            radius: 10
          }));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '"><td class="feature-name">' + layer.feature.properties.site_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
    }
    if (feature.properties.removesite === "Yes") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/removed.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL BROADWAY" && feature.properties.site_name === "SAL BROADWAY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20BROADWAY.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL BROADWAY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20BROADWAY.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "XO 90TH" && feature.properties.site_name === "XO 90TH") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20CRESCENT.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "XO 90TH") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20CRESCENT.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL HOLLADAY" && feature.properties.site_name === "SAL HOLLADAY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20HOLLADAY.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL HOLLADAY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20HOLLADAY.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL HONEY" && feature.properties.site_name === "SAL HONEY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20HONEY.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL HONEY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20HONEY.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL RED HANGER" && feature.properties.site_name === "SAL RED HANGER") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20RED%20HANGER.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL RED HANGER") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20RED%20HANGER.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL RELIEVER" && feature.properties.site_name === "SAL RELIEVER") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20RELIEVER.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL RELIEVER") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20RELIEVER.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL ROXANNE" && feature.properties.site_name === "SAL ROXANNE") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20ROXANNE.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL ROXANNE") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20ROXANNE.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SAND JUMP" && feature.properties.site_name === "SAL SAND JUMP") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SAND%20JUMP.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SAND JUMP") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SAND%20JUMP.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SANDY" && feature.properties.site_name === "SAL SANDY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SANDY.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SANDY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SANDY.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SHERWOOD PARK" && feature.properties.site_name === "SAL SHERWOOD PARK") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SHERWOOD%20PARK.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SHERWOOD PARK") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SHERWOOD%20PARK.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SOUTH JORDAN" && feature.properties.site_name === "SAL SOUTH JORDAN") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SOUTH%20JORDAN.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SOUTH JORDAN") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SOUTH%20JORDAN.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SOUTH SALT LAKE CITY" && feature.properties.site_name === "SAL SOUTH SALT LAKE CITY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SOUTH%20SALT%20LAKE.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SOUTH SALT LAKE CITY") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SOUTH%20SALT%20LAKE.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "SAL SUGARHOUSE" && feature.properties.site_name === "SAL SUGARHOUSE") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20SUGARHOUSE.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "SAL SUGARHOUSE") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20SUGARHOUSE.png",
          iconSize: [20, 20],
        })
      );
    } else if (feature.properties.clustername === "UTSL-KEARNS MTSO" && feature.properties.site_name === "UTSL-KEARNS MTSO") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/hubs/SAL%20KEARNS.png",
          iconSize: [30, 30],
        })
      );
    } else if (feature.properties.clustername === "UTSL-KEARNS MTSO") {
      layer.setIcon(
        L.icon({
          iconUrl: "pictures/demandPoints/SAL%20KEARNS.png",
          iconSize: [20, 20],
        })
      );
    } 
  }
});


$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});


function sidebarClick(id) {
  var layer = gisSitesLayer.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 16);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}


//GIS SITES DATA

$.getJSON(gisSitesConfig.geojson, function (data) {
  gisSitesData = data;
  gisSitesFeatures = $.map(gisSitesData.features, function(feature) {
    return feature.properties;
  });
  gisSitesLayer.addData(data);
  gisSitesList = new List("features", {valueNames: ["feature-name"]});
  gisSitesList.sort("feature-name", {order:"asc"});
  gisSitesBuildConfig()
  $("#loading-mask").hide();
}).error(function(jqXHR, textStatus, errorThrown) {
    console.log("error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
    alert("error " + textStatus);
});



// GIS SITES INFO

function gisSitesInfo(id) {
  
  var featureProperties = gisSitesLayer.getLayer(id).feature.properties;

  var content = "<table class='table table-striped table-bordered table-condensed'>";

  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && value.includes('SLC_SIT')) {
      sessionStorage.setItem("siteID", value);
    }
    $.each(gisSitesProperties, function(index, property) {
      if (key == property.value) {
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value + "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#gisSites-Info_DATA").html(content);
  gisSitesSidebar.show();
};


$("#gisSitesClose-sidebarBTN").click(function(){
  gisSitesSidebar.hide();
});
