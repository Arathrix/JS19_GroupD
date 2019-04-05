import React from 'react';
let {Component} = React;
import tombstone from './rip_tombstone.png';

import PropTypes from 'prop-types';

export default class DeadCharacter extends Component {
    render() {
        return (
            <div className="noPlod center">
                <div className="noPlodText">
                    <h2 className="center">Valar Morghulis</h2>
                    <p className="center">{this.props.name} is dead in the {this.props.mediumText}</p>
                </div>
                <div className="deathDate">
                    <img src={tombstone} />
                    <div>{this.props.deathText}</div>
                </div>
            </div>
        );
    }
}

DeadCharacter.propTypes = { 
    name: PropTypes.string,
    mediumText: PropTypes.string,
    deathText: PropTypes.string
};

DeadCharacter.defaultProps = { 
    name: "This character",
    mediumText: "Game of Thrones",
    deathText: "D E A D"
};
