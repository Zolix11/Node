/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
 module.exports= function(objectRepository){

    return function (req, res, next){
        return next();
    }
}