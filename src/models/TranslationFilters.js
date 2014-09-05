app.factory('TranslationFilters', function() {
  'use strict';

  var TranslationFilters = function (rules) {
    this.rules = angular.isArray(rules) ? rules : [];
  };

  TranslationFilters.prototype.addRule = function(rule) {
    if (!angular.isFunction(rule)) {
      throw new Error('TranslationFilters::addRule should receive a valid callback');
    }

    this.rules.push(rule);
  }

  TranslationFilters.prototype.isSatisfying = function(translation) {
    var i, rule;

    for (i = 0; i < this.rules.length; i++) {
      rule = this.rules[i];

      if (!rule(translation)) {
        return false;
      }
    }

    return true;
  }

  return TranslationFilters;
});
