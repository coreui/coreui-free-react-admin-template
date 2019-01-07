import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, Row,} from 'reactstrap';
import api from "../../../api";
import {Link} from 'react-router-dom'
import NotificationSystem from 'react-notification-system';
import ReactTable from "react-table";
import "react-table/react-table.css";

const PER_PAGE = 10;

class Generate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,

      graphs: [],
    };

    this.onChange = this.onChange.bind(this);
    this.getListAgents = this.getListAgents.bind(this);
  }

  onChange(event) {
    if (event.target.value === ''){
      this.getListAgents()
    }else{
      api.getGraphByVariable(event.target.value, true)
        .then(res => {
          this.setState({
            graphs: res.data.message.aggs,
          });
        })
        .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
    }
  }

  getListAgents() {
    api.getListGraph(1, PER_PAGE)
      .then(res => {
        this.setState({
          graphs: res.data.message.graphs,
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    this.getListAgents();
  }

  render() {
    const data = this.state.graphs;

    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">Dashboards</li>
          <li className="breadcrumb-item">Graph</li>
          <li className="breadcrumb-item active">Generate</li>
        </ol>
        <div className="animated fadeIn padding-20">
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="12">
                        <InputGroup>
                          <Input type="text" onChange={this.onChange} placeholder="Search a graph by tag" />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                  <ReactTable
                    data={data}
                    columns={[
                      {
                        columns: [
                          {
                            Header: "Tag",
                            id: "tag",
                            accessor: d => (<Link to={"/dashboards/graph/" + d.key}>{d.key}</Link>)
                          },
                          {
                            Header: "Unique Graphs",
                            id: "ugraphs",
                            accessor: d => d.doc_count,

                          },
                        ]
                      }
                    ]}
                    defaultPageSize={PER_PAGE}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Generate;
