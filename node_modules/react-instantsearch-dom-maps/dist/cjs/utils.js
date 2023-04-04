"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterProps = exports.createListenersPropTypes = exports.registerEvents = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var registerEvents = function registerEvents(events, props, instance) {
  var eventsAvailable = Object.keys(events);
  var listeners = Object.keys(props).filter(function (key) {
    return eventsAvailable.indexOf(key) !== -1;
  }).map(function (name) {
    return instance.addListener(events[name], function (event) {
      props[name]({
        event: event,
        marker: instance
      });
    });
  });
  return function () {
    listeners.forEach(function (listener) {
      return listener.remove();
    });
  };
};

exports.registerEvents = registerEvents;

var createListenersPropTypes = function createListenersPropTypes(eventTypes) {
  return Object.keys(eventTypes).reduce(function (acc, name) {
    return (0, _objectSpread4.default)({}, acc, (0, _defineProperty2.default)({}, name, _propTypes.default.func));
  }, {});
};

exports.createListenersPropTypes = createListenersPropTypes;

var createFilterProps = function createFilterProps(excludes) {
  return function (props) {
    return Object.keys(props).filter(function (name) {
      return excludes.indexOf(name) === -1;
    }).reduce(function (acc, name) {
      return (0, _objectSpread4.default)({}, acc, (0, _defineProperty2.default)({}, name, props[name]));
    }, {});
  };
};

exports.createFilterProps = createFilterProps;