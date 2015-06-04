import mongoose from 'mongoose'
import _ from 'lodash'

const getPostParams = function(req) {
  return _.pick(req.body, [
  	'title',
    'slug',
    'excerpt',
    'body',
    'is_published'
  ])
}

const Post = mongoose.model('Post')

const AdminPostsController = {

	index(req, res, next) {
	  Post.find({}).sort({ create_at: -1 })
      .then( posts => {
	      res.render('admin/posts/index', {
	        title: 'All posts',
	        posts : posts
	      });
	    })
      .then(null, err => {
        console.error(err)
      })
	},

	new(req, res) {
	  res.render('admin/posts/new', { title: 'Add New post' })
	},

	create(req, res) {
    
    var postParams = getPostParams(req)
    Post.createPost(postParams)
      .then( post => {      
        res.redirect("/admin/posts/")
      })
      .then(null, err => {
        res.send(`There was a problem adding the information to the database: ${err}`)
      })
  },

	update(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var postParams = getPostParams(req)
    
    //find the document by ID
    Post.updatePost(req.id, postParams)
      .then( post => {
        res.redirect(`/admin/posts/${post._id}/edit`)
      })
      .then(null, err => {
        res.send(`There was a problem updating the information to the database: ${err}`)
      })
  },

  destroy(req, res) {
    Post.removePost(req.id)
      .then( blob => {
        res.redirect("/admin/posts")
      })
      .then(null, err => {
        console.error(err)
      })
  },

  edit(req, res) {
    Post.findById(req.id)
      .then( post => {
        res.render('admin/posts/edit', { post })
      })
      .then(null, err => {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      })
  },

}

export default AdminPostsController