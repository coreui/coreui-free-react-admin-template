import React, { Component } from 'react';
import axios from 'axios';

class LastProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fluKey: props.flux
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
  		          query: 'type:traitement AND num_flu:' + fluKey,
  		          analyze_wildcard: true,
  		          default_field: '*'
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
