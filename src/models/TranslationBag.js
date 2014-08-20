app.factory('TranslationBag', function() {

  var TranslationBag = function () {
    this.items = [];
    this.selected = null;

    this.add = function(item) {
      this.items.push(item);
    }

    this.select = function(itemId) {
      if (this.selected) {
        this.selected.selected = false;
      }

      this.selected = _.find(this.items, {id: itemId});

      if (this.selected) {
        this.selected.selected = true;
      }

      return this.selected;
    }
  }

  return TranslationBag;
});
