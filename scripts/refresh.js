// REFRESH GIS DATA

$("#Refresh_BTN").click(function() {
  gisSitesLayer.clearLayers();
  gisSegmentsLayer.clearLayers();
  gisRoutesLayer.clearLayers();
  gisStructuresLayer.clearLayers();
  gisSplicesLayer.clearLayers();
  gisWorkOrdersLayer.clearLayers();

  $("#loading-mask").show();

  $('#gisSitesTable').DataTable().clear().draw();
  $('#gisSitesTable').DataTable().destroy();

  $('#gisSegmentsTable').DataTable().clear().draw();
  $('#gisSegmentsTable').DataTable().destroy();

  $('#gisRoutesTable').DataTable().clear().draw();
  $('#gisRoutesTable').DataTable().destroy();

  $('#gisStructuresTable').DataTable().clear().draw();
  $('#gisStructuresTable').DataTable().destroy();

  $('#gisSplicesTable').DataTable().clear().draw();
  $('#gisSplicesTable').DataTable().destroy();

  $('#gisWorkOrdersTable').DataTable().clear().draw();
  $('#gisWorkOrdersTable').DataTable().destroy();

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

	$.getJSON(gisRoutesConfig.geojson, function (data) {
	  gisRoutesData = data;
	  gisRoutesFeatures = $.map(gisRoutesData.features, function(feature) {
	    return feature.properties;
	  });
	  gisRoutesLayer.addData(data);
	  gisRoutesList = new List("gisRoutes_features", {valueNames: ["gisRoutes_feature-name"]});
	  gisRoutesList.sort("gisRoutes_feature-name", {order:"asc"});
	  gisRoutesBuildConfig()
	  $("#loading-mask").hide();
	}).error(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
	    alert("error " + textStatus);
	});

	$.getJSON(gisStructuresConfig.geojson, function (data) {
	  gisStructuresData = data;
	  gisStructuresFeatures = $.map(gisStructuresData.features, function(feature) {
	    return feature.properties;
	  });
	  gisStructuresLayer.addData(data);
	  gisStructuresList = new List("gisStructures_features", {valueNames: ["gisStructures_feature-name"]});
	  gisStructuresList.sort("gisStructures_feature-name", {order:"asc"});
	  gisStructuresBuildConfig()
	}).error(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
	    alert("error " + textStatus);
	});

	$.getJSON(gisSplicesConfig.geojson, function (data) {
	  gisSplicesData = data;
	  gisSplicesFeatures = $.map(gisSplicesData.features, function(feature) {
	    return feature.properties;
	  });
	  gisSplicesLayer.addData(data);
	  gisSplicesList = new List("gisSplices_features", {valueNames: ["gisSplices_feature-name"]});
	  gisSplicesList.sort("gisSplices_feature-name", {order:"asc"});
	  gisSplicesBuildConfig()
	}).error(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
	    alert("error " + textStatus);
	});

	$.getJSON(gisWorkOrdersConfig.geojson, function (data) {
	  gisWorkOrdersData = data;
	  gisWorkOrdersFeatures = $.map(gisWorkOrdersData.features, function(feature) {
	    return feature.properties;
	  });
	  gisWorkOrdersLayer.addData(data);
	  gisWorkOrdersList = new List("gisWorkOrders_features", {valueNames: ["gisWorkOrders_feature-name"]});
	  gisWorkOrdersList.sort("gisWorkOrders_feature-name", {order:"asc"});
	  gisWorkOrdersBuildConfig()
	}).error(function(jqXHR, textStatus, errorThrown) {
	    console.log("error " + textStatus);
	    console.log("incoming Text " + jqXHR.responseText);
	    alert("error " + textStatus);
	});

  $(".navbar-collapse.in").collapse("hide");
  return false;
});