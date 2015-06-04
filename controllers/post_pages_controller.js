import mongoose from 'mongoose'
import config from '../config'

const Post = mongoose.model('Post')

const PostPagesController = {
	show(req, res) {

		var page = req.postsPageNumber

	  Post.getPublishedPostsForPage(page)
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