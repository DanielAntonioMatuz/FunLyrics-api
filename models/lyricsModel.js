'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LyricsModel = Schema({
    category: String,
    url: String,
    lyrics: [ {} ],
    status: Boolean,
    licence: Boolean,
    created_at: String,
    user_sync: {type: Schema.ObjectId, ref: 'UserService'}
});

module.exports = mongoose.model('Lyrics', LyricsModel);

