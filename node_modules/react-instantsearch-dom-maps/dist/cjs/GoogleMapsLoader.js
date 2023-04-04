"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var GoogleMapsLoader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GoogleMapsLoader, _Component);

  function GoogleMapsLoader() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GoogleMapsLoader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GoogleMapsLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      google: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isUnmounting", false);
    return _this;
  }

  (0, _createClass2.default)(GoogleMapsLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // Inline the import to avoid to run the module on the server (rely on `document`)
      // Under the hood we use `dynamic-import-node` to transpile the `import` to `require`
      // see: https://github.com/algolia/react-instantsearch/issues/1425
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2.default)(require('scriptjs'));
      }).then(function (_ref) {
        var injectScript = _ref.default;
        var _this2$props = _this2.props,
            apiKey = _this2$props.apiKey,
            endpoint = _this2$props.endpoint;
        var operator = endpoint.indexOf('?') !== -1 ? '&' : '?';
        var endpointWithCredentials = "".concat(endpoint).concat(operator, "key=").concat(apiKey);
        injectScript(endpointWithCredentials, function () {
          if (!_this2.isUnmounting) {
            _this2.setState(function () {
              return {
                google: window.google
              };
            });
          }
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.google) {
        return null;
      }

      return this.props.children(this.state.google);
    }
  }]);
  return GoogleMapsLoader;
}(_react.Component);

(0, _defineProperty2.default)(GoogleMapsLoader, "propTypes", {
  apiKey: _propTypes.default.string.isRequired,
  children: _propTypes.default.func.isRequired,
  endpoint: _propTypes.default.string
});
(0, _defineProperty2.default)(GoogleMapsLoader, "defaultProps", {
  endpoint: 'https://maps.googleapis.com/maps/api/js?v=quarterly'
});
var _default = GoogleMapsLoader;
exports.default = _default;