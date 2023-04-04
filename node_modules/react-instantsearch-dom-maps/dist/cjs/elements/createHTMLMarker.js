"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var createHTMLMarker = function createHTMLMarker(google) {
  var HTMLMarker =
  /*#__PURE__*/
  function (_google$maps$OverlayV) {
    (0, _inherits2.default)(HTMLMarker, _google$maps$OverlayV);

    function HTMLMarker(_ref) {
      var _this;

      var position = _ref.position,
          map = _ref.map,
          className = _ref.className,
          _ref$anchor = _ref.anchor,
          anchor = _ref$anchor === void 0 ? {
        x: 0,
        y: 0
      } : _ref$anchor;
      (0, _classCallCheck2.default)(this, HTMLMarker);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HTMLMarker).call(this));
      _this.anchor = anchor;
      _this.subscriptions = [];
      _this.latLng = new google.maps.LatLng(position);
      _this.element = document.createElement('div');
      _this.element.className = className;
      _this.element.style.position = 'absolute'; // Force the "white-space" of the element will avoid the
      // content to collapse when we move the map from center

      _this.element.style.whiteSpace = 'nowrap';

      _this.setMap(map);

      return _this;
    }

    (0, _createClass2.default)(HTMLMarker, [{
      key: "onAdd",
      value: function onAdd() {
        if (this.getPanes()) {
          this.getPanes().overlayMouseTarget.appendChild(this.element);
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        if (this.getProjection()) {
          var position = this.getProjection().fromLatLngToDivPixel(this.latLng);
          var offsetX = this.anchor.x + this.element.offsetWidth / 2;
          var offsetY = this.anchor.y + this.element.offsetHeight;
          this.element.style.left = "".concat(Math.round(position.x - offsetX), "px");
          this.element.style.top = "".concat(Math.round(position.y - offsetY), "px"); // Markers to the south are in front of markers to the north
          // This is the default behaviour of Google Maps

          this.element.style.zIndex = parseInt(this.element.style.top, 10);
        }
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
          this.subscriptions.forEach(function (subscription) {
            return subscription.remove();
          });
          delete this.element;
          this.subscriptions = [];
        }
      }
    }, {
      key: "addListener",
      value: function addListener(eventName, listener) {
        var _this2 = this;

        var subscription = {
          remove: function remove() {
            _this2.element.removeEventListener(eventName, listener);

            _this2.subscriptions = _this2.subscriptions.filter(function (_) {
              return _ !== subscription;
            });
          }
        };
        this.element.addEventListener(eventName, listener);
        this.subscriptions = this.subscriptions.concat(subscription);
        return subscription;
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return this.latLng;
      }
    }]);
    return HTMLMarker;
  }(google.maps.OverlayView);

  return HTMLMarker;
};

var _default = createHTMLMarker;
exports.default = _default;