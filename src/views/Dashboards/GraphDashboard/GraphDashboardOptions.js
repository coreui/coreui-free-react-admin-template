import {decorate, observable} from "mobx"

class GraphDashboardOptions {
  // Graph
  graphVar = '';
  cy = { elements: () => {return []} };
  params = {
    name: 'cola',
    directed: true,
    padding: 30,
    maxSimulationTime: 100,
    edgeLengthVal: 1,
    nodeSpacing: 200
  };
  relationsInLock = [];
  // Timers
  chartsArTimer = {};
  chartsArTime = 2000;
  isChartsArOn = true;

  graphArTimer = {};
  graphArTime = 2000;
  isGraphArOn = true;

  // Layout
  isDraggable = false;

  updateIsDraggable(val) {
    this.isDraggable = val;
  }

  stopChartsArTimer() {
    clearInterval(this.chartsArTimer)
  }

  stopGraphArTimer() {
    clearInterval(this.graphArTimer)
  }

  getCy() {
    return this.cy;
  }
}

decorate(GraphDashboardOptions, {
  cy: observable,
  isDragAndDrop: observable,
});

export const graphDashboardOptions = new GraphDashboardOptions();
