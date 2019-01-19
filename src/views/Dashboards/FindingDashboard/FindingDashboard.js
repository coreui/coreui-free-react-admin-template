import React, {Component} from 'react';
import api from "../../../api";
import {findingDashboardOptions} from "./FindingDashboardOptions";
import {AppAsideToggler} from "@coreui/react";
import NotificationSystem from "react-notification-system";
import {Responsive} from "react-grid-layout";
import ReactResizeDetector from "react-resize-detector";
import windowSize from "react-window-size";
import {observer} from "mobx-react";
import GraphFindingPercentage from "../GraphDashboard/GraphFindingPercentage";
import GraphFindingNumbersLastMinutes from "./GraphFindingNumbersLastMinutes";
import '../../../../node_modules/react-grid-layout/css/styles.css';
import './findingdashboard.scss'
import GraphFindingNumbersLastMinutesPerHostname from "./GraphFindingNumbersLastMinutesPerHostname";
import GraphLastFindings from "../GraphDashboard/GraphLastFindings";
import GraphFindingCompanyPerformance from "./GraphFindingCompanyPerformance";
import {Redirect} from "react-router-dom";

const LAST_FINDINGS_TO_DISPLAY = 20;
const LAST_MINUTES_FINDINGS = 3800;

class FindingDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      findings_total: 0,
      findings_last_count: 0,
      findings_resolved_last_count: 0,
      findings_unresolved_last_count: 0,
      findings_in_progress_last_count: 0,
      findings_count_per_minute: [],
      findings_count_per_type: {},
      findings_count_per_hostname: {},
      findings_percentage: {},
      findings_last: []
    };

    this.startAr = this.startAr.bind(this);
    this.stopAr = this.stopAr.bind(this);

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

  startAr() {
    findingDashboardOptions.chartsArTimer = setInterval(() => {
      if (findingDashboardOptions.isArOn) {
        api.getFindingCountByTime(LAST_MINUTES_FINDINGS)
          .then(res => {
            this.setState({
              findings_count_per_minute: this.getFindingsNumbersLastMinuteChartOptions(res.data.message.findings),
            });
          })
          .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

        api.getFindingCountByType()
          .then(res => {
            let findings_total = 0;
            res.data.message.findings.forEach(x => findings_total = findings_total + x.count);
            this.setState({
              findings_percentage: this.getFindingsPercentageChartOptions(res.data.message.findings),
              findings_total: findings_total
            });
          })
          .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

        api.getFindingCountByHostname(LAST_MINUTES_FINDINGS)
          .then(res => {
            this.setState({
              findings_count_per_hostname: this.getFindingsPercentageChartOptions(res.data.message.findings)
            });
          })
          .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

        api.getFindingCountByStatus(LAST_MINUTES_FINDINGS)
          .then(res => {
            let findings = res.data.message.findings.type_counts.buckets;
            if (findings.length > 0) {
              let findings_resolved_last_count = 0;
              let findings_unresolved_last_count = 0;
              let findings_in_progress_last_count = 0;
              findings.forEach( x => {
                if (x.key_as_string === 'false'){
                  findings_unresolved_last_count = x.doc_count
                }else {
                  if (x.key_as_string === 'true') {
                    findings_resolved_last_count = x.doc_count
                  } else {
                    if (x.key_as_string === 'unresolved') {
                      findings_in_progress_last_count = x.doc_count
                    }
                  }
                }
              });
              this.setState({
                findings_last_count: findings_resolved_last_count + findings_unresolved_last_count + findings_in_progress_last_count,
                findings_resolved_last_count: findings_resolved_last_count,
                findings_unresolved_last_count: findings_unresolved_last_count,
                findings_in_progress_last_count: findings_in_progress_last_count
              })
            }
          })
          .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));

        api.getFindings(LAST_FINDINGS_TO_DISPLAY)
          .then(res => {
            this.setState({
              findings_last: res.data.message.findings
            });
          })
          .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
      }
    }, findingDashboardOptions.arRefreshTime);
  }

  stopAr() {
    findingDashboardOptions.stopChartsArTimer()
  }

  // we don't want to load the dom if no findings
  componentWillMount() {
    api.getFindingCountByType()
      .then(res => {
        let findings_total = 0;
        res.data.message.findings.forEach(x => findings_total = findings_total + x.count);
        this.setState({
          findings_percentage: this.getFindingsPercentageChartOptions(res.data.message.findings),
          findings_total: findings_total
        });
      })
      // .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  async componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
    this.startAr()
  }


  componentWillUnmount() {
    this.stopAr();
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/help/quick_start' } };

    if (this.state.findings_total.length === 0) {
      return (
        <Redirect to={from} />
      )
    }

    const displayCssClassName = this.state.findings_last.length > 0 ? '' : 'loader-in-background-1-16';

    return (
      <ReactResizeDetector handleWidth handleHeight>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">Dashboards</li>
          <li className="breadcrumb-item">Finding</li>
          <li className="breadcrumb-menu d-md-down-none">
            <div className="btn-group" role="group" aria-label="Button group">
              <AppAsideToggler className="d-md-down-none" />
              <AppAsideToggler className="d-lg-none" mobile />
            </div>
          </li>
          <NotificationSystem ref="notificationSystem" />
        </ol>
        {(width) => (
          <div className="animated fadeIn">
            <Responsive
              //fix undefined bug
              width={width === undefined ? this.props.windowWidth - 200 : width}
              isDraggable={findingDashboardOptions.isDraggable}
              autoResize={true}
              compactType={null}
              rowHeight={this.props.windowHeight/13.3}
              cols={{lg: 8, md: 8, sm: 8, xs: 8, xxs: 8}}
            >
              <div className={'containerDragAndDrop'} key="1" data-grid={{ w: 4, h: 1, x: 0, y: 0 }}>
                <GraphFindingCompanyPerformance
                  height={this.props.windowHeight*0.05}
                  findings_last_count={this.state.findings_last_count}
                  findings_resolved_last_count={this.state.findings_resolved_last_count}
                  findings_unresolved_last_count={this.state.findings_unresolved_last_count}
                  findings_in_progress_last_count={this.state.findings_in_progress_last_count}
                />
              </div>
              <div className={'containerDragAndDrop loader-in-background-1-4'} key="2" data-grid={{ w: 4, h: 3, x: 0, y: 0 }}>
                <GraphFindingNumbersLastMinutes
                  findings_count_per_minute={this.state.findings_count_per_minute}
                  height={this.props.windowHeight*0.210}
                />
              </div>
              <div className={'containerDragAndDrop loader-in-background-1-4'}  key="3" data-grid={{ w: 4, h: 3, x: 0, y: 4 }}>
                <GraphFindingPercentage
                  findings_percentage={this.state.findings_percentage}
                  height={this.props.windowHeight*0.210}
                />
              </div>
              <div className={'containerDragAndDrop loader-in-background-1-4'} key="4" data-grid={{ w: 4, h: 3, x: 0, y: 7 }}>
                <GraphFindingNumbersLastMinutesPerHostname
                  findings_count_per_minute={this.state.findings_count_per_minute}
                  height={this.props.windowHeight*0.210}
                />
              </div>
              <div className={'containerDragAndDrop ' + displayCssClassName} key="5" data-grid={{ w: 4, h: 10, x: 5, y: 0 }}>
                <GraphLastFindings
                  last_findings={this.state.findings_last}
                  height={this.props.windowHeight*0.220}
                />
              </div>
            </Responsive>
          </div>)}
      </ReactResizeDetector>
    );
  }
}

export default windowSize(observer(FindingDashboard));
