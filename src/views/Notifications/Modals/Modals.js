import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

function Modals(props) {
  const [modal, setModal] = useState(false);
  const [large, setLarge] = useState(false);
  const [small, setSmall] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [danger, setDanger] = useState(false);
  const [info, setInfo] = useState(false);

  function toggle() {
    setModal(!modal);
  }

  function toggleLarge() {
    setLarge(!large);
  }

  function toggleSmall() {
    setSmall(!small);
  }

  function togglePrimary() {
    setPrimary(!primary);
  }

  function toggleSuccess() {
    setSuccess(!success);
  }

  function toggleWarning() {
    setWarning(!warning);
  }

  function toggleDanger() {
    setDanger(!danger);
  }

  function toggleInfo() {
    setInfo(!info);
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Bootstrap Modals
            </CardHeader>
            <CardBody>
              <Button onClick={toggle} className="mr-1">
                Launch demo modal
              </Button>
              <Modal isOpen={modal} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button onClick={toggleLarge} className="mr-1">
                Launch large modal
              </Button>
              <Modal
                isOpen={large}
                toggle={toggleLarge}
                className={"modal-lg " + props.className}
              >
                <ModalHeader toggle={toggleLarge}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleLarge}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleLarge}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button onClick={toggleSmall} className="mr-1">
                Launch small modal
              </Button>
              <Modal
                isOpen={small}
                toggle={toggleSmall}
                className={"modal-sm " + props.className}
              >
                <ModalHeader toggle={toggleSmall}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleSmall}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleSmall}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <hr />

              <Button color="primary" onClick={togglePrimary} className="mr-1">
                Primary modal
              </Button>
              <Modal
                isOpen={primary}
                toggle={togglePrimary}
                className={"modal-primary " + props.className}
              >
                <ModalHeader toggle={togglePrimary}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={togglePrimary}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={togglePrimary}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button color="success" onClick={toggleSuccess} className="mr-1">
                Success modal
              </Button>
              <Modal
                isOpen={success}
                toggle={toggleSuccess}
                className={"modal-success " + props.className}
              >
                <ModalHeader toggle={toggleSuccess}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={toggleSuccess}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleSuccess}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button color="warning" onClick={toggleWarning} className="mr-1">
                Warning modal
              </Button>
              <Modal
                isOpen={warning}
                toggle={toggleWarning}
                className={"modal-warning " + props.className}
              >
                <ModalHeader toggle={toggleWarning}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" onClick={toggleWarning}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleWarning}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button color="danger" onClick={toggleDanger} className="mr-1">
                Danger modal
              </Button>
              <Modal
                isOpen={danger}
                toggle={toggleDanger}
                className={"modal-danger " + props.className}
              >
                <ModalHeader toggle={toggleDanger}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={toggleDanger}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleDanger}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Button color="info" onClick={toggleInfo} className="mr-1">
                Info modal
              </Button>
              <Modal
                isOpen={info}
                toggle={toggleInfo}
                className={"modal-info " + props.className}
              >
                <ModalHeader toggle={toggleInfo}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleInfo}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleInfo}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Modals;
