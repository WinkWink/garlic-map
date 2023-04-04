"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Marker = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _propTypes2 = require("./propTypes");

var _withGoogleMaps = _interopRequireDefault(require("./withGoogleMaps"));

var eventTypes = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup'
};
var excludes = ['children'].concat(Object.keys(eventTypes));
var filterProps = (0, _utils.createFilterProps)(excludes);

var Marker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Marker, _Component);

  function Marker() {
    (0, _classCallCheck2.default)(this, Marker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Marker).apply(this, arguments));
  }

  (0, _createClass2.default)(Marker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          google = _this$props.google,
          googleMapsInstance = _this$props.googleMapsInstance,
          hit = _this$props.hit,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["google", "googleMapsInstance", "hit"]);
      this.instance = new google.maps.Marker((0, _objectSpread2.default)({}, filterProps(props), {
        map: googleMapsInstance,
        position: hit._geoloc
      }));
      this.removeEventsListeners = (0, _utils.registerEvents)(eventTypes, this.props, this.instance);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.removeEventsListeners();
      this.removeEventsListeners = (0, _utils.registerEvents)(eventTypes, this.props, this.instance);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.instance.setMap(null);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Marker;
}(_react.Component);

exports.Marker = Marker;
(0, _defineProperty2.default)(Marker, "propTypes", (0, _objectSpread2.default)({}, (0, _utils.createListenersPropTypes)(eventTypes), {
  google: _propTypes.default.object.isRequired,
  googleMapsInstance: _propTypes.default.object.isRequired,
  hit: _propTypes2.GeolocHitPropType.isRequired
}));

var _default = (0, _withGoogleMaps.default)(Marker);

exports.default = _default;