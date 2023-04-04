"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propTypes2 = require("./propTypes");

var _Connector = _interopRequireDefault(require("./Connector"));

var _Provider = _interopRequireDefault(require("./Provider"));

var _GoogleMaps = _interopRequireDefault(require("./GoogleMaps"));

var GeoSearch =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GeoSearch, _Component);

  function GeoSearch() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GeoSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GeoSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderChildrenWithBoundFunction", function (_ref) {
      var hits = _ref.hits,
          position = _ref.position,
          rest = (0, _objectWithoutProperties2.default)(_ref, ["hits", "position"]);
      var _this$props = _this.props,
          google = _this$props.google,
          children = _this$props.children,
          initialZoom = _this$props.initialZoom,
          initialPosition = _this$props.initialPosition,
          enableRefine = _this$props.enableRefine,
          enableRefineOnMapMove = _this$props.enableRefineOnMapMove,
          defaultRefinement = _this$props.defaultRefinement,
          mapOptions = (0, _objectWithoutProperties2.default)(_this$props, ["google", "children", "initialZoom", "initialPosition", "enableRefine", "enableRefineOnMapMove", "defaultRefinement"]);
      return _react.default.createElement(_Provider.default, (0, _extends2.default)({}, rest, {
        testID: "Provider",
        google: google,
        hits: hits,
        position: position,
        isRefineEnable: enableRefine
      }), function (_ref2) {
        var boundingBox = _ref2.boundingBox,
            boundingBoxPadding = _ref2.boundingBoxPadding,
            onChange = _ref2.onChange,
            onIdle = _ref2.onIdle,
            shouldUpdate = _ref2.shouldUpdate;
        return _react.default.createElement(_GoogleMaps.default, {
          testID: "GoogleMaps",
          google: google,
          initialZoom: initialZoom,
          initialPosition: position || initialPosition,
          mapOptions: mapOptions,
          boundingBox: boundingBox,
          boundingBoxPadding: boundingBoxPadding,
          onChange: onChange,
          onIdle: onIdle,
          shouldUpdate: shouldUpdate
        }, children({
          hits: hits
        }));
      });
    });
    return _this;
  }

  (0, _createClass2.default)(GeoSearch, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          enableRefineOnMapMove = _this$props2.enableRefineOnMapMove,
          defaultRefinement = _this$props2.defaultRefinement;
      return _react.default.createElement(_Connector.default, {
        testID: "Connector",
        enableRefineOnMapMove: enableRefineOnMapMove,
        defaultRefinement: defaultRefinement
      }, this.renderChildrenWithBoundFunction);
    }
  }]);
  return GeoSearch;
}(_react.Component);

(0, _defineProperty2.default)(GeoSearch, "propTypes", {
  google: _propTypes.default.object.isRequired,
  children: _propTypes.default.func.isRequired,
  initialZoom: _propTypes.default.number,
  initialPosition: _propTypes2.LatLngPropType,
  enableRefine: _propTypes.default.bool,
  enableRefineOnMapMove: _propTypes.default.bool,
  defaultRefinement: _propTypes2.BoundingBoxPropType
});
(0, _defineProperty2.default)(GeoSearch, "defaultProps", {
  initialZoom: 1,
  initialPosition: {
    lat: 0,
    lng: 0
  },
  enableRefine: true,
  enableRefineOnMapMove: true,
  defaultRefinement: null
});
var _default = GeoSearch;
exports.default = _default;