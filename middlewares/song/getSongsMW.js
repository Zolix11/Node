/**
 * Load songs from the database,
 * the result is saved to res.locals.songs
 */
 module.exports= function(objectRepository){

    return function (req, res, next){
        res.locals.song=[{author : 'Korda György', title : 'Reptér', duration : 3 },{author : 'Azet', title : 'Lelele', duration : 3 }]
        return next();
    }
}