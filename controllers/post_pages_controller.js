import mongoose from 'mongoose'
import config from '../config'

const PostPagesController = {
	show(req, res) {

		const postsPerPage = config.postsPerPage
		var foundPosts
  
	  mongoose.model('Post')
		  .find({ is_published: true })
		  .sort({ created_at: -1 })
		  .skip(postsPerPage * (req.postsPageNumber - 1))
		  .limit(postsPerPage)
		  .exec()
		  .then(posts => {
		  	foundPosts = posts
		  	return mongoose
		  		.model('Post')
		  		.where({ is_published: true })
		  		.count()
		  		.exec()
		  })
		  .then(count => {
		  	var nextPage = count >= postsPerPage*req.postsPageNumber ? req.postsPageNumber+1 : null
		    var prevPage = req.postsPageNumber > 1 ? req.postsPageNumber-1 : null

		    res.render('page', {
        	path: req.path,
          posts: foundPosts,
          postsPageNumber: req.postsPageNumber,
          nextPage,
          prevPage
        })
		  }).then(null, err => {
		  	console.log(err)
		  })

	}
}

export default PostPagesController