import express  from 'express'

import middleware from './middleware/index'

import AdminPostsController from './controllers/admin/posts_controller'
import PostPagesController from './controllers/post_pages_controller'
import PostsController from './controllers/posts_controller'
import StaticPagesController from './controllers/static_pages_controller'

const router = express.Router()

router.use(middleware.bodyParser)
router.use(middleware.methodOverride)
router.param('postId', middleware.postIdParam)
router.param('postsPageNumber', middleware.postsPageNumber)

// static routes
router.get('/', StaticPagesController.index)
router.get('/about', StaticPagesController.about)

// posts
router.get('/posts/:postId', PostsController.show) 

// post pages
router.get('/page/:postsPageNumber', PostPagesController.show)

// admin panel
router.get('/admin', middleware.adminAuth, AdminPostsController.index)
router.get('/admin/posts', middleware.adminAuth, AdminPostsController.index)
router.post('/admin/posts', middleware.adminAuth, AdminPostsController.create)
router.get('/admin/posts/new', middleware.adminAuth, AdminPostsController.new)
router.get('/admin/posts/:postId/edit', middleware.adminAuth, AdminPostsController.edit)
router.put('/admin/posts/:postId', middleware.adminAuth, AdminPostsController.update)
router.delete('/admin/posts/:postId', middleware.adminAuth, AdminPostsController.destroy)

export default router
