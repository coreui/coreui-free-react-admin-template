import {decorate, observable} from "mobx"

class GraphDashboardOptions {
  // Graph
  cy = {};
  params = {
    name: 'cola',
    directed: true,
    padding: 30,
    maxSimulationTime: 100,
    edgeLengthVal: 1,
    nodeSpacing: 200
  };
  // Timers
  chartsArTimer = {};
  chartsArTime = 2000;
  isChartsArOn = true;

  graphArTimer = {};
  graphArTime = 2000;
  isGraphArOn = true;

  // Layout
  isDraggable = true;

  updateIsDraggable(val) {
    this.isDraggable = val;
  }

  stopChartsArTimer() {
    clearInterval(this.chartsArTimer)
  }

  stopGraphArTimer() {
    clearInterval(this.graphArTimer)
  }
}

decorate(GraphDashboardOptions, {
  cy: observable,
  isDragAndDrop: observable,
});

export const graphDashboardOptions = new GraphDashboardOptions();
