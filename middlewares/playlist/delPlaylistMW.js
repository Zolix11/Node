/**
 * Removes certain playlist from database, entity used is: res.local.playlist
 * then redirrects to /myplaylists after the delete happened
 */
 const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
     
    const SongModel = requireOption(objectrepository, 'SongModel')

     return function(req, res, next) {
         if (typeof (res.locals.playlist) === 'undefined') {
             return next();
         }
         
         SongModel.find({ _ownerplaylist: req.params.playlist }, (err, songs) => {
             if (err) {
                 return next(err)
             }
             if (typeof (songs) !== 'undefined') {
                 songs.forEach(element => {
                     element.remove(err => {
                         if(err)
                            return next(err)
                     })
                 })
            }
         })
        
             
         res.locals.playlist.remove(err => {
             if (err) {
                 return next(err);
             }
             return res.redirect(`/myplaylist/`)
         });
     };
 };