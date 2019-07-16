import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverBody,
  PopoverHeader
} from "reactstrap";

function PopoverItem(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  function toggle() {
    setPopoverOpen(!popoverOpen);
  }

  return (
    <span>
      <Button
        className="mr-1"
        color="secondary"
        id={"Popover-" + props.id}
        onClick={toggle}
      >
        {props.item.text}
      </Button>
      <Popover
        placement={props.item.placement}
        isOpen={popoverOpen}
        target={"Popover-" + props.id}
        toggle={toggle}
        trigger="legacy"
        delay={0}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </Popover>
    </span>
  );
}

function Popovers() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popovers] = useState([
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

  function toggle() {
    setPopoverOpen(!popoverOpen);
  }

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Popovers</strong>
          <div className="card-header-actions">
            <a
              href="https://reactstrap.github.io/components/popovers/"
              rel="noreferrer noopener"
              target="_blank"
              className="card-header-action"
            >
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Button id="Popover1" onClick={toggle}>
            Launch Popover
          </Button>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={toggle}
          >
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
              Sed posuere consectetur est at lobortis. Aenean eu leo quam.
              Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </PopoverBody>
          </Popover>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Popovers</strong>
          <small> list</small>
        </CardHeader>
        <CardBody>
          {popovers.map((popover, i) => {
            return <PopoverItem key={i} item={popover} id={i} />;
          })}
        </CardBody>
      </Card>
    </div>
  );
}

export default Popovers;
