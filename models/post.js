import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import urlSlugs from 'mongoose-url-slugs'
import config from '../config'

const postsPerPage = config.postsPerPage

const postSchema = new mongoose.Schema({  
  title: String,
  slug: String,
  excerpt: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  is_published: Boolean
})

postSchema.plugin(timestamps)
postSchema.plugin(urlSlugs('title', { update: true }))

postSchema.statics.getPublishedPostsForPage = function(page) {
  var foundPosts

  return new Promise((resolve, reject) => {
    this.find({ is_published: true })
      .sort({ created_at: -1 })
      .skip(postsPerPage * (page - 1))
      .limit(postsPerPage)
      .exec()
      .then(posts => {
        foundPosts = posts
        return this.where({ is_published: true })
          .count()
          .exec()
      })
      .then( count => {
        var nextPage = count >= postsPerPage*page ? page+1 : null
        var prevPage = page > 1 ? page-1 : null

        // resolve promise
        resolve({ posts: foundPosts, count, nextPage, prevPage })
      })
      .then(null, err => {
        // resolve promise with err
        reject(err)
      })
  })
}

postSchema.statics.createPost = function(attributes) {
  return new Promise((resolve, reject) => {
    var post = new this(attributes)
    post.save()
      .then(post => {
        resolve(post)
      })
      .then(null, err => {
        reject(err)
      })
  })
}

postSchema.statics.updatePost = function(id, attributes) {
  return new Promise((resolve, reject) => {
    var post = this.findById(id)
      .then(post => {
        post.set(attributes)
        return post.save()
      })
      .then(post => {
        resolve(post)
      })
      .then(null, err => {
        reject(err)
      })
  })
}

postSchema.statics.removePost = function(id) {
  return new Promise((resolve, reject) => {
    var post = this.findById(id)
      .then( post => {
        return post.remove()
      })
      .then(blob => {
        resolve(blob)
      })
      .then(null, err => {
        reject(err)
      })
  })
}


mongoose.model('Post', postSchema)