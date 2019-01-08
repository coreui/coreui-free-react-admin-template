import React, {Component} from 'react';
import api from "../../../api";
import {graphDashboardOptions} from "../GraphDashboard/GraphDashboardOptions";
import {AppAsideToggler} from "@coreui/react";
import NotificationSystem from "react-notification-system";
import {Responsive} from "react-grid-layout";
import ReactResizeDetector from "react-resize-detector";
import windowSize from "react-window-size";
import {observer} from "mobx-react";
import GraphFindingPercentage from "../GraphDashboard/GraphFindingPercentage";
import GraphFindingNumbersLastMinutes from "./GraphFindingNumbersLastMinutes";
import '../../../../node_modules/react-grid-layout/css/styles.css';
import GraphFindingNumbersLastMinutesPerHostname from "./GraphFindingNumbersLastMinutesPerHostname";
import GraphLastFindings from "../GraphDashboard/GraphLastFindings";
import GraphFindingCompanyPerformance from "./GraphFindingCompanyPerformance";

const LAST_FINDINGS_TO_DISPLAY = 20;

class FindingDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      findings_count_per_minute: [],
      findings_count_per_type: {},
      findings_count_per_hostname: {},
      findings_percentage: {},
      findings_last: []
    };
  }

  getFindingsNumbersLastMinuteChartOptions(findings_count){
    let data_options = [];
    if (findings_count.length === 0){
      return data_options
    }
    data_options[0] = ["Minute", "Finding Number", { role: "style" } ];

    let i = 1;
    findings_count.some(function(elm){
      data_options[i] = [elm[0], elm[1], '#fff'];
      i++;
    });

    console.log(data_options)

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


  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;

    api.getFindingCountByTime(180)
      .then(res => {
        console.log(res)
        this.setState({
          findings_count_per_minute: this.getFindingsNumbersLastMinuteChartOptions(res.data.message.findings),
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

    api.getFindingCountByType()
      .then(res => {
        this.setState({
          // findings_count_per_minute: this.getFindingsNumbersChartOptions(res.data.message.findings),
          findings_percentage: this.getFindingsPercentageChartOptions(res.data.message.findings)
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

    api.getFindingCountByHostname(180)
      .then(res => {
        console.log(res)
        this.setState({
          // findings_count_per_minute: this.getFindingsNumbersChartOptions(res.data.message.findings),
          findings_count_per_hostname: this.getFindingsPercentageChartOptions(res.data.message.findings)
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

    api.getFindings(LAST_FINDINGS_TO_DISPLAY)
      .then(res => {
        console.log(res.data.message.findings);
        this.setState({
          findings_last: res.data.message.findings
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }


  render() {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">Dashboards</li>
          <li className="breadcrumb-item">Graph</li>
          <li className="breadcrumb-item active">{graphDashboardOptions.graphVar}</li>
          <li className="breadcrumb-menu d-md-down-none">
            <div className="btn-group" role="group" aria-label="Button group">
              <AppAsideToggler className="d-md-down-none" />
              <AppAsideToggler className="d-lg-none" mobile />
            </div>
          </li>
          <NotificationSystem ref="notificationSystem" />
        </ol>
        {(width, height) => (
          <div className="animated fadeIn">
            <Responsive
              //fix undefined bug
              width={width === undefined ? this.props.windowWidth - 200 : width}
              isDraggable={true}
              autoResize={true}
              compactType={null}
              rowHeight={this.props.windowHeight/13.5}
              cols={{lg: 8, md: 8, sm: 8, xxs: 8}}
            >
              <div key="1" data-grid={{ w: 4, h: 1, x: 0, y: 0 }}>
                <GraphFindingCompanyPerformance
                  height={height*0.05}
                />
              </div>
              <div key="2" data-grid={{ w: 4, h: 2, x: 0, y: 0 }}>
                <GraphFindingNumbersLastMinutes
                  findings_count_per_minute={this.state.findings_count_per_minute}
                  width={width*0.495}
                  height={height*0.230}
                />
              </div>
              <div key="3" data-grid={{ w: 4, h: 2, x: 0, y: 4 }}>
                <GraphFindingPercentage
                  findings_percentage={this.state.findings_percentage}
                  width={width*0.495}
                  height={height*0.230}
                />
              </div>
              <div key="4" data-grid={{ w: 4, h: 2, x: 0, y: 7 }}>
                <GraphFindingNumbersLastMinutesPerHostname
                  findings_count_per_minute={this.state.findings_count_per_minute}
                  width={width*0.495}
                  height={height*0.230}
                />
              </div>
              <div key="5" data-grid={{ w: 4, h: 10, x: 5, y: 0 }}>
                <GraphLastFindings
                  last_findings={this.state.findings_last}
                  height={height*0.230}
                />
              </div>
            </Responsive>
          </div>)}
      </ReactResizeDetector>
    );
  }
}

export default windowSize(observer(FindingDashboard));
