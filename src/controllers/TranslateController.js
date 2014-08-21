(function() {

angular
  .module('app')
  .controller('EditorController', EditorController)
  .controller('EditorSourceController', EditorSourceController)
  .controller('EditorTargetController', EditorTargetController)
  .controller('EditorPhraseController', EditorPhraseController)
;

function EditorController($scope, $state, project, languages, resources, translations, TranslationBag, TranslationCommit) {
  console.log('EditorController')

  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
  $scope.context = { source: '', target: '' };
  $scope.translations = translations;

  $scope.translationCommits = new TranslationBag();
  angular.forEach(translations, function(translation) {
    $scope.translationCommits.add(new TranslationCommit(translation, $scope.context));
  });

  $scope.updateRoute = updateRoute;

  function updateRoute() {
    if ($scope.context.source && $scope.context.target && $scope.translationCommits.selected) {
      $state.go('translate.source.target.phrase', {
        source: $scope.context.source,
        target: $scope.context.target,
        id: $scope.translationCommits.selected.id
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

function EditorSourceController($scope, source) {
  $scope.context.source = source;
}

function EditorTargetController($scope, target) {
  $scope.context.target = target;
}

function EditorPhraseController($scope, translationId, TranslationRepository) {
  $scope.translationCommit = $scope.translationCommits.select(translationId)

  $scope.editedTranslation = {
    id: translationId,
    locale: $scope.context.target,
    phrase: $scope.translationCommit.getTargetPhrase()
  }

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
}

})();
