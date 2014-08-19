(function() {

angular
  .module('app')
  .controller('EditorController', EditorController)
  .controller('EditorSourceController', EditorSourceController)
  .controller('EditorTargetController', EditorTargetController)
  .controller('EditorPhraseController', EditorPhraseController)
;

function EditorController($scope, $state, project, languages, resources, translations, TranslationCommit) {
  console.log('EditorController')

  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
  $scope.context = { source: '', target: '', translationId: null };
  $scope.translations = translations;

  $scope.translationCommits = [];
  angular.forEach($scope.translations, function(translation) {
    $scope.translationCommits.push(new TranslationCommit(translation, $scope.context));
  })

  function updateRoute(context) {
    if ($scope.context.source && $scope.context.target && $scope.context.translationId) {
      console.log('go(translate.source.target.phrase)');

      $state.go('translate.source.target.phrase', {
        source: $scope.context.source,
        target: $scope.context.target,
        id: $scope.context.translationId
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

  $scope.context.translationId = +$stateParams.id;

  $scope.translationCommit = _.find($scope.translationCommits, {id: $scope.context.translationId});

  $scope.translation = {
    sourcePhrase: 'Lorem ipsum ahmet source ' + $scope.context.translationId + '.',
    targetPhrase: 'Lorem ipsum ahmet target.',
  }
}

})();
