import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import 'react-cytoscape';
import { Chart } from "react-google-charts";
import windowSize from 'react-window-size';
import { Table, Row } from 'reactstrap';
import './graph.scss'
import { graphDashboardOptions } from './GraphDashboardOptions';
import api from "../../../api";
import {observer} from "mobx-react";
import google from "react-google-charts";

const LAST_DATA_PROCESS_TIME = 60;

class GraphDashboard extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";
  alertColor="#D6A157";

  constructor(props) {
    super(props);

    this.state = {
      last_findings: {},
      last_edges: {},
      nodes: [],
      edges: [],

      time: 0,
      start: 0,
    };

    this.startGraphArTimer = this.startGraphArTimer.bind(this);
  }

  // AR
  startGraphArTimer() {
    console.log("startGraphArTimer");
    let graphId = 'email';
    let timer = setInterval(() => {
      if (graphDashboardOptions.isGraphArOn) {
        console.log("isGraphArOn");

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

            // var lock = JSON.parse($("#lock_data_controller").html());
            // var elements_lock = [];
            // var elements = cy.elements();
            // var i = 0;
            // var displayLock = function(){
            //   if( i < elements.length ){
            //     elements_lock.some(function(elm){
            //       if(elements[i].data("source") !== 'undefined' &&
            //         elements[i].data("source") === elm.source &&
            //         elements[i].data("target") === elm.target &&
            //         elements[i].data("variable") === elm.variable) {
            //         elements[i].addClass('highlighted');
            //         return true
            //       }else{
            //         if(elements[i].data("source") === 'undefined') {
            //           return true
            //         }
            //       }
            //     });
            //
            //     i++;
            //     setTimeout(displayLock, 500);
            //   }
            // };
            //
            // if (lock.length > 0 ){
            //   // map
            //   elements_lock = JSON.parse(lock[0].relations);
            //   // array
            //   displayLock();
            // }
            //
            //
            // cy.edges().forEach(function(n){
            //   var variable = n.data('variable');
            //   var value = n.data('value');
            //
            //   n.qtip({
            //     content: function(){ return  variable + '=' + value },
            //     position: {
            //       my: 'top center',
            //       at: 'bottom center'
            //     },
            //     style: {
            //       classes: 'qtip-bootstrap',
            //       tip: {
            //         width: 16,
            //         height: 8
            //       }
            //     }
            //   });
            // });
            //
            // cy.nodes().forEach(function(n){
            //   var id = n.data('id');
            //
            //   if (!n.data('has_agent')) {
            //     n.addClass('node-unprotected');
            //   }else{
            //     n.addClass('node-protected');
            //   }
            //
            //   n.qtip({
            //     content: function(){ return  id },
            //     position: {
            //       my: 'top center',
            //       at: 'bottom center'
            //     },
            //     style: {
            //       classes: 'qtip-bootstrap',
            //       tip: {
            //         width: 16,
            //         height: 8
            //       }
            //     }
            //   });
            // });

            if (newElementFound) {
              console.log(newElementFound);
              // layout.stop();
              // layout = makeLayout();
              // layout.run();
              cy.layout(graphDashboardOptions.params).run()
            }

            //UPDATE METRICS
            // $("#nodes-display-value").html(nodes.length);
            // $("#edges-display-value").html(edges.length);


            // update dashboard state
            this.setState({
              time: timer,
              start: Date.now() - this.state.time,
              isOn: true,
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
        // this.setState({time: Date.now() - this.state.start})
      }
    }, 5000);
  }

  stopTimer() {
    console.log("stopTimer");
    this.setState({isOn: false});
    clearInterval(this.state.timer)
  }

  resetTimer() {
    this.setState({time: 0})
  }

  startChartsArTimer() {
    console.log("startChartsArTimer");
    let graphId = 'email';
    let timer = setInterval(() => {
      if (graphDashboardOptions.isChartsArOn) {
        console.log("isChartsArOn");

        api.getEdgesWithinLastMinutes(graphId, LAST_DATA_PROCESS_TIME)
          .then(res => {
            console.log(res.data.message.edges);
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
            console.log(res.data.message.findings);
            this.setState({
              findings_count: this.getFindingsNumbersChartOptions(res.data.message.findings)
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
    }, 5000);
  }

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

  // drawGraphDataProcessChart(data_options) {
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('number', 'X');
  //   data.addColumn('number', 'Data Hops');
  //
  //   data.addRows(data_options);
  //
  //   var options = {
  //     backgroundColor: '#2F3139',
  //     legendTextStyle: { color: '#FFF' },
  //     legend: { position: 'in'},
  //     titleTextStyle: { color: '#FFF' },
  //     hAxis: {
  //       title: 'Last hour',
  //       textStyle:{color: '#FFF'},
  //       titleTextStyle: {
  //         color: '#FFF',
  //         fontSize: 12
  //       },
  //       gridlines: {
  //         color: 'transparent'
  //       }
  //     },
  //     vAxis: {
  //       title: 'Data processed',
  //       textStyle:{color: '#FFF'},
  //       titleTextStyle: {
  //         color: '#FFF',
  //         fontSize: 12
  //       },
  //       gridlines: {
  //         color: 'transparent'
  //       }
  //     },
  //     width: $(window).width()*0.40,
  //     height: $(window).height()*0.21,
  //     chartArea: {'width': '95%', 'height': '80%'},
  //     titlePosition: 'in',
  //     axisTitlesPosition: 'in',
  //     colors: [color2, color3, color4],
  //     lineWidth: 3,
  //     axisFontSize : 0
  //   };
  //
  //   var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  //   chart.draw(data, options);
  // }

  async componentDidMount() {
    this.startChartsArTimer();
    // this.startGraphArTimer();
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

    const options = {
      backgroundColor: '#2F3139',
      legendTextStyle: { color: '#FFF' },
      legend: { position: 'in'},
      titleTextStyle: { color: '#FFF' },
      hAxis: {
        title: 'Last hour',
        textStyle:{color: '#FFF'},
        titleTextStyle: {
          color: '#FFF',
          fontSize: 12
        },
        gridlines: {
          color: 'transparent'
        }
      },
      vAxis: {
        title: 'Data processed',
        textStyle:{color: '#FFF'},
        titleTextStyle: {
          color: '#FFF',
          fontSize: 12
        },
        gridlines: {
          color: 'transparent'
        }
      },
      width: this.props.windowWidth*0.345,
      height: this.props.windowHeight*0.21,
      chartArea: {'width': '90%', 'height': '80%'},
      titlePosition: 'in',
      axisTitlesPosition: 'in',
      colors: [this.color2, this.color3, this.color4],
      lineWidth: 3,
      axisFontSize : 0
    };

    const data = [
      ["Age", "Weight"],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7]
    ];


    const options2 = {
      title: '',
      width: this.props.windowWidth*0.345,
      height: this.props.windowHeight*0.28,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
      chartArea: {'width': '90%', 'height': '90%'},
      backgroundColor: '#2F3139',
      colors: [this.color0, this.color1, this.color2, this.color3, this.color4],
      hAxis: {
        textStyle:{color: '#FFF'},
        gridlines: {
          color: 'transparent'
        }
      },
      vAxis: {
        textStyle:{color: '#FFF'},
        gridlines: {
          color: 'transparent'
        }
      }
    };

    const options3 = {
      title: '',
      pieHole: 0.4,
      backgroundColor: '#2F3139',
      pieSliceBorderColor: '#2F3139',
      colors: [this.color0, this.color1, this.color2, this.color3, this.color4],
      legend: {
        position: 'labeled',
        textStyle: {
          color: 'white',
          fontSize: 14
        }
      },
      width: this.props.windowWidth*0.345,
      height: this.props.windowHeight*0.30,
      chartArea: {'width': '95%', 'height': '85%'}
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <div  class="header-1">
            Graph
          </div>
          <CytoscapeComponent
            id="cy" cy={ cy => graphDashboardOptions.cy = cy }
            elements={ CytoscapeComponent.normalizeElements({
              nodes: this.state.nodes,
              edges: this.state.edges
            })}
            stylesheet={ stylesheet } layout={ graphDashboardOptions.params }
          />
          <div id="cy2">
            <div class="header-1">
              <span>Last Findings</span>
            </div>
            <Table id="last_findings_table">
              <thead>
              <tr>
                <th class="prop-1">Type</th>
                <th class="prop-2">Hostname</th>
                <th class="prop-3">Date</th>
                <th class="prop-4">Resolved</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>
              <tr>
                <td>asdad</td>
                <td>asdad</td>
                <td>asdsad</td>
                <td>true</td>
              </tr>

              </tbody>
            </Table>
          </div>
          <div id="cy3">
            <div class="header-1">
              <span>Graph Metrics</span>
            </div>
            <Chart
              chartType="AreaChart"
              data={this.state.last_edges}
              options={options}
              legendToggle
            />
          </div>
          <div id="cy4">
            <div class="header-1">
              <span>Findings Numbers</span>
            </div>
            <Chart
              chartType="ColumnChart"
              data={this.state.findings_count}
              options={options2}
              legendToggle
            />
          </div>
          <div id="cy5">
            <div class="header-1">
              <span>Findings Percentage</span>
            </div>
            <Chart
              chartType="PieChart"
              data={[["Age", "Weight"], ["a", 12], ["b", 5.5]]}
              options={options3}
              legendToggle
            />
          </div>
        </Row>
      </div>
    );
  }
}

export default windowSize(observer(GraphDashboard));
