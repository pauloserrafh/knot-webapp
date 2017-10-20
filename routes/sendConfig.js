var express = require("express");
var MeshbluSocketIO = require("meshblu");
var router = express.Router();

var meshblu = new MeshbluSocketIO({
  resolveSvr: false,
  hostname: "knot-test.cesar.org.br",
  port: 3000,
  uuid: "",
  token: "",
  protocol: "ws"
});
var responses = {};

meshblu.on("ready", function(response) {
  console.log(response);
  if (!meshblu.uuid) {
    meshblu.uuid = response.uuid;
    meshblu.token = response.token;
  }
  const uuid = response.uuid;
  if (responses[uuid]) {
    responses[uuid].forEach((info, i) => {
      var updateValues = {
        uuid: info.thingUuid,
        config: [
          {
            sensor_id: parseInt(info.itemId),
            event_flags: parseInt(info.evtFlags),
            time_sec: parseInt(info.timeSec),
            lower_limit: parseInt(info.lowerLimit),
            upper_limit: parseInt(info.upperLimit)
          }
        ]
      };
      meshblu.update(updateValues, function(response) {
        info.res.send(response);
        delete responses[uuid][i];
      });
    });
  }
});

meshblu.on("notReady", function(response) {
  console.log(response);
  const uuid = response.uuid;
  if (responses[uuid]) {
    responses[uuid].forEach((info, i) => {
      info.res.send(response);
      delete responses[uuid][i];
    });
  }
});
/* Send config to a device. */
router.post("/", function(req, res, next) {
  console.log(req.body);
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

  if (uuid === "" || token === "" || thingUuid === "" || itemId === "")
    res.send({ status: "Please provide all required values." });

  meshblu["_options"].hostname = hostname;
  meshblu["_options"].port = port;
  meshblu["_options"].uuid = uuid;
  meshblu["_options"].token = token;

  if (responses[uuid]) {
    responses[uuid].push({
      res,
      thingUuid,
      itemId,
      evtFlags,
      timeSec,
      lowerLimit,
      upperLimit
    });
  } else {
    responses[uuid] = [
      {
        res,
        thingUuid,
        itemId,
        evtFlags,
        timeSec,
        lowerLimit,
        upperLimit
      }
    ];
  }
  meshblu.connect();
});

module.exports = router;
