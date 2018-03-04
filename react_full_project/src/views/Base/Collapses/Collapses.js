import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Collapse, Button, Fade
} from 'reactstrap';

class Collapses extends Component {

  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      status: 'Closed',
      fadeIn: true,
      timeout: 300
    };
  }

  onEntering() {
    this.setState({status: 'Opening...'});
  }

  onEntered() {
    this.setState({status: 'Opened'});
  }

  onExiting() {
    this.setState({status: 'Closing...'});
  }

  onExited() {
    this.setState({status: 'Closed'});
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState({fadeIn: !this.state.fadeIn});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Collapse</strong>
            <div className="card-actions">
              <a href="https://reactstrap.github.io/components/collapse/" target="_blank">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <Collapse
            isOpen={this.state.collapse}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            <CardBody>
              <p>
                Anim pariatur cliche reprehenderit,
                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred
                nesciunt sapiente ea proident.
              </p>
              <p>
                Donec molestie odio id nisi malesuada, mattis tincidunt velit egestas. Sed non pulvinar risus. Aenean
                elementum eleifend nunc, pellentesque dapibus arcu hendrerit fringilla. Aliquam in nibh massa. Cras
                ultricies lorem non enim volutpat, a eleifend urna placerat. Fusce id luctus urna. In sed leo tellus.
                Mauris tristique leo a nisl feugiat, eget vehicula leo venenatis. Quisque magna metus, luctus quis
                sollicitudin vel, vehicula nec ipsum. Donec rutrum commodo lacus ut condimentum. Integer vel turpis
                purus. Etiam vehicula, nulla non fringilla blandit, massa purus faucibus tellus, a luctus enim orci non
                augue. Aenean ullamcorper nisl urna, non feugiat tortor volutpat in. Vivamus lobortis massa dolor, eget
                faucibus ipsum varius eget. Pellentesque imperdiet, turpis sed sagittis lobortis, leo elit laoreet arcu,
                vehicula sagittis elit leo id nisi.
              </p>
            </CardBody>
          </Collapse>
          <CardFooter>
            <Button color="primary" onClick={this.toggle} style={{marginBottom: '1rem'}}>Toggle</Button>
            <h5>Current state: {this.state.status}</h5>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Fade</strong>
            <div className="card-actions">
              <a href="https://reactstrap.github.io/components/fade/" target="_blank">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Fade timeout={this.state.timeout} in={this.state.fadeIn} tag="h5" className="mt-3">
              This content will fade in and out as the button is pressed...
            </Fade>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.toggleFade}>Toggle Fade</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Collapses;