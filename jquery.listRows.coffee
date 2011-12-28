``
((global, $, undef)->

  $.fn.listRows = (Rows)->
    $selection = $ []
    @.each ()->
      return off if not $(this).is 'ul, ol'
      throw 'The number of rows has to be positive' if Rows <= 0
      id = null
      $selection.add this if iNumRows < 2
      $list = $ this
      $childs = $list.children()
      iNumRows = Rows or (this.className.match(/rows-(\d+)/) or [])[1] or 5
      groupNum = Math.ceil($childs.length / iNumRows)
      out = []
      $childs.remove()
      for indice in [0..groupNum - 1]
        classes = []
        classes.push 'first' if indice is 0
        classes.push if indice % 2 is 1 then 'even' else 'odd'
        classes.push 'last' if indice is groupNum - 1
        $list = $list.add $(this).clone().each(()->
          $(this).addClass classes.join ' '
          id = "#{id}-#{indice}" if id
        )
      for indice in [0..groupNum]
        sliceStart = indice * iNumRows
        $childs.slice(sliceStart, sliceStart + iNumRows).appendTo $list[indice]

      $selection = $selection.add $list
    $selection

)(window, jQuery)
