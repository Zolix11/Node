const expect = require("chai").expect;
const getMyPlaylistsMW = require("../../../../middlewares/playlist/getMyPlaylistsMW");

describe("getMyplaylistsMW", function () {
  it("Should set all playlits for a user from database", function (done) {
    const mw = getMyPlaylistsMW({
      PlaylistModel: {
        find: (p1, cb) => {
          expect(p1).to.be.eql({ _owneruser: "UserId" });
          cb(null, "PlaylistsMock");
        },
      },
    });

    const reqMock = {
      session: {
        userid: "UserId",
      },
    };
    const resMock = {
      locals: {},
    };

    mw(reqMock, resMock, (err) => {
      expect(err).to.be.eql(undefined);
      expect(resMock.locals).to.be.eql({ playlists: "PlaylistsMock" });
      done();
    });
  });

  it("Should call next with error caused by not finding the user", function (done) {
    const mw = getMyPlaylistsMW({
      PlaylistModel: {
        find: (p1, cb) => {
          expect(p1).to.be.eql({ _owneruser: "UserId" });
          cb("dberror", null);
        },
      },
    });

    const reqMock = {
      session: {
        userid: "UserId",
      },
    };
    const resMock = {
      locals: {},
    };

    mw(reqMock, resMock, (err) => {
      expect(err).to.be.eql("dberror");
      done();
    });
  });
});
