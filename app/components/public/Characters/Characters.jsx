/*eslint no-undef: 0*/

import React from 'react';
let {Component} = React;
import $ from 'jquery';
import './Characters.css';
import { Row, Col, Grid, Image, ProgressBar, Glyphicon } from 'react-bootstrap';

import MapComp from '../../common/MapComp/MapComp.jsx';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterDetails from '../../common/CharacterDetails/CharacterDetails.jsx';
import SentimentStore from '../../../stores/TwitterSentimentsStore';
import SentimentActions from '../../../actions/TwitterSentimentsActions';
import CharacterPlodDisplay from '../../common/CharacterPlodDisplay/CharacterPlodDisplay';
import tombstone from './rip_tombstone.png';

import characterPlaceholderMale from './placeholder-male.png';
import characterPlaceholderFemale from './placeholder-female.png';

export default class Character extends Component {

    constructor (props) {
        super(props);
        this.state = {
            character: Store.getCharacter(),
            plodShow: 0,
            plodBook: 0,
            plodArff: '0',
            plodTextShow: '',
            plodTextBook: '',
            sentiment: {
                positive: 0,
                negative: 0
            },
            chartLoaded: false,
            plodByYearShow: [],
            plodByYearBook: []
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount (){
        Store.addChangeListener(this._onChange);
    }

    componentDidMount() {
        Actions.loadCharacter(decodeURIComponent(this.props.params.id));
        SentimentActions.loadCharacterSentiment(decodeURIComponent(this.props.params.id));
    }

    componentWillUnmount(){
        Store.removeChangeListener(this._onChange);
    }

    _onChange() {
        const character = Store.getCharacter();
        this.setState({
            character: character,
            sentiment: SentimentStore.getCharacterSentiment()
        });

        const checkShow = !character.dateOfDeath && character.gotplod && character.gotarffplod;
        const checkBook = !character.dateOfDeath && character.gotplod && character.gotarffplod;
        this.setState({
            // temporary dummy data
            plodShow: (checkShow) ? parseInt(character.gotplod.plod) || 0 : 100,
            plodByYearShow: character.plodByYearShow,
            plodTextShow: (checkShow) ? '%(percent)s%' : 'D E A D',

            // TODO: remove 100 -
            plodBook: (checkBook) ? parseInt(100 - character.gotplod.plod) || 0 : 100,
            plodByYearBook: character.plodByYearBook,
            plodTextBook: (checkBook) ? '%(percent)s%' : 'D E A D',

            character: character,
            sentiment: SentimentStore.getCharacterSentiment() || { positive: 0, negative: 0}
        });
        
        console.log(this.state); /*eslint no-console:0,no-undef:0*/

        $('head').append('<link rel="stylesheet" type="text/css" href="/d4/chart.css">');

        this.setState({
            chartLoaded: true
        });
    }

    togglePlodDisplay() {
        $(".plodShowContainer, .plodBookContainer").toggleClass("hidden");
        let button = $(".togglePlodDisplayButtonBackground");
        if (button.hasClass("active")) {
            button.removeClass("active").animate({
                "left": "0",
                "backgroundColor": "#5A180C"
            }, 200);
        } else {
            button.addClass("active").animate({
                "left": "50%",
                "backgroundColor": "#7a7a7a"
            }, 200);
        }
    }

    render() {
        let img =(this.state.character.imageLink)
            ? process.env.__PROTOCOL__ + process.env.__API__ + "/" + this.state.character.imageLink : 
            ((this.state.character.male || this.state.character.male == undefined) ? characterPlaceholderMale : characterPlaceholderFemale);
            
        return (
          <Grid>
            <div className="character-container">
                <Row fluid>
                    <div className="header-image">
                        <div className="character-name-container">
                            <Col xs={12} sm={9}  md={8} className="character-name">
                                <div className="u-inlineBlock"><h1>{this.state.character.name}</h1></div>
                                <a href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}
                                   target="_blank"
                                   className="btn--secondary wikiButton u-inlineBlock">
                                    <Glyphicon glyph="share-alt" />
                                    Wiki
                                </a>
                            </Col>
                        </div>
                    </div>
                </Row>
                <Row className="character-intro" fluid >
                    <Col xs={6} xsOffset={3} sm={3} smOffset={0} md={3} mdOffset={1} className="character-photo">
                        <Image thumbnail src={img}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="togglePlodDisplayButton" onClick={this.togglePlodDisplay}>
                            <div className="togglePlodDisplayButtonBackground"></div>
                            <div className="togglePlodDisplayButtonOption">Show</div>
                            <div className="togglePlodDisplayButtonOption">Book</div>
                        </div>
                        <div className="plodShowContainer">
                            <h2>Likelihood of surival</h2>
                            <p>{this.state.character.name}'s likelihood to survive between 300 and 320 AC is:</p>
                            <div className="plodContainer">
                                <CharacterPlodDisplay plodByYear={this.state.plodByYearShow} />
                            </div>
                            <p>{this.state.character.name}'s likelihood to die in season 8 is:</p>
                            <div className="plodContainer">
                                <ProgressBar now={this.state.plodShow} label={this.state.plodTextShow} />
                                <img src={tombstone} />
                            </div>
                        </div>
                        <div className="plodBookContainer hidden">
                            <h2>Likelihood of surival</h2>
                            <p>{this.state.character.name}'s likelihood to survive between 300 and 320 AC is:</p>
                            <div className="plodContainer">
                                <CharacterPlodDisplay plodByYear={this.state.plodByYearBook} />
                            </div>
                            <p>{this.state.character.name}'s likelihood to die in <i>'the Winds of Winter'</i> is:</p>
                            <div className="plodContainer">
                                <ProgressBar now={this.state.plodBook} label={this.state.plodTextBook} />
                                <img src={tombstone} />
                            </div>
                        </div>
                        <p>Our in-house developed machine learning algorithm predicts
                            likelihood of surival based on various features that we extracted
                            for each character from the first five books of the Song of Ice
                            and Fire series. </p>
                        <p><a href="/machine-learning-algorithm-predicts-death-game-of-thrones">Click here to read more about our prediction algorithm.</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <CharacterDetails data={this.state.character} />
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>People on Twitter say</h2>
                        <svg id="chart" width="100%" height="400"></svg>

                    </Col>
                </Row>
                <Row>
                    <Col  md={8} mdOffset={2}>
                        Overall we registered { this.state.sentiment.positive || 0 } positive tweets and {this.state.sentiment.negative || 0} negative tweets for {this.state.character.name}.
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>Follow {this.state.character.name}</h2>
                    </Col>
                    <Col>
                        <MapComp character={[this.props.params.id]} />
                    </Col>
                </Row>

            </div>
          </Grid>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };
