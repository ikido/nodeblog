import express  from 'express'
import mongoose from 'mongoose'
import Debug from 'debug'

const debug = Debug('server')
const router = express.Router()
const postsPerPage = 5;

router.route('/')

  .get((req, res, next) => {
    
    mongoose.model('Post')
      .find({ is_published: true })
      .sort({ created_at: -1 })
      .skip(0)
      .limit(postsPerPage)
      .exec((err, posts) => {
        if (err) return console.error(err)

        var count = mongoose.model('Post')
          .where({ is_published: true })
          .count((err, count) => {
            if (err) console.error(err)
          
            var nextPage = count >= postsPerPage ? 2 : null;
            debug('nextPage', nextPage, count)

            res.render('index', {
              path: req.path,
              posts,
              nextPage
            })
          })  
    })
})

router.get('/about', (req, res) => {
  res.render('about', {
    path: req.path
  })
})

export default router
