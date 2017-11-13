import React, { Component } from "react";
import "./App.css";
import {
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Form,
  Col,
  Table,
  Button,
  Image,
  Row
} from "react-bootstrap";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3003');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultConfigs: {
        ownerUuid: "",
        ownerToken: "",
        hostname: "knot.local",
        port: "3000"
      },
      setConfig: {
        thingUuid: "",
        itemId: "",
        evtFlags: "",
        timeSec: "",
        lowerLimit: "",
        upperLimit: "",
        response: ""
      },
      setData: {
        thingUuid: "",
        itemId: "",
        itemData: "",
        response: ""
      },
      getData: { thingUuid: "", itemId: "", response: "" },
      getDevices: { gateway: "", response: "" },
      subscribe: { thingUuid: "", response: "" },
      isOn: true,
      isBreak2: true,
    };
    this._onChangeSetConfig = this._onChangeSetConfig.bind(this);
    this.setConfig = this.setConfig.bind(this);
    this._onChangeSetData = this._onChangeSetData.bind(this);
    this.setData = this.setData.bind(this);
    this._onChangeGetData = this._onChangeGetData.bind(this);
    this.getData = this.getData.bind(this);
    this._onChangeGetDevices = this._onChangeGetDevices.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this._onChangeDefaultConfigs = this._onChangeDefaultConfigs.bind(this);
    this._onChangeSubscribe = this._onChangeSubscribe.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  _onChangeSetConfig = function(e) {
    const setConfig = this.state.setConfig;
    setConfig[e.target.name] = e.target.value;
    this.setState({ setConfig: setConfig });
  };

  _onChangeSetData = function(e) {
    const setData = this.state.setData;
    setData[e.target.name] = e.target.value;
    this.setState({ setData: setData });
  };
  _onChangeGetData = function(e) {
    const getData = this.state.getData;
    getData[e.target.name] = e.target.value;
    this.setState({ getData: getData });
  };
  _onChangeGetDevices = function(e) {
    const getDevices = this.state.getDevices;
    getDevices[e.target.name] = e.target.value;
    this.setState({ getDevices: getDevices });
  };
  _onChangeDefaultConfigs = function(e) {
    const defaultConfigs = this.state.defaultConfigs;
    defaultConfigs[e.target.name] = e.target.value;
    this.setState({ defaultConfigs: defaultConfigs });
  };
  _onChangeSubscribe = function(e) {
    const subscribe = this.state.subscribe;
    subscribe[e.target.name] = e.target.value;
    this.setState({ subscribe: subscribe });
  };
  setConfig = function(e) {
    const setConfig = this.state.setConfig;
    const request = {
      ownerUuid: this.state.defaultConfigs.ownerUuid,
      ownerToken: this.state.defaultConfigs.ownerToken,
      hostname: this.state.defaultConfigs.hostname,
      port: this.state.defaultConfigs.port,
      thingUuid: this.state.setConfig.thingUuid,
      itemId: this.state.setConfig.itemId,
      evtFlags: this.state.setConfig.evtFlags,
      timeSec: this.state.setConfig.timeSec,
      lowerLimit: this.state.setConfig.lowerLimit,
      upperLimit: this.state.setConfig.upperLimit
    };
    fetch("/httpSendConfig", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .then(
        function(json) {
          setConfig["response"] = JSON.stringify(json, null, 3);
          console.log(json);
          this.setState({ setConfig: setConfig });
        }.bind(this)
      );
    e.preventDefault();
  };

  setData = function(e) {
    const setData = this.state.setData;
    const request = {
      ownerUuid: this.state.defaultConfigs.ownerUuid,
      ownerToken: this.state.defaultConfigs.ownerToken,
      hostname: this.state.defaultConfigs.hostname,
      port: this.state.defaultConfigs.port,
      thingUuid: this.state.setData.thingUuid,
      itemId: this.state.setData.itemId,
      itemData: this.state.setData.itemData
    };
    fetch("/httpSetData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .then(
        function(json) {
          setData["response"] = JSON.stringify(json, null, 3);
          console.log(json);
          this.setState({ setData: setData });
        }.bind(this)
      );
    e.preventDefault();
  };

  getData = function(e) {
    const getData = this.state.getData;
    const request = {
      ownerUuid: this.state.defaultConfigs.ownerUuid,
      ownerToken: this.state.defaultConfigs.ownerToken,
      hostname: this.state.defaultConfigs.hostname,
      port: this.state.defaultConfigs.port,
      thingUuid: this.state.getData.thingUuid,
      itemId: this.state.getData.itemId
    };
    fetch("/httpGetData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .then(
        function(json) {
          getData["response"] = JSON.stringify(json, null, 3);
          console.log(json);
          this.setState({ getData: getData });
        }.bind(this)
      );
    e.preventDefault();
  };

  getDevices = function(e) {
    const getDevices = this.state.getDevices;
    const request = {
      ownerUuid: this.state.defaultConfigs.ownerUuid,
      ownerToken: this.state.defaultConfigs.ownerToken,
      hostname: this.state.defaultConfigs.hostname,
      port: this.state.defaultConfigs.port,
      gateway: this.state.defaultConfigs.ownerUuid
    };
    fetch("/httpGetDevices", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .then(
        function(json) {
          var resp = [];
          for (var i in json.body.devices) {
            var device = json.body.devices[i];
            resp[i] = {
              uuid : device.uuid,
              online : device.online,
              name : device.name,
              schema : device.schema
            }
          }
          getDevices["response"] = JSON.stringify(resp, null, 3);
          this.setState({ getDevices: getDevices });
        }.bind(this)
      );
    e.preventDefault();
  };

  subscribe = function(e) {
    const subscribe = this.state.subscribe;
    const request = {
      ownerUuid: this.state.defaultConfigs.ownerUuid,
      ownerToken: this.state.defaultConfigs.ownerToken,
      hostname: this.state.defaultConfigs.hostname,
      port: this.state.defaultConfigs.port,
      thingUuid: subscribe.thingUuid
    };
    socket.on(subscribe.thingUuid, function(response) {
      response = JSON.parse(response);
      console.log(response);
      response = {
        id: response.payload.sensor_id,
        value: response.payload.value,
        timestamp : response.payload.timestamp
      }
      subscribe.response = JSON.stringify(response, null, 3);
      if(response.id === "1") {
        if(response.value === "false")
            this.setState({ isOn: false });
        if(response.value === "true")
            this.setState({ isOn: true });
      }

      if(response.id === "2") {
        if(response.value === "false")
            this.setState({ isBreak2: false });
        if(response.value === "true")
            this.setState({ isBreak2: true });
      }

      this.setState({ subscribe: subscribe });
    }.bind(this));
    socket.emit('httpSubscribe', request);
    e.preventDefault();
  };

  render() {
    const isOn = this.state.isOn;
    const isBreak2 = this.state.isBreak2;
    let image = null;
    let image2 = null;
    console.log(isOn);
    if (isOn) {
      image = <Image src={require('./images/Infrared-Beam-Sensor-off.png')} rounded />;
    } else {
      image = <Image src={require('./images/Infrared-Beam-Sensor-on.png')} rounded />;
    }
    if (isBreak2) {
      image2 = <Image src={require('./images/Infrared-Beam-Sensor-off.png')} rounded />;
    } else {
      image2 = <Image src={require('./images/Infrared-Beam-Sensor-on.png')} rounded />;
    }
    return (
      <div className="App">
        <h1>KNoT Sample App</h1>
        <Panel header="Configurations">
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Owner UUID
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="ownerUuid"
                  value={this.state.defaultConfigs.ownerUuid}
                  onChange={this._onChangeDefaultConfigs}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Owner Token
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="ownerToken"
                  value={this.state.defaultConfigs.ownerToken}
                  onChange={this._onChangeDefaultConfigs}
                />
              </Col>
            </FormGroup>
          </Form>
        </Panel>
        <Panel key={1} collapsible header="Set Config">
          <form>
            <Table responsive>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thing UUID</td>
                  <td>
                    <FormControl
                      type="text"
                      name="thingUuid"
                      value={this.state.setConfig.thingUuid}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Thing UUID</td>
                </tr>
                <tr>
                  <td>Item ID</td>
                  <td>
                    <FormControl
                      type="text"
                      name="itemId"
                      value={this.state.setConfig.itemId}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Id for the item to apply config</td>
                </tr>
                <tr>
                  <td>Event Flags</td>
                  <td>
                    <FormControl
                      type="text"
                      name="evtFlags"
                      value={this.state.setConfig.evtFlags}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Config Flags</td>
                </tr>
                <tr>
                  <td>Time Sec</td>
                  <td>
                    <FormControl
                      type="text"
                      name="timeSec"
                      value={this.state.setConfig.timeSec}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Interval to send data in seconds</td>
                </tr>
                <tr>
                  <td>Lower Limit</td>
                  <td>
                    <FormControl
                      type="text"
                      name="lowerLimit"
                      value={this.state.setConfig.lowerLimit}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Lower Limit</td>
                </tr>
                <tr>
                  <td>Upper Limit</td>
                  <td>
                    <FormControl
                      type="text"
                      name="upperLimit"
                      value={this.state.setConfig.upperLimit}
                      onChange={this._onChangeSetConfig}
                    />
                  </td>
                  <td>Upper Limit</td>
                </tr>
              </tbody>
            </Table>
            <Button bsStyle="primary" onClick={this.setConfig}>
              Set Config
            </Button>
          </form>
          <b>Set config Response:</b>
          <Panel>
            <p>{this.state.setConfig.response}</p>
          </Panel>
        </Panel>
        <Panel key={2} collapsible header="Get Devices">
            <Button bsStyle="primary" onClick={this.getDevices}>
              Get Devices
            </Button>
            <br/>
          <b>Get Devices Response:</b>
          <Panel>
            <p>{this.state.getDevices.response}</p>
          </Panel>
        </Panel>
        <Panel key={4} collapsible header="Subscribe">
          <form>
            <Table responsive>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thing UUID</td>
                  <td>
                    <FormControl
                      type="text"
                      value={this.state.subscribe.thingUuid}
                      name="thingUuid"
                      onChange={this._onChangeSubscribe}
                    />
                  </td>
                  <td>Thing UUID</td>
                </tr>
              </tbody>
            </Table>
            <Button bsStyle="primary" onClick={this.subscribe}>
              Subscribe
            </Button>
          </form>
          <b>Subscribe Response:</b>
          <Panel className="ScrollStyle">
              <Row>
               <Col xs={12} md={8}>
                  <p><b>Sensor 1</b></p>
                 {image}
               </Col>
              <Col xs={6} md={4}>
                <p><b>Sensor 2</b></p>
                {image2}
              </Col>
            </Row>
          </Panel>
        </Panel>
      </div>
    );
  }
}

export default App;
