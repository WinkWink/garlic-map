"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CustomMarker = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createHTMLMarker = _interopRequireDefault(require("./elements/createHTMLMarker"));

var _utils = require("./utils");

var _propTypes2 = require("./propTypes");

var _withGoogleMaps = _interopRequireDefault(require("./withGoogleMaps"));

var eventTypes = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup'
};

var CustomMarker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CustomMarker, _Component);

  function CustomMarker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CustomMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CustomMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      marker: null
    });
    return _this;
  }

  (0, _createClass2.default)(CustomMarker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          hit = _this$props.hit,
          google = _this$props.google,
          googleMapsInstance = _this$props.googleMapsInstance,
          className = _this$props.className,
          anchor = _this$props.anchor; // Not the best way to create the reference of the CustomMarker
      // but since the Google object is required didn't find another
      // solution. Ideas?

      var Marker = (0, _createHTMLMarker.default)(google);
      var marker = new Marker({
        map: googleMapsInstance,
        position: hit._geoloc,
        className: className,
        anchor: anchor
      });
      this.removeListeners = (0, _utils.registerEvents)(eventTypes, this.props, marker);
      this.setState(function () {
        return {
          marker: marker
        };
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var children = this.props.children;
      var marker = this.state.marker;
      this.removeListeners();
      this.removeListeners = (0, _utils.registerEvents)(eventTypes, this.props, marker);

      if (!CustomMarker.isReact16()) {
        _reactDom.default.unstable_renderSubtreeIntoContainer(this, children, marker.element);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var marker = this.state.marker;

      if (!CustomMarker.isReact16()) {
        _reactDom.default.unmountComponentAtNode(marker.element);
      }

      marker.setMap(null);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var marker = this.state.marker;

      if (!marker || !CustomMarker.isReact16()) {
        return null;
      }

      return _reactDom.default.createPortal(children, marker.element);
    }
  }], [{
    key: "isReact16",
    value: function isReact16() {
      return typeof _reactDom.default.createPortal === 'function';
    }
  }]);
  return CustomMarker;
}(_react.Component);

exports.CustomMarker = CustomMarker;
(0, _defineProperty2.default)(CustomMarker, "propTypes", (0, _objectSpread2.default)({}, (0, _utils.createListenersPropTypes)(eventTypes), {
  hit: _propTypes2.GeolocHitPropType.isRequired,
  children: _propTypes.default.node.isRequired,
  google: _propTypes.default.object.isRequired,
  googleMapsInstance: _propTypes.default.object.isRequired,
  className: _propTypes.default.string,
  anchor: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  })
}));
(0, _defineProperty2.default)(CustomMarker, "defaultProps", {
  className: '',
  anchor: {
    x: 0,
    y: 0
  }
});

var _default = (0, _withGoogleMaps.default)(CustomMarker);

exports.default = _default;