(function() {
'use strict';

angular.module('app')
  .controller('TranslateController', TranslateController)
  .controller('TranslateSourceController', TranslateSourceController)
  .controller('TranslateTargetController', TranslateTargetController)
  .controller('TranslateTitleController', TranslateTitleController)
  .controller('TranslateSearchController', TranslateSearchController)
  .controller('TranslateMenuController', TranslateMenuController)
  .controller('TranslateDialogController', TranslateDialogController)
  .controller('TranslateFooterController', TranslateFooterController)
  .controller('TranslateDialogAddTranslationController', TranslateDialogAddTranslationController)

/**
 * @ngInject
 */
function TranslateTitleController($scope, editor) {
  $scope.editor = editor;
}

/**
 * @ngInject
 */
function TranslateSearchController($scope, hotkeys, editor) {
  $scope.search = function(text) {
    console.log('search: ' + text);
    editor.filters.text = text;
    editor.resetTranslations();
  }

  $scope.autocompleteSearch = function(text) {
    return [
      // '-is:approved',
      // '-is:translated',
      // 'is:approved',
      // 'is:translated',
    ]
  }

  hotkeys
    .bindTo($scope)
    .add({
      combo: '/',
      description: '',
      callback: function(e) {
        e.preventDefault();
        $scope.searchFormElement[0].querySelector('input').focus();
      }
    });
}

/**
 * @ngInject
 */
function TranslateMenuController($scope, $mdDialog, $mdSidenav, editor) {
  $scope.showDialog = function(event) {
    $mdDialog.show({
      controller: TranslateDialogController,
      locals: { editor: editor },
      templateUrl: 'views/translate/dialog-menu.html',
      targetEvent: event,
    })
  }

  $scope.openInfo = function() {
    editor.sidebarOpen = !editor.sidebarOpen;
  }
}

/**
 * @ngInject
 */
function TranslateDialogController($scope, $mdDialog, editor) {
  $scope.editor = editor;

  $scope.hide = function() {
    $mdDialog.hide();
  };
}

/**
 * @ngInject
 */
function TranslateFooterController($scope, $mdDialog, editor) {
  $scope.showDialog = function() {
    $mdDialog.show({
      controller: TranslateDialogAddTranslationController,
      locals: { editor: editor },
      templateUrl: 'views/translate/dialog-add-translation.html',
      targetEvent: event,
    })
  }
}

/**
 * @ngInject
 */
function TranslateDialogAddTranslationController($scope, $mdDialog, $mdToast, editor) {
  $scope.editor = editor;

  // Form models
  $scope.resource = editor.resources.length ? editor.resources[0] : null;
  $scope.key = '';
  $scope.phrase = '';

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.save = function(resource, key, phrase) {
    editor.saveNewTranslation(resource, key, phrase).then(function() {
      $mdDialog.hide();
      $mdToast.show($mdToast.simple().content('Key added'));
    }, function() {
      $mdToast.show($mdToast.simple().content('Error'));
    });
  };
}

/**
 * @ngInject
 */
function TranslateController($scope, $state, editor) {

  $scope.editor = editor;

  $scope.$watch('editor.sourceLocale', updateRoute);
  $scope.$watch('editor.targetLocale', updateRoute);

  function updateRoute() {
    var path = 'root.translate.source';
    var params = {source: editor.project.defaultLocale};
    var options = {location: "replace", inherit: true, relative: $state.$current, notify: true};

    if (editor.sourceLocale) {
      params.source = editor.sourceLocale;
    }

    if (editor.targetLocale) {
      path += '.target';
      params.target = editor.targetLocale;
    }

    $state.go(path, params, options);
  }
}

/**
 * @ngInject
 */
function TranslateSourceController($scope, sourceLocale, editor) {
  editor.sourceLocale = sourceLocale;
}

/**
 * @ngInject
 */
function TranslateTargetController($scope, hotkeys, targetLocale, editor) {
  editor.targetLocale = targetLocale;

  editor.resetTranslations();

  // if (editor.translationGroups.length > 0) {
  //   editor.translationGroups[0].resource.expanded = true;
  //   editor.loadMore(editor.translationGroups[0]);
  // }

  hotkeys
    .bindTo($scope)
    .add({
      combo: 'tab',
      description: 'Select next translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        editor.selectNextTranslation();
      }
    })
    .add({
      combo: 'shift+tab',
      description: 'Select previous translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        editor.selectPreviousTranslation();
      }
    })
    .add({
      combo: 'esc',
      description: 'Unselected translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        editor.activateTranslation(null);
      }
    })
    .add({
      combo: 'mod+enter',
      description: 'Save translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        if (!$scope.editor.activeTranslation)
          return;

        var translation = $scope.editor.activeTranslation;
        if (!translation.isEditing())
          return;

        translation.save()
      }
    })
    .add({
      combo: 'mod+shift+enter',
      description: 'Approve translation',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        e.preventDefault();
        if (!$scope.editor.activeTranslation)
          return;

        var translation = $scope.editor.activeTranslation;
        if (!translation.isEditing() && translation.isApproved)
          return;

        translation.approve()
      }
    });
}

})();
