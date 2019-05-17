// REFRESH GIS DATA

$("#Refresh_BTN").click(function() {
  gisSitesLayer.clearLayers();
  gisSegmentsLayer.clearLayers();

  $("#loading-mask").show();

  $('#gisSitesTable').DataTable().clear().draw();
  $('#gisSitesTable').DataTable().destroy();

  $('#gisSegmentsTable').DataTable().clear().draw();
  $('#gisSegmentsTable').DataTable().destroy();

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

	$.getJSON(gisSegmentsConfig.geojson, function (data) {
	  gisSegmentsData = data;
	  gisSegmentsFeatures = $.map(gisSegmentsData.features, function(feature) {
	    return feature.properties;
	  });
	  gisSegmentsLayer.addData(data);
	  gisSegmentsList = new List("gisSegments_features", {valueNames: ["gisSegments_feature-name"]});
	  gisSegmentsList.sort("gisSegments_feature-name", {order:"asc"});
	  gisSegmentsBuildConfig()
	}).error(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
	    alert("error " + textStatus);
	});

  $(".navbar-collapse.in").collapse("hide");
  return false;
});