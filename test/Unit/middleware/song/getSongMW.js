const expect = require("chai").expect;
const getSongMW = require("../../../../middlewares/song/getSongMW");

describe("getSong middleware ", function () {
  it("Should set res.locals.song with a song object from db", function (done) {
    const mw = getSongMW({
      SongModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: "10" });
          cb(null, "songMock");
        },
      },
    });

    const reqMock = {
      params: {
        songid: "10",
      },
    };
    const resMock = {
      locals: {},
    };
    mw(reqMock, resMock, (err) => {
      expect(err).to.be.eql(undefined);
      expect(resMock.locals).to.be.eql({ song: "songMock" });
      done();
    });
  });

  it("Should call next with error where there is an error caused by database", function (done) {
    const mw = getSongMW({
      SongModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: "10" });
          cb("dberror", null);
        },
      },
    });

    const reqMock = {
      params: {
        songid: "10",
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

  it("Should call next with error where there is no searcehed song in the db", function (done) {
    const mw = getSongMW({
      SongModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: "10" });
          cb(undefined, null);
        },
      },
    });

    const reqMock = {
      params: {
        songid: "10",
      },
    };
    const resMock = {
      locals: {},
    };
    mw(reqMock, resMock, (err) => {
      expect(err).to.be.eql(undefined);
      expect(resMock.locals).to.be.eql({});
      done();
    });
  });
});
