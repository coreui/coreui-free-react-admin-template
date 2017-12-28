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
import LastProcess from './LastProcess';

const ldap = require('ldapjs')


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
  		size: 20,
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

  renderStaFlu(sta_flu) {
  	if (sta_flu == 'S') {
  		return (<td><Badge color="success">{ "Succes" }</Badge></td>)
  	} else if (sta_flu == 'A') {
  		return (<td><Badge color="warning">{ "Avertissement" }</Badge></td>)
  	} else {
  		return (<td><Badge color="danger">{ "Erreur" }</Badge></td>)
  	}
  }

  renderRAIColumn(gln_flu, rai_soc) {
  	if (rai_soc != null) {
  		return(rai_soc)
  	} else {
  		return(gln_flu)
  	}
  }



  
  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 20 Derniers Flux
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
            			<tr key={result.num_flu}>
            				<td>{ result.id_flu }</td>
            				<td>{ result.typ_flu }</td>
            				<td>{ this.renderRAIColumn(result.eme_flu, result.rai_soc_eme) }</td>
            				<td>{ this.renderRAIColumn(result.des_flu, result.rai_soc_des) }</td>
            				<td>{ result.ref_flu }</td>
            				<td>{ new Date(result.ts_cre).toLocaleString() }</td>
            				<td><LastProcess flux={result.num_flu}/></td>
            				{this.renderStaFlu(result.sta_flu)}
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
