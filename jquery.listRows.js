
;

(function(global, $, undef) {
  if (!($ instanceof jQuery)) throw 'jQuery is missing';
  return $.fn.listRaws = function(iNumRaws) {
    var $selection;
    $selection = $([]);
    this.each(function() {
      var $children, $lists, elements, iNumCols, id, indice, key, sliceStart, thisNumRaws, _len, _results;
      if (!$(this).is('ul, ol')) $selection = $selection.add(this);
      $lists = $(this);
      $children = $lists.children();
      id = $lists.attr('id');
      thisNumRaws = iNumRaws || (this.className.match(/raws(\d+)/ || []))[1] || 5;
      iNumCols = Math.ceil($children.length / thisNumRaws);
      if (iNumCols < 2) $selection = $selection.add(this);
      $children.remove();
      for (key = 0, _len = numCols.length; key < _len; key++) {
        elements = numCols[key];
        if (key < iNumCols) {
          $lists = $lists.add($(this).clone().each(function() {
            if (key === iNumCols - 1) $(this).addClass('last');
            if (id) return this.id = id + '-' + key;
          }).insertAfter($lists[key - 1]));
        }
      }
      _results = [];
      for (indice = 0; 0 <= iNumCols ? indice <= iNumCols : indice >= iNumCols; 0 <= iNumCols ? indice++ : indice--) {
        sliceStart = indice * thisNumRaws;
        _results.push($children.slice(sliceStart, sliceStart + thisNumRaws).appendTo($lists[indice]));
      }
      return _results;
    });
    return $selection = $selection.add($lists);
  };
})(window, jQuery);
