import React, { Component } from 'react';
import './App.css';
import {
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Form,
  Col
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
    };
    this._onChangeDefaultConfigs = this._onChangeDefaultConfigs.bind(this);
  }

  _onChangeDefaultConfigs = function(e) {
    const defaultConfigs = this.state.defaultConfigs;
    defaultConfigs[e.target.name] = e.target.value;
    this.setState({ defaultConfigs: defaultConfigs });
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
      </div>
    );
  }
}

export default App;
