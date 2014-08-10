app.controller('TranslateController', function($scope, $state, project, languages, resources, TranslationService, TranslationCommit) {
  console.log('TranslateController');

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

    _.forEach($scope.translations, function(translation) {
      $scope.translationCommits.push(new TranslationCommit(translation, $scope.context));
    })
  })

  // Set source to the project's default locale
  //$scope.context.source = project.default_locale;
  //$state.go('translate.source', {source: $scope.context.source});

  var updateRoute = function() {
    if ($scope.context.source && $scope.context.target && $scope.translationId) {
      $state.go('translate.source.target.phrase', {
        source: $scope.context.source,
        target: $scope.context.target,
        id: $scope.translationId
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
    }
  }

  $scope.$watch('context.source', updateRoute)
  $scope.$watch('context.target', updateRoute)
  $scope.$watch('context.translationId', updateRoute)
})

app.controller('TranslateSourceController', function($scope, $stateParams) {
  console.log('TranslateSourceController');

  $scope.context.source = $stateParams.source;
})

app.controller('TranslateTargetController', function($scope, $stateParams) {
  console.log('TranslateTargetController');

  $scope.context.target = $stateParams.target;
})

app.controller('TranslatePhraseController', function($scope, $stateParams) {
  console.log('TranslatePhraseController');

  $scope.translationCommit = _.find($scope.translationCommits, {id: +$stateParams.id});

  $scope.translation = {
    sourcePhrase: 'Lorem ipsum ahmet source ' + $stateParams.id + '.',
    targetPhrase: 'Lorem ipsum ahmet target.',
  }
})
