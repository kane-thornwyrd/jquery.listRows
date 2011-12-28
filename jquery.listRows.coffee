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
      for indice in [1..groupNum - 1]
        $list = $list.add $(this).clone().each(()->
          $(this).addClass 'first' if indice is 1
          $(this).addClass if indice % 2 is 0 then 'even' else 'odd'
          $(this).addClass 'last' if indice is groupNum - 1
          id = "#{id}-#{indice}" if id
        ).insertAfter $list[indice-1]
      for indice in [0..groupNum]
        sliceStart = indice * iNumRows
        $childs.slice(sliceStart, sliceStart + iNumRows).appendTo $list[indice]

      $selection = $selection.add $list
    $selection

)(window, jQuery)
