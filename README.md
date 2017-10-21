# KNoT Webapp

This is a minimalist webapp built with Node.js/Express and React. You can use it to create your customized app to interact with your KNoT Things.

There are five operations defined:
- Get Data: Will query an specific device's sensor for its current value. In order to see the returned value you must send a read data request.
- Set Data: Use this operation to send a value to a device's actuator
- Set Config: Change the how a device will report the value of a sensor.
- Get Devices: Query for all devices belonging to a gateway
- Subscribe: subscribe for a device's messages.


In order to run:
```
$ npm install (or yarn install)
$ PORT=3003 node bin/www
```
This will start the backend API on port 3003. If you want to use another port make sure to change the proxy property on the package.json inside the client/ folder

Open another terminal and run the following commands:
```
$ cd client
$ npm install (or yarn install)
$ npm start (or yarn start)
```

This will start the frontend on port 3002

