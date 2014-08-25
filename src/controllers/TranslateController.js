(function() {

'use strict';

angular
  .module('app')
  .controller('TranslateController', TranslateController)
  .controller('TranslateSourceController', TranslateSourceController)
  .controller('TranslateTargetController', TranslateTargetController)
  .controller('TranslatePhraseController', TranslatePhraseController)
;

function TranslateController($scope, $state, project, languages, resources, translations, TranslationCommitCollection) {
  console.log('TranslateController')

  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
  $scope.context = { source: '', target: '' };
  $scope.translations = translations;

  $scope.translationCommits = new TranslationCommitCollection(translations, resources, $scope.context);

  $scope.updateRoute = updateRoute;

  function updateRoute() {
    if ($scope.context.source && $scope.context.target && $scope.translationCommits.selectedTranslation) {
      $state.go('translate.source.target.phrase', {
        source: $scope.context.source,
        target: $scope.context.target,
        id: $scope.translationCommits.selectedTranslation.id
      }, {location: "replace"});
    } else if ($scope.context.source && $scope.context.target) {
      $state.go('translate.source.target', {
        source: $scope.context.source,
        target: $scope.context.target
      }, {location: "replace"});
    } else if ($scope.context.source) {
      $state.go('translate.source', {
        source: $scope.context.source,
      }, {location: "replace"});
    } else {
      $state.go('translate.source', {
        source: project.default_locale,
      }, {location: "replace"});
    }
  }
}

function TranslateSourceController($scope, source) {
  $scope.context.source = source;
}

function TranslateTargetController($scope, hotkeys, target) {
  $scope.context.target = target;

  hotkeys
    .bindTo($scope)
    .add({
      combo: 'tab',
      description: 'Select next translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        $scope.translationCommits.selectNext();
        $scope.updateRoute();
      }
    })
    .add({
      combo: 'shift+tab',
      description: 'Select previous translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        $scope.translationCommits.selectPrevious();
        $scope.updateRoute();
      }
    });
}

function TranslatePhraseController($scope, hotkeys, translationId, TranslationRepository) {
  $scope.translationCommit = $scope.translationCommits.select(translationId)

  if (!$scope.translationCommit) {
    return;
  }

  $scope.editedTranslation = {
    id: translationId,
    locale: $scope.context.target,
    phrase: $scope.translationCommit.getTargetPhrase()
  }

  // Fetch this translate to be sure the text is up to date
  TranslationRepository.get(translationId).then(function(translation) {
    angular.copy(translation.phrases, $scope.translationCommit._phrases);
    $scope.editedTranslation.phrase = $scope.translationCommit.getTargetPhrase();
  });

  $scope.saveTranslation = function() {
    TranslationRepository.savePhrase(
      $scope.editedTranslation.id,
      $scope.editedTranslation.locale,
      $scope.editedTranslation.phrase
    );

    $scope.translationCommit.setTargetPhrase(
      $scope.editedTranslation.phrase
    );
  }

  hotkeys
    .bindTo($scope)
    .add({
      combo: 'mod+enter',
      description: 'Save translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        $scope.saveTranslation();
      }
    })
}

})();
