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

const AdminPostsController = {

	index(req, res, next) {
	  mongoose.model('Post')
      .find({})
      .exec()
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

    mongoose.model('Post')
      .create(postParams)
      .then( post => {      
        res.redirect("/admin/posts")
      })
      .then(null, err => {
        res.send("There was a problem adding the information to the database.")
      })
  },

	update(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var postParams = getPostParams(req)
    
    //find the document by ID
    mongoose.model('Post')
      .findOneAndUpdate({ "_id": req.id }, postParams)
      .exec()
      .then( post => {
        res.redirect(`/admin/posts`)
      })
      .then(null, err => {
        res.send(`There was a problem updating the information to the database: ${err}`)
      })
  },

  destroy(req, res) {
    mongoose.model('Post')
      .findById(req.id)
      .exec()
      .then( post => {
        return post.remove()
      })
      .then( blob => {
        res.redirect("/admin/posts")
      })
      .then(null, err => {
        console.error(err)
      })
  },

  edit(req, res) {
    mongoose.model('Post')
      .findById(req.id)
      .exec()
      .then( post => {
        res.render('admin/posts/edit', { post })
      
      })
      .then(null, err => {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      })
  },

}

export default AdminPostsController