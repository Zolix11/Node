/**
 * Using POST params update or save song the the database, by using res.locals.song
 * then redirrects to /myplaylist/:playlistid
 */
const requireOption = require("../requireOption")
module.exports= function(objectRepository){
    const SongModel = requireOption(objectRepository, 'SongModel')

     return function (req, res, next) {
         if (typeof (req.body.title) === 'undefined' ||
             typeof (req.body.artist) === 'undefined' ||
             typeof (req.body.duration) === 'undefined' ||
             typeof (res.locals.playlist) === 'undefined') {
             return next();
         }

         
         if (Number.isNaN(parseFloat(req.body.duration))) {
            return next(new Error('Perc számmal kell hogy megadva legyen!'));
         }
        
         if (typeof (res.locals.song) === 'undefined') {
             res.locals.song = new SongModel()
             res.locals.playlist.duration = res.locals.playlist.duration + parseFloat(req.body.duration)
             res.locals.playlist.songs = res.locals.playlist.songs + 1 
         }
        
         else{
            res.locals.playlist.duration = res.locals.playlist.duration - res.locals.song.duration
            res.locals.playlist.duration = res.locals.playlist.duration + parseFloat(req.body.duration)
         }
         
         res.locals.song.title = req.body.title
         res.locals.song.artist = req.body.artist
         res.locals.song.duration = parseFloat(req.body.duration)
         res.locals.song._ownerplaylist = res.locals.playlist._id

         
       
         res.locals.playlist.save(err => {
             if (err) {
                 return next(err)
             }
         })  
         res.locals.song.save(err => {
             if (err) {
                 return next(err)
             }
             return res.redirect(`/myplaylist/${res.locals.playlist._id}`)
         })
    }
}