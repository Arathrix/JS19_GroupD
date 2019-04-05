import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

import ImprintText from '../../../../config/markdown/imprint.md';

export default class Imprint extends Component {
	render() {
	return (
		<Row>
			<Col xs={{span:10,offset:1}} sm={{span:10,offset:1}} md={{span:8,offset:2}}>
        		<div dangerouslySetInnerHTML={{ __html: ImprintText}} />

            </Col>
		</Row>
	);
	}
}
