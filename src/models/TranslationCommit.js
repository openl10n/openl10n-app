app.factory('TranslationCommit', function() {
  'use strict';

  var TranslationCommit = function (translation, context) {
    this.id = translation.id;
    this.key = translation.identifier;
    this.resourceId = translation.resource_id;
    this._context = context;
    this._phrases = translation.phrases || {};
  };

  TranslationCommit.prototype.isActive = function() {
    return false;
  };

  TranslationCommit.prototype.getSourcePhrase = function() {
    return this.getLocaleText(this._context.source);
  };

  TranslationCommit.prototype.getTargetPhrase = function() {
    return this.getLocaleText(this._context.target);
  };

  TranslationCommit.prototype.setTargetPhrase = function(phrase) {
    var locale = this._context.target;

    if (!this._phrases[locale]) {
      this._phrases[locale] = { is_approved: false };
    }

    this._phrases[locale].text = phrase;
  };

  TranslationCommit.prototype.targetPhrase = function(phrase) {
    if (angular.isDefined(phrase)) {
      this.setTargetPhrase(phrase);
    }

    return this.getTargetPhrase();
  };

  // True is source phrase exist
  TranslationCommit.prototype.isSourceTranslated = function() {
    return "undefined" !== typeof this._phrases[this._context.source];
  };

  // True is target phrase exist
  TranslationCommit.prototype.isTranslated = function() {
    return "undefined" !== typeof this._phrases[this._context.target];
  };

  // True if target is approved
  TranslationCommit.prototype.isApproved = function() {
    return this.isLocaleApproved(this._context.target);
  };

  // True if source is approved
  TranslationCommit.prototype.isSourceApproved = function() {
    return this.isLocaleApproved(this._context.source);
  };

  TranslationCommit.prototype.getLocaleText = function(locale) {
    if (!this._phrases[locale]) {
      return '';
    }

    return this._phrases[locale].text;
  };

  TranslationCommit.prototype.isLocaleApproved = function(locale) {
    if (!this._phrases[locale]) {
      return false;
    }

    return this._phrases[locale].is_approved;
  };


  return TranslationCommit;
});
