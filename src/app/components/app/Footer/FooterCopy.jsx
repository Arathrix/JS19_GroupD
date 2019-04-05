import React from 'react';
let {Component} = React;
import './Footer.css';
import {Row,Col} from 'react-bootstrap';

export default class FooterCopy extends Component {
    render() {
        return (
            <div className="footer-copy">

                <div className="container">
                    <Row>
                        <Col md={12}>
                            <p className="text-center">
                                A Song of Ice and Fire setting is Copyright &copy; George R.R. Martin<br/>
                                &copy; Game of Thrones TM and copyright HBO<br/>
                                &copy; 2019 Song of Ice and Data - <span className="build-version"></span>
                            </p>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}