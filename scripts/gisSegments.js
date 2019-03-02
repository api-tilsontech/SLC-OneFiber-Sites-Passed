// GIS SEGMENTS CONFIG

var gisSegmentsConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/3/query?where=fqn_id+IS+NOT+NULL&outFields=" + gisSegmentsFields + "&f=geojson&token=" + gis_token,
  layerName: "Segments",
  hoverProperty: "fqn_id",
  sortProperty: "fqn_id",
  sortOrder: "ascend",
};

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


// GIS SEGMETNS CONFIG

var gisSegmentsConfig = {
  geojson: "https://gis.tilsontech.com/arcgis/rest/services/SiteTracker/SLC_OneFiber/MapServer/2/query?where=objectid+IS+NOT+NULL&outFields=*&f=geojson&token=" + gis_token,
  layerName: "Sites",
  hoverProperty: "site_name"
};


function gisSegmentsBuildConfig() {
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
        map.fitBounds(gisSegmentsLayer.getLayer(row.leaflet_stamp).getBounds());
        highlightLayer.clearLayers();
        highlightLayer.addData(gisSegmentsLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }
    }
  }];

  $.each(gisSegmentsProperties, function(index, value) {
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
  map.flyToBounds(gisSegmentsLayer.getBounds());
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
  gisSegmentsSearch.show();
  var layer = gisSegmentsLayer.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 16);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    gisSegmentsSidebar.show();
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
  gisSegmentsList = new List("gisSegments_features", {valueNames: ["feature-name"]});
  gisSegmentsList.sort("feature-name", {order:"asc"});
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
      sessionStorage.setItem("siteID", value);
    }
    $.each(gisSegmentsProperties, function(index, property) {
      if (key == property.value) {
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
