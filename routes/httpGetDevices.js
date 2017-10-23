var express = require("express");
var router = express.Router();
var request = require("request");

/* GET Devices from a gateway. */
router.post("/", function(req, res, next) {
  console.log(req.body);
  const hostname = req.body.hostname;
  const port = req.body.port;
  const uuid = req.body.ownerUuid;
  const token = req.body.ownerToken;
  const gateway = req.body.gateway;

  var url = "http://" + hostname + ":" + port;
  url += "/devices/?owner=" + gateway;
  console.log(url);
  request(
    {
      method: "GET",
      url: url,
      json: true,
      headers: {
        meshblu_auth_uuid: uuid,
        meshblu_auth_token: token,
        "User-Agent": "request"
      }
    },
    (err, resp, body) => {
      res.send(resp);
    }
  );
});

module.exports = router;