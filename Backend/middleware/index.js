const { getAuth } = require("firebase-admin/auth");
const admin = require("../config/firebase-config");

class MiddleWare {
  async verifyToken(req, res, next) {
    const id_token = req.headers.authorization.split(" ")[1];
    getAuth()
      .verifyIdToken(id_token)
      .then()
      .catch((err) => {
        console.log(err);
      })
      .then((val) => {
        if (val) {
          console.log("Client User Authenticated");
          next();
        } else {
          console.log("Unknown User");
        }
      });
  }
}

module.exports = new MiddleWare();
