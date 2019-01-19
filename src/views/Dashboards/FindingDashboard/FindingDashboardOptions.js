import {decorate, observable} from "mobx"

class FindingDashboardOptions {
  // Timer
  isArOn = true;
  arRefreshTime = 15000;
  chartsArTimer = {};

  // Layout
  isDraggable = false;

  updateIsDraggable(val) {
    this.isDraggable = val;
  }

  updateIsArOn(val) {
    this.isArOn = val;
  }

  stopChartsArTimer() {
    clearInterval(this.chartsArTimer)
  }
}

decorate(FindingDashboardOptions, {
  isDraggable: observable,
});

export const findingDashboardOptions = new FindingDashboardOptions();
