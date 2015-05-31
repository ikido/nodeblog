import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({  
  title: String,
  slug: String,
  excerpt: String,
  body: String,
  created_at: { type: Date },
  updated_at: { type: Date },
  is_published: Boolean
})

postSchema.pre('save', function(next){
  var now = new Date()
  this.updated_at = now
  if ( !this.created_at ) {
    this.created_at = now
  }
  next()
})

// see http://mongoosejs.com/docs/middleware.html
// Notes on findAndUpdate() and Query Middleware
postSchema.pre('findOneAndUpdate', function() {
  this.findOneAndUpdate({}, { updated_at: Date.now() })
  // this.update({ $set: { updated_at: Date.now() } })
})


mongoose.model('Post', postSchema)