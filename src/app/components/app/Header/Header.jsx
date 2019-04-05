import React from 'react';
import 'jquery';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import {Container} from "reactstrap";
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import "./Header.css";
import TUMLogoWritten from "./tum-word-mark.svg";
import TUMLogo from "./tum-logo.svg";
import $ from "jquery";

let { Component } = React;

export default class Header extends Component {
    render() {
        $('.navbar-collapse.collapse.in ul li a').on('click', function () {/*eslint no-console:0,no-undef:0*/
            $(".navbar-toggle").click();/*eslint no-console:0,no-undef:0*/
        });
        return (
            <header>
                <div className="navbar-tum-top">
                    <Container>
                        <Row>
                            <Col>
                                <img className="TUMLogoWritten" src={TUMLogoWritten} />
                                <img className="TUMLogo" src={TUMLogo} />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">A Song of Ice and Data</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to={{ pathname: '/characters' }}>
                                <Button variant="link">Characters</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/map' }}>
                                <Button variant="link">Map</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/statistics' }}>
                                <Button variant="link">Ranking <span style={{ fontFamily: 'Cinzel' }}>&</span> Statistics</Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </header>
        );
    }
}
