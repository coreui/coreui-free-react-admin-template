import * as React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, Progress} from 'reactstrap';
import * as classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';
import {IWidgetProps} from './iwidgetProps';

class Widget04 extends React.Component<IWidgetProps> {

  public static defaultProps: Partial<IWidgetProps> = {
    header: '87.500',
    icon: "icon-people",
    color: 'info',
    value: "25",
    children: "Visitors",
    invert: false
  };
  
  constructor(props: IWidgetProps) {
    super(props);
  }

  render() {
    const {className, cssModule, header, icon, color, value, children, invert, ...attributes} = this.props;

    // demo purposes only
    const progress = {style: "", color: color, value: value};
    const card = {style: "", bgColor: "", icon: icon};

    if (invert) {
      progress.style = "progress-white";
      progress.color = "";
      card.style = "text-white";
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames("progress-xs mt-3 mb-0", progress.style);

    return (
      <Card className={ classes } {...attributes}>
        <CardBody>
          <div className="h1 text-muted text-right mb-2">
            <i className={ card.icon }></i>
          </div>
          <div className="h4 mb-0">{ header }</div>
          <small className="text-muted text-uppercase font-weight-bold">{ children }</small>
          <Progress className={ progress.style } color={ progress.color } value={ progress.value }/>
        </CardBody>
      </Card>
    )
  }
}

export default Widget04;