import React from 'react';
import { Col } from 'reactstrap';

const FooterList = ({ listItems, title }) => {
  return (
    <Col md="2" xs="4">
      <ul className="list-unstyled">
        <li className="font-weight-bold" style={{ color: 'white' }}>
          {title}
        </li>
        {listItems.map((l, index) => (
          <li key={index} className="text-muted">
            {l}
          </li>
        ))}
      </ul>
    </Col>
  );
};
export default FooterList;
