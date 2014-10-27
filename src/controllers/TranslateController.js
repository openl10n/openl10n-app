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
;

function ResourceWrapper(resource, context, filters, translationCommitRepository) {
  // Keep orginal object & services
  this.resource = resource;
  this.context = context;
  this.filters = filters;
  this.translationCommitRepository = translationCommitRepository;

  // Map object attributes
  this.pathname = this.resource.pathname;
  this.translationCommits = [];

  // Handle paging
  this.page = 0;
  this.perPage = 40;
  this.complete = false;
  this.busy = false;
}

ResourceWrapper.prototype.reset = function() {
  this.translationCommits = [];
  this.complete = false;
  this.page = 0;
}

ResourceWrapper.prototype.loadMore = function() {
  if (this.busy || this.complete)
    return;

  if (!this.context.source || !this.context.target)
    return;

  this.busy = true;
  this.page++;
  this.translationCommitRepository.findBy(this.context.source, this.context.target, {
    resource: this.resource.id,
    page: this.page,
    per_page: this.perPage,
    text: this.filters.text
  }).then(function(translationCommits) {
    if (translationCommits.length < this.perPage) {
      console.log('fetching finished')
      this.complete = true;
    }

    for (var i = 0; i < translationCommits.length; i++) {
      var translationCommit = translationCommits[i];
      translationCommit.edit_phrase = translationCommit.target_phrase;
      this.translationCommits.push(translationCommit);
    }

    this.busy = false;
  }.bind(this));

}

function TranslateController($document, $scope, $state, project, languages, resources, TranslationRepository, TranslationCommitRepository) {

  console.log('TranslateController');

  // if (!target) {
  //   $state.transitionTo('translate', {locale: 'en'}, { location: true, inherit: true, relative: $state.$current, notify: false })
  // }

  $scope.project = project;
  $scope.languages = languages;
  $scope.context = { source: project.default_locale, target: null };
  $scope.filters = { text: '' };
  $scope.searchQuery = '';

  $scope.resources = [];
  angular.forEach(resources, function(resource) {
    $scope.resources.push(
      new ResourceWrapper(resource, $scope.context, $scope.filters, TranslationCommitRepository)
    );
  });


  $scope.activedTranslation = null;
  $scope.activateTranslation = function(translation) {
    if (null !== $scope.activedTranslation)
      $scope.activedTranslation.active = false;

    $scope.activedTranslation = translation;
    $scope.activedTranslation.active = true;
  }
  $scope.deactivateTranslation = function(translation, $event) {
    if ($event)
      $event.stopPropagation();
    if (translation)
      translation.active = false;
    else if ($scope.activedTranslation)
      $scope.activedTranslation.active = false;
  }

  $scope.updateRoute = updateRoute;

  function updateRoute() {
    if ($scope.context.source && $scope.context.target) {
      $state.go('translate.source.target', {
        source: $scope.context.source,
        target: $scope.context.target
      }, {location: "replace", inherit: true, relative: $state.$current, notify: true});
    } else if ($scope.context.source) {
      $state.go('translate.source', {
        source: $scope.context.source,
      }, {location: "replace", inherit: true, relative: $state.$current, notify: true});
    } else {
      $state.go('translate.source', {
        source: project.default_locale,
      }, {location: "replace", inherit: true, relative: $state.$current, notify: true});
    }
  }

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

  $scope.cancelEdit = function(translationCommit) {
    translationCommit.edit_phrase = translationCommit.target_phrase;
    // TODO : update original data
  }

  $scope.search = function(text) {
    $scope.filters.text = text;
    $scope.resources.forEach(function(resource) {
      resource.reset();
      resource.loadMore();
    })
  }
}

function TranslateSourceController($scope, source) {
  console.log('TranslateSourceController');
  $scope.context.source = source;
}

function TranslateTargetController($scope, hotkeys, resources, target, TranslationCommitRepository) {
  console.log('TranslateTargetController');

  $scope.context.target = target;

  console.log($scope.context);

  $scope.resources.forEach(function(resource) {
    resource.reset();
    resource.loadMore();
  })

  // $scope.selectNext = _.throttle(function() {
  //   $scope.translationCommits.selectNext();
  //   $scope.updateRoute();
  // }, 100);

  // $scope.selectPrevious = _.throttle(function() {
  //   $scope.translationCommits.selectPrevious();
  //   $scope.updateRoute();
  // }, 100);

  hotkeys
    .bindTo($scope)
    .add({
      combo: 'tab',
      description: 'Select next translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        // $scope.selectNext();
      }
    })
    .add({
      combo: 'shift+tab',
      description: 'Select previous translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        // $scope.selectPrevious();
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
    })
    ;
}

})();
