(function() {

angular
  .module('app')
  .controller('EditorController', EditorController)
  .controller('EditorSourceController', EditorSourceController)
  .controller('EditorTargetController', EditorTargetController)
  .controller('EditorPhraseController', EditorPhraseController)
;

function EditorController($scope, $state, project, languages, resources, TranslationService, TranslationCommit) {
  console.log('EditorController')

  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
  $scope.context = { source: '', target: '' };
  $scope.translations = [];
  $scope.translationCommits = [];
  $scope.translationId = null;

  // Fetch the project's translations
  TranslationService.getTranslations(project.slug).then(function(data) {
    $scope.translations = data;

    angular.forEach($scope.translations, function(translation) {
      $scope.translationCommits.push(new TranslationCommit(translation, $scope.context));
    })
  })

  function updateRoute() {
    if ($scope.context.source && $scope.context.target && $scope.translationId) {
      console.log('go(translate.source.target.phrase)');

      $state.go('translate.source.target.phrase', {
        source: $scope.context.source,
        target: $scope.context.target,
        id: $scope.translationId
      }, {location: "replace"});
    } else if ($scope.context.source && $scope.context.target) {
      console.log('go(translate.source.target)');

      $state.go('translate.source.target', {
        source: $scope.context.source,
        target: $scope.context.target
      }, {location: "replace"});
    } else if ($scope.context.source) {
      console.log('go(translate.source)');

      $state.go('translate.source', {
        source: $scope.context.source,
      }, {location: "replace"});
    } else {
      console.log('go(translate)');

      $state.go('translate', {}, {location: "replace"});
    }
  }

  $scope.$watch('context.source', updateRoute)
  $scope.$watch('context.target', updateRoute)
  $scope.$watch('context.translationId', updateRoute)
}

function EditorSourceController($scope, $stateParams) {
  console.log('EditorSourceController')

  $scope.context.source = $stateParams.source;
}

function EditorTargetController($scope, $stateParams) {
  console.log('EditorTargetController')

  $scope.context.target = $stateParams.target;
}

function EditorPhraseController($scope, $stateParams) {
  console.log('EditorPhraseController')

  $scope.translationId = +$stateParams.id;

  $scope.translationCommit = _.find($scope.translationCommits, {id: $scope.translationId});

  $scope.translation = {
    sourcePhrase: 'Lorem ipsum ahmet source ' + $scope.translationId + '.',
    targetPhrase: 'Lorem ipsum ahmet target.',
  }
}

})();
