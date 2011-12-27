;(function(global, $, undef) {
  return $.fn.listRows = function(iNumRows) {
    var $selection;
    $selection = $([]);
    this.each(function() {
      var $childs, $list, groupNum, id, indice, out, sliceStart;
      if (!$(this).is('ul, ol')) {
        return false;
      }
      if (iNumRows <= 0) {
        throw 'The number of rows has to be positive';
      }
      id = null;
      if (iNumRows < 2) {
        $selection.add(this);
      }
      $list = $(this);
      $childs = $list.children();
      iNumRows = iNumRows || (this.className.match(/raws(\d+)/) || [])[1] || 5;
      groupNum = Math.ceil($childs.length / iNumRows);
      out = [];
      $childs.remove();
      for (indice = 1; 1 <= groupNum ? indice <= groupNum : indice >= groupNum; 1 <= groupNum ? indice++ : indice--) {
        $list = $list.add($(this).clone().each(function() {
          if (indice === iNumRows - 1) {
            $(this).addClass('last');
          }
          if (id) {
            return this.id = "" + id + "-" + indice;
          }
        }).insertAfter($list[indice - 1]));
      }
      for (indice = 0; 0 <= groupNum ? indice <= groupNum : indice >= groupNum; 0 <= groupNum ? indice++ : indice--) {
        sliceStart = indice * iNumRows;
        $childs.slice(sliceStart, sliceStart + iNumRows).appendTo($list[indice]);
      }
      return $selection = $selection.add($list);
    });
    return $selection;
  };
})(window, jQuery);