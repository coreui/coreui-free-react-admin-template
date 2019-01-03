import React, {Component} from 'react';
import 'react-cytoscape';
import windowSize from 'react-window-size';
import './graph.scss'
import {graphDashboardOptions} from "./GraphDashboardOptions";
import CytoscapeComponent from "react-cytoscapejs";
import {observer} from "mobx-react";


class GraphData extends Component {
  color4="#9EB3C2";

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
    const styleCy = this.props.edges.length === 0 ? {} : {backgroundImage: 'none'};

    return (
      <div>
        <div className="header-1">
          <span>Graph</span>
        </div>
        <CytoscapeComponent
          id="cy" cy={ cy => graphDashboardOptions.cy = cy }
          elements={ CytoscapeComponent.normalizeElements({
            nodes: this.props.nodes,
            edges: this.props.edges
          })}
          stylesheet={ stylesheet } layout={ graphDashboardOptions.params }
          style={ styleCy }
        />
      </div>
    );
  }
}

export default windowSize(observer(GraphData));
