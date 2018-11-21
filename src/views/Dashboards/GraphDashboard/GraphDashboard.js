import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { ReactCytoscape } from 'react-cytoscape';
import { Chart } from "react-google-charts";
import windowSize from 'react-window-size';
import { Table, Row } from 'reactstrap';
import './graph.scss'

class GraphDashboard extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";
  alertColor="#D6A157";

  makeLayout( opts ){
    var defaultNodeSpacing = 150;
    var params = {
      name: 'cola',
      directed: true,
      padding: 30,
      maxSimulationTime: 100,
      edgeLengthVal: 1,
      nodeSpacing: defaultNodeSpacing
    };

    params.randomize = false;

    for( var i in opts ){
      params[i] = opts[i];
    }


    // return this.cy.layout( params );
  }

  componentDidMount() {

    // var configTransformation = $('#transformation');
    // var configNodeSpacing = $('#node-spacing');

// 1. DISPLAY INTERFACE SETTINGS IN DASHBOARD
//     makeSlider();
//     makeButton();

// 2. SET GRAPH DISPLAY SETTINGS
//     var layout = this.makeLayout({});
    var running = false;
    this.cy.on('layoutstart', function(){
      running = true;
    }).on('layoutstop', function(){
      running = false;
    });
//
// // RENDER GRAPH FOR FIRST TIME
//     this.cy.layout.run();
  }


  render() {
    const elements = CytoscapeComponent.normalizeElements({
      nodes: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'e' } }
      ],

      edges: [
        { data: { id: 'a"e', weight: 1, source: 'a', target: 'e' } },
        { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
        { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
        { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
        { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
        { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
        { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
      ]
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

    const layout = {
      name: 'cola',
      directed: true,
      padding: 30,
      maxSimulationTime: 100,
      edgeLengthVal: 1,
      nodeSpacing: 150
    };

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
          <CytoscapeComponent id="cy" cy={cy => this.cy = cy} elements={elements} stylesheet={ stylesheet } layout={ layout }/>
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
