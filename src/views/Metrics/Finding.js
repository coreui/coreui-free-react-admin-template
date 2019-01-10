import React, {Component} from 'react';
import {Card, CardBody, Col, Row, Table, Badge} from 'reactstrap';
import api from "../../api";
import NotificationSystem from "react-notification-system";
import './finding.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactResizeDetector from 'react-resize-detector';
import {DateRange, MultiList, ReactiveBase, ReactiveList, SingleDataList, SelectedFilters} from '@appbaseio/reactivesearch';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

const MAX = 10000;

class Finding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      page: 1,
      pageSize: 10,
      data: [],

    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handlePageSizeChange = val => {
    this.setState({pageSize: val});
  };

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    const data = this.state.data;

    return (
      <ReactResizeDetector handleWidth>
        <NotificationSystem ref="notificationSystem" />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">Metrics</li>
          <li className="breadcrumb-item active">Findings</li>
        </ol>
        {(width) => (
          <div className="animated fadeIn padding-20">
            <ReactiveBase
              app="findings"
              url={api.getApiUrl()}
              headers={
                api.getAuthHeader()
              }>
              <Row>
                <Col xs="12" sm="6" md="12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xs="2" sm="3" md="3">
                          <SingleDataList
                            className="data-filter"
                            componentId="FindingResolved"
                            dataField="resolved"
                            title="Status"
                            data={
                              [{
                                label: "Resolved",
                                value: "true"
                              }, {
                                label: "Unresolved",
                                value: "false"
                              }, {
                                label: "Both",
                                value: ""
                              }]
                            }
                            defaultSelected=""
                            showSearch={true}
                            showRadio={true}
                          />
                          <MultiList
                            className="data-filter"
                            componentId="FindingType"
                            dataField="type_finding"
                            title="Types"
                          />
                          <MultiList
                            className="data-filter"
                            componentId="FindingHostname"
                            dataField="hostname"
                            title="Types"
                          />
                          <DateRange
                            style={{'marginBottom': '20px'}}
                            className="data-filter"
                            componentId="FindingDate"
                            dataField="created_at"
                            customQuery={this.dateQuery}
                            title="Dates"
                          />
                          <SelectedFilters
                            className="data-filter"
                            title="Filters"
                          />
                        </Col>
                        <Col style={{color: '#fff'}} xs="10" sm="9" md="9">
                          <Table>
                            <ReactTable
                              style={{fontSize: '0.8rem'}}
                              data={data}
                              columns={[
                                {
                                  columns: [
                                    {
                                      Header: "Type",
                                      id: "type",
                                      accessor: d => d.type_finding,
                                      width: Math.round(width * 0.08)
                                    },
                                    {
                                      Header: "First seen",
                                      id: "created_at",
                                      accessor: d => new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(d.created_at)),
                                      width: Math.round(width * 0.13)
                                    },
                                    {
                                      Header: "Status",
                                      id: "resolved",
                                      accessor: d => (<Badge className="mr-1" color={d.resolved === false ? 'danger' : 'warning'}>{d.resolved === false ? 'UNRESOLVED' : 'RESOLVED'}</Badge>),
                                    },
                                  ]
                                }
                              ]}
                              defaultPageSize={this.state.pageSize}
                              onPageSizeChange={this.handlePageSizeChange}
                              className="-striped -highlight"
                            />

                            <ReactiveList
                              style={{display: 'none'}}
                              componentId="FindingResults"
                              dataField={"_id"}
                              react={{
                                "and": ["FindingType", "FindingHostname", "FindingResolved", "FindingDate"]
                              }}
                              onAllData={(listData) => {
                                const { data } = this.state;
                                if (JSON.stringify(data) !== JSON.stringify(listData)) {
                                  this.setState({
                                    data: listData
                                  })
                                }
                                return null;  // since this is a render prop
                              }}
                              showResultStats={false}
                              onResultStats={(total, took) => {
                                return "found " + total + " results in " + took + "ms."
                              }}
                              pagination={false}
                              size={MAX}
                            />
                          </Table>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ReactiveBase>
          </div>)}
      </ReactResizeDetector>
    );
  }

  dateQuery(value) {
    let query = null;
    if (value) {
      query = [
        {
          range: {
            created_at: {
              gte: moment(value.start).utc(),
            },
          },
        },
        {
          range: {
            created_at: {
              lte: moment(value.end).utc(),
            },
          },
        },
      ];
    }
    return query;
  }
}

export default Finding;
