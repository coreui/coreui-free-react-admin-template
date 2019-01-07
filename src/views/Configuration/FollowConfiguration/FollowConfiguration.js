import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row} from 'reactstrap';
import api from "../../../api";
import NotificationSystem from "react-notification-system";
import './followconfiguration.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactResizeDetector from 'react-resize-detector';

const uuidv4 = require('uuid/v4');
const PAGE_SIZE = 10;
const MAX = 30;

class FollowConfiguration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      sensors: [],
      page: 1,

      newDataSensorLayout: false,

      //new data sensor form
      name: '',
      isValidName: true,
      type: '',
      isValidType: true,
      rule: '',
      isValidRule: true,
      label: '',
      isValidLabel: true,
      isActivated: false,
      isValidIsActivated: true,

    };

    this.handleFilterDataSensors = this.handleFilterDataSensors.bind(this);
    this.handleNewDataSensor = this.handleNewDataSensor.bind(this);
    this.toggleNewDataTracer = this.toggleNewDataTracer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleNewDataTracer() {
    this.setState({newDataSensorLayout: !this.state.newDataSensorLayout})
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleFilterDataSensors(event) {
    api.getDataSensors(event.target.value, this.state.page, MAX)
      .then(res => {
        let sensors = res.data.message.data_sensors;
        this.setState({
          sensors: sensors,
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  handleNewDataSensor(event){
    event.preventDefault();
    this.setState({isValidName: true, isValidRule: true, isValidLabel: true, isValidType: true, isValidIsActivated: true});

    let canSubmit = true;
    if(this.state.name.length < 2){
      this.setState({isValidName: false});
      canSubmit=false;
    }

    if(this.state.type !== 'REGEX' && this.state.type !== 'SECRET'){
      this.setState({isValidType: false});
      canSubmit=false;
    }

    if(this.state.label.length < 2){
      this.setState({isValidLabel: false});
      canSubmit=false;
    }

    if(this.state.rule.length < 3){
      this.setState({isValidRule: false});
      canSubmit=false;
    }

    if(this.state.isActivated !== 'true' && this.state.isActivated !== 'false'){
      this.setState({isValidIsActivated: false});
      canSubmit=false;
    }

    if (!canSubmit){
      return;
    }

    api.createOrUpdateDataSensor(
      uuidv4(),
      this.state.name,
      this.state.type,
      this.state.rule,
      this.state.label,
      this.state.isActivated)
      .then(res => {
        this.state._notificationSystem.addNotification({message: 'Information updated', level: 'success'});
        this.toggleNewDataTracer();
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    let query = this.props.match.params.q === undefined ? '' : this.props.match.params.q;
    api.getDataSensors(query, this.state.page, MAX)
      .then(res => {
        let data_sensors = res.data.message.data_sensors;
        this.setState({
          sensors: data_sensors,
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  render() {
    const data = this.state.sensors;
    const toDisplay = (width) => ( !this.state.newDataSensorLayout ?
      <div className="animated fadeIn padding-20">
        <Row>
          <Col xs="12" sm="6" md="12">
            <Card>
              <CardBody>
                <div className="input-icon right mb-5" style={{marginLeft: '0'}}>
                  <i className="icon-magnifier"/>
                  <Input type="text" onChange={this.handleFilterDataSensors} placeholder="Filter by data sensor"/>
                </div>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "Name",
                          id: "name",
                          accessor: d => d.name,
                          width: Math.round(width * 0.15)
                        },
                        {
                          Header: "Activated",
                          id: "activated",
                          accessor: d => d.is_activated ? (<span className="settings_on">TRUE</span>) : (
                            <span className="settings_off">FALSE</span>),
                          width: Math.round(width * 0.08)

                        },
                        {
                          Header: "Created",
                          id: "created_at",
                          accessor: d => (<td>{new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }).format(new Date(d.created_at))}</td>),
                          width: Math.round(width * 0.14)
                        },
                        {
                          Header: "Updated",
                          id: "updated_at",
                          accessor: d => (<td>{new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }).format(new Date(d.updated_at))}</td>),
                          width: Math.round(width * 0.14)
                        },
                      ]
                    }
                  ]}
                  defaultPageSize={PAGE_SIZE}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div> :
      <div className="animated fadeIn padding-20">
        <NotificationSystem ref="notificationSystem"/>
        <Row>
          <Col xs="12" sm="6" md="12">
            <Card>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="1">
                      <Label>Type</Label>
                    </Col>
                    <Col md="9" className={'type-data-sensor'}>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" id="radio1" onChange={this.handleChange} type="radio" name="type" value="SECRET" invalid={!this.state.isValidType} />
                        <Label check className="form-check-label" htmlFor="radio1">Secret</Label>
                        <Input className="form-check-input" id="radio2" onChange={this.handleChange} type="radio" name="type" value="REGEX" invalid={!this.state.isValidType} />
                        <Label check htmlFor="radio2" style={{marginLeft: '25px'}}>Regex</Label>
                        <FormFeedback>Please select the type of data sensor you want to create</FormFeedback>
                        <FormText color="muted">A secret should be used if it's a sensitive piece of data. The system is then only storing a hash (sha-1).</FormText>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="name" onChange={this.handleChange} placeholder="data tracer name" invalid={!this.state.isValidName}/>
                      <FormFeedback>Name should contain at least 2 characters</FormFeedback>
                      <FormText color="muted">Input the data tracer name</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="text-input">Label</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="label" onChange={this.handleChange} placeholder="Text" invalid={!this.state.isValidLabel}/>
                      <FormFeedback>Label should contain at least 2 characters</FormFeedback>
                      <FormText color="muted">Input the data tracer labels - labels are taken into account in the search functionality of this interface</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="textarea-input">Rule</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="rule" onChange={this.handleChange} rows="9" placeholder="Rule..." invalid={!this.state.isValidRule}/>
                      <FormFeedback>Rule should contain at least 3 characters</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="select">Activate Now</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="isActivated" onChange={this.handleChange} invalid={!this.state.isValidIsActivated}>
                        <option value="0">Please select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Input>
                      <FormFeedback>Please select if you want the new rule to be activated after creation</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary" onClick={this.handleNewDataSensor}>New Data Sensor</Button>{' '}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>);

    return (
      <ReactResizeDetector handleWidth>
        <NotificationSystem ref="notificationSystem"/>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">
            <a href="#">Admin</a>
          </li>
          <li className="breadcrumb-item active">Dashboard</li>

          <li className="breadcrumb-menu d-md-down-none">
            <div className="btn-group" role="group" aria-label="Button group">
              {!this.state.newDataSensorLayout ? (<Button block outline color="primary" onClick={this.toggleNewDataTracer}>New Data Tracer&nbsp;&nbsp;<i className="fa fa-plus"/></Button>) : (<Button block outline color="danger" onClick={this.toggleNewDataTracer}>New Data Tracer&nbsp;&nbsp;<i className="fa fa-close"/></Button>)}
            </div>
          </li>
        </ol>
        {(width) => (toDisplay(width))}
      </ReactResizeDetector>
    );
  }
}

export default FollowConfiguration;
