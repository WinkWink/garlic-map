import PropTypes from 'prop-types';
export var LatLngPropType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
});
export var BoundingBoxPropType = PropTypes.shape({
  northEast: LatLngPropType.isRequired,
  southWest: LatLngPropType.isRequired
});
export var GeolocHitPropType = PropTypes.shape({
  _geoloc: LatLngPropType.isRequired
});