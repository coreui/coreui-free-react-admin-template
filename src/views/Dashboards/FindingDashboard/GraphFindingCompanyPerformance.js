import React, {Component} from 'react';
import 'react-cytoscape';
import {Col, Row} from 'reactstrap'

class GraphFindingCompanyPerformance extends Component {
  render() {

    return (
      <div>
        <div className="header-1">
          <span>Company Performance</span>
        </div>
        <Row>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + this.props.height/50 + ',' + this.props.height/50 +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-area-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">$1.999,50</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Income</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + this.props.height/50 + ',' + this.props.height/50 +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-bar-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">$1.999,50</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Income</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + this.props.height/50 + ',' + this.props.height/50 +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-line-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">$1.999,50</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Income</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{height: this.props.height, transform: 'scale(' + this.props.height/50 + ',' + this.props.height/50 +  1 + ')', transformOrigin: 'top left'}}>
              <div className="d-flex p-1 align-items-center">
                <i className="fa fa-pie-chart bg-primary p-2 font-2xl mr-3"/>
                <div>
                  <div className="text-value-sm text-primary">$1.999,50</div>
                  <div className="text-muted text-uppercase font-weight-bold small">Income</div>
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
