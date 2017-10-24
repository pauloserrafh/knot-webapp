var express = require("express");
var router = express.Router();
var request = require("request");

/* GET Devices from a gateway. */
router.post("/", function(req, res, next) {
  const hostname = req.body.hostname;
  const port = req.body.port;
  const uuid = req.body.ownerUuid;
  const token = req.body.ownerToken;
  const thingUuid = req.body.thingUuid;
  const itemId = req.body.itemId;
  const evtFlags = req.body.evtFlags;
  const timeSec = req.body.timeSec;
  const lowerLimit = req.body.lowerLimit;
  const upperLimit = req.body.upperLimit;

  var updateValues = {
    config: [
      {
        sensor_id: parseInt(itemId),
        event_flags: parseInt(evtFlags),
        time_sec: parseInt(timeSec),
        lower_limit: parseInt(lowerLimit),
        upper_limit: parseInt(upperLimit)
      }
    ]
  };
  var url = "http://" + hostname + ":" + port + "/devices/" + thingUuid;
  console.log(url);
  request(
    {
      method: "PUT",
      url: url,
      body: updateValues,
      json: true,
      headers: {
        meshblu_auth_uuid: uuid,
        meshblu_auth_token: token,
        "User-Agent": "request"
      }
    },
    (err, resp, body) => {
      res.send(resp.body);
    }
  );
});

module.exports = router;
