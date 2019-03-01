// REFRESH GIS DATA

$("#Refresh_BTN").click(function() {
  gisSitesLayer.clearLayers();

	  //GIS SITES DATA

	$.getJSON(gisSitesConfig.geojson, function (data) {
	  gisSitesData = data;
	  gisSitesFeatures = $.map(gisSitesData.features, function(feature) {
	    return feature.properties;
	  });
	  gisSitesLayer.addData(data);
	  gisSitesBuildConfig();
	  map.fitBounds(gisSitesLayer.getBounds());
	});

  $(".navbar-collapse.in").collapse("hide");
  return false;
});