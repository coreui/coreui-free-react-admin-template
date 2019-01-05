import React, {Component} from 'react';
import 'react-cytoscape';
import windowSize from 'react-window-size';
import './graph.scss'
import {graphDashboardOptions} from "./GraphDashboardOptions";
import CytoscapeComponent from "react-cytoscapejs";

class LockGraphData extends Component {
  color4="#9EB3C2";
  alertColor="#D6A157";

  constructor(props) {
    super(props);

    this.state = {
      cy: '',

      nodesInLock: []
    };

    this.highlightNodeAndPathToAndFromThisNode = this.highlightNodeAndPathToAndFromThisNode.bind(this);
  }

  highlightNodeAndPathToAndFromThisNode(node, graphVar, cssSelector, isHighlight){
    if (isHighlight) {
      node.addClass(cssSelector);
    }else{
      node.removeClass(cssSelector);
    }
    let nodeData = node.data();
    this.state.cy.elements().some(function(elm){
      if(nodeData.id !== 'undefined' &&
        nodeData.id === elm.data('target') &&
        graphVar === elm.data('variable'))
      {
        let relation = {source: elm.data('source'), target: elm.data('target'), variable: elm.data('variable')};
        if (isHighlight) {
          graphDashboardOptions.relationsInLock.push(relation);
          elm.addClass(cssSelector);
        }else{
          graphDashboardOptions.relationsInLock.splice(graphDashboardOptions.relationsInLock.indexOf(relation), 1);
          elm.removeClass(cssSelector);
        }
      }
    });
  }

  componentDidMount() {
    let highlight = this.highlightNodeAndPathToAndFromThisNode;
    let state = this.state;
    this.state.cy.nodes().forEach(function(n){
      n.on('click', function () {
        //exists
        if (state.nodesInLock.indexOf(n.data().id) === -1){
          state.nodesInLock.push(n.data().id);
          highlight(n, graphDashboardOptions.graphVar, 'highlighted', true);
        }else{
          state.nodesInLock.splice(graphDashboardOptions.relationsInLock.indexOf(n.data().id), 1);
          highlight(n, graphDashboardOptions.graphVar, 'highlighted', false);
        }
      });

      if (!n.data('has_agent')) {
        n.addClass('node-unprotected');
      }else{
        n.addClass('node-protected');
      }
    });
  }

  render() {
    const stylesheet = [
      {
        selector: '.node-protected',
        css: {
          'content': 'data(id)',
          'color': '#fff',
          'border-width': '4 px',
          'border-color': this.color4,
          'background-color': this.color4
        }
      },
      {
        selector: '.node-unprotected',
        css: {
          'content': 'data(id)',
          'color': '#fff',
          'border-width': '4 px',
          'border-color': this.color4,
          'background-color': 'rgb(68, 77, 88)'
        }
      },
      {
        selector: 'edge',
        css: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'width': 2,
          'line-color': this.alertColor,
          'target-arrow-color': this.alertColor
        }
      },
      {
        selector: '.highlighted',
        css: {
          'line-color': this.color4,
          'target-arrow-color': this.color4,
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }
      }
    ];
    const styleCy = this.props.elements.length === 0 ? {} : {backgroundImage: 'none'};

    let arrElm = [];
    this.props.elements.forEach(function (x) {
      arrElm.push({data: x.data()})
    });

    return (
      <CytoscapeComponent
        id="cy" cy={ cy => this.state.cy = cy }
        elements={ arrElm }
        stylesheet={ stylesheet } layout={ graphDashboardOptions.params }
        style={ styleCy }
      />
    );
  }
}

export default windowSize(LockGraphData);
