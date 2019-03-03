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



// GIS SITES FIELDS

var gisSitesFields = gisSitesProperties.map(function(elem) {
  return elem.value;
}).join("%2C");


// GIS SITES REST URL

var gisSitesConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/2/query?where=objectid+IS+NOT+NULL&outFields=" + gisSitesFields + "&f=geojson&token=" + gis_token,
  layerName: "Sites",
  hoverProperty: "site_name"
};


// GIS SITES BUILD CONFIG


function gisSitesBuildConfig() {
  gisSitesTable = [];

  $.each(gisSitesProperties, function(index, value) {
    if (value.table) {
      gisSitesTable.push({
        data: "properties." + value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (gisSitesTable[index+1]) {
          gisSitesTable[index+1][key] = val;
        }
      });
    }
  });

  gisSitesBuildTable()
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
          gisSegmentsSidebar.hide();
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
      $("#gisSites_feature-list tbody").append('<tr onclick= "gisSitesSearchClick(' +L.stamp(layer) + ')"><td class="gisSites_feature-name">' + layer.feature.properties.site_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
    }
    if (feature.properties.removesite === "Yes" || feature.properties.removesite === "Y" || feature.properties.clustername === "REMOVE") {
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


function gisSitesSearchClick(id) {
  var layer = gisSitesLayer.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 16);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    gisSitesSidebar.show();
    gisSegmentsSidebar.hide();
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
  gisSitesList = new List("gisSites_features", {valueNames: ["gisSites_feature-name"]});
  gisSitesList.sort("gisSites_feature-name", {order:"asc"});
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



// GIS SITES TABLE

function gisSitesBuildTable() {

  var table = $('#gisSitesTable').DataTable({ // Change table element ID here
    dom: 'Bfrtip', // Add this to enable export buttons
    buttons: [ // Add this to choose which buttons to display
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    colReorder: true,
    data: gisSitesData.features,
    "autoWidth": true, // Feature control DataTables' smart column width handling
    "deferRender": true, // Feature control deferred rendering for additional speed of initialisation.
    "info": true, // Display info about table including filtering
    "lengthChange": false, // If pagination is enabled, allow the page length to be changed by user
    "ordering": true, // Toggle user ordering of table columns
    "paging": false, // Toggle table paging
    "processing": true, // Toggle "processing" indicator useful when loading large table/filter
    "scrollX": false, // Left/right scrolling option, in pixels or false to disable
    "scrollY": "550px", // Table height in pixels before up/down scrolling, or false to disable scrolling
    "searching": true, // Toggle search all columns field
    "stateSave": true, // If true, table will restore to user filtered state when page is reopened     
    "scrollCollapse": true, // If true, the table will be collapsed if the height of the records is < the scrollY option; prevents footer from floating
    "columns": gisSitesTable,
    "language": {
      "emptyTable": "Loading..."
    }
  });
}

// GIS SITES OPEN TABLE

$("#gisSites_table-btn").click(function(){
  $("#gisSitesTable-container").show();
  $("#gisSitesTable-container").css("height", "100%");
  $("#gisSegmentsTable-container").hide();
  $("#map-container").hide();
  $(window).resize();
  map.flyToBounds(gisSitesLayer.getBounds());
});