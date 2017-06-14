/* global google:ignore  */

$(() => {


  // const apiKey = 'AIzaSyAlVUTsuZbPUjXa84b4LRW7tjX4c_ZjfXI';
  const $map = $('#map');
  let infowindow = null;
  let map = null;
  const $latBox = $('#latitude');
  const $longBox = $('#longitude');

  function initMap() {
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      scrollwheel: false,
      center: { lat: $map.data('lat'), lng: $map.data('lng') }
    });

    getTrips();

  }
  initMap();

  function getTrips() {
    var trips = $map.data('trips');
    console.log(trips);

    $.each(trips, (index, trip) => {
      addMarker(trip);
    });
  }

  function addMarker(trip) {

    const marker = new google.maps.Marker({
      position: { lat: trip.latitude, lng: trip.longitude },
      map: map
    });

    marker.addListener('click', () => {
      markerOnClick(marker, trip);
    });
  }

  function markerOnClick(marker, trip) {
    if(infowindow) infowindow.close();



    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h4>${trip.title}</h4>
        <a href="/trips/${trip._id}">Show</a>
      </div>
      `
    });

    infowindow.open(map, marker);
  }
  //
  map.addListener('click', function (e) {
    //lat and lng is available in e object
    var clickLocation = e.latLng.toJSON();
    console.log(clickLocation.lat);
    console.log(clickLocation.lng);

    $latBox.val(clickLocation.lat);
    $longBox.val(clickLocation.lng);
  });


});
