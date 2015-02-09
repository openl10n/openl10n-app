(function() {
'use strict';

angular
  .module('app')
  .factory('TranslationCommit', TranslationCommitFactory);

/**
 * @ngInject
 */
function TranslationCommitFactory($http, $q, $timeout, ApiClient, Configuration) {

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

    ApiClient.all('translations/' + this.id + '/phrases/' + this.targetLocale).customPUT({
      text: this.targetPhrase,
      approved: this.isApproved,
    });
  }

  function approve() {
    // this.targetPhrase = this.editedPhrase;
    // this.isTranslated = true;
    this.isApproved = true;

    ApiClient.one('translations/' + this.id + '/phrases', this.targetLocale).customPUT({
      text: this.targetPhrase,
      approved: this.isApproved,
    });
  }

  function unapprove() {
    this.isApproved = false;

    ApiClient.one('translations/' + this.id + '/phrases', this.targetLocale).customPUT({
      text: this.targetPhrase,
      approved: this.isApproved,
    });
  }

  return TranslationCommit;
}

})();
