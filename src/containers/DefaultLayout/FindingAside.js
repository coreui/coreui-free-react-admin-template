import React, {Component} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppSwitch} from '@coreui/react'
import {findingDashboardOptions} from "../../views/Dashboards/FindingDashboard/FindingDashboardOptions";
import {observer} from "mobx-react";
import './aside.scss'
import '../../../node_modules/progress-tracker/app/styles/progress-tracker.scss'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FindingAside extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',

      steps: 1,
      lockEditor: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleIsDraggableChange = this.handleIsDraggableChange.bind(this);
    this.handleFindingArChange = this.handleFindingArChange.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleIsDraggableChange(event) {
    findingDashboardOptions.updateIsDraggable(event.target.checked);
  }

  handleFindingArChange(event) {
    findingDashboardOptions.updateIsArOn(event.target.checked);
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
              <i className="icon-settings"/>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="p-3">
            <h6>Auto Refresh</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Graph</small>
                <AppSwitch checked={findingDashboardOptions.isArOn} onChange={this.handleFindingArChange} className={'float-right'} label color={'primary'} size={'sm'}/>
              </div>
            </div>

            <hr/>
            <h6>Layout</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>Drag and Drop</small>
                <AppSwitch checked={findingDashboardOptions.isDraggable} onChange={this.handleIsDraggableChange} className={'float-right'} label color={'primary'} size={'sm'}/>
              </div>
              <div>
                <small className="text-muted">Allows a user to rearrange the dashboard layout.</small>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

FindingAside.propTypes = propTypes;
FindingAside.defaultProps = defaultProps;

export default observer(FindingAside);
