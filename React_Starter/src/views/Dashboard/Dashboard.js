import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
  }

  componentDidMount() {
   	axios.get(`http://lgc-sandbox-dev:9200/console/_search`)
   	  .then(res => {
   	    const results = res.data.hits.hits.map(obj => obj._source);
   	    console.log(results)
   	    this.setState({ results });
   	  });
  }

  render() {
    return (
      <div className="animated fadeIn">
        
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
      </div>
    )
  }
}

export default Dashboard;
