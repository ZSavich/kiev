		var map;
    var markers = [];
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");

		function initMap() {
			var haightAshbury = {lat: 50.450874, lng: 30.522774};

		  map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 8,
		    center: haightAshbury,
		    mapTypeId: 'terrain'
		  });

		  var input = document.getElementById('pac-input');
		  var searchBox = new google.maps.places.SearchBox(input);
		  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		  map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });


		  searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

		  map.addListener('click', function(event) {
		  	clearMarkers();
		  	markers = [];
		    addMarker(event.latLng);
		  	lat.value = markers[0].getPosition().lat();
		    lng.value = markers[0].getPosition().lng();

		  });
		}

    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function clearMarkers() {
      setMapOnAll(null);
    }