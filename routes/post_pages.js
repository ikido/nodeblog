import express  from 'express'
import mongoose from 'mongoose'
import Debug from 'debug'

const router = express.Router()
const postsPerPage = 5
const debug = Debug('server')

router.param('pageNumber', (req, res, next, pageNumber) => {
  pageNumber = parseInt(pageNumber)

  mongoose.model('Post')
	  .where({ is_published: true })
	  .count((err, count) => {
	  	if (err) console.log(err)
	  	if (count < postsPerPage * (pageNumber - 1)) {
      	res.status(404)
      	var err = new Error('Not Found')
      	err.status = 404
	      
	      res.format({
	        html() { next(err) },
	        json() { res.json({ message: `${err.status} ${err}` }) }
	      })

	  	} else {
	  		req.pageNumber = pageNumber
	      next()
	  	}
	  })
})

router.get('/:pageNumber', (req, res) => {
  
  mongoose.model('Post')
	  .find({ is_published: true })
	  .sort({ created_at: -1 })
	  .skip(postsPerPage * (req.pageNumber - 1))
	  .limit(postsPerPage)
	  .exec((err, posts) => {
	    if (err) return console.error(err)

	    var count = mongoose.model('Post')
	      .where({ is_published: true })
	      .count((err, count) => {
	        if (err) console.error(err)
	      
	        var nextPage = count >= postsPerPage*req.pageNumber ? req.pageNumber+1 : null
	      	var prevPage = req.pageNumber > 1 ? req.pageNumber-1 : null
	        debug('nextPage', nextPage, count)

	        res.render('page', {
	        	path: req.path,
	          posts,
	          pageNumber: req.pageNumber,
	          nextPage,
	          prevPage
	        })
	      })  
    })
}) 

export default router
