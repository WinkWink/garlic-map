import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerEvents, createListenersPropTypes, createFilterProps } from './utils';
import { GeolocHitPropType } from './propTypes';
import withGoogleMaps from './withGoogleMaps';
var eventTypes = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup'
};
var excludes = ['children'].concat(Object.keys(eventTypes));
var filterProps = createFilterProps(excludes);
export var Marker =
/*#__PURE__*/
function (_Component) {
  _inherits(Marker, _Component);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).apply(this, arguments));
  }

  _createClass(Marker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          google = _this$props.google,
          googleMapsInstance = _this$props.googleMapsInstance,
          hit = _this$props.hit,
          props = _objectWithoutProperties(_this$props, ["google", "googleMapsInstance", "hit"]);

      this.instance = new google.maps.Marker(_objectSpread({}, filterProps(props), {
        map: googleMapsInstance,
        position: hit._geoloc
      }));
      this.removeEventsListeners = registerEvents(eventTypes, this.props, this.instance);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.removeEventsListeners();
      this.removeEventsListeners = registerEvents(eventTypes, this.props, this.instance);
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
}(Component);

_defineProperty(Marker, "propTypes", _objectSpread({}, createListenersPropTypes(eventTypes), {
  google: PropTypes.object.isRequired,
  googleMapsInstance: PropTypes.object.isRequired,
  hit: GeolocHitPropType.isRequired
}));

export default withGoogleMaps(Marker);