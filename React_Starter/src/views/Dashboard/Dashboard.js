import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
   	axios.get(`http://lgc-sandbox-dev:9200/console/_search`)
   	  .then(res => {
   	    //const results = res.data.hits.hits.map(obj => obj.data);
   	    console.log(res);
   	    //console.log(result);
   	    //this.setState({ results });
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
