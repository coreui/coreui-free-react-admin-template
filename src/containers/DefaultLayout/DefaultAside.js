import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppSwitch} from '@coreui/react'
import NumericInput from 'react-numeric-input';
import {graphDashboardOptions} from "../../views/Dashboards/GraphDashboard/GraphDashboardOptions";
import {observer} from "mobx-react";
import './defaultAside.scss'
import LockGraphData from "../../views/Dashboards/GraphDashboard/LockGraphData";
import api from "../../api";
import '../../../node_modules/progress-tracker/app/styles/progress-tracker.scss'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2',

      steps: 1,
      lockEditor: false,
    };

    this.toggleLockEditor = this.toggleLockEditor.bind(this);
    this.handleLockSave = this.handleLockSave.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleLockEditor() {
    //if process is over, let's go back to step 1
    let step = this.state.steps;
    if (this.state.steps === 3 && !this.state.lockEditor){
      step = 1
    }
    this.setState({
      lockEditor: !this.state.lockEditor,
      steps: step,
    });
  }

  handleLockSave() {
    if (this.state.steps === 1) {
      if (graphDashboardOptions.relationsInLock.length > 0) {
        this.setState({
          steps: 2
        });
      }
    } else {
      if (this.state.steps === 2) {
        if (graphDashboardOptions.relationsInLock.length > 0) {
          console.log(JSON.stringify(graphDashboardOptions.relationsInLock));
          api.createOrUpdateLock(graphDashboardOptions.graphVar, JSON.stringify(graphDashboardOptions.relationsInLock))
            .then(res => {
              this.setState({
                steps: 3
              });
            })
            .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
        }
      }
    }
  }

  handleGraphArChange(event) {
    graphDashboardOptions.isGraphArOn = event.target.checked;
  }

  handleChartsArChange(event) {
    graphDashboardOptions.isChartsArOn = event.target.checked;
  }

  handleIsDraggableChange(event) {
    graphDashboardOptions.updateIsDraggable(event.target.checked);
  }

  handleSpacingChange(event) {
    let opts = {nodeSpacing: event.target.value};

    graphDashboardOptions.params.randomize = false;

    for (let i in opts) {
      graphDashboardOptions.params[i] = opts[i];
    }

    graphDashboardOptions.cy.layout(graphDashboardOptions.params).run();
  }

  handleRandomizeChange(event) {
    let opts = {randomize: true, flow: null, directed: true};

    graphDashboardOptions.params.randomize = false;

    for (let i in opts) {
      graphDashboardOptions.params[i] = opts[i];
    }

    graphDashboardOptions.cy.layout(graphDashboardOptions.params).run();
  }

  handleVerticalRandomizeChange() {
    let opts = {
      flow: {axis: 'y', minSeparation: 30}
    };

    graphDashboardOptions.params.randomize = false;

    for (var i in opts) {
      graphDashboardOptions.params[i] = opts[i];
    }

    graphDashboardOptions.cy.layout(graphDashboardOptions.params).run();
  }

  moveUp() {
    graphDashboardOptions.cy.panBy({
      x: 0,
      y: -50
    });
  }

  moveDown() {
    graphDashboardOptions.cy.panBy({
      x: 0,
      y: 50
    });
  }

  moveLeft() {
    graphDashboardOptions.cy.panBy({
      x: -50,
      y: 0
    });
  }

  moveRight() {
    graphDashboardOptions.cy.panBy({
      x: 50,
      y: 0
    });
  }

  zoomIn() {
    graphDashboardOptions.cy.zoom(graphDashboardOptions.cy.zoom() + 0.1);
    graphDashboardOptions.cy.center()
  }

  zoomOut() {
    graphDashboardOptions.cy.zoom(graphDashboardOptions.cy.zoom() - 0.1);
    graphDashboardOptions.cy.center()
  }

  render() {
    let modalStep = "";
    if (this.state.steps === 1) {
      modalStep = (
        <LockGraphData
          elements={graphDashboardOptions.cy.elements()}
        />
      )
    } else {
      if (this.state.steps === 2) {
        modalStep = (
          <div className="card-body">
            <medium>
              The notification center is offering you the possibility of being notified whenever the data goes beyond the lock path. A report will be sent to you at the specified email. Close this window if you do not want to get notified by email. <br/><br/>
            </medium>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="reportemail">Email</label>
                  <input className="form-control" id="reportemail" type="text" placeholder="Enter your email"/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="reporttype">Report Type</label>
                <select className="form-control" id="reporttype">
                  <option value="">Select</option>
                  <option value="1">GDPR</option>
                  <option value="2">PCI-DSS</option>
                  <option value="3">Generic</option>
                </select>
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="reportfrequency">Frequency</label>
                <select className="form-control" id="reportfrequency">
                  <option value="">Select</option>
                  <option value="1">Daily</option>
                  <option value="2">Weekly</option>
                  <option value="3">Monthly</option>
                </select>
              </div>
            </div>
          </div>)
      } else {
        modalStep = (
          <div>
            <svg id="checkmarkreport" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle className="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1"
                      cy="65.1" r="62.1"/>
              <polyline className="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round"
                        stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
            </svg>
            <p className="success">Your settings have been saved. <br /> You can now close this popup.</p>
          </div>);
      }
    }

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-speech"/>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-settings"/>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="p-3">
            <table id="legend_settings" className="zoom-right-position">
              <tr>
                <td>
                  <h5>Legend</h5>
                  <div className="note-border-right note-info">
                    <p>
                      <img src={'../../assets/img/aside/node-with-agent.png'} className="legend-img" />
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </TabPane>
          <TabPane tabId="2" className="p-3">
            <h6>Auto Refresh</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Graph</small>
                <AppSwitch checked={graphDashboardOptions.isGraphArOn} onChange={this.handleGraphArChange} className={'float-right'} label color={'primary'} size={'sm'}/>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Charts</small>
                <AppSwitch checked={graphDashboardOptions.isChartsArOn} onChange={this.handleChartsArChange} className={'float-right'} label color={'primary'} size={'sm'}/>
              </div>
            </div>

            <hr />
            <h6>Graph Transformation</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Shuffle</small>
                <button onClick={this.handleVerticalRandomizeChange} className="btn btn-transformation float-right">
                  <i className="fa fa-long-arrow-down"/>
                </button>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Vertical</small>
                <button onClick={this.handleRandomizeChange} className="btn btn-transformation float-right">
                  <i className="fa fa-random"/>
                </button>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Spacing</small>
                <Input addon type="range" onChange={this.handleSpacingChange} min={0} max={400} step={16} style={{width: '100%'}} className="btn btn-transformation float-right" />
              </div>
            </div>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small>Viewport</small>
                <div className="grid float-right">
                  <div className="up">
                    <button onClick={this.moveUp} type="submit" className="fa fa-chevron-up btn btn-transformation"/>
                  </div>
                  <div className="left">
                    <button onClick={this.moveLeft} type="submit" className="fa fa-chevron-left btn btn-transformation"/>
                  </div>
                  <div className="ok">
                    <button onClick={this.zoomOut} type="submit" className="fa fa-minus btn btn-transformation"/>
                    <button onClick={this.zoomIn} type="submit" className="fa fa-plus btn btn-transformation"/>
                  </div>
                  <div className="right">
                    <button onClick={this.moveRight} type="submit" className="fa fa-chevron-right btn btn-transformation"/>
                  </div>
                  <div className="down">
                    <button onClick={this.moveDown} type="submit" className="fa fa-chevron-down btn btn-transformation"/>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <h6>Layout</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Drag and Drop</small>
                <AppSwitch checked={graphDashboardOptions.isDraggable} onChange={this.handleIsDraggableChange} className={'float-right'} label color={'primary'} size={'sm'}/>
              </div>
              <div>
                <small className="text-muted">Allows a user to rearrange the dashboard layout.</small>
              </div>
            </div>

            <hr />
            <h6>Lock</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Editor</small>
                <Button onClick={this.toggleLockEditor} className={'btn btn-transformation float-right'}><i className={'fa fa-lock'}></i></Button>
                <Modal isOpen={this.state.lockEditor} toggle={this.toggleLockEditor}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLockEditor}>Lock Editor</ModalHeader>
                  <ul className="progressbar">
                    <li className={this.state.steps === 1 ? 'active' : ''}>Lock the path</li>
                    <li className={this.state.steps === 2 ? 'active' : ''}>Notification center</li>
                    <li className={this.state.steps === 3 ? 'active' : ''}>Confirmation</li>
                  </ul>
                  <ModalBody>
                    {modalStep}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleLockEditor}>{this.state.steps === 3 ? 'Close' : 'Cancel'}</Button>{' '}
                    <Button color="primary" onClick={() => {let steps = this.state.steps; if (steps > 1) { this.setState({steps: steps-1}) }}} disabled={this.state.steps === 1}>Previous</Button>{' '}
                    <Button color="primary" onClick={this.handleLockSave} disabled={this.state.steps === 3}>Next</Button>
                  </ModalFooter>
                </Modal>
              </div>
              <div>
                <small className="text-muted">Allows a user to lock a graph and receive alerts through the notification center.</small>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default observer(DefaultAside);
