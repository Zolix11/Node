var renderMW = require('../middlewares/renderMW')

var authMW = require('../middlewares/auth/authMW')
var handleWrongUserNameMW  = require('../middlewares/auth/handleWrongUserNameMW')
var checkPassMW = require('../middlewares/auth/checkPassMW')
var setPassMW =require('../middlewares/auth/setPassMW')
var logoutMW = require('../middlewares/auth/logoutMW')

var getMyPlaylistsMW = require('../middlewares/playlist/getMyPlaylistsMW')
var getMyPlaylistMW = require('../middlewares/playlist/getMyPlaylistMW')
var savePlaylistMW = require('../middlewares/playlist/savePlaylistMW')
var delPlaylistMW = require('../middlewares/playlist/delPlaylistMW')

var getSongsMW = require('../middlewares/song/getSongsMW')
var getSongMW = require('../middlewares/song/getSongMW')
var saveSongMW = require('../middlewares/song/saveSongMW')
var delSongMW = require('../middlewares/song/delSongMW')


module.exports = function (app){
    const objectRepository={};

    app.use('/',
        checkPassMW(objectRepository),
        renderMW(objectRepository,'index'));

    app.use('/forgotpassword ',
        handleWrongUserNameMW(objectRepository),
        setPassMW(objectRepository),
        renderMW(objectRepository,'forgotpassword'));

    app.use('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository),
        renderMW(objectRepository,'index'));
        
    app.use('/myplaylist',
        authMW(objectRepository),
        getMyPlaylistsMW(objectRepository),
        renderMW(objectRepository,'myplaylistList'));

    app.use('/myplaylist/new',
        authMW(objectRepository),
        savePlaylistMW(objectRepository),
        renderMW(objectRepository,'newplaylist'));

    app.get('/myplaylist/:playlist',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        getSongsMW(objectRepository),
        renderMW(objectRepository,'playlist'));   
        
    app.get('/myplaylist/:playlist/del',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        getSongMW(objectRepository),
        delPlaylistMW(objectRepository));
    
    app.use('/myplaylist/:playlist/edit',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        savePlaylistMW(objectRepository),
        renderMW(objectRepository,'editplaylistdetails'));
        
    app.use('/myplaylist/:playlistid/newsong',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        saveSongMW(objectRepository),
        renderMW(objectRepository,'newsong'));

    app.use('/myplaylist/:playlistid/:songId/edit',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        getSongMW(objectRepository),
        saveSongMW(objectRepository),
        renderMW(objectRepository,'playlist'));

    app.get('/myplaylist/:playlistid/:songId/del',
        authMW(objectRepository),
        getMyPlaylistMW(objectRepository),
        getSongsMW(objectRepository),
        getSongMW(objectRepository),
        delSongMW(objectRepository),
        renderMW(objectRepository,'playlist'));

}