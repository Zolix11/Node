const renderMW = require("../middlewares/renderMW");

const authMW = require("../middlewares/auth/authMW");
const checkPassMW = require("../middlewares/auth/checkPassMW");
const createuserMW = require("../middlewares/auth/createuserMW");
const logoutMW = require("../middlewares/auth/logoutMW");
const forgotuserpassword = require("../middlewares/auth/forgotuserpassword");

const getMyPlaylistsMW = require("../middlewares/playlist/getMyPlaylistsMW");
const getMyPlaylistMW = require("../middlewares/playlist/getMyPlaylistMW");
const savePlaylistMW = require("../middlewares/playlist/savePlaylistMW");
const delPlaylistMW = require("../middlewares/playlist/delPlaylistMW");

const getSongsMW = require("../middlewares/song/getSongsMW");
const getSongMW = require("../middlewares/song/getSongMW");
const saveSongMW = require("../middlewares/song/saveSongMW");
const delSongMW = require("../middlewares/song/delSongMW");

const PlaylistModel = require("../models/playlist");
const SongModel = require("../models/song");
const UserModel = require("..//models/user");
module.exports = function (app) {
  const objectRepository = {
    PlaylistModel: PlaylistModel,
    SongModel: SongModel,
    UserModel: UserModel,
  };

  app.use(
    "/createuser",
    createuserMW(objectRepository),
    renderMW(objectRepository, "createuserforgotpassword")
  );

  app.use(
    "/forgotpassword",
    forgotuserpassword(objectRepository),
    renderMW(objectRepository, "createuserforgotpassword")
  );

  app.use(
    "/logout",
    authMW(objectRepository),
    logoutMW(objectRepository),
    renderMW(objectRepository, "index")
  );

  app.use(
    "/myplaylist/new",
    authMW(objectRepository),
    savePlaylistMW(objectRepository),
    renderMW(objectRepository, "neweditplaylistdetails")
  );

  app.get(
    "/myplaylist/:playlist",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    getSongsMW(objectRepository),
    renderMW(objectRepository, "playlist")
  );

  app.get(
    "/myplaylist/:playlist/del",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    getSongsMW(objectRepository),
    delPlaylistMW(objectRepository)
  );

  app.use(
    "/myplaylist/:playlist/edit",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    savePlaylistMW(objectRepository),
    renderMW(objectRepository, "neweditplaylistdetails")
  );

  app.use(
    "/myplaylist/:playlist/newsong",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    saveSongMW(objectRepository),
    renderMW(objectRepository, "neweditsong")
  );

  app.use(
    "/myplaylist/:playlist/:songid/edit",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    getSongMW(objectRepository),
    saveSongMW(objectRepository)
  );

  app.get(
    "/myplaylist/:playlist/:songid/del",
    authMW(objectRepository),
    getMyPlaylistMW(objectRepository),
    getSongsMW(objectRepository),
    getSongMW(objectRepository),
    delSongMW(objectRepository),
    renderMW(objectRepository, "playlist")
  );

  app.use(
    "/myplaylist",
    authMW(objectRepository),
    getMyPlaylistsMW(objectRepository),
    renderMW(objectRepository, "menu")
  );

  app.use(
    "/",
    checkPassMW(objectRepository),
    renderMW(objectRepository, "index")
  );
};
