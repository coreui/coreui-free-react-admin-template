import React, {Component} from 'react';
import 'react-cytoscape';
import {Chart} from "react-google-charts";
import windowSize from 'react-window-size';
import './graph.scss'


class GraphFindingPercentage extends Component {
  color0="#21295C";
  color1="#1B3B6F";
  color2="#065A82";
  color3="#1C7293";
  color4="#9EB3C2";

  render() {

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
      width: this.props.windowWidth*0.280,
      height: this.props.windowHeight*0.235,
      chartArea: {'width': '95%', 'height': '85%'}
    };

    const chartOrNoChart = this.props.findings_percentage.length > 0 ? ( <Chart
      chartType="PieChart"
      data={this.props.findings_percentage}
      options={options3}
      legendToggle
    />) : ('');

    return (
      <div>
        <div className="header-1">
          <span>Findings Percentage</span>
        </div>
        {chartOrNoChart}
      </div>
    );
  }
}

export default windowSize(GraphFindingPercentage);
