import mongoose from 'mongoose'
import config from '../config'
import post from './post'

var options

if (process.env.NODE_ENV === 'production') {
	options = {
		server: {
			socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
		}, 
		replset: {
			socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 }
		}
	}
} else {
	options = {}
}

console.log('mongoose:', config.db_url, options)

mongoose.connect(config.db_url, options)