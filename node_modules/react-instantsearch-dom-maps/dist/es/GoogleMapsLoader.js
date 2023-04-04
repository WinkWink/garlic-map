import _interopRequireWildcard from "@babel/runtime/helpers/esm/interopRequireWildcard";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';

var GoogleMapsLoader =
/*#__PURE__*/
function (_Component) {
  _inherits(GoogleMapsLoader, _Component);

  function GoogleMapsLoader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GoogleMapsLoader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GoogleMapsLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      google: null
    });

    _defineProperty(_assertThisInitialized(_this), "isUnmounting", false);

    return _this;
  }

  _createClass(GoogleMapsLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // Inline the import to avoid to run the module on the server (rely on `document`)
      // Under the hood we use `dynamic-import-node` to transpile the `import` to `require`
      // see: https://github.com/algolia/react-instantsearch/issues/1425
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('scriptjs'));
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
}(Component);

_defineProperty(GoogleMapsLoader, "propTypes", {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  endpoint: PropTypes.string
});

_defineProperty(GoogleMapsLoader, "defaultProps", {
  endpoint: 'https://maps.googleapis.com/maps/api/js?v=quarterly'
});

export default GoogleMapsLoader;