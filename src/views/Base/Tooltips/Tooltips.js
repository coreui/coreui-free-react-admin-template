import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  UncontrolledTooltip
} from "reactstrap";

function TooltipItem(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  function toggle() {
    setTooltipOpen(!tooltipOpen);
  }

  return (
    <span>
      <Button className="mr-1" color="secondary" id={"Tooltip-" + props.id}>
        {props.item.text}
      </Button>
      <Tooltip
        placement={props.item.placement}
        isOpen={tooltipOpen}
        target={"Tooltip-" + props.id}
        toggle={toggle}
      >
        Tooltip Content!
      </Tooltip>
    </span>
  );
}

function Tooltips() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltips] = useState([
    {
      placement: "top",
      text: "Top"
    },
    {
      placement: "bottom",
      text: "Bottom"
    },
    {
      placement: "left",
      text: "Left"
    },
    {
      placement: "right",
      text: "Right"
    }
  ]);

  function toggle(i) {
    const newArray = tooltips.map((element, index) => {
      return index === i ? !element : false;
    });
    setTooltipOpen(newArray);
  }

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Tooltips</strong>
          <div className="card-header-actions">
            <a
              href="https://reactstrap.github.io/components/tooltips/"
              rel="noreferrer noopener"
              target="_blank"
              className="card-header-action"
            >
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          {/*eslint-disable-next-line*/}
          <p>
            Somewhere in here is a{" "}
            <a href="#/" id="TooltipExample">
              tooltip
            </a>
            .
          </p>
          <Tooltip
            placement="right"
            isOpen={tooltipOpen[0]}
            target="TooltipExample"
            toggle={() => {
              toggle(0);
            }}
          >
            Hello world!
          </Tooltip>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Tooltip</strong>
          <small> disable autohide</small>
        </CardHeader>
        <CardBody>
          {/*eslint-disable-next-line*/}
          <p>
            Sometimes you need to allow users to select text within a{" "}
            <a href="#/" id="DisabledAutoHideExample">
              tooltip
            </a>
            .
          </p>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[1]}
            autohide={false}
            target="DisabledAutoHideExample"
            toggle={() => {
              toggle(1);
            }}
          >
            Try to select this text!
          </Tooltip>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Tooltip</strong>
          <small> list</small>
        </CardHeader>
        <CardBody>
          {tooltips.map((tooltip, i) => {
            return <TooltipItem key={i} item={tooltip} id={i} />;
          })}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Tooltip</strong>
          <small> uncontrolled</small>
        </CardHeader>
        <CardBody>
          {/*eslint-disable-next-line*/}
          <p>
            Somewhere in here is a{" "}
            <a href="#/" id="UncontrolledTooltipExample">
              tooltip
            </a>
            .
          </p>
          <UncontrolledTooltip
            placement="right"
            target="UncontrolledTooltipExample"
          >
            Hello world!
          </UncontrolledTooltip>
        </CardBody>
      </Card>
    </div>
  );
}
export default Tooltips;
