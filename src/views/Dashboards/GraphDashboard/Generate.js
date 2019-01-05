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
      per_page: PER_PAGE
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    api.getGraphByVariable(event.target.value)
      .then(res => {
        this.setState({
          graphs: res.data.message.graph,
          perPage: res.data.message.graphs.length < 10 ? res.data.message.graphs.length : PER_PAGE
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  componentDidMount() {
    this.state._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    this.state._notificationSystem = this.refs.notificationSystem;

    api.getListGraph(1, PER_PAGE)
      .then(res => {
        this.setState({
          graphs: res.data.message.graphs,
          perPage: res.data.message.graphs.length < 10 ? res.data.message.graphs.length : PER_PAGE
        });
      })
      .catch(error => this.state._notificationSystem.addNotification(api.getFormattedErrorNotification(error)));
  }

  render() {
    const data = this.state.graphs;
    const perPage = this.state.perPage;

    return (
      <div className="animated fadeIn padding-30">
        <NotificationSystem ref="notificationSystem" />
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/><strong>Generate Graph Dashboard</strong>
                  <small><code>&nbsp;&nbsp;by tag</code></small>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="12">
                      <InputGroup>
                        <Input type="text" onChange={this.onChange} id="input3-group2" name="input3-group2" placeholder="Search" />
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
                  defaultPageSize={5}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Generate;
