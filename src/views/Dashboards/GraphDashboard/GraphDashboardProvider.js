import React, { Component } from 'react'
import api from "../../../api";

const graphDashboardContext = React.createContext('dash');

const layout = {
  name: 'cola',
  directed: true,
  padding: 30,
  maxSimulationTime: 100,
  edgeLengthVal: 1,
  nodeSpacing: 150
};

class GraphDashboardProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cy: {},
      setCy

      last_findings: {},
      nodes: [],
      edges: [],

      time: 0,
      start: 0,
      isOn: false,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(graphId) {
    console.log("startTimer");
    console.log(graphId)

    let timer = setInterval(() => {
      api.getNodesByGraph(graphId)
        .then(res => {
          let cy = this.state.cy;
          let nodes = res.data.message.nodes;
          let sEdges = res.data.message.edges;

          // format
          var newElementFound = false;
          cy.batch(function () {
            nodes.some(function (elm) {
              var found = false;
              cy.nodes().forEach(function (n) {
                if (n.data('id') === elm.data.id) {
                  found = true;
                  return;
                }
              });
              if (!found) {
                cy.add([{group: "nodes", data: elm.data}]);
                newElementFound = true;
              }
            });
            sEdges.some(function (elm) {
              var found = false;
              cy.edges().forEach(function (n) {
                if (n.data('source') === elm.data.source &&
                  n.data('target') === elm.data.target &&
                  n.data('value') === elm.data.value &&
                  n.data('variable') === elm.data.variable
                ) {
                  found = true;
                  return;
                }
              });
              if (!found) {
                cy.add([{
                  group: "edges",
                  data: elm.data
                }
                ]);
                newElementFound = true;
              }
            });
          });

          // var lock = JSON.parse($("#lock_data_controller").html());
          // var elements_lock = [];
          // var elements = cy.elements();
          // var i = 0;
          // var displayLock = function(){
          //   if( i < elements.length ){
          //     elements_lock.some(function(elm){
          //       if(elements[i].data("source") !== 'undefined' &&
          //         elements[i].data("source") === elm.source &&
          //         elements[i].data("target") === elm.target &&
          //         elements[i].data("variable") === elm.variable) {
          //         elements[i].addClass('highlighted');
          //         return true
          //       }else{
          //         if(elements[i].data("source") === 'undefined') {
          //           return true
          //         }
          //       }
          //     });
          //
          //     i++;
          //     setTimeout(displayLock, 500);
          //   }
          // };
          //
          // if (lock.length > 0 ){
          //   // map
          //   elements_lock = JSON.parse(lock[0].relations);
          //   // array
          //   displayLock();
          // }
          //
          //
          // cy.edges().forEach(function(n){
          //   var variable = n.data('variable');
          //   var value = n.data('value');
          //
          //   n.qtip({
          //     content: function(){ return  variable + '=' + value },
          //     position: {
          //       my: 'top center',
          //       at: 'bottom center'
          //     },
          //     style: {
          //       classes: 'qtip-bootstrap',
          //       tip: {
          //         width: 16,
          //         height: 8
          //       }
          //     }
          //   });
          // });
          //
          // cy.nodes().forEach(function(n){
          //   var id = n.data('id');
          //
          //   if (!n.data('has_agent')) {
          //     n.addClass('node-unprotected');
          //   }else{
          //     n.addClass('node-protected');
          //   }
          //
          //   n.qtip({
          //     content: function(){ return  id },
          //     position: {
          //       my: 'top center',
          //       at: 'bottom center'
          //     },
          //     style: {
          //       classes: 'qtip-bootstrap',
          //       tip: {
          //         width: 16,
          //         height: 8
          //       }
          //     }
          //   });
          // });

          if (newElementFound) {
            console.log(newElementFound);
            // layout.stop();
            // layout = makeLayout();
            // layout.run();
            cy.layout(layout).run()
          }

          //UPDATE METRICS
          // $("#nodes-display-value").html(nodes.length);
          // $("#edges-display-value").html(edges.length);


          // update dashboard state
          this.setState({
            time: timer,
            start: Date.now() - this.state.time,
            isOn: true,
            nodes: nodes,
            edges: sEdges
          });
        })

        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
      // this.setState({time: Date.now() - this.state.start})

    }, 5000);

  }

  stopTimer() {
    console.log("stopTimer");
    this.setState({isOn: false});
    clearInterval(this.state.timer)
  }

  resetTimer() {
    this.setState({time: 0})
  }

  moveUp() {
    console.log("moveup");
    this.state.cy.panBy({
      x: 0,
      y: -50
    });
  }

  moveDown() {
    this.state.cy.panBy({
      x: 0,
      y: 50
    });
  }

  moveLeft() {
    this.state.cy.panBy({
      x: -50,
      y: 0
    });
  }

  moveRight() {
    this.state.cy.panBy({
      x: 50,
      y: 0
    });
  }

  zoomIn() {
    this.state.cy.zoom(this.state.cy.zoom() + 0.1);
    this.state.cy.center()
  }

  zoomOut() {
    this.state.cy.zoom(this.state.cy.zoom() - 0.1);
    this.state.cy.center()
  }

  // async componentDidMount() {
  //   this.startTimer();
  // }

  render() {
    return <graphDashboardContext.Provider
      value={{
        state: this.state,
        moveUp: this.moveUp,
        startTimer: this.startTimer,
        stopTimer: this.stopTimer,
      }}
    >
      {this.props.children}
    </graphDashboardContext.Provider>
  }
}

export const GraphDashboardContext =  graphDashboardContext;
export const GraphDashboardLayout =  layout;
export default GraphDashboardProvider;
