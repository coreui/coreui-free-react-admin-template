import React, {Component} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane} from 'reactstrap';
import NotificationSystem from "react-notification-system";
import './quickstart.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles/hljs';


class QuickStart extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
      appDepl: '',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleAppDepl(appDepl) {
    if (this.state.appDepl !== appDepl) {
      this.setState({
        appDepl: appDepl
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      appDepl: ''
    })
  }


  render() {

    let codeDockerfile =
      `RUN (wget -O /usr/local/bin/damper_watcher-linux_x86_64-${'{DAMPERVER}'}.tar https://storage.googleapis.com/damperio-releases/damper_watcher-linux_x86_64-${'{DAMPERVER}'}.tar && \\
    tar xvf /usr/local/bin/damper_watcher-linux_x86_64-${'{DAMPERVER}'}.tar -C /usr/local/bin/ && mv /usr/local/bin/damper_watcher-linux_x86_64-${'{DAMPERVER}'} /usr/local/bin/damper-watcher) && \\
    chmod 755 -R /usr/local/bin/damper-watcher
COPY ./to_watch.txt /usr/local/bin/damper-watcher/}`;

    let dockerCommand =
      `docker run -d --name damper-agent \\
           -e LOG_LEVEL=debug \\
           -e METRICS_COLLECTOR_TYPE=prometheus \\
           -e METRICS_EXPOSE_PORT="8080" \\
           -e GRPC_SERVER_SERVER_ADDR="8080" \\
           -e GRPC_SERVER_CA_FILE="8080" \\
           -e GRPC_SERVER_SERVER_HOST_OVERRIDE="8080" \\
           damper/agent:latest`;

    let templateKubernetes =  `apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: {{ template "shellshock-application.fullname" . }}
  labels:
    app: {{ template "shellshock-application.name" . }}
    chart: {{ template "shellshock-application.chart" . }}
    release: {{ .Release.Name }}
    heritage: {{ .Release.Service }}

spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ template "shellshock-application.name" . }}
      release: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ template "shellshock-application.name" . }}
        release: {{ .Release.Name }}
    spec:
      imagePullSecrets:
      - name: damperiodockerhub
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          imagePullSecrets:
            - name: damperiodockerhub
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
            - name: http-metrics
              containerPort: 8080
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          env:
            - name: SAM_ENV
              value: "{{ .Values.env }}"
            - name: LOG_LEVEL
              value: "{{ .Values.log_level }}"
            - name: METRICS_COLLECTOR_TYPE
              value: "{{ .Values.metrics.type }}"
            - name: METRICS_EXPOSE_URL
              value: "{{ .Values.metrics.url }}"
            - name: METRICS_EXPOSE_PORT
              value: "{{ .Values.metrics.port }}"
            - name: FLUENTD_AGGREGATOR_SVC_SERVICE_HOST
              value: "{{ .Values.fluentdaggr.host }}"
            - name: FLUENTD_AGGREGATOR_SVC_SERVICE_PORT_FLUENTD_AGGREGATOR_ENDPOINT_TCP
              value: "{{ .Values.fluentdaggr.port }}"
            - name: GRPC_SERVER_SERVER_ADDR
              value: "{{ .Values.damper.commander.host }}"
            - name: GRPC_SERVER_CA_FILE
              valueFrom:
                secretKeyRef:
                  name: {{ .Release.Name }}-secret
                  key: grpc_server_ca_file
            - name: GRPC_SERVER_SERVER_HOST_OVERRIDE
              value: "{{ .Values.damper.commander.host_override }}"
          resources:
{{ toYaml .Values.resources | indent 12 }}
          command:
            - "/bin/bash"
            - "-c"
            - "--"
          args :
            - 'cd /usr/local/bin/damper-watcher/ && ./bin/start-damper-watcher.sh && /usr/sbin/apache2ctl -DFOREGROUND'`;

    const appDepl = this.state.appDepl;
    return (
      <div>
        <div>
          <NotificationSystem ref="notificationSystem" />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item">Help</li>
            <li className="breadcrumb-item active">Quick Start</li>
          </ol>
        </div>
        <div className="animated fadeIn padding-20">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="4" md="3" className={'mb-5'}>
                      <div className={'frame'}>
                        <span className={'helper'}><img className={'img-circle'} src={'../assets/img/avatars/admin-default.jpg'} alt="admin@bootstrapmaster.com" />&nbsp;&nbsp;&nbsp;&nbsp;Welcome <span className={'light-blue'}>admin</span>!</span>
                      </div>
                    </Col>
                    <Col xs="8" md="9" className={'mb-5'}>
                      <div className={'centered alert alert-danger no-data-message'}>
                        This page is unfortunately unavailable at the moment as there is not enough data collected.<br />
                        Please refer to the documentation right below to find more information about how to configure your infrastructure and applications in order to start using Damper.
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="2">
                      <ListGroup id="list-tab" role="tablist">
                        <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >Your Configuration</ListGroupItem>
                        <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >N-Protect Configuration</ListGroupItem>
                        <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >N-Spill Configuration</ListGroupItem>
                        <ListGroupItem onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Interface Overview</ListGroupItem>
                        <ListGroupItem onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Dashboard Overview</ListGroupItem>
                        <ListGroupItem onClick={() => this.toggle(5)} action active={this.state.activeTab === 5} >Configuration Overview</ListGroupItem>
                      </ListGroup>
                    </Col>
                    <Col xs="10">
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={0} >
                          <p>
                            We have started processing the data sent to the platform.<br/><br />
                            So far, we have collected: <br /><br />
                            <ul>
                              <li><Badge color={'danger'}>0</Badge> Agents Deployed</li>
                              <li><Badge color={'danger'}>0</Badge> Findings</li>
                              <li><Badge color={'danger'}>0</Badge> Graphs or Nodes</li>
                            </ul>
                            We were not able to retrieve all the information sent to the platform. If you have already configured your applications to send information to the platform, we highly recommend you to double check your configuration. <br /><br />
                            If you have not configured your applications yet, please click <a href={'#'} onClick={() => this.toggle(1)}>here</a> to get started.
                          </p>
                        </TabPane>
                        <TabPane tabId={1}>
                          <span className={'h55 mb-2'}><span className="circle-blue">1</span>How do your deploy the application you want to monitor ?</span>
                          <div className={'row mb-5'}>
                            <div className={'column'}>
                              <span onClick={() => this.toggleAppDepl('docker')} style={{marginRight: '35px'}} className={this.state.appDepl === 'docker' ? 'app-depl-active' : ''}><img style={{width: '100%'}} src={'../assets/img/logos/docker_3.png'} alt="docker logo" /></span>
                              <span onClick={() => this.toggleAppDepl('k8')} style={{marginRight: '30px'}} className={this.state.appDepl === 'k8' ? 'app-depl-active' : ''}><img style={{width: '90%'}} src={'../assets/img/logos/kubernetes.png'} alt="kubernetes logo" /></span>
                              <span onClick={() => this.toggleAppDepl('gke')} style={{marginRight: '30px'}} className={this.state.appDepl === 'gke' ? 'app-depl-active' : ''}><img style={{width: '95%'}} src={'../assets/img/logos/gke.png'} alt="gke logo" /></span>
                              <span onClick={() => this.toggleAppDepl('ecs')} style={{marginRight: '25px'}} className={this.state.appDepl === 'ecs' ? 'app-depl-active' : ''}><img style={{width: '80%'}} src={'../assets/img/logos/amazon_ecs.png'} alt="ecs logo" /></span>
                              <span onClick={() => this.toggleAppDepl('openshift')} style={{marginRight: '20px'}} className={this.state.appDepl === 'openshift' ? 'app-depl-active' : ''}><img style={{width: '83%'}} src={'../assets/img/logos/openshift.png'} alt="openshift logo" /></span>
                              <span onClick={() => this.toggleAppDepl('eks')} className={this.state.appDepl === 'eks' ? 'app-depl-active' : ''}><img style={{width: '75%'}} src={'../assets/img/logos/amazon_eks.png'} alt="eks logo" /></span>
                            </div>
                          </div>
                          <div style={{display: appDepl === 'docker' ? 'block' : 'none'}}>
                            <span className={'h55  mb-2'}><span className="circle-blue">2</span>Installation</span>
                            <p className={'mb-3'}>
                              The Agent has a containerized installation. To run a Docker container which embeds the Agent to monitor your host, use the following command:
                            </p>
                            <SyntaxHighlighter className={'mb-5'} showLineNumbers language='dockerfile' style={githubGist}>
                              {dockerCommand}
                            </SyntaxHighlighter>
                            <span className={'h55 mb-2'}><span className="circle-blue">4</span>Configuration</span>
                            <p className={'mb-4'}>
                              The agent can be configured with following options:
                              <ul>
                                <li><span className={'code-high'}>LOG_LEVEL</span>: The log verbosity of the agent. Value (debug | info | error | fatal).</li>
                                <li><span className={'code-high'}>METRICS_COLLECTOR_TYPE</span>: The agent is coded in <span className={'code-high'}>Golang</span>. You can therefore scrap the metrics with your favourite monitoring system. Value (prometheus).</li>
                                <li><span className={'code-high'}>METRICS_EXPOSE_PORT</span>: The port exposing the <span className={'code-high'}>Golang</span> metrics. Value ([Int]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_SERVER_ADDR</span>: The address of the <span className={'code-high'}>commander</span>. Value ([Ip]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_CA_FILE</span>: The certificate authority of the commander.<span className={'code-high'}>commander</span>. Value ([String]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_SERVER_HOST_OVERRIDE</span>: The address of the server verifying the SSL configuration. Value ([Ip]]).</li>
                              </ul>
                            </p>
                          </div>
                          <div style={{display: appDepl === ('k8' || 'gke') ? 'block' : 'none'}}>
                            <span className={'h55  mb-2'}><span className="circle-blue">2</span>Installation</span>
                            <p className={'mb-3'}>
                              The agent has to be deployed alongside with the application. It means that tt is deployed in the same container as the application.
                              Therefore, the agent needs to be included in the container while building your docker image. Add the following couple of line to your <span className={'code-high'}>Dockerfile</span>.
                            </p>
                            <SyntaxHighlighter className={'mb-5'} showLineNumbers language='dockerfile' style={githubGist}>
                              {codeDockerfile}
                            </SyntaxHighlighter>
                            <span className={'h55 mb-2'}><span className="circle-blue">3</span>Deployment</span>
                            <p className={'mb-4'}>
                              Once you container contains the executable, you can now configure your Kubernetes template to run the agent alongside your application.
                            </p>
                            <SyntaxHighlighter className={'mb-5'} showLineNumbers language='yaml' style={githubGist}>
                              {templateKubernetes}
                            </SyntaxHighlighter>
                            <span className={'h55 mb-2'}><span className="circle-blue">4</span>Configuration</span>
                            <p className={'mb-4'}>
                              The agent can be configured with following options:
                              <ul>
                                <li><span className={'code-high'}>LOG_LEVEL</span>: The log verbosity of the agent. Value (debug | info | error | fatal).</li>
                                <li><span className={'code-high'}>METRICS_COLLECTOR_TYPE</span>: The agent is coded in <span className={'code-high'}>Golang</span>. You can therefore scrap the metrics with your favourite monitoring system. Value (prometheus).</li>
                                <li><span className={'code-high'}>METRICS_EXPOSE_PORT</span>: The port exposing the <span className={'code-high'}>Golang</span> metrics. Value ([Int]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_SERVER_ADDR</span>: The address of the <span className={'code-high'}>commander</span>. Value ([Ip]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_CA_FILE</span>: The certificate authority of the commander.<span className={'code-high'}>commander</span>. Value ([String]]).</li>
                                <li><span className={'code-high'}>GRPC_SERVER_SERVER_HOST_OVERRIDE</span>: The address of the server verifying the SSL configuration. Value ([Ip]]).</li>
                              </ul>
                            </p>
                          </div>
                        </TabPane>
                        <TabPane tabId={2}>
                          <p>Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum voluptate. Irure Lorem et laboris
                            nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim tempor. Consectetur
                            est minim nostrud nostrud consectetur irure labore voluptate irure. Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et
                            deserunt culpa sit eiusmod deserunt. Consectetur et fugiat anim do eiusmod aliquip nulla
                            laborum elit adipisicing pariatur cillum.</p>
                        </TabPane>
                        <TabPane tabId={3}>
                          <p>Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia magna
                            sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore
                            aute occaecat ea aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco
                            nisi amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor
                            eiusmod eu pariatur culpa mollit in irure.</p>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default QuickStart;

