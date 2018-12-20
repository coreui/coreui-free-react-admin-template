import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'
import NumericInput from 'react-numeric-input';
import GraphDashboardProvider, { GraphDashboardContext } from '../../views/Dashboards/GraphDashboard/GraphDashboardProvider';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      arGraph: false,
      activeTab: '2'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

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
                <GraphDashboardProvider>
                  <GraphDashboardContext.Consumer>
                    {context => ( <AppSwitch checked={this.state.arGraph} onChange={this.state.arGraph ? context.stopTimer : context.startTimer('email') } className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'}/> )}
                  </GraphDashboardContext.Consumer>
                </GraphDashboardProvider>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Charts</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}/>
              </div>
              {/*<div>*/}
              {/*<small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod*/}
              {/*tempor incididunt ut labore et dolore magna aliqua.*/}
              {/*</small>*/}
              {/*</div>*/}
            </div>

            <hr />
            <h6>Graph Transformation</h6>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Transformation</b></small>
                <div className="row">
                  <div id="transformation" className="col-md-8">
                    <button className="btn btn-transformation">
                      <i class="fa fa-random"></i>
                    </button>
                    <button className="btn btn-transformation">
                      <i className="fa fa-long-arrow-down"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="clearfix mt-3">
                <small><b>Spacing</b></small>
                <div className="row">
                  <div id="spacing" className="col-md-8">
                    <NumericInput min={0} max={100} value={50}/>
                  </div>
                </div>
              </div>
              <div className="clearfix mt-3">
                <small><b>Viewport</b></small>
                <div className="grid">
                  <div className="up">
                    <GraphDashboardProvider>
                      <GraphDashboardContext.Consumer>
                        {context => (<button onClick={context.moveUp} type="submit" className="glyphicon glyphicon-menu-up btn btn-transformation"/>)}
                      </GraphDashboardContext.Consumer>
                    </GraphDashboardProvider>
                  </div>
                  {/*<div className="left">*/}
                  {/*<button onClick={this.moveLeft()} type="submit" className="glyphicon glyphicon-menu-left btn btn-transformation"/>*/}
                  {/*</div>*/}
                  {/*<div className="ok">*/}
                  {/*<button onClick={this.zoomOut()} type="submit" className="glyphicon glyphicon-minus btn btn-transformation"/>*/}
                  {/*<button onClick={this.zoomIn()} type="submit" className="glyphicon glyphicon-plus btn btn-transformation"/>*/}
                  {/*</div>*/}
                  {/*<div className="right">*/}
                  {/*<button onClick={this.moveRight()} type="submit" className="glyphicon glyphicon-menu-right btn btn-transformation"/>*/}
                  {/*</div>*/}
                  {/*<div className="down">*/}
                  {/*<button onClick={this.moveDown()} type="submit" className="glyphicon glyphicon-menu-down btn btn-transformation"/>*/}
                  {/*</div>*/}
                </div>
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

export default DefaultAside;
