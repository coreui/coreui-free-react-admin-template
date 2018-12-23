import React, {Component} from 'react';
import 'react-cytoscape';
import {Chart} from "react-google-charts";
import windowSize from 'react-window-size';
import './graph.scss'


class GraphFindingNumbers extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";

  render() {

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

    return (
      <div>
        <div className="header-1">
          <span>Finding Numbers</span>
        </div>
        <Chart
          chartType="ColumnChart"
          data={this.props.findings_count}
          options={options2}
          legendToggle
        />
      </div>
    );
  }
}

export default windowSize(GraphFindingNumbers);
