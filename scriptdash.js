$(document).ready(function() {

    $.get( "localhost:3000/fills", function(data) {
      console.log(data);
    });

  $('#save').click(function(event) {
    event.preventDefault();
    console.log('clicked');
    validateMapSearchInput();
  });

  $("#map").googleMap({
    zoom: 10, // Initial zoom level (optional)
    coords: [37.7749, -122.4194], // Map center (optional)
    type: "ROADMAP" // Map type (optional)
  });

  function validateMapSearchInput()
  {
      var searchBoxID = "address";
      var addressField = document.getElementById(searchBoxID);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
          {'address': addressField.value},
          function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
              {
                  var loc = results[0].geometry.location;
                  console.log(addressField.value+" found on Google");
                  // console.log("loc : "+loc);
                  addToMap(loc);
              } else {
                  console.log(addressField.value+" not found on Google");
              }
          }
      );
  }

  function addToMap(loc) {
    console.log(loc);
    var lat = loc.lat();
    var lon = loc.lng
    console.log(lat);
    $.post( "localhost:3000/fills", { fill: {
      'patient_name': 'whatever',
      'address': {
        'street_1': '',
        'street_2': '',
        'city': [lat, lon],
        'state': '',
        'zip': ''
      }
    }
  })
  .done(function( data ) {
    alert( "Data Loaded: " + data );
  });
  }
});
