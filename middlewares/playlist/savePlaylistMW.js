/**
 * Save playlist to the database using the POST params,
 * it can be used to both saving a new playlist and to update an existing playlist by the res.local.myplaylist
 * then redirrects to /myplaylists after the save/update happened
 */

const requireOption = require("../requireOption");
module.exports = function (objectRepository) {
  const PlaylistModel = requireOption(objectRepository, "PlaylistModel");

  return function (req, res, next) {
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.description === "undefined"
    ) {
      return next();
    }

    if (typeof res.locals.playlist === "undefined") {
      res.locals.playlist = new PlaylistModel();
    }

    res.locals.playlist.name = req.body.name;
    res.locals.playlist.description = req.body.description;
    res.locals.playlist._owneruser = req.session.userid;

    res.locals.playlist.save((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect(`/myplaylist/${res.locals.playlist._id}`);
    });
  };
};
