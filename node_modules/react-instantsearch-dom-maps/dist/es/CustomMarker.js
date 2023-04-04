import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createHTMLMarker from './elements/createHTMLMarker';
import { registerEvents, createListenersPropTypes } from './utils';
import { GeolocHitPropType } from './propTypes';
import withGoogleMaps from './withGoogleMaps';
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
export var CustomMarker =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomMarker, _Component);

  function CustomMarker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      marker: null
    });

    return _this;
  }

  _createClass(CustomMarker, [{
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

      var Marker = createHTMLMarker(google);
      var marker = new Marker({
        map: googleMapsInstance,
        position: hit._geoloc,
        className: className,
        anchor: anchor
      });
      this.removeListeners = registerEvents(eventTypes, this.props, marker);
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
      this.removeListeners = registerEvents(eventTypes, this.props, marker);

      if (!CustomMarker.isReact16()) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, children, marker.element);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var marker = this.state.marker;

      if (!CustomMarker.isReact16()) {
        ReactDOM.unmountComponentAtNode(marker.element);
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

      return ReactDOM.createPortal(children, marker.element);
    }
  }], [{
    key: "isReact16",
    value: function isReact16() {
      return typeof ReactDOM.createPortal === 'function';
    }
  }]);

  return CustomMarker;
}(Component);

_defineProperty(CustomMarker, "propTypes", _objectSpread({}, createListenersPropTypes(eventTypes), {
  hit: GeolocHitPropType.isRequired,
  children: PropTypes.node.isRequired,
  google: PropTypes.object.isRequired,
  googleMapsInstance: PropTypes.object.isRequired,
  className: PropTypes.string,
  anchor: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  })
}));

_defineProperty(CustomMarker, "defaultProps", {
  className: '',
  anchor: {
    x: 0,
    y: 0
  }
});

export default withGoogleMaps(CustomMarker);