import React, {Component} from 'react';
import {Col, Row, Card, CardBody, Input, Table} from 'reactstrap';
import api from "../../api";
import NotificationSystem from "react-notification-system";
import './agent.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactResizeDetector from 'react-resize-detector';

const PAGE_SIZE = 10;
const MAX = 30;

class Agent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      agents: [],
      page: 1,
    };

    this.handleFilterHostname = this.handleFilterHostname.bind(this);
  }

  handleFilterHostname(event) {
    api.getAgents(event.target.value, this.state.page, MAX)
      .then(res => {
        let agents = res.data.message.agents;
        this.setState({
          agents: agents,
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    let query = this.props.match.params.q === undefined ? '' : this.props.match.params.q;
    api.getAgents(query, this.state.page, MAX)
      .then(res => {
        let agents = res.data.message.agents;
        this.setState({
          agents: agents,
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  render() {
    const data = this.state.agents;

    return (
      <ReactResizeDetector handleWidth>
        <NotificationSystem ref="notificationSystem" />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">Metrics</li>
          <li className="breadcrumb-item active">Agents</li>
        </ol>
        {(width) => (
        <div className="animated fadeIn padding-20">
          <Row>
            <Col xs="12" sm="6" md="12">
              <Card>
                <CardBody>
                  <div class="input-icon right mb-3" style={{marginLeft: '0'}}>
                    <i class="icon-magnifier"/>
                    <Input type="text" onChange={this.handleFilterHostname} placeholder="Filter by hostname" />
                  </div>
                  <ReactTable
                    data={data}
                    columns={[
                      {
                        columns: [
                          {
                            Header: "Host",
                            id: "host",
                            accessor: d => d.hostname,
                            width: Math.round(width * 0.22)
                          },
                          {
                            Header: "Version",
                            id: "version",
                            accessor: d => d.version,
                            width: Math.round(width * 0.08)

                          },
                          {
                            Header: "Online",
                            id: "online",
                            accessor: d => d.online ? (<span className="host_status_up">• <span>UP</span></span>) : <span className="host_status_down">• <span>DOWN</span></span>,
                            width: Math.round(width * 0.1)
                          },
                          {
                            Header: "Deployed",
                            id: "created_at",
                            accessor: d => d.created_at,
                            width: Math.round(width * 0.2)
                          },
                          {
                            Header: "Updated",
                            id: "updated_at",
                            accessor: d => d.updated_at,
                            width: Math.round(width * 0.2)
                          },
                          {
                            Header: "Features",
                            id: "features",
                            accessor: d => (d.watchers.length > 0 ? (<div><i className="fa fa-shield" />&nbsp;&nbsp;<i className="fa fa-lock" /></div>) : <i className="fa fa-lock" />),
                            width: Math.round(width * 0.04)
                          },
                        ]
                      }
                    ]}
                    defaultPageSize={PAGE_SIZE}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>)}
      </ReactResizeDetector>
    );
  }
}

export default Agent;
