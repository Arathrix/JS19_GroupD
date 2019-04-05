import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

import PlodDescriptionText from '../../../../config/markdown/plod-description.md';

export default class PlodDescription extends Component {
    render() {
        return (
            <div>
                <br/>
                <Row>
                    <Col xs={{span:10,offset:1}} sm={{span:10,offset:1}} md={{span:8,offset:2}}>
                      <div dangerouslySetInnerHTML={{ __html: PlodDescriptionText}} />
                    </Col>
                </Row>
            </div>
        );
    }
}
