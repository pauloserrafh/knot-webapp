var express = require("express");
var router = express.Router();
var MeshbluHttp = require('meshblu-http');

/* GET Devices from a gateway. */
router.post("/", function(req, res, next) {
  const hostname = req.body.hostname;
  const port = req.body.port;
  const uuid = req.body.ownerUuid;
  const token = req.body.ownerToken;
  const thingUuid = req.body.thingUuid;
  const itemId = req.body.itemId;

  var meshbluHttp = new MeshbluHttp({uuid: uuid, token: token,
      hostname : hostname, port: port, resolveHost: false, protocol: 'http' });
      var updateValues = {
          get_data: [
            {
              sensor_id: parseInt(itemId)
            }
          ]
       };
  meshbluHttp.update({uuid: thingUuid}, updateValues, function(error, response) {
    if (error)
      return res.send(error);
    res.send(response);
  })
});

module.exports = router;