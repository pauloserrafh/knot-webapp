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
  const thingUuid = req.body.thingUuid;

  var url = "http://" + hostname + ":" + port;
  url += "/subscribe/" + thingUuid;
  request({
    method: "GET",
    url: url,
    json: true,
    headers: {
      meshblu_auth_uuid: uuid,
      meshblu_auth_token: token
    }
  }).on("response", function(response) {
    var data = [];
    response.on("data", function(chunk) {
      console.log(chunk.toString("utf8"));
      data.push(chunk);
    });
    response.on("end", function() {
      var result = JSON.parse(data.join(""));
      console.log(result);
      return result;
    });
  });
});

module.exports = router;
