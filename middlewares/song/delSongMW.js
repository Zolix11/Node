/**
 * Removes certain song from database, entity used is: res.local.song
 * then redirrects to /myplaylists/:playlistid after the delete happened
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.song === "undefined") {
      return next();
    }

    res.locals.song.remove((err) => {
      if (err) {
        return next(err);
      }
      res.locals.playlist.songs = res.locals.playlist.songs - 1;
      res.locals.playlist.duration =
        res.locals.playlist.duration - res.locals.song.duration;
      res.locals.playlist.save((err) => {
        if (err) {
          return next(err);
        }
      });
      return res.redirect(`/myplaylist/${res.locals.playlist._id}`);
    });
  };
};
