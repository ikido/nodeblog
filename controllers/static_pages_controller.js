import mongoose from 'mongoose'
import config from '../config'

const StaticPagesController = {
	
	index(req, res, next) {
    const postsPerPage = config.postsPerPage
    var foundPosts

    mongoose.model('Post')
      .find({ is_published: true })
      .sort({ created_at: -1 })
      .skip(0)
      .limit(postsPerPage)
      .exec()
      .then( posts => {
        foundPosts = posts
        return mongoose.model('Post')
          .where({ is_published: true })
          .count()
          .exec()
      })
      .then( count => {
        var nextPage = count >= postsPerPage ? 2 : null
        res.render('index', {
          path: req.path,
          posts: foundPosts,
          nextPage
        })
      })
      .then(null, err => {
        console.error(err)
      })
	},

	about(req, res) {
	  res.render('about', {
	    path: req.path
	  })
	}
}

export default StaticPagesController