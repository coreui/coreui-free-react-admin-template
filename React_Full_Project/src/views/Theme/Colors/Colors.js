import React, {Component} from 'react';

class Colors extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Theme colors
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-primary">Primary</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-secondary">Secondary</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-success">Success</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-danger">Danger</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-warning">Warning</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-info">Info</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-light">Light</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-dark">Dark</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Grays
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="p-3 bg-gray-100">100</div>
                <div className="p-3 bg-gray-200">200</div>
                <div className="p-3 bg-gray-300">300</div>
                <div className="p-3 bg-gray-400">400</div>
                <div className="p-3 bg-gray-500">500</div>
                <div className="p-3 bg-gray-600">600</div>
                <div className="p-3 bg-gray-700">700</div>
                <div className="p-3 bg-gray-800">800</div>
                <div className="p-3 bg-gray-900">900</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Additional colors
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-blue">Blue</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-indigo">Indigo</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-purple">Purple</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-pink">Pink</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-red">Red</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-orange">Orange</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-yellow">Yellow</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-green">Green</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-teal">Teal</div>
              </div>
              <div className="col-md-4">
                <div className="p-3 mb-3 bg-cyan">Cyan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Colors;
