import mongoose from 'mongoose'

const StaticPagesController = {
	
	index(req, res, next) {
    mongoose.model('Post').getPublishedPostsForPage(1)
      .then( result => {

        var { posts, totalCount, nextPage, prevPage } = result

        res.render('index', {
          path: req.path,
          posts,
          nextPage
        })

      // same as .then(null, err => { })
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