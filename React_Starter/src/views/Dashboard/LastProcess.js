import React, { Component } from 'react';
import axios from 'axios';

class LastProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fluKey: props.flux,
      results: []
    };
  }

  componentDidMount() {
   	axios.post(`http://remove_leclerc_interne_uri:9200/console/_search`, {
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
  		          query: 'type:traitement AND num_flu:' + this.state.fluKey,
  		          analyze_wildcard: true,
  		          default_field: '*'
  		        }
  		      }
  		    ],
  		  }
  		}
   	})
   	  .then(res => {
   	    const results = res.data.hits.hits.map(obj => obj._source);
   	    this.setState({ results });
   	  });
  }

 render() {
    return (
    		<div>
      			{
      			  this.state.results.map(result =>
      			  	<div>
      			  		{ result.typ_tra } - { result.lib_tra } - { new Date(result.ts_cre).toLocaleString() }
      			  	</div>
      			  )
      			}
    		</div>
   		   )
  }
}



export default LastProcess;
