import React, {Component} from 'react';
import 'react-cytoscape';
import './graph_last_findings.scss'
import {Table} from "reactstrap";


class GraphLastFindings extends Component {
  render() {

    const last_findings = this.props.last_findings.map(finding => (
      <tr key={finding.id}>
        <td>{finding.type_finding}</td>
        <td>{finding.hostname}</td>
        <td>{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(finding.created_at))}</td>
        <td>{finding.resolved}</td>
      </tr>));

    return (
      <div>
        <div className="header-1">
          <span>Last Findings</span>
        </div>
        <Table style={{height: this.props.height}} hover responsive className="table table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
          <tr>
            <th className="prop-1">Type</th>
            <th className="prop-2">Hostname</th>
            <th className="prop-3">Date</th>
            <th className="prop-4">Resolved</th>
          </tr>
          </thead>
          <tbody>
          {last_findings}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default GraphLastFindings;
