app.filter('truncate', function() {
  return function(input, length, chars) {
    return S(input).truncate(length, chars).s;
  };
});
