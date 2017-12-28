import React, { Component } from 'react';
import axios from 'axios';

class LastProcess extends Component {
  constructor(props) {
    super(props);
    cnosole.log(props)
    this.state = {
      fluKey: []
    };
  }

  componentDidMount() {
   	axios.post(`http://lgc-sandbox-dev:9200/console/_search`, {
  		version: true,
  		size: 1,
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
  		          query: 'type:traitement',
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
   	    console.log(res)
   	  });
  }

  render() {
    return (
      "Loading"
    )
  }
}

export default LastProcess;
