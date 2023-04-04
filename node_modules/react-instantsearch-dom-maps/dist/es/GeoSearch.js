import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';
import Connector from './Connector';
import Provider from './Provider';
import GoogleMaps from './GoogleMaps';

var GeoSearch =
/*#__PURE__*/
function (_Component) {
  _inherits(GeoSearch, _Component);

  function GeoSearch() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GeoSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GeoSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderChildrenWithBoundFunction", function (_ref) {
      var hits = _ref.hits,
          position = _ref.position,
          rest = _objectWithoutProperties(_ref, ["hits", "position"]);

      var _this$props = _this.props,
          google = _this$props.google,
          children = _this$props.children,
          initialZoom = _this$props.initialZoom,
          initialPosition = _this$props.initialPosition,
          enableRefine = _this$props.enableRefine,
          enableRefineOnMapMove = _this$props.enableRefineOnMapMove,
          defaultRefinement = _this$props.defaultRefinement,
          mapOptions = _objectWithoutProperties(_this$props, ["google", "children", "initialZoom", "initialPosition", "enableRefine", "enableRefineOnMapMove", "defaultRefinement"]);

      return React.createElement(Provider, _extends({}, rest, {
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
        return React.createElement(GoogleMaps, {
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

  _createClass(GeoSearch, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          enableRefineOnMapMove = _this$props2.enableRefineOnMapMove,
          defaultRefinement = _this$props2.defaultRefinement;
      return React.createElement(Connector, {
        testID: "Connector",
        enableRefineOnMapMove: enableRefineOnMapMove,
        defaultRefinement: defaultRefinement
      }, this.renderChildrenWithBoundFunction);
    }
  }]);

  return GeoSearch;
}(Component);

_defineProperty(GeoSearch, "propTypes", {
  google: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  initialZoom: PropTypes.number,
  initialPosition: LatLngPropType,
  enableRefine: PropTypes.bool,
  enableRefineOnMapMove: PropTypes.bool,
  defaultRefinement: BoundingBoxPropType
});

_defineProperty(GeoSearch, "defaultProps", {
  initialZoom: 1,
  initialPosition: {
    lat: 0,
    lng: 0
  },
  enableRefine: true,
  enableRefineOnMapMove: true,
  defaultRefinement: null
});

export default GeoSearch;