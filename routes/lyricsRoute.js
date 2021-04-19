'use strict'

const express = require('express');
const lyricsController = require('../controllers/lyricsController');
const api = express.Router();

api.post('/register-lyrics', lyricsController.createLyrics);
api.get('/lyrics', lyricsController.getLyrics);



module.exports = api;



