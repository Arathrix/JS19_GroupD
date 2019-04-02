import React from 'react';
let {Component} = React;
import {Grid, Row, Col} from 'react-bootstrap';
import './Statistics.css';

let js = require('raw!./src.js');/* eslint no-undef:0 */

// import HousesTop5 from '../../common/Ranking/HousesTop5';
import PlodTop5 from '../../common/Ranking/PlodTop5';
import Survivors from '../../common/Ranking/Survivors';
// import MapComp from '../../common/MapComp/MapComp.jsx';

export default class Statistics extends Component {
  componentDidMount() {
    eval(js);
  }
  render() {
    return (<Grid id="Statistics">
      <Row className="chart-row">
        <Col md={4} >
          <div className="card">
            <Survivors className="ranking"/>
          </div>
        </Col>
        <Col md={4} >
          <div className="card">
            <PlodTop5 className="ranking"></PlodTop5>
          </div>
        </Col>
        <Col md={4} className="simple-info">
            <div className="card">
              <h5>Most likely survivor</h5>
              <h2>SANSA STARK</h2>
            </div>
            <div className="card">
              <h5>Most likely to die</h5>
              <h2>TOMMEN BARATHON</h2>
            </div>
            <div className="card">
              <h5>Most popular character</h5>
              <h2>JON SNOW</h2>
            </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={12} >
          <div className="card">
            <h3>Distribution of predicted likelihood of death</h3>
            <div className="center" id="distribution_plods"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={6} >
          <div className="card">
            <h3>Distribution of predicted likelihood of death for nobles and peasants</h3>
            <div className="center" id="distribution_nobles_plods"></div>
          </div>
        </Col>
        <Col md={6} >
          <div className="card">
            <h3>Number of male and female characters</h3>
            <div className="center" id="dead_and_alive"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={12} >
          <div className="card">
            <h3>Average PLOD across age groups</h3>
            <div className="center" id="distribution_plods_age_distribution"></div>
          </div>
        </Col>

      </Row>

      <Row className="chart-row">
        <Col md={6} >
          <div className="card">
            <h3>Average PLOD per episode</h3>
            <div className="center" id="avgPLOD_per_episode"></div>
          </div>
        </Col>
        {/*<Col md={6} >
          <div className="card">
            <h3>New characters introduced in each book</h3>
            <div className="center" id="new_characters_introduced"></div>
          </div>
        </Col>*/}
        <Col md={6} >
          <div className="card">
            <h3>New characters per episode</h3>
            <div className="center" id="characters_per_episode"></div>
          </div>
        </Col>
      </Row>
    </Grid>);
  }
}
