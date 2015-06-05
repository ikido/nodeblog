import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import moment from 'moment'
import MarkdownIt from 'markdown-it'

import db from './models/index'

import routes from './routes'

// import staticPages from './routes/static_pages'
// import posts from './routes/posts'
// import postPages from './routes/post_pages'
// import adminPosts from './routes/admin/posts'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// provide moment.js for the views
app.locals.moment = moment
app.locals.md = new MarkdownIt()

// prettify html in developemtn
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

// app.use('/', staticPages)
// app.use('/page', postPages)
// app.use('/posts', posts)
// app.use('/admin', adminPosts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})


export default app
