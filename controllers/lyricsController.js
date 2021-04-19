'use strict'
let Lyrics = require('../models/lyricsModel');
let moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');


function createLyrics(req, res) {
    const params = req.body;
    let lyricsSync = new Lyrics();
    console.log(params);

    let data = ['{"data":"5", "da":"10"}','{"data":"5", "da":"10"}','{"data":"5", "da":"10"}'];

    if (params.url && params.lyrics) {
        lyricsSync.url = params.url;
        //lyricsSync.user_sync = req.user.sub;
        lyricsSync.status = params.status;
        lyricsSync.lyrics = params.lyrics;
        lyricsSync.category = params.category;
        lyricsSync.licence = params.licence;
        lyricsSync.created_at = moment().unix();

        lyricsSync.save((err, lyricsStored) => {
            console.log(err)
            if (err) return res.status(500).send({message: 'Error to save the content'});

            if (lyricsStored) {
                res.status(200).send({lyric: lyricsStored});
            } else {
                res.status(404).send({message: 'This content not save in the service API'});
            }
        });
    }
}


function getLyrics(req,res){
    let page = 1;

    if(req.params.page){
        page = req.params.page;
    } else {
        page = req.params.id;
    }

    const itemsPerPage = 20;

    Lyrics.find({}).populate({path: '_id'}).paginate(page, itemsPerPage, (err, lyrics, total) => {
        if(err) { console.log(err);  return res.status(500).send({message: 'Error server connections'})}


        if(!lyrics) return res.status(404).send({message: 'No data in the server'});


        return res.status(200).send({
            lyrics: lyrics,
            total: total,
            pages: Math.ceil(total/itemsPerPage),
        });


    })
}

/**
 *
 * function createLyrics(req, res) {
    const params = req.body;
    let lyricsSync = new Lyrics();
    console.log(params);

    if (params.url && params.lyrics) {
        lyricsSync.url = params.url;
        //lyricsSync.user_sync = req.user.sub;
        lyricsSync.status = params.status;
        lyricsSync.lyrics = params.lyrics;
        lyricsSync.category = params.category;
        lyricsSync.licence = params.licence;
        lyricsSync.date = moment().unix();


        Lyrics.find({

        }).exec((err, lyrics) => {
            if (err) return res.status(500).send({message: 'Error connections service to register API Lyrics'});

            if(lyrics && lyrics.length >= 1) {
                return res.status(200).send({message: 'The content exist in the API service, no register'});
            } else {
                lyricsSync.save((err, lyricsStored) => {
                    if (err) return res.status(500).send({message: 'Error to save the content'});

                    if (lyricsStored) {
                        res.status(200).send({lyric: lyricsStored});
                    } else {
                        res.status(404).send({message: 'This content not save in the service API'});
                    }
                })
            }
        })

    } else {
        res.status(200).send({
           message: "Please, send all obligatory data"
        });
    }
}
 *
 *
 */

module.exports = {
    createLyrics,
    getLyrics
}
