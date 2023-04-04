"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeolocHitPropType = exports.BoundingBoxPropType = exports.LatLngPropType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var LatLngPropType = _propTypes.default.shape({
  lat: _propTypes.default.number.isRequired,
  lng: _propTypes.default.number.isRequired
});

exports.LatLngPropType = LatLngPropType;

var BoundingBoxPropType = _propTypes.default.shape({
  northEast: LatLngPropType.isRequired,
  southWest: LatLngPropType.isRequired
});

exports.BoundingBoxPropType = BoundingBoxPropType;

var GeolocHitPropType = _propTypes.default.shape({
  _geoloc: LatLngPropType.isRequired
});

exports.GeolocHitPropType = GeolocHitPropType;