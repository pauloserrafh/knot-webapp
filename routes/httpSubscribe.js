module.exports = function(io) {
  var express = require("express");
  var router = express.Router();
  var request = require("request");

    io.on('connection', function(client) {
      client.on('httpSubscribe', (req) => {
      console.log(req);
      const hostname = req.hostname;
      const port = req.port;
      const uuid = req.ownerUuid;
      const token = req.ownerToken;
      const thingUuid = req.thingUuid;
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
          client.emit(thingUuid, chunk.toString("utf8"));
          console.log(chunk.toString("utf8"));
        });
        response.on("end", function() {
          var result = JSON.parse(data.join(""));
          console.log(result);
          return result;
        });
      });
    });
  });

  return router;
}