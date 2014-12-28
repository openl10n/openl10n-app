(function() {

//
// TODO:
//
// - [x] auto focus when select translation
// - [x] auto scroll when select translation
// - [x] save
// - [x] approve
// - [x] Next/Previous shortcuts
// - [ ] search/filter/counters
// - [ ] fetch data when select/save translation + merge
// - [ ] deduplicate translations on loadMore action
//

'use strict';

angular
  .module('app')
  .controller('TranslateController', TranslateController)
  .controller('TranslateSourceController', TranslateSourceController)
  .controller('TranslateTargetController', TranslateTargetController)
  .controller('TranslatePhraseController', TranslatePhraseController)
;


/**
 * @ngInject
 */
function TranslateController($scope, $state, $timeout, project, languages, resources, TranslationsGroup, TranslationRepository) {

  // Models
  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
  $scope.context = { source: project.default_locale, target: null };
  $scope.filters = { text: '' };
  $scope.searchQuery = '';
  $scope.translationsGroups = [];

  // Utilities
  $scope.activedTranslation = null;
  $scope.loadingTranslations = false;

  /**
   * Reinitialize translations with current context & filters.
   */
  $scope.reset = function () {
    $scope.translationsGroups = [];

    angular.forEach($scope.resources, function(resource) {
      var filters = $scope.filters;
      filters = { resource: resource.id };

      var group = new TranslationsGroup(resource, $scope.context, filters);

      $scope.translationsGroups.push(group);
    });
  }

  /**
   * Load more translations.
   *
   * This happens on infinite scroll, to lazy load the translations.
   */
  $scope.loadMore = function() {
    $scope.loadingTranslations = true;
    var groupToLoad = null;

    // Find a resource to load
    for (var i = 0; i < $scope.translationsGroups.length; i++) {
      var group = $scope.translationsGroups[i];
      if (!group.translations.complete) {
        var groupToLoad = group;
        break;
      }
    }

    // Load that resource
    if (groupToLoad) {
      groupToLoad.translations
        .loadMore()
        .then(function() {
          $scope.loadingTranslations = false;
        });
    }
  }

  /**
   * Select a translation.
   */
  $scope.activateTranslation = function(translation) {
    if (null !== $scope.activedTranslation)
      $scope.activedTranslation.active = false;

    $scope.activedTranslation = translation;
    $scope.activedTranslation.active = true;

    $scope.updateRoute();
  }

  /**
   * Unselect a translation/
   */
  $scope.deactivateTranslation = function(translation, $event) {
    if ($event)
      $event.stopPropagation();
    if (translation)
      translation.active = false;
    else if ($scope.activedTranslation)
      $scope.activedTranslation.active = false;

    $scope.activedTranslation = null;

    $scope.updateRoute();
  }

  /**
   * Update the route according to the current state of the controller.
   */
  $scope.updateRoute = function() {
    var path = 'translate.source';
    var params = {source: project.default_locale};
    var options = {location: "replace", inherit: true, relative: $state.$current, notify: true};

    if ($scope.context.source) {
      params.source = $scope.context.source;
    }

    if ($scope.context.target) {
      path += '.target';
      params.target = $scope.context.target;
    }

    if ($scope.activedTranslation) {
      path += '.phrase';
      params.id = $scope.activedTranslation.id;
    }

    $state.go(path, params, options);
  }

  /**
   * Save a translation.
   */
  $scope.saveTranslation = function(translationCommit) {
    var originalPhrase = translationCommit.target_phrase;
    translationCommit.target_phrase = translationCommit.edit_phrase;
    translationCommit.is_translated = true;
    translationCommit.is_approved = false;

    TranslationRepository.savePhrase(
      translationCommit.id,
      translationCommit.target_locale,
      translationCommit.target_phrase
    );

    // TODO : update original data
  }

  /**
   * Approve a translation.
   */
  $scope.approveTranslation = function(translationCommit) {
    var originalPhrase = translationCommit.target_phrase;
    translationCommit.target_phrase = translationCommit.edit_phrase;
    translationCommit.is_translated = true;
    translationCommit.is_approved = true;

    TranslationRepository.savePhrase(
      translationCommit.id,
      translationCommit.target_locale,
      translationCommit.target_phrase,
      {approved: true}
    );

    // TODO : update original data
  }

  /**
   * Cancel an editing
   */
  $scope.cancelEdit = function(translationCommit) {
    translationCommit.edit_phrase = translationCommit.target_phrase;
    // TODO : update original data
  }

  /**
   * Submit a search query
   */
  $scope.search = function(text) {
    $scope.filters.text = text;
    $scope.resources.forEach(function(resource) {
      resource.reset();
      resource.loadMore();
    })
  }

  // Init
  $scope.reset();
  $timeout(function() {
    $scope.loadMore();
  }, 500);
}

/**
 * @ngInject
 */
function TranslateSourceController($scope, source) {
  console.log('TranslateSourceController');
  $scope.context.source = source;
}

/**
 * @ngInject
 */
function TranslateTargetController($scope, hotkeys, resources, target, TranslationCommitRepository) {
  console.log('TranslateTargetController');

  $scope.context.target = target;
  $scope.reset();
  $scope.loadMore();

  /**
   * Select the next translation
   */
  $scope.selectNext = function() {
    var i, j, group, translations, translationCommit;

    if (null === $scope.activedTranslation) {
      if ($scope.translationsGroups.length > 0 && $scope.translationsGroups[0].translations.items.length > 0) {
        $scope.activateTranslation($scope.translationsGroups[0].translations.items[0]);
      }

      return;
    }

    for (i = 0; i < $scope.translationsGroups.length; i++) {
      group = $scope.translationsGroups[i];
      translations = group.translations.items;

      for (j = 0; j < translations.length; j++) {
        translationCommit = translations[j];

        if (translationCommit.active) {
          if (translations[j + 1]) {
            $scope.activateTranslation(translations[j + 1]);
          } else if ($scope.translationsGroups[i + 1] && $scope.translationsGroups[i + 1].translations.items.length > 0) {
            $scope.activateTranslation($scope.translationsGroups[i + 1].translations.items[0]);
          }

          return;
        }
      }
    }
  }

  /**
   * Select the previous translation
   */
  $scope.selectPrevious = function() {
    var i, j, group, translationCommit;

    for (i = 0; i < $scope.translationsGroups.length; i++) {
      group = $scope.translationsGroups[i];

      for (j = 0; j < group.translations.items.length; j++) {
        translationCommit = group.translations.items[j];

        if (translationCommit.active) {
          if (j > 0 && group.translations.items[j - 1]) {
            $scope.activateTranslation(group.translations.items[j - 1]);
          } else if (i > 0 && $scope.translationsGroups[i - 1] && $scope.translationsGroups[i - 1].translations.items.length > 0) {
            var last = $scope.translationsGroups[i - 1].translations.items.length - 1;
            $scope.activateTranslation($scope.translationsGroups[i - 1].translations.items[last]);
          }

          return;
        }
      }
    }
  }

  hotkeys
    .bindTo($scope)
    .add({
      combo: 'tab',
      description: 'Select next translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        $scope.selectNext();
      }
    })
    .add({
      combo: 'shift+tab',
      description: 'Select previous translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        $scope.selectPrevious();
      }
    })
    .add({
      combo: 'esc',
      description: 'Unselected translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        console.log('ESC');
        e.preventDefault();
        $scope.deactivateTranslation();
      }
    })
    .add({
      combo: 'mod+enter',
      description: 'Save translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        if (!$scope.activedTranslation)
          return;
        $scope.saveTranslation($scope.activedTranslation);
      }
    });
}


function TranslatePhraseController(translationId) {
  console.log('Selected translation #' + translationId);
}

})();
