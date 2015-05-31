import express  from 'express'
import mongoose from 'mongoose'
import config from '../../config'
import bodyParser from 'body-parser' //parses information from POST
import methodOverride from 'method-override' //used to manipulate POST
import basicAuth from 'basic-auth-connect'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
   }
}))

router.use(basicAuth(config.admin_login, config.admin_password))

var indexCallback = function (req, res, next) {
  
  mongoose.model('Post').find({}, (err, posts) => {
    if (err) {

      return console.error(err)

    } else {

      res.format({
        html() {
          res.render('admin/posts/index', {
            title: 'All posts',
              "posts" : posts
          });
        },
        json(){ res.json(posts) }
      });
    }     
  });
}

router.get('/', indexCallback)

router.route('/posts')
  .get(indexCallback)
  .post((req, res) => {
    
    var {
      title,
      slug,
      excerpt,
      body,
      is_published
    } = req.body

    mongoose.model('Post').create(
      { title, slug, excerpt, body, is_published },
      (err, post) => {
      
        if (err) {
          res.send("There was a problem adding the information to the database.")
        } else {
          
          console.log(`POST creating new post: ${post}`)
          
          res.format({
            html() {
              // If it worked, set the header to change address bar
              res.location("/admin/posts")
              // And forward to success page
              res.redirect("/admin/posts")
            },
            
            json() { res.json(post) }
          })
        }
    })
  })

router.get('/posts/new', (req, res) => {
  res.render('admin/posts/new', { title: 'Add New post' });
})

router.param('id', (req, res, next, id) => {
  //console.log('validating ' + id + ' exists');
  //find the ID in the Database
  mongoose.model('Post').findById(id, (err, post) => {
    //if it isn't found, we are going to repond with 404
    if (err) {
      console.log(`${id} was not found`)

      res.status(404)
      var err = new Error('Not Found')
      err.status = 404
      res.format({
        html() { next(err) },
        json() { res.json({ message: `${err.status} ${err}` }) }
      });

    } else {
      //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
      //console.log(post);
      // once validation is done save the new item in the req
      req.id = id
      // go to the next thing
      next()
    } 
  })
})

router.route('/posts/:id/edit')
  .get( (req, res) => {
    mongoose.model('Post').findById(req.id, (err, post) => {
      if (err) {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      } else {
        console.log(`GET Retrieving ID: ${post._id}`);

        res.format({
          html() { res.render('admin/posts/edit', { post }) },
          json() { res.json(post)  }
        })
      }
    })
  })

router.route('/posts/:id')
  .get( (req, res) => {
    mongoose.model('Post').findById(req.id, (err, post) => {
      if (err) {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      } else {
        console.log(`GET Retrieving ID: ${post._id}`);

        res.format({
          html() { res.render('admin/posts/show', { post }) },
          json() { res.json(post)  }
        })
      }
    })
  })

  .put((req, res) => {
    // Get our REST or form values. These rely on the "name" attributes
    var {
      title,
      slug,
      excerpt,
      body,
      is_published
    } = req.body

    //find the document by ID
    mongoose.model('Post').findOneAndUpdate(
      { "_id": req.id }, { title, slug, excerpt, body, is_published }, (err, post) => {
        if (err) {
          res.send(`There was a problem updating the information to the database: ${err}`);
        } else {
          res.format({
            html() { res.redirect(`/admin/posts`) },
            json() { res.json(post) }
          })
        }
    })
  })

  .delete((req, res) => {
    mongoose.model('Post').findById(req.id, (err, post) => {
      if (err) {
        return console.error(err)
      } else {
        post.remove( (err, blob) => {
          if (err) {
            return console.error(err)
          } else {
            console.log(`DELETE removing ID: ${blob._id}`)
            res.format({
              html() { res.redirect("/admin/posts") },
              json() { res.json({ message : 'deleted', item : post }) }
            })
          }
        })
      }
    })
  })

  
export default router
