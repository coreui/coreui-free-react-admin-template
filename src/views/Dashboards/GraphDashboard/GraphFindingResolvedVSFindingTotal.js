import React, {Component} from 'react';
import 'react-cytoscape';
import {Chart} from "react-google-charts";
import windowSize from 'react-window-size';
import './graph.scss'


class GraphFindingNumbersLastMinutes extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";

  render() {

    const options2 = {
      title: '',
      width: this.props.width,
      height: this.props.height,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
      chartArea: {'width': '90%', 'height': '70%'},
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

    const chartOrNoChart = this.props.findings_count_per_minute.length > 0 ? ( <Chart
      chartType="ColumnChart"
      data={this.props.findings_count_per_minute}
      options={options2}
      legendToggle
    />) : ('');

    return (
      <div>
        <div className="header-1">
          <span>Finding Numbers</span>
        </div>
        {chartOrNoChart}
      </div>
    );
  }
}

export default windowSize(GraphFindingNumbersLastMinutes);
