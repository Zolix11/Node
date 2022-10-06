/**
 * Save playlist to the database using the POST params, 
 * it can be used to both saving a new playlist and to update an existing playlist by the res.local.myplaylist
 * then redirrects to /myplaylists after the save/update happened
 */
 module.exports= function(objectRepository){

    return function (req, res, next){
        return next();
    }
}