import PropTypes from 'prop-types';

export interface IWidgetProps {
  header?: PropTypes.string;
  children?: PropTypes.node;
  footer?: PropTypes.bool;
  mainText?: PropTypes.string;
  smallText?: PropTypes.string;
  link?: PropTypes.string;
  icon?: PropTypes.string;
  color?: PropTypes.string;
  className?: PropTypes.string;
  cssModule?: PropTypes.object;
  value?: PropTypes.string;
  variant?: PropTypes.string;
  dataBox?: PropTypes.func;
  invert?: PropTypes.bool;
}