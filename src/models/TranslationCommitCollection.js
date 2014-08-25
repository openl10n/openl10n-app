(function() {

'use strict';

angular
  .module('app')
  .factory('TranslationCommitCollection', TranslationCommitCollection);

/**
 * @ngInject
 */
function TranslationCommitCollection(TranslationCommit) {

  var Collection = function (translations, resources, context) {
    // this.selectedResource = null;
    this.selectedTranslation = null;

    this.resources = _.chain(resources)
      .sortBy('pathname')
      .value();

    this.translations = _.chain(translations)
      .map(function(translation) {
        return new TranslationCommit(translation, context);
      })
      .groupBy(function(translation) {
        return translation.resourceId;
      })
      .value();
  }

  Collection.prototype.select = function (itemId) {
    if (this.selectedTranslation) {
      this.selectedTranslation.selected = false;
    }

    for (var i in this.translations) {
      var list = this.translations[i];
      this.selectedTranslation = _.find(list, {id: itemId});

      if (this.selectedTranslation) {
        this.selectedTranslation.selected = true;
        break;
      }
    }

    return this.selectedTranslation;
  }

  Collection.prototype.selectFirst = function () {
    for (var i = 0; i < this.resources.length; i++) {
      var resource = this.resources[i];
      var translations = this.translations[resource.id]

      if (0 === translations.length) {
        continue;
      }

      var translation = _.first(translations);

      return this.select(translation.id);
    }
  }

  Collection.prototype.selectLast = function () {
    for (var i = this.resources.length - 1; i >= 0; i--) {
      var resource = this.resources[i];
      var translations = this.translations[resource.id]

      if (0 === translations.length) {
        continue;
      }

      var translation = _.last(translations);

      return this.select(translation.id);
    }
  }

  Collection.prototype.selectNext = function () {
    if (!this.selectedTranslation) {
      return this.selectFirst();
    }

    for (var i = 0; i < this.resources.length; i++) {
      var resource = this.resources[i];
      var translations = this.translations[resource.id]
      var current = _.findIndex(translations, this.selectedTranslation);

      if (0 > current) {
        continue;
      }

      var nextTranslation;
      if (translations.length > current + 1) {
        nextTranslation = translations[current + 1];
      } else {
        var j = 0;
        // Find in next (non empty) resources
        do {
          j++;
          var nextResource = this.resources[i + j];
        } while (nextResource && this.translations[nextResource.id].length < 1);

        if (!nextResource) {
          return;
        }

        nextTranslation = _.first(this.translations[nextResource.id]);
      }

      return this.select(nextTranslation.id);
    }
  }

  Collection.prototype.selectPrevious = function () {
    if (!this.selectedTranslation) {
      return this.selectLast()
    }

    for (var i = 0; i < this.resources.length; i++) {
      var resource = this.resources[i];
      var translations = this.translations[resource.id]
      var current = _.findIndex(translations, this.selectedTranslation);

      if (0 > current) {
        continue;
      }

      var previousTranslation;
      if (0 <= current - 1) {
        previousTranslation = translations[current - 1];
      } else {
        var j = 0;
        // Find in next (non empty) resources
        do {
          j++;
          var previousResource = this.resources[i - j];
        } while (previousResource && this.translations[previousResource.id].length < 1);

        if (!previousResource) {
          return;
        }

        previousTranslation = _.last(this.translations[previousResource.id]);
      }

      return this.select(previousTranslation.id);
    }
  }

  return Collection;
}

})();
