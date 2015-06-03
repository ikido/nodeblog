import mongoose from 'mongoose'
import config from '../config'


const PostPagesController = {
	show(req, res) {

		var page = req.postsPageNumber

	  mongoose.model('Post').getPublishedPostsForPage(page)
	  	.then( result => {

	  		var { posts, totalCount, nextPage, prevPage } = result

		    res.render('page', {
        	path: req.path,
          posts,
          page,
          nextPage,
          prevPage
        })

      // same as .then(null, err => { })
		  }).then(null, err => {
		  	console.log(err)
		  })

	}
}

export default PostPagesController