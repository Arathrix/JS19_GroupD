import React from 'react';
let {Component} = React;
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import ContributeText from '../../../../config/markdown/contribute.md';

export default class Contribute extends Component {
  render() {
    return (
        <Row>
          <Col md={8} mdPush={2}>
            <div dangerouslySetInnerHTML={{ __html: ContributeText}} />
          </Col>
        </Row>
    );
  }
}
