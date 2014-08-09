app.factory('TranslationCommit', function() {

  var TranslationCommit = function (translation, context) {
    this.id = translation.id;
    this._context = context;
    this._phrases = translation.phrases;
  }

  TranslationCommit.prototype.getPhrase = function(locale) {
    if (!this._phrases[locale]) {
      return '';
    }

    return this._phrases[locale].text;
  }

  TranslationCommit.prototype.getSourcePhrase = function() {
    return this.getPhrase(this._context.source);
  }

  TranslationCommit.prototype.getTargetPhrase = function() {
    return this.getPhrase(this._context.target);
  }

  // True is target phrase exist
  TranslationCommit.prototype.isTranslated = function() {
    return true;
  }

  // True if target is approved
  TranslationCommit.prototype.isApproved = function() {
    return false;
  }

  // True if source is approved
  TranslationCommit.prototype.isValid = function() {
    return true;
  }

  return TranslationCommit;
});
