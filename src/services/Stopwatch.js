(function() {

'use strict';

angular
  .module('app')
  .factory('Stopwatch', StopwatchFactory);


/**
 * A factory to create stopwatch instance
 */
function StopwatchFactory() {
  var factory = {};

  factory.create = function() {
    return new Stopwatch();
  }

  return factory;
}


/**
 * Stopwatch component
 */
function Stopwatch() {
  var startAt = 0;
  var lapTime = 0;

  var now = function() {
    return (new Date()).getTime();
  };

  this.time = function() {
    return lapTime + (startAt ? now() - startAt : 0);
  }

  this.start = function() {
    startAt = now();

    return this;
  }

  this.stop = function() {
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0; // pause

    return this;
  }

  this.reset = function() {
    lapTime = startAt = 0;

    return this;
  }
}

})();
