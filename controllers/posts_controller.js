import mongoose from 'mongoose'

const PostsController = {
	show(req, res) {
    mongoose.model('Post')
      .findById(req.id)
      .exec()
      .then(post => {

        res.render('post', {
          post,
          path: req.path
        })

      })
      .then(null, err => {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      })
  }

}

export default PostsController