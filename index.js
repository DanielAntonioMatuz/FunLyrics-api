/** INIT COST AND VAR SETTINGS PROYECTS **/
const bodyParser = require("body-parser");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3800;
const express = require('express');
const moment = require('moment');


/** VAR MODELS **/


/** ROUTES **/
let lyrics_routes = require('./routes/lyricsRoute');

/** SETTINGS API INIT EXPRESS **/
const app = express();
const server = require('http').Server(app);

//T5VfS:Sx!G2E:Y2
/** CONFIGURE BD MONGO DB ATLAS SERVICE **/

//   mongodb+srv://funlyricsadmin:T5VfS:Sx!G2E:Y2@cluster0.oqifi.mongodb.net/funlyricsdb?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://funlyricsadmin:bv8b1fdHl2XExMkv@cluster0.oqifi.mongodb.net/funlyricsdb?retryWrites=true&w=majority', (err)=> {  //Cambiar a la BD de Tlint
    if(err){
        throw err;
    } else {
        console.log('Conectado a la DB');
        server.listen(port, function(){
            console.log('Estado conectado al puerto ' + port);
        })
    }
});


/** INIT APP **/
const cors = require('cors');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());


/** ROUTES INIT APP **/

app.use('/api/v1', lyrics_routes);

/** EXPORT **/
module.exports = app;
