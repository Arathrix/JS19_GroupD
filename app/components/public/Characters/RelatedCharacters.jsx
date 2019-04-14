import React from 'react';
let {Component} = React;
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import loading from './img/loading.svg';
//import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';

import './RelatedCharacters.css';

export default class RelatedCharacters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedCharacters: false
        };
    }

    componentWillMount() {
        if (Store.getAllCharacters().length === 0) {
            setTimeout(() => {
                Actions.loadCharacters();
            }, 2000);
        }
    }

    addToPotentialRelated(field, potential) {
        if (Array.isArray(field) && field.length > 0) {
            potential = [...potential, ...field];
        } else if (field && field.length > 0) {
            potential = [...potential, field];
        }

        return potential;
    }

    /*findValuesInCharFields(fieldName, searchValue) {

    }*/

    getRelatedPotential() {
        if (!this.props.character.hasShow && !this.props.character.hasBook) {
            return [];
        }

        let character = this.props.character.hasShow ? this.props.character.show : this.props.character.book;
        let characters = Store.getAllCharacters();
        
        // build an array of potential related characters, which will be filtered for alive
        let possibleRelated = [];

        // basic family members
        possibleRelated = this.addToPotentialRelated(character.siblings, possibleRelated);
        possibleRelated = this.addToPotentialRelated(character.spouse, possibleRelated);
        possibleRelated = this.addToPotentialRelated(character.lovers, possibleRelated);
        possibleRelated = this.addToPotentialRelated(character.father, possibleRelated);
        possibleRelated = this.addToPotentialRelated(character.mother, possibleRelated);
        // sometimes there are no children in the show listed
        if (this.props.character.book && this.props.character.book.children) {
            possibleRelated = this.addToPotentialRelated(this.props.character.book.children, possibleRelated);
        }
        if (this.props.character.show && this.props.character.show.children) {
            possibleRelated = this.addToPotentialRelated(this.props.character.show.children, possibleRelated);
        }

        // by house allegiance
        if (character.allegiances) {
            for (let i in characters) {
                let otherChar = characters[i];

                if (character.name == otherChar.name || otherChar.pageRank < 200) {
                    continue;
                }

                let allegiances = [];

                if (otherChar.book.hasOwnProperty('allegiance') && Array.isArray(otherChar.book.allegiance)) {
                    allegiances = otherChar.book.allegiance;
                }
                if (otherChar.show.hasOwnProperty('allegiances') && Array.isArray(otherChar.show.allegiances)) {
                    allegiances = [...allegiances, ...otherChar.show.allegiances];
                }

                if (allegiances.length === 0) {
                    continue;
                }

                let intersect = allegiances.filter(value => character.allegiances.includes(value));
                let multiplier = intersect.length / 3;
                if (character.house == (otherChar.hasShow ? otherChar.show.house : otherChar.book.house)) {
                    multiplier += 4;
                }
                if (allegiances.indexOf(character.name) > -1) {
                    multiplier += 100;
                }

                otherChar.sortVal = multiplier * otherChar.pageRank;
                // direct allegieance to character
                if (allegiances.indexOf(character.name) > -1 || intersect.length > 1) {
                    possibleRelated = this.addToPotentialRelated([otherChar.name], possibleRelated);
                }
            }
        }

        var possibleRelatedUnique = possibleRelated.filter((v, i, a) => a.indexOf(v) === i); 
        // filter to only those who have data
        let possibleRelatedWithData = [];
        for (let i in possibleRelatedUnique) {
            let charName = possibleRelatedUnique[i];
            for (let j in characters) {
                let otherChar = characters[j];
                if (otherChar.death > 0) {
                    continue;
                }

                if (otherChar.name == charName) {
                    possibleRelatedWithData.push(otherChar);
                    break;
                }
            }
        }

        possibleRelatedWithData.sort((a, b) => {
            return b.sortVal - a.sortVal;
        });

        return possibleRelatedWithData;
    }

    render() {
        if (pagerank <= 250) {
            return <span></span>;
        }
        
        let potential = this.getRelatedPotential();

        let pagerank = this.props.character.hasShow && this.props.character.show.pagerank ? this.props.character.show.pagerank.rank 
                    : (this.props.character.book.pagerank ? this.props.character.book.pagerank.rank : 0);

        if (!this.props.character.hasShow && !this.props.character.hasBook || potential.length === 0) {
            return <span></span>;
        }

        let content;
        if (Store.getCharacters().length === 0 && potential.length > 0) {
            content = <div className="center"><img style={{width: "100px", height: "100px"}} src={loading} alt="Loading..." /></div>;
        } else {
            let relatedShown = potential.slice(0, 4);
            content = <div>{
                relatedShown.map((value, index) => {
                    return <span key={index} onClick={() => {
                        let character = {
                            name: "",
                            hasShow: false,
                            hasBook: false,
                            show: {},
                            book: {}
                        };
                
                        this.setState({
                            render: 0,
                            character: character,
                            hasLoaded: false,
                
                            plodShow: 0,
                            plodBook: 0,
                
                            plodByYearShow: [],
                            plodByYearBook: [],
                
                            plodTextShow: '',
                            plodTextBook: ''
                        });

                        Actions.loadCharacter(decodeURIComponent(value.name));
                        browserHistory.push({
                            pathname: '/characters/' + value.name
                        });
                    }}>
                        <div className="relatedCharacter">
                            <div className="imageContainer">
                                <img src={value.imageLink} />
                            </div>
                            <div className="characterNameContainer">
                                <div className="characterName">{value.name}</div>
                            </div>
                        </div>
                    </span>;
                })
            }</div>;
        }

        return (
            <div className="relatedCharactersContainer">
                <hr />
                <h3 className="center">Related Characters</h3>
                <hr />
                <div className="relatedCharactersContent">
                    {content}
                </div>
            </div>
        );
    }
}

RelatedCharacters.propTypes = { character: React.PropTypes.object };
