import React, { Component } from 'react';
import './App.css';
import {
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Form,
  Col,
  Table,
  Button
} from "react-bootstrap";
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
    };
    this._onChangeDefaultConfigs = this._onChangeDefaultConfigs.bind(this);

    this._onChangeSetConfig = this._onChangeSetConfig.bind(this);
    this.setConfig = this.setConfig.bind(this);
  }

  _onChangeDefaultConfigs = function(e) {
    const defaultConfigs = this.state.defaultConfigs;
    defaultConfigs[e.target.name] = e.target.value;
    this.setState({ defaultConfigs: defaultConfigs });
  };

 _onChangeSetConfig = function(e) {
    const setConfig = this.state.setConfig;
    setConfig[e.target.name] = e.target.value;
    this.setState({ setConfig: setConfig });
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
  render() {
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
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Hostname
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="hostname"
                  value={this.state.defaultConfigs.hostname}
                  onChange={this._onChangeDefaultConfigs}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Port
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="port"
                  value={this.state.defaultConfigs.port}
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
      </div>
    );
  }
}

export default App;
