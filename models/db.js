import config from '../config'

var mongoose = require('mongoose');
mongoose.connect(config.db_url);