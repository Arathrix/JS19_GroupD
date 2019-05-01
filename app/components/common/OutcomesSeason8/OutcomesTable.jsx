import React from 'react';
let { Component } = React;
import outcomesJSON from 'json!./outcomes.json';
import { Row, Col, Grid } from 'react-bootstrap';
import { Link } from 'react-router';

import './OutcomesTable.css';

export default class OutcomesTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;
        let characters = outcomesJSON.characters;
        let keys = Object.keys(characters);
        keys.sort((a, b) => {
            return characters[b].episode - characters[a].episode;
        });

        return(
            <Grid>
                <Row>
                    <Col>
                        <div id="outcomesTableContainer">
                            <p className="hideOnSmall" style={{margin: "5px"}}>PLOD = percentage likelihood of death</p>
                            <table>
                                <tbody>
                                    <tr className="tableHead">
                                        <th colSpan="2"></th>
                                        <th colSpan="6">Survival in episode</th>
                                    </tr>
                                    <tr className="tableHead">
                                        <th>Character</th>
                                        <th><span className="hideOnSmall">PLOD</span></th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                    </tr>
                                    {
                                        keys.map((kv, i) => {
                                            let v = characters[kv];

                                            return (
                                            <tr key={i} className="tableRow">
                                                    <td>
                                                        <Link to={"/characters/" + v.name}>
                                                            <div className="characterImgContainer">
                                                                <img src={baseUrl + "show/images/" + v.name.replace(/ /gi, '_') + ".jpg"} />
                                                            </div>
                                                            <span className="name">{v.name}</span>
                                                        </Link>
                                                    </td>
                                                <td className="plod">{v.plod}%</td>
                                                {
                                                    [1,2,3,4,5,6].map((w, j) => {
                                                        return (<td className="episodes" key={j}>
                                                            {v.episode === w ? <i className="fas fa-skull"></i> : (w <= outcomesJSON.currentEpisode && (w < v.episode || v.episode == 0) ? <i className="fas fa-check" style={{color: "#0c9a13"}}></i> : '')}
                                                        </td>);
                                                    })
                                                }
                                            </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}