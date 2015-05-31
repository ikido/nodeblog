import dotenv from 'dotenv'

var dotenvFilename

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	dotenvFilename = '.env'
} else {
	dotenvFilename = `.env.${process.env.NODE_ENV}`
}

dotenv.config({
  silent: true,
  path: dotenvFilename
})

export default {
	admin_login: process.env.ADMIN_LOGIN,
	admin_password: process.env.ADMIN_PASSWORD,
	db_url: process.env.DB_URL
}