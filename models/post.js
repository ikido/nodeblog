import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({  
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  is_published: Boolean
})

mongoose.model('Post', postSchema)