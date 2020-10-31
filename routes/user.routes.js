const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");
// const express = require('express');
// const app = express.Router();


module.exports = function(app){
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}