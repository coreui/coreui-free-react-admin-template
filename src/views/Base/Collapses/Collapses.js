import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';

function Collapses() {

  const [collapse, setCollapse] = useState(false)
  const [accordion, setAccordion] = useState([true, false, false])
  const [custom, setCustom] = useState([true, false])
  const [status, setStatus] = useState('Closed')
  const [fadeIn, setFadeIn] = useState(true)
  const [timeout, ] = useState(300)

  function onEntering() {
    setStatus('Opening...')
  }

  function onEntered() {
    setStatus('Opened')
  }

  function onExiting() {
    setStatus('Closing...')
  }

  function onExited() {
    setStatus('Closed...')
  }

  function toggle() {
    setCollapse(!collapse)
  }

  function toggleAccordion(tab) {

    const prevState = accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    setAccordion(state)
  }

  function toggleCustom(tab) {

    const prevState = custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    setCustom(state)
  }

  function toggleFade() {
    setFadeIn(!fadeIn)
  }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Collapse</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/collapse/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <Collapse isOpen={collapse} onEntering={onEntering} onEntered={onEntered} onExiting={onExiting} onExited={onExited}>
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
                <Button color="primary" onClick={toggle} className={'mb-1'} id="toggleCollapse1">Toggle</Button>
                <hr/>
                <h5>Current state: {status}</h5>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Fade</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/fade/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <Fade timeout={timeout} in={fadeIn} tag="h5" className="mt-3">
                  This content will fade in and out as the button is pressed...
                </Fade>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={toggleFade} id="toggleFade1">Toggle Fade</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Collapse <small>accordion</small>
                <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => toggleAccordion(0)} aria-expanded={accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">Collapsible Group Item #1</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => toggleAccordion(1)} aria-expanded={accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Collapsible Group Item #2</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => toggleAccordion(2)} aria-expanded={accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Collapsible Group Item #3</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={accordion[2]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                        3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Collapse <small>custom accordion</small>
                <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div id="exampleAccordion" data-children=".item">
                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => toggleCustom(0)} aria-expanded={custom[0]} aria-controls="exampleAccordion1">
                      Toggle item
                    </Button>
                    <Collapse isOpen={custom[0]} data-parent="#exampleAccordion" id="exampleAccordion1">
                      <p className="mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium lorem non vestibulum scelerisque. Proin a vestibulum sem, eget
                        tristique massa. Aliquam lacinia rhoncus nibh quis ornare.
                      </p>
                    </Collapse>
                  </div>
                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => toggleCustom(1)} aria-expanded={custom[1]} aria-controls="exampleAccordion2">
                      Toggle item 2
                    </Button>
                    <Collapse isOpen={custom[1]} data-parent="#exampleAccordion" id="exampleAccordion2">
                      <p className="mb-3">
                        Donec at ipsum dignissim, rutrum turpis scelerisque, tristique lectus. Pellentesque habitant morbi tristique senectus et netus et
                        malesuada fames ac turpis egestas. Vivamus nec dui turpis. Orci varius natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus.
                      </p>
                    </Collapse>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

export default Collapses;
