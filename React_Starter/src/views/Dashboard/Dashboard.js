import React, {
    Component
} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';

import axios from 'axios';
import LastProcess from './LastProcess';
import Loading from 'react-loading-bar';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            nb_result: "",
            searchFieldValue: "",
        };
    }

	onShow() {
    	this.setState({ show: true })
  	}

  	onHide() {
    	this.setState({ show: false })
  	}

    performElasticQuery(query) {
        this.onShow()
        if (query != '') {
            axios.post(`http://lgc-sandbox-dev:9200/console/_search`, {
                    version: true,
                    size: 50,
                    sort: [{
                        ts_cre: {
                            order: 'desc',
                            unmapped_type: 'boolean'
                        }
                    }],
                    query: {
                        bool: {
                            must: [{
                                    query_string: {
                                        query: 'type:flux AND ' + query,
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
                    this.setState({
                        results : results,
                        nb_result : res.data.hits.total
                    });
                    this.onHide()
                });
        } else {
            axios.post(`http://lgc-sandbox-dev:9200/console/_search`, {
                    version: true,
                    size: 50,
                    sort: [{
                        ts_cre: {
                            order: 'desc',
                            unmapped_type: 'boolean'
                        }
                    }],
                    query: {
                        bool: {
                            must: [{
                                    query_string: {
                                        query: 'type:flux',
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
                    this.setState({
                        results : results,
                        nb_result : res.data.hits.total
                    });
                    this.onHide()
                });
        }
    }
// (eme_flu:("3025680000100", "FR91637020819", "3025680000100", "3025680000200", "3030001700700", "3030003400100", "3030001705506", "3025680016000", "3025680023000", "3025680005000", "FR45442439709", "3025680013000", "3025680022000", "3025680019000", "3025680024000", "3025680015000", "3025680020000", "3025680034000", "3025680002000", "3025680003000", "3025680029000", "3025680012000", "3025680010000", "3025680014000", "3025680039000", "3025680018000", "3025680021000", "3025680030000", "3025680032000", "3025680011000", "3025680026000", "3025680004000", "3025680006000", "FR79377080312", "3025680009000", "3025680040000", "3025680028000", "3025680036000", "FR95402620579", "3025680038000", "3025680027000", "3025680007000", "3025680033000", "3025680035000", "3025680001000", "3025680037000", "3025680031000", "3025680025000", "3025680008000", "3025680000300", "3025680000400", "3025680000500", "3031230000000", "3031240000000", "3030001705507", "3025680042000", "3025680043000", "FR71479588519", "3025680000600", "3025680014014", "3025680031100", "FR 02 339 838 559", "3031230000100", "3025680020100", "3025680002100", "3025680044000", "3025680031200", "3018888888882", "6987698654235", "6987698465986", "7896541569785", "6987456987569", "1369789465265", "4569875698653", "6987569869875", "3698569865986", "1365987598659", "3025680001002", "3025680001003", "3025680001004", "9999999004049", "9999999004032", "9999999003998", "9999999003974", "9999999003905", "9999999003844", "9999999004247", "3016022672726", "3016022672799", "3016022672798", "1111111111111", "7777777777888") OR des_flu:("3025680000100", "FR91637020819", "3025680000100", "3025680000200", "3030001700700", "3030003400100", "3030001705506", "3025680016000", "3025680023000", "3025680005000", "FR45442439709", "3025680013000", "3025680022000", "3025680019000", "3025680024000", "3025680015000", "3025680020000", "3025680034000", "3025680002000", "3025680003000", "3025680029000", "3025680012000", "3025680010000", "3025680014000", "3025680039000", "3025680018000", "3025680021000", "3025680030000", "3025680032000", "3025680011000", "3025680026000", "3025680004000", "3025680006000", "FR79377080312", "3025680009000", "3025680040000", "3025680028000", "3025680036000", "FR95402620579", "3025680038000", "3025680027000", "3025680007000", "3025680033000", "3025680035000", "3025680001000", "3025680037000", "3025680031000", "3025680025000", "3025680008000", "3025680000300", "3025680000400", "3025680000500", "3031230000000", "3031240000000", "3030001705507", "3025680042000", "3025680043000", "FR71479588519", "3025680000600", "3025680014014", "3025680031100", "FR 02 339 838 559", "3031230000100", "3025680020100", "3025680002100", "3025680044000", "3025680031200", "3018888888882", "6987698654235", "6987698465986", "7896541569785", "6987456987569", "1369789465265", "4569875698653", "6987569869875", "3698569865986", "1365987598659", "3025680001002", "3025680001003", "3025680001004", "9999999004049", "9999999004032", "9999999003998", "9999999003974", "9999999003905", "9999999003844", "9999999004247", "3016022672726", "3016022672799", "3016022672798", "1111111111111", "7777777777888")) AND typ_err_flu:>=0 AND env_flu:PROD AND NOT typ_flu:INVOIC* AND NOT typ_flu:WMS AND NOT typ_flu:ORDERS* AND NOT typ_flu:DEMAT AND NOT typ_flu:DESADV* AND rai_soc_des:SCABEL
    updateSearchFieldValue(value) {
    	if (value != '') {
    		this.setState({searchFieldValue:value})
    	}
    }

    buildAndPerformElasticQuery() {
    	this.performElasticQuery(this.state.searchFieldValue)
    }

    componentDidMount() {
        this.performElasticQuery('');
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
            return (rai_soc)
        } else {
            return (gln_flu)
        }
    }

    render() {
        return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              	<Loading show={this.state.show} color="red"/>
                <small>Recherche</small> 
                <strong>Flux</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                      <InputGroup>
                        <InputGroupAddon><i className="icon-magnifier"></i></InputGroupAddon>
                        <Input type="text" id="input1-group1" name="input1-group1" placeholder="Search" onChange={(event) => this.updateSearchFieldValue(event.target.value) }/>
                      </InputGroup>
                    </Col>
                </Row>
                <Row/>
                <Row>
                  <Col xs="2">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">Janvier</option>
                        <option value="2">Février</option>
                        <option value="3">Mars</option>
                        <option value="4">Avril</option>
                        <option value="5">Mai</option>
                        <option value="6">Juin</option>
                        <option value="7">Juillet</option>
                        <option value="8">Aout</option>
                        <option value="9">Septembre</option>
                        <option value="10">Octobre</option>
                        <option value="11">Novembre</option>
                        <option value="12">Décembre</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success" onClick={this.buildAndPerformElasticQuery()}><i className="fa fa-dot-circle-o"></i> Submit</Button>  
              </CardFooter>
            </Card>
          </Col>
          </Row>
          <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Flux : { this.state.nb_result } résultats
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
          </Row>
      </div>
        )
    }
}

export default Dashboard;