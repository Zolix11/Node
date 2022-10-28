/**
 * Load all playlits for a user from the database
 * The result is saved to res.locals.playlists
 */
 module.exports= function(objectRepository){

    return function (req, res, next){
        
        res.locals.playlists=[{genre : 'Mulatos', numberOfsongs : 50, duration : 20 },{genre : 'Disco', numberOfsongs : 20, duration : 20 }]
        return next();
    }
}