import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({  
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  isPublished: Boolean
})

mongoose.model('Post', postSchema)