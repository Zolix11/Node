/**
 * Removes certain playlist from database, entity used is: res.local.playlist
 * then redirrects to /myplaylists after the delete happened
 */
 module.exports= function(objectRepository){

    return function (req, res, next){
        return next();
    }
}