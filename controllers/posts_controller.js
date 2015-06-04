import mongoose from 'mongoose'

const Post = mongoose.model('Post')

const PostsController = {
	show(req, res) {
    Post.findBySlug(req.postSlug)
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