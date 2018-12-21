import {decorate, observable} from "mobx"

class GraphDashboardOptions {
  isGraphArOn = true;
  cy = {};
  params = {
    name: 'cola',
    directed: true,
    padding: 30,
    maxSimulationTime: 100,
    edgeLengthVal: 1,
    nodeSpacing: 150
  };

  isChartsArOn = true;
}

decorate(GraphDashboardOptions, {
  cy: observable
});


export const graphDashboardOptions = new GraphDashboardOptions();
