// GIS SEGMENTS PROPERTIES

var gisSegmentsProperties = [{

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
  value: "objectid",
  label: "GIS_ID",
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
  value: "workorderid",
  label: "WO_ID",
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
  value: "fqn_id",
  label: "FQNID",
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
  value: "sitespannfid",
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
},
{
  value: "cabletype",
  label: "Cable Type",
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
  value: "fibercount",
  label: "Strand Count",
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
  value: "calculatedlength",
  label: "Engineered Footage",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "real_length",
  label: "Actual Footage",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    vertical: true,
    multiple: true,
    operators: ["equal", "not_equal"],
    values: []
  }
},
{
  value: "oofstatus",
  label: "Status",
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
  value: "oofdateindesign",
  label: "In Design",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    value: "date",
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["is_not_null"],
    values: []
  }
},
{
  value: "oofdatepermitsubmitted",
  label: "Permit Submitted",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    value: "date",
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["is_not_null"],
    values: []
  }
},
{
  value: "permit_received",
  label: "Permit Received",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    value: "date",
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["is_not_null"],
    values: []
  }
},
{
  value: "oofdatecableplaced",
  label: "Cable Placed",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    value: "date",
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["is_not_null"],
    values: []
  }
},
{
  value: "oofdatesplicedandtested",
  label: "Spliced/Tested",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    value: "date",
    type: "string",
    vertical: true,
    multiple: true,
    operators: ["is_not_null"],
    values: []
  }
}];


// GIS SEGMETNS FIELDS

var gisSegmentsFields = gisSegmentsProperties.map(function(elem) {
  return elem.value;
}).join("%2C");


// GIS SEGMENTS CONFIG

var gisSegmentsConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/3/query?where=fqn_id+IS+NOT+NULL&outFields=" + gisSegmentsFields + "&f=geojson&token=" + gis_token,
  layerName: "Segments",
  hoverProperty: "fqn_id",
  sortProperty: "fqn_id",
  sortOrder: "ascend",
};


function gisSegmentsBuildConfig() {
  gisSegmentsTable = [];

  $.each(gisSegmentsProperties, function(index, value) {
    if (value.table) {
      gisSegmentsTable.push({
        data: "properties." + value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (gisSegmentsTable[index+1]) {
          gisSegmentsTable[index+1][key] = val;
        }
      });
    }
  });

  gisSegmentsBuildTable();
}




// GIS SEGMENTS LAYER

var gisSegmentsLayer = L.geoJson(null, {
  style: function (feature, layer) {
    if (feature.properties.fqn_id.toLowerCase().indexOf("fib:bur") === 0) {
      return {
        color: "#0066ff",
        weight: 4,
        opacity: 1
      };
    } else if (feature.properties.fqn_id.toLowerCase().indexOf("fib:aer") === 0) {
      return {
        color: "#ff3300",
        weight: 4,
        opacity: 1
      };
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties.fqn_id.toLowerCase().indexOf("fib:bur") === 0) {
      layer.bindTooltip(feature.properties.fqn_id + "-- Underground", {sticky: 'true', direction: 'top'});
    } else if (feature.properties.fqn_id.toLowerCase().indexOf("fib:aer") === 0) {
      layer.bindTooltip(feature.properties.fqn_id + "-- Aerial", {sticky: 'true', direction: 'top'});
    };
    
    if (feature.properties) {
      layer.on({
        click: function (e) {
          $("#gisSegmentsInfo_Title").html(feature.properties.fqn_id);
          gisSegmentsInfo(L.stamp(layer));
        },
        mouseover: function (e) {
          if (document.body.clientWidth > 767) {
            $(".info-control").html(feature.properties[gisSegmentsConfig.hoverProperty]);
            $(".info-control").show();
            highlightLayer.clearLayers();
            highlightLayer.addData(gisSegmentsLayer.getLayer(L.stamp(layer)).toGeoJSON());
          }
        }
      });
      $("#gisSegments_feature-list tbody").append('<tr onclick= "gisSegmentsSearchClick(' +L.stamp(layer) + ')"><td class="gisSegments_feature-name">' + layer.feature.properties.fqn_id + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
    }
  }
});


function gisSegmentsSearchClick(id) {
  var layer = gisSegmentsLayer.getLayer(id);
  var coords = layer.feature.geometry.coordinates
  var geom = coords.map(function (pt) {return [pt[1], pt[0]]})
  var line = L.polyline(geom);
  map.fitBounds(line.getBounds());
  highlightLayer.clearLayers();
  highlightLayer.addData(layer.toGeoJSON());
  layer.fire("click");

  if (document.body.clientWidth <= 767) {
    gisSegmentsSidebar.hide();
    gisSitesSidebar.hide();
    map.invalidateSize();
  }
}


//GIS SITES DATA

$.getJSON(gisSegmentsConfig.geojson, function (data) {
  gisSegmentsData = data;
  gisSegmentsFeatures = $.map(gisSegmentsData.features, function(feature) {
    return feature.properties;
  });
  gisSegmentsLayer.addData(data);
  gisSegmentsList = new List("gisSegments_features", {valueNames: ["gisSegments_feature-name"]});
  gisSegmentsList.sort("gisSegments_feature-name", {order:"asc"});
  gisSegmentsBuildConfig()
  $("#loading-mask").hide();
}).error(function(jqXHR, textStatus, errorThrown) {
    console.log("error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
    alert("error " + textStatus);
});



// GIS SITES INFO

function gisSegmentsInfo(id) {
  
  var featureProperties = gisSegmentsLayer.getLayer(id).feature.properties;

  var content = "<table class='table table-striped table-bordered table-condensed'>";

  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && value.includes('SLC_SEG')) {
      sessionStorage.setItem("segmentID", value);
    }
    $.each(gisSegmentsProperties, function(index, property) {
      if (key == property.value) {
        if (value && property.filter.value == "date") {
          date = new Date(value);
          value = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value + "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#gisSegments-Info_DATA").html(content);
  gisSegmentsSidebar.show();
};


// GIS SITES HIGHLIGHT INFO

function gisSegmentsHighlightInfo(id) {
  
  var featureProperties = highlightLayer.getLayer(id).feature.properties;

  var content = "<table class='table table-striped table-bordered table-condensed'>";

  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && value.includes('SLC_SEG')) {
      sessionStorage.setItem("segmentID", value);
    }
    $.each(gisSegmentsProperties, function(index, property) {
      if (key == property.value) {
        if (value && property.filter.value == "date") {
          date = new Date(value);
          value = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value + "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#gisSegments-Info_DATA").html(content);
  gisSegmentsSidebar.show();
};


$("#gisSegmentsClose-sidebarBTN").click(function(){
  gisSegmentsSidebar.hide();
});


// GIS SITES TABLE

function gisSegmentsBuildTable() {

  var table = $('#gisSegmentsTable').DataTable({ // Change table element ID here
    dom: 'Bfrtip', // Add this to enable export buttons
    buttons: [ // Add this to choose which buttons to display
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    colReorder: true,
    data: gisSegmentsData.features,
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
    "columns": gisSegmentsTable,
    "language": {
      "emptyTable": "Loading..."
    }
  });
}

// GIS SITES OPEN TABLE

$("#gisSegments_table-btn").click(function(){
  $("#gisSegmentsTable-container").show();
  $("#gisSegmentsTable-container").css("height", "100%");
  $("#gisSitesTable-container").hide();
  $("#map-container").hide();
  $(window).resize();
});