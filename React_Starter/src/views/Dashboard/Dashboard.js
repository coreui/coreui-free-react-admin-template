import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
  }

  componentDidMount() {
   	axios.post(`http://lgc-sandbox-dev:9200/console/_search`, {
  		version: true,
  		size: 500,
  		sort: [
  		  {
  		    ts_cre: {
  		      order: 'desc',
  		      unmapped_type: 'boolean'
  		    }
  		  }
  		],
  		query: {
  		  bool: {
  		    must: [
  		      {
  		        query_string: {
  		          query: 'type:flux',
  		          analyze_wildcard: true,
  		          default_field: '*'
  		        }
  		      },
  		      {
  		        range: {
  		          ts_cre: {
  		            gte: 1482857265837,
  		            lte: 1514393265837,
  		            format: 'epoch_millis'
  		          }
  		        }
  		      }
  		    ],
  		  }
  		}
   	})
   	  .then(res => {
   	    const results = res.data.hits.hits.map(obj => obj._source);
   	    console.log(results)
   	    this.setState({ results });
   	  });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 500 Derniers Flux
              </CardHeader>
              <CardBody>
      		  	<Table responsive striped>
                  <thead>
                  <tr>
                    <th>Flux ID</th>
                    <th>Type </th>
                    <th>Emetteur</th>
                    <th>Destinataire</th>
                    <th>Reference</th>
                    <th>Creation</th>
                    <th>Dernier Traitement</th>
                    <th>Statut</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                  	this.state.results.map(result =>
            			<tr>
            				<td>{ result.id_flu }</td>
            				<td>{ result.typ_flu }</td>
            				<td>{ result.eme_flu }</td>
            				<td>{ result.des_flu }</td>
            				<td>{ result.ref_flu }</td>
            				<td>{ result.ts_cre }</td>
            				<td>{ "Requete pas encore implementée" }</td>
            				<td><Badge color="success">{ result.sta_flu }</Badge></td>
            			</tr>
          			)
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
      </div>
    )
  }
}

export default Dashboard;
