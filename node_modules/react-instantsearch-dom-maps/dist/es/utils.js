import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import PropTypes from 'prop-types';
export var registerEvents = function registerEvents(events, props, instance) {
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
export var createListenersPropTypes = function createListenersPropTypes(eventTypes) {
  return Object.keys(eventTypes).reduce(function (acc, name) {
    return _objectSpread({}, acc, _defineProperty({}, name, PropTypes.func));
  }, {});
};
export var createFilterProps = function createFilterProps(excludes) {
  return function (props) {
    return Object.keys(props).filter(function (name) {
      return excludes.indexOf(name) === -1;
    }).reduce(function (acc, name) {
      return _objectSpread({}, acc, _defineProperty({}, name, props[name]));
    }, {});
  };
};