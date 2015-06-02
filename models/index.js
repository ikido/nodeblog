import config from '../config'
import post from './post'

var mongoose = require('mongoose');
mongoose.connect(config.db_url);