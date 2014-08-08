app.controller('TranslateController', function($scope, $state, project, languages) {
  $scope.project = project;
  $scope.languages = languages;

  // Set source to the project's default locale
  $state.go('translate.source', {source: project.default_locale})
})

app.controller('TranslateSourceController', function($scope) {
})

app.controller('TranslateTargetController', function($scope) {
})

app.controller('TranslatePhraseController', function($scope, $stateParams) {
  $scope.translation = {
    sourcePhrase: 'Lorem ipsum ahmet source ' + $stateParams.id + '.',
    targetPhrase: 'Lorem ipsum ahmet target.',
  }
})
