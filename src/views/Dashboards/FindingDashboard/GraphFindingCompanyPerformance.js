import React, {Component} from 'react';
import 'react-cytoscape';
import {Col, Row} from 'reactstrap'

class GraphFindingCompanyPerformance extends Component {
  render() {
    const scale = this.props.height/55;
    return (
      <div>
        <div className="header-1">
          <span>Company's Performance</span>
        </div>
        <Row>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + scale + ',' + scale + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-area-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">{this.props.findings_last_count}</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Total</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + scale + ',' + scale +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-bar-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">{this.props.findings_resolved_last_count}</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Resolved</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + scale + ',' + scale +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-line-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">{this.props.findings_in_progress_last_count}</div>
                  <div className="text-muted text-uppercase font-weight-bold small">In Progress</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + scale + ',' + scale +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-pie-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">{this.props.findings_unresolved_last_count}</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Unresolved</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GraphFindingCompanyPerformance;
