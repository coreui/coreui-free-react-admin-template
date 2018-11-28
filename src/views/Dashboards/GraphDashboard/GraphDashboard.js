import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import 'react-cytoscape';
import { Chart } from "react-google-charts";
import windowSize from 'react-window-size';
import { Table, Row } from 'reactstrap';
import './graph.scss'
import api from '../../../api'

const layout = {
  name: 'cola',
  directed: true,
  padding: 30,
  maxSimulationTime: 100,
  edgeLengthVal: 1,
  nodeSpacing: 150
};

class GraphDashboard extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";
  alertColor="#D6A157";


  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: true,

      last_findings: {},
      nodes: [],
      edges: [],
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    const { graph_id } = this.props.match.params
    this.timer = setInterval(() => {
      api.getNodesByGraph(graph_id)
        .then(res => {
          console.log(res.data)
          this.setState({nodes: res.data.message.nodes, edges: res.data.message.edges})
          console.log(this.cy)
          this.cy.layout(layout).run()
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
    }, 10000);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0})
  }

  async componentDidMount() {
    this.startTimer()
    api.findingSearch()
      .then(res => {
        this.setState({last_findings: res.data.findings})
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  render() {
    let elements = CytoscapeComponent.normalizeElements({
      nodes: this.state.nodes,
      edges: this.state.edges
    });
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

    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.isOn) ?
      <button onClick={this.stopTimer}>stop</button> :
      null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.resetTimer}>reset</button> :
      null
    let resume = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.startTimer}>resume</button> :
      null

    return (
      <div className="animated fadeIn">
        <Row>
          <div  class="header-1">
            Graph
          </div>
          <CytoscapeComponent id="cy" cy={cy => this.cy = cy} elements={ elements } stylesheet={ stylesheet } layout={ layout }/>
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
              data={data}
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
              data={data}
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

export default windowSize(GraphDashboard);
