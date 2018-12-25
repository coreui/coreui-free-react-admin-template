import React, {Component} from 'react';
import 'react-cytoscape';
import windowSize from 'react-window-size';
import './graph.scss'
import {graphDashboardOptions} from './GraphDashboardOptions';
import api from "../../../api";
import {observer} from "mobx-react";
import GraphDataProcessed from "./GraphDataProcessed";
import GraphFindingNumbers from "./GraphFindingNumbers";
import GraphFindingPercentage from "./GraphFindingPercentage";
import GraphData from "./GraphData";
import GraphLastFindings from "./GraphLastFindings";
// import cytoscape from 'cytoscape';
// import popper from 'cytoscape-popper';
// import tippy from 'tippy.js';
// cytoscape.use( popper );
import RGL, {WidthProvider} from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const LAST_DATA_PROCESS_TIME = 60;
const LAST_FINDINGS_TO_DISPLAY = 9;
const STYLE_REMOVE_LOADER = {backgroundImage: 'none'};

class GraphDashboard extends Component {
  alertColor="#D6A157";

  constructor(props) {
    super(props);

    this.state = {
      last_findings: [],
      findings_count: {},
      findings_percentage: {},
      last_edges: {},
      nodes: [],
      edges: [],
      lock: [],
    };

    this.startGraphArTimer = this.startGraphArTimer.bind(this);
    this.stopGraphArTimer = this.stopGraphArTimer.bind(this);
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  // AR
  startGraphArTimer(graphId, lock) {
    graphDashboardOptions.graphArTimer = setInterval(() => {
      if (graphDashboardOptions.isGraphArOn) {
        api.getNodesByGraph(graphId)
          .then(res => {
            let cy = graphDashboardOptions.cy;
            let nodes = res.data.message.nodes;
            let sEdges = res.data.message.edges;
            // format
            var newElementFound = false;
            cy.batch(function () {
              nodes.some(function (elm) {
                var found = false;
                cy.nodes().forEach(function (n) {
                  if (n.data('id') === elm.data.id) {
                    found = true;
                    return;
                  }
                });
                if (!found) {
                  cy.add([{group: "nodes", data: elm.data}]);
                  newElementFound = true;
                }
              });
              sEdges.some(function (elm) {
                var found = false;
                cy.edges().forEach(function (n) {
                  if (n.data('source') === elm.data.source &&
                    n.data('target') === elm.data.target &&
                    n.data('value') === elm.data.value &&
                    n.data('variable') === elm.data.variable
                  ) {
                    found = true;
                    return;
                  }
                });
                if (!found) {
                  cy.add([{
                    group: "edges",
                    data: elm.data
                  }
                  ]);
                  newElementFound = true;
                }
              });
            });

            var elements_lock = [];
            var elements = cy.elements();
            var i = 0;
            var displayLock = function(){
              if( i < elements.length ){
                elements_lock.some(function(elm){
                  if(elements[i].data("source") !== 'undefined' &&
                    elements[i].data("source") === elm.source &&
                    elements[i].data("target") === elm.target &&
                    elements[i].data("variable") === elm.variable) {
                    elements[i].addClass('highlighted');
                    return true
                  }else{
                    if(elements[i].data("source") === 'undefined') {
                      return true
                    }
                  }
                });

                i++;
                setTimeout(displayLock, 500);
              }
            };

            if (lock.length > 0 ){
              // map
              elements_lock = JSON.parse(lock[0].relations);
              // array
              displayLock();
            }

            // var makeTippy = function(node, text){
            //   return tippy( node.popperRef(), {
            //     html: (function(){
            //       var div = document.createElement('div');
            //       div.innerHTML = text;
            //       return div;
            //     })(),
            //     trigger: 'manual',
            //     arrow: true,
            //     placement: 'bottom',
            //     hideOnClick: false,
            //     multiple: true,
            //     sticky: true
            //   } ).tooltips[0];
            // };

            cy.nodes().forEach(function(n){
              if (!n.data('has_agent')) {
                n.addClass('node-unprotected');
              }else{
                n.addClass('node-protected');
              }
            });

            cy.edges().forEach(function(n) {
              // makeTippy(n, 'testsdsds').show();
            });

            if (newElementFound) {
              cy.layout(graphDashboardOptions.params).stop();
              cy.layout(graphDashboardOptions.params).run()
            }

            // update dashboard state
            this.setState({
              nodes: nodes,
              edges: sEdges
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
          });
      }
    }, graphDashboardOptions.graphArTime);
  }

  stopGraphArTimer() {
    graphDashboardOptions.stopGraphArTimer()
  }

  startChartsArTimer(graphId) {
    graphDashboardOptions.chartsArTimer = setInterval(() => {
      if (graphDashboardOptions.isChartsArOn) {
        api.getEdgesWithinLastMinutes(graphId, LAST_DATA_PROCESS_TIME)
          .then(res => {
            this.setState({
              last_edges: this.getGraphDataProcessChartOptions(res.data.message.edges)
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

        api.getFindingCount(graphId)
          .then(res => {
            this.setState({
              findings_count: this.getFindingsNumbersChartOptions(res.data.message.findings),
              findings_percentage: this.getFindingsPercentageChartOptions(res.data.message.findings)
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
          });

        api.getFindings(LAST_FINDINGS_TO_DISPLAY)
          .then(res => {
            console.log(res.data.message.findings);
            this.setState({
              last_findings: res.data.message.findings
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
          });
      }
    }, graphDashboardOptions.chartsArTime);
  }

  stopChartsArTimer() {
    graphDashboardOptions.stopChartsArTimer()
  }


  // format methods
  getGraphDataProcessChartOptions(edges){
    let data_options = [];
    data_options[0] = ['X', 'Data Hops'];

    for (let i = 1; i <= LAST_DATA_PROCESS_TIME; i++) {
      data_options[i] = [i, 0];
    }

    edges.some(function(elm) {
      data_options[elm.data.minDiff][1]++;
      data_options[elm.data.minDiff] = [elm.data.minDiff, data_options[elm.data.minDiff][1]];
    });

    return data_options;
  }

  getFindingsNumbersChartOptions(findings_count){
    let data_options = [];
    if (findings_count.length === 0){
      return data_options
    }
    data_options[0] = ["Element", "Finding", { role: "style" } ];

    let i = 1;
    findings_count.some(function(elm){
      data_options[i] = [elm.key, elm.count, ['color' + (i-1)%4]];
      i++;
    });

    return data_options;
  }

  getFindingsPercentageChartOptions(findings_count){
    let data_options = [];
    if (findings_count.length === 0){
      return data_options
    }
    data_options[0] = ['Task', 'Findings percentage'];
    let i = 1;

    findings_count.some(function(elm){
      data_options[i] = [elm.key, elm.count/100];
      i++;
    });

    return data_options;
  }

  // lifecycle methods
  async componentDidMount() {
    this.setState({ mounted: true });

    const graphId = this.props.match.params.graph_id;

    this.startChartsArTimer(graphId);

    api.getLock(graphId)
      .then(res => {
        let lock = res.data.message.lock;
        this.setState({
          lock: lock
        });
        this.startGraphArTimer(graphId, lock);
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

  componentWillUnmount() {
    this.stopGraphArTimer();
    this.stopChartsArTimer();
  }

  render() {
    const styleCy2 = this.state.last_findings.length === 0 ? {} : STYLE_REMOVE_LOADER;

    return (
      <div className="animated fadeIn">
        <ReactGridLayout
          isDraggable={graphDashboardOptions.isDraggable}
          autoSize={true}
          isResizable={true}
          rowHeight={this.props.windowHeight/3.7}
          cols={3}
          >
            <div key="1" data-grid={{ w: 2, h: 2, x: 0, y: 0 }}>
              <GraphData
                nodes={this.state.nodes}
                edges={this.state.edges}
              />
            </div>
            <div key="2" id="cy2" style={ styleCy2 } data-grid={{ w: 1, h: 1, x: 0, y: 2 }}>
              <GraphLastFindings
                last_findings={this.state.last_findings}
              />
            </div>
            <div key="3" id="cy3" data-grid={{ w: 1, h: 1, x: 3, y: 0 }}>
              <GraphDataProcessed
                last_edges={this.state.last_edges}
              />
            </div>
            <div key="4" id="cy4" data-grid={{ w: 1, h: 1, x: 3, y: 1 }}>
              <GraphFindingNumbers
                findings_count={this.state.findings_count}
              />
            </div>
            <div key="5" id="cy5" data-grid={{ w: 1, h: 1, x: 3, y: 2 }}>
              <GraphFindingPercentage
                findings_percentage={this.state.findings_percentage}
              />
            </div>
          </ReactGridLayout>

      </div>
    );
  }
}
export default windowSize(observer(GraphDashboard));

