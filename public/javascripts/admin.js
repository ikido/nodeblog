$(function() {
	$('button.delete-post').click(function(e) {
		if (!confirm("Are you sure?")) {
			e.preventDefault()
			e.stopPropagation()
	  }
	})	
})
