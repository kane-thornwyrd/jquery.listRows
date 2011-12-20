(function(window, $, undef) {
	if($ === undef) {
		throw 'Dépendence non satisfaite : jQuery';
	}

	$.fn.listRaws = function(iNumRaws) {
		var $selection = $([]);
		this.each(function() {
			if(!$(this).is('ul, ol')) {
				$selection = $selection.add(this);
				return;
			}

			var i
			,sliceStart
			,$lists = $(this)
			,$children = $lists.children()
			,id = $lists.attr('id')
			,thisNumRaws = iNumRaws || (this.className.match(/raws(\d+)/) || [])[1] || 5
			,iNumCols = Math.ceil($children.length / thisNumRaws);

			if(iNumCols < 2) {
				$selection = $selection.add(this);
				return;
			}

			$children.remove();

			for(i = 1; i < iNumCols; i++) {
				$lists = $lists
					.add(
						$(this)
							.clone()
							.each(function() {
								if(i === iNumCols - 1) {
									$(this).addClass('last');
								}
								if(id) {
									this.id = id + '-' + i;
								}
							})
							.insertAfter($lists[i-1])
					);
			}

			for(i = 0; i < iNumCols; i++) {
				sliceStart = i*thisNumRaws;

				$children
					.slice(sliceStart, sliceStart + thisNumRaws)
						.appendTo($lists[i]);
			}

			$selection = $selection.add($lists);
		});
		return $selection;
	};
})(this, this.jQuery);