const UserModel = require('./models/user')
const PlaylistModel = require('./models/playlist')
const SongModel = require('./models/song')

let user = new UserModel()
user.name = 'Zolika'
user.password = 'kiscica'
user.save(err =>{
    console.log(err)
    let onePlaylist = new PlaylistModel()
    onePlaylist.name = 'Nagyon jó playlist'
    onePlaylist.songs = 1
    onePlaylist.duration = 3
    onePlaylist.description = 'Ejj de jó'
    onePlaylist._owneruser =user

    onePlaylist.save(err =>{
        console.log(err)
        let onesong = new SongModel()
        onesong.artist = 'VAlMAR'
        onesong.title ='Kréziboy'
        onesong.duration = 3
        onesong._ownerplaylist =  onePlaylist

        onesong.save(err => {
            console.log(err)
        })
    
    })

})

/*const express = require('express');
const app = express();

app.use(express.static('static'));
app.set('view engine', 'ejs');

require('./routes/route')(app);

app.listen(3000, function () {
    console.log('GOGO : 3000');
});*/