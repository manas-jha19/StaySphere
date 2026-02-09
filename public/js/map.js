
mapboxgl.accessToken = MapToken;
const map = new mapboxgl.Map({
  container: 'map', 
  center: cordinates, // starting position [lng, lat].
  zoom: 10 
});

console.log(cordinates);
const marker = new mapboxgl.Marker({ color: '#FF0000',  scale: 1 })
  .setLngLat(cordinates)
  .setPopup (new mapboxgl.Popup({ className: 'my-class'})

    .setHTML("<p>You'll be living here!</p>")
    .setMaxWidth("170px")
   )
  .addTo(map);