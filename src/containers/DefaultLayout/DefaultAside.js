import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import './defaultAside.scss'
import '../../../node_modules/progress-tracker/app/styles/progress-tracker.scss'
import GraphAside from "./GraphAside";

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
    const ren = () => {
      if (this.props.pathname === 'graph'){
        return (<GraphAside />)
      }else{
        return (<div>ok</div>)
      }
    };

    return(ren);
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default observer(DefaultAside);
