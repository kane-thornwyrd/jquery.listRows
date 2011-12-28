;(function(global, $, undef) {
  return $.fn.listRows = function(Rows) {
    var $selection;
    $selection = $([]);
    this.each(function() {
      var $childs, $list, classes, groupNum, iNumRows, id, indice, out, sliceStart, _ref;
      if (!$(this).is('ul, ol')) {
        return false;
      }
      if (Rows <= 0) {
        throw 'The number of rows has to be positive';
      }
      id = null;
      if (iNumRows < 2) {
        $selection.add(this);
      }
      $list = $(this);
      $childs = $list.children();
      iNumRows = Rows || (this.className.match(/rows-(\d+)/) || [])[1] || 5;
      groupNum = Math.ceil($childs.length / iNumRows);
      out = [];
      $childs.remove();
      for (indice = 1, _ref = groupNum - 1; 1 <= _ref ? indice <= _ref : indice >= _ref; 1 <= _ref ? indice++ : indice--) {
        classes = [];
        if (indice === 0) {
          classes.push('first');
        }
        classes.push(indice % 2 === 1 ? 'even' : 'odd');
        if (indice === groupNum - 1) {
          classes.push('last');
        }
        $list = $list.add($(this).clone().each(function() {
          $(this).addClass(classes.join(' '));
          if (id) {
            return id = "" + id + "-" + indice;
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