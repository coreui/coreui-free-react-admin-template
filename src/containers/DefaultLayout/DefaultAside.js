import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppSwitch} from '@coreui/react'
import NumericInput from 'react-numeric-input';
import {graphDashboardOptions} from "../../views/Dashboards/GraphDashboard/GraphDashboardOptions";
import {observer} from "mobx-react";
import './defaultAside.scss'
import GraphData from "../../views/Dashboards/GraphDashboard/GraphData";
import LockGraphData from "../../views/Dashboards/GraphDashboard/LockGraphData";
import api from "../../api";

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
    this.setState({
      lockEditor: !this.state.lockEditor,
    });
  }

  handleLockSave() {
    if (graphDashboardOptions.relationsInLock.length > 0) {
      console.log(JSON.stringify(graphDashboardOptions.relationsInLock));
      api.createOrUpdateLock(graphDashboardOptions.graphVar, JSON.stringify(graphDashboardOptions.relationsInLock))
        .then(res => {
          this.setState({
            lockEditor: !this.state.lockEditor,
          });
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        })
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

  handleSpacingChange(value) {
    let opts = {nodeSpacing: value};

    graphDashboardOptions.params.randomize = false;

    for( var i in opts ){
      graphDashboardOptions.params[i] = opts[i];
    }

    graphDashboardOptions.cy.layout(graphDashboardOptions.params).run();
  }

  handleRandomizeChange(event) {
    let opts = {randomize: true, flow: null, directed: true};

    graphDashboardOptions.params.randomize = false;

    for( var i in opts ){
      graphDashboardOptions.params[i] = opts[i];
    }

    graphDashboardOptions.cy.layout(graphDashboardOptions.params).run();
  }

  handleVerticalRandomizeChange() {
    let opts = {
      flow: { axis: 'y', minSeparation: 30 }
    };

    graphDashboardOptions.params.randomize = false;

    for( var i in opts ){
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

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const graphElements = graphDashboardOptions.getCy() === {} ? [] : graphDashboardOptions.cy.elements();

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-speech"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-settings"></i>
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
                <small><b>Graph</b></small>
                <AppSwitch checked={graphDashboardOptions.isGraphArOn} onChange={this.handleGraphArChange} className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}/>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Charts</b></small>
                <AppSwitch checked={graphDashboardOptions.isChartsArOn} onChange={this.handleChartsArChange} className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}/>
              </div>
            </div>

            <hr />
            <h6>Graph Transformation</h6>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Transformation</b></small>
                <div className="row">
                  <div id="transformation" className="col-md-8">
                    <button onClick={this.handleRandomizeChange} className="btn btn-transformation">
                      <i class="fa fa-random"></i>
                    </button>
                    <button onClick={this.handleVerticalRandomizeChange} className="btn btn-transformation">
                      <i className="fa fa-long-arrow-down"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="clearfix mt-3">
                <small><b>Spacing</b></small>
                <div className="row">
                  <div id="spacing" className="col-md-8">
                    <NumericInput onChange={this.handleSpacingChange} min={0} max={400} value={graphDashboardOptions.params.nodeSpacing} step={16} />
                  </div>
                </div>
              </div>
              <div className="clearfix mt-3">
                <small><b>Viewport</b></small>
                <div className="grid">
                  <div className="up">
                    <button onClick={this.moveUp} type="submit" className="glyphicon glyphicon-menu-up btn btn-transformation"/>
                  </div>
                  <div className="left">
                    <button onClick={this.moveLeft} type="submit" className="glyphicon glyphicon-menu-left btn btn-transformation"/>
                  </div>
                  <div className="ok">
                    <button onClick={this.zoomOut} type="submit" className="glyphicon glyphicon-minus btn btn-transformation"/>
                    <button onClick={this.zoomIn} type="submit" className="glyphicon glyphicon-plus btn btn-transformation"/>
                  </div>
                  <div className="right">
                    <button onClick={this.moveRight} type="submit" className="glyphicon glyphicon-menu-right btn btn-transformation"/>
                  </div>
                  <div className="down">
                    <button onClick={this.moveDown} type="submit" className="glyphicon glyphicon-menu-down btn btn-transformation"/>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <h6>Layout</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Drag and Drop</b></small>
                <AppSwitch checked={graphDashboardOptions.isDraggable} onChange={this.handleIsDraggableChange} className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}/>
              </div>
              <div>
                <small className="text-muted">Allows a user to rearrange the dashboard layout.</small>
              </div>
            </div>

            <hr />
            <h6>Lock</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <Button onClick={this.toggleLockEditor} className={'btn btn-transformation'}>Open graph lock editor</Button>
                <Modal isOpen={this.state.lockEditor} toggle={this.toggleLockEditor}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLockEditor}>Lock Editor</ModalHeader>
                  <ModalBody>
                    <LockGraphData
                      elements={graphElements}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleLockSave}>Save Lock</Button>{' '}
                    <Button color="secondary" onClick={this.toggleLockEditor}>Cancel</Button>
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
