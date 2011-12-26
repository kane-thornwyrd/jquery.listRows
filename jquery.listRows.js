
;

(function(global, $, undef) {
  if (!($ instanceof jQuery)) throw 'jQuery is missing';
  return $.fn.listRaws = function(iNumRaws) {
    var $selection;
    $selection = $([]);
    this.each(function() {
      var $children, $lists, iNumCols, id, indice, sliceStart, thisNumRaws, _results;
      if (!$(this).is('ul, ol')) $selection = $selection.add(this);
      $lists = $(this);
      $children = $lists.children();
      id = $lists.attr('id');
      thisNumRaws = iNumRaws || (this.className.match(/raws(\d+)/ || []))[1] || 5;
      iNumCols = Math.ceil($children.length / thisNumRaws);
      if (iNumCols < 2) $selection = $selection.add(this);
      $children.remove();
      for (indice = 0; 0 <= iNumCols ? indice <= iNumCols : indice >= iNumCols; 0 <= iNumCols ? indice++ : indice--) {
        $lists = $lists.add($(this).clone().each(function() {
          if (indice === iNumCols - 1) $(this).addClass('last');
          if (id) return this.id = id + '-' + indice;
        }).insertAfter($lists[indice - 1]));
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
