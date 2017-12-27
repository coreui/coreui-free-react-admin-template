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
   	    console.log(res);
   	    const results = res.data.data.hits.hits.map(obj => obj.data);
   	    
   	    this.setState({ results });
   	  });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div>
        <ul>
          {this.state.results.map(result =>
            <li>{result._source.id_flu}</li>
          )}
        </ul>
      </div>
      </div>
    )
  }
}

export default Dashboard;
