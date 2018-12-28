import React, {Component} from 'react';
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
} from 'reactstrap';
import api from "../../../api";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Link } from 'react-router-dom'

const PER_PAGE = 20;

class Generate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphs: [],
      nbGraph: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    api.getGraphByVariable(event.target.value)
      .then(res => {
        this.setState({
          graphs: res.data.message.graph
        });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }

  componentDidMount() {
    api.getListGraph(1, PER_PAGE)
      .then(res => {
        this.setState({
          graphs: res.data.message.graphs,
          nbGraph: res.data.message.graphs.length
        });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }

  render() {
    const graphs = this.state.graphs.map(graph => (
      <tr>
        <td><Link to={"/dashboards/graph/" + graph.variable}>{graph.variable}</Link></td>
        <td>{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(graph.created_at))}
        </td>
      </tr>));

    return (
      <div className="animated fadeIn padding-30">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Generate Graph Dashboard</strong>
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
                <div>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {graphs}
                    </tbody>
                  </Table>
                </div>
                <Pagination
                  showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
                  total={this.state.nbGraph} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Generate;
