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
  		return (<td><Badge color="warning"><b>{ "Avertissement" }</b></Badge></td>)
  	} else {
  		return (<td><Badge color="danger"><b>{ "Erreur" }</b></Badge></td>)
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
        <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter your name" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Credit Card Number</Label>
                      <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" id="cvv" placeholder="123" required/>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
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
                  { // 
                  	this.state.results.map(result =>
            			<tr key={result.num_flu}>
            				<td>{ (result.sta_flu == 'S') ? result.id_flu : <b> { result.id_flu } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? result.typ_flu : <b> { result.typ_flu } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? this.renderRAIColumn(result.eme_flu, result.rai_soc_eme) : <b> { this.renderRAIColumn(result.eme_flu, result.rai_soc_eme) } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? this.renderRAIColumn(result.des_flu, result.rai_soc_des) : <b> { this.renderRAIColumn(result.des_flu, result.rai_soc_des) } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? result.ref_flu : <b> { result.ref_flu } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? new Date(result.ts_cre).toLocaleString() : <b> { new Date(result.ts_cre).toLocaleString() } </b> }</td>
            				<td>{ (result.sta_flu == 'S') ? <LastProcess flux={result.num_flu}/> : <b><LastProcess flux={result.num_flu}/></b> }</td>
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
