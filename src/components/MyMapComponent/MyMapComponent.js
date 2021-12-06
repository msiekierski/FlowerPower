import React, { useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function MyMapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCS1pwz_r_dxS1FLDD-NN2Hc0iLmgdQhOE',
  });

  useEffect(() => {}, [document.getElementById('store-map')]);

  const containerStyle = {
    width: '100%',
    height: '320px',
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({
      lat: parseFloat(props.storeLat),
      lng: parseFloat(props.storeLong),
    });
    bounds.extend({
      lat: props.userLat,
      lng: props.userLong,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{
          lat: parseFloat(props.storeLat),
          lng: parseFloat(props.storeLong),
        }}
        label={props.storeName}
      />
      <Marker
        position={{
          lat: props.userLat,
          lng: props.userLong,
        }}
        label="You are here"
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMapComponent);
