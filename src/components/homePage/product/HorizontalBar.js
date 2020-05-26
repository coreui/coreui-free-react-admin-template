import React, { Component } from 'react'

export class HorizontalBar extends Component {
    render() {
        return (
            <div>
                <div className="percent-tooltip" style={{marginLeft: `calc(${this.props.percent} - 20px)`}}>
                     {this.props.percent}
                </div>
                <div className="progress-bar">
                    <div className="filter" style={{width: `${this.props.percent}`}}></div>
                </div>
            </div>
        )
    }
}

export default HorizontalBar
