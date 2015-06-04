import mongoose from 'mongoose'

const Post = mongoose.model('Post')

const StaticPagesController = {
	
	index(req, res, next) {
    Post.getPublishedPostsForPage(1)
      .then( result => {

        var { posts, totalCount, nextPage, prevPage } = result

        res.render('index', {
          path: req.path,
          posts,
          nextPage
        })

      }).then(null, err => {
        console.log(err)
      })      
	},

	about(req, res) {
	  res.render('about', {
	    path: req.path
	  })
	}
}

export default StaticPagesController