(function() {
'use strict';

angular
  .module('app')
  .factory('TranslationCommit', TranslationCommitFactory);

/**
 * @ngInject
 */
function TranslationCommitFactory($http, $q, $timeout) {
  function TranslationCommit(data) {
    // Attributes
    angular.extend(this, data);

    // Methods
    angular.extend(this, {
      isEditing: isEditing,
      cancelEdition: cancelEdition,
      save: save,
      approve: approve,
      unapprove: unapprove,
    });
  }

  function isEditing() {
    return this.editedPhrase != this.targetPhrase;
  }

  function cancelEdition() {
    this.editedPhrase = this.targetPhrase;
  }

  function save() {
    this.targetPhrase = this.editedPhrase;
    this.isTranslated = true;
    this.isApproved = false;
  }

  function approve() {
    // this.targetPhrase = this.editedPhrase;
    // this.isTranslated = true;
    this.isApproved = true;
  }

  function unapprove() {
    this.isApproved = false;
  }

  return TranslationCommit;
}

})();
