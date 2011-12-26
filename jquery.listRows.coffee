``
((global, $, undef)->
  throw 'jQuery is missing' if $ not instanceof jQuery

  $.fn.listRaws = (iNumRaws)->
    $selection = $ []
    @.each ()->
      $selection = $selection.add this if not $(this).is 'ul, ol'

      $lists = $ this
      $children = $lists.children()
      id = $lists.attr 'id'
      thisNumRaws = iNumRaws || (this.className.match /raws(\d+)/ || [])[1] || 5
      iNumCols = Math.ceil $children.length / thisNumRaws

      if iNumCols < 2
        $selection = $selection.add this

      $children.remove()

      for key in [0..numCols]
        $lists = $lists.add $(this).clone().each(()->
            $(this).addClass('last') if key is iNumCols - 1
            this.id = id + '-' + key if id
          ).insertAfter($lists[key-1])

      for indice in [0..iNumCols]
        sliceStart = indice*thisNumRaws
        $children.slice(sliceStart, sliceStart + thisNumRaws).appendTo $lists[indice]

    $selection = $selection.add $lists

)(window, jQuery)
