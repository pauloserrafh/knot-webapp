var express = require("express");
var router = express.Router();
var MeshbluHttp = require('meshblu-http');

/* GET Devices from a gateway. */
router.post("/", function(req, res, next) {
  const uuid = req.body.ownerUuid;
  const token = req.body.ownerToken;
  const gateway = req.body.gateway;
  const hostname = req.body.hostname;
  const port = req.body.port;

  var meshbluHttp = new MeshbluHttp({uuid: uuid, token: token,
      hostname : hostname, port: port, resolveHost: false, protocol: 'http' });
  meshbluHttp.devices({owner: gateway}, function(error, response) {
    if (error)
      return res.send(error);
    res.send(response);
  })
});

module.exports = router;