import React, {Component} from 'react';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap';
import api from "../../../api";
import NotificationSystem from "react-notification-system";
import './followconfiguration.scss';
import ReactResizeDetector from 'react-resize-detector';
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const SelectTable = checkboxHOC(ReactTable);
const uuidv4 = require('uuid/v4');
const PAGE_SIZE = 10;
const MAX = 30;

class FollowConfiguration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      // table and its data
      dropdownActions: new Array(19).fill(false),
      sensors: [],
      page: 1,
      selection: [],
      selectAll: [],

      newDataSensorLayout: false,

      //new data sensor form
      id: '',
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
    this.handleNewOrUpdateDataSensor = this.handleNewOrUpdateDataSensor.bind(this);
    this.handleEditDataSensor = this.handleEditDataSensor.bind(this);
    this.handleDeleteDataSensor = this.handleDeleteDataSensor.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.isSelected = this.isSelected.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleNewDataSensor = this.toggleNewDataSensor.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.toggleDropdownActions = this.toggleDropdownActions.bind(this);
  }

  toggleDropdownActions(i) {
    const newArray = this.state.dropdownActions.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownActions: newArray,
    });
  }

  toggleNewDataSensor() {
    this.setState({newDataSensorLayout: !this.state.newDataSensorLayout})
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleDeleteDataSensor(event) {
    let dataSensorIds = this.state.selection;

    if (dataSensorIds.length === 0){
      this.state._notificationSystem.addNotification({level: 'error', message: 'You need to select at least one data sensor to perform this action'});
      return;
    }

    dataSensorIds.forEach(sensorId => {
      api.deleteDataSensor(sensorId)
    });

    this.state._notificationSystem.addNotification({message: 'Information updated. Please note that this action can take up to several seconds before being taken into account', level: 'success'});
  }

  handleEditDataSensor(event) {
    let dataSensors = this.state.selection;

    if (dataSensors.length === 0){
      this.state._notificationSystem.addNotification({level: 'error', message: 'You need to select one data sensor to perform this action'});
      return;
    }

    if (dataSensors.length > 1) {
      this.state._notificationSystem.addNotification({level: 'error', message: 'Only one data sensor can be edited at a time'});
    }else{
      let dataSensor = this.state.sensors.filter(x => x._id === dataSensors[0])[0];

      this.state.id = dataSensor._id;
      this.state.name = dataSensor.name;
      this.state.type = dataSensor.type_app;
      this.state.label = dataSensor.label;
      this.state.rule = dataSensor.value;
      this.state.isActivated = dataSensor.is_activated;

      this.toggleNewDataSensor();
    }
  }

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

  handleNewOrUpdateDataSensor(event){
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
      //if edit or save
      this.state.id === '' ? uuidv4() : this.state.id,
      this.state.name,
      this.state.type,
      this.state.rule,
      this.state.label,
      this.state.isActivated)
      .then(res => {
        this.state._notificationSystem.addNotification({message: 'Information updated', level: 'success'});
        this.toggleNewDataSensor();
        this.setState({
          id: '',
          name: '',
          type: '',
          rule: '',
          label: '',
          isActivated: false,
        })
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?

      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).

      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).

      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'.
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

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
    const selectAll = this.state.selectAll;

    const { toggleSelection, toggleAll, isSelected } = this;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    };

    const toDisplay = (width) => ( !this.state.newDataSensorLayout ?
      <div className="animated fadeIn padding-20">
        <Row>
          <Col xs="12" sm="6" md="12">
            <Card>
              <CardBody>
                <div className="input-icon right mb-3" style={{marginLeft: '0'}}>
                  <i className="icon-magnifier"/>
                  <Input type="text" onChange={this.handleFilterDataSensors} placeholder="Filter by data sensor"/>
                </div>
                <div className={'mb-3'}>
                  <ButtonDropdown className="mr-1" isOpen={this.state.dropdownActions[4]} toggle={() => { this.toggleDropdownActions(4); }}>
                    <DropdownToggle caret color="info">
                      <i className="fa fa-cogs" />&nbsp;&nbsp;&nbsp;Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.toggleNewDataSensor}>New Data Sensor</DropdownItem>
                      <DropdownItem onClick={this.handleEditDataSensor}>Edit Data Sensor</DropdownItem>
                      <DropdownItem onClick={this.handleDeleteDataSensor}>Delete Data Sensor</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
                <SelectTable
                  ref={(r) => this.checkboxTable = r}
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
                          Header: "Type",
                          id: "type",
                          accessor: d => d.type_app,
                          width: Math.round(width * 0.08)

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
                          accessor: d => (new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }).format(new Date(d.created_at))),
                          width: Math.round(width * 0.14)
                        },
                        {
                          Header: "Updated",
                          id: "updated_at",
                          accessor: d => (new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }).format(new Date(d.updated_at))),
                          width: Math.round(width * 0.14)
                        },
                      ]
                    }
                  ]}
                  defaultPageSize={PAGE_SIZE}
                  className="-striped -highlight"
                  {...checkboxProps}
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
                        <Input className="form-check-input" id="radio1" onChange={this.handleChange} type="radio" name="type" value="SECRET" invalid={!this.state.isValidType} checked={this.state.type === 'SECRET'}/>
                        <Label check className="form-check-label" htmlFor="radio1">Secret</Label>
                        <Input className="form-check-input" id="radio2" onChange={this.handleChange} type="radio" name="type" value="REGEX" invalid={!this.state.isValidType} checked={this.state.type === 'REGEX'}/>
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
                      <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Data sensor name" invalid={!this.state.isValidName}/>
                      <FormFeedback>Name should contain at least 2 characters</FormFeedback>
                      <FormText color="muted">Input the data sensor name</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="text-input">Label</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="label" onChange={this.handleChange} value={this.state.label} placeholder="Text" invalid={!this.state.isValidLabel}/>
                      <FormFeedback>Label should contain at least 2 characters</FormFeedback>
                      <FormText color="muted">Input the data sensor labels - labels are taken into account in the search functionality of this interface</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="textarea-input">Rule</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="rule" onChange={this.handleChange} value={this.state.rule} rows="9" placeholder="Rule..." invalid={!this.state.isValidRule}/>
                      <FormFeedback>Rule should contain at least 3 characters</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="select">Activate Now</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="isActivated" value={this.state.isActivated} onChange={this.handleChange} invalid={!this.state.isValidIsActivated}>
                        <option value="0">Please select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Input>
                      <FormFeedback>Please select if you want the new rule to be activated after creation</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="danger" onClick={this.toggleNewDataSensor}>Cancel</Button>{' '}
                    <Button type="submit" color="primary" onClick={this.handleNewOrUpdateDataSensor}>Save Data Sensor</Button>
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
          <li className="breadcrumb-item">Configuration</li>
          <li className="breadcrumb-item active">Follow</li>
        </ol>
        {(width) => (toDisplay(width))}
      </ReactResizeDetector>
    );
  }
}

export default FollowConfiguration;
