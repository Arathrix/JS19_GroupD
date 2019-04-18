import React from 'react';
let {Component} = React;
import Actions from '../../../actions/CharactersActions';
import { browserHistory } from 'react-router';
import { Slide } from 'react-slideshow-image';
import $ from 'jquery';
import window from 'global';

import './RelatedCharacters.css';

export default class RelatedCharacters extends Component {

    getRelatedPotential() {
        const MAX_RELATED = 20;

        let character = this.props.character;

        let relatedCandidates = [];
        if (character.hasShow && character.show.hasOwnProperty('related')) {
            character.show.related.forEach((v) => {
                v.imageLink = "show/images/" + v.slug + ".jpg";
                v.mentions *= 100; // we want show characters more
            });
            relatedCandidates = character.show.related;
        }

        if (character.hasBook && character.book.hasOwnProperty('related')) {
            character.book.related.forEach((v) => {
                v.imageLink = "book/images/" + v.slug + ".jpg";
            });
        }

        relatedCandidates.sort((a, b) => {
            let aAliveMultiplier = a.alive ? 1000 : 1;
            let bAliveMultiplier = b.alive ? 1000 : 1;

            return bAliveMultiplier * b.mentions - aAliveMultiplier * a.mentions;
        });

        relatedCandidates = relatedCandidates.slice(0, MAX_RELATED);

        let pages = [];
        let page = [];
        let size = 4;
        for (let i = 0; i < relatedCandidates.length; i++) {
            page.push(relatedCandidates[i]);

            if (page.length % size === 0) {
                pages.push(page);
                page = [];
            }
        }

        if (page.length > 0) {
            pages.push(page);
            page = [];
        }

        return pages;
    }

    render() {
        var properties = {
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            autoplay:false
        };

        if (window.innerWidth < 450) {
            properties.transitionDuration = 300;
        }

        let pagerank = this.props.character.hasShow && this.props.character.show.pagerank ? this.props.character.show.pagerank.rank 
            : (this.props.character.book.pagerank ? this.props.character.book.pagerank.rank : 0);

        if (pagerank <= 150) {
            return <span></span>;
        }
        
        let related = this.getRelatedPotential();
        if (related.length <= 1) {
            properties.arrows = false;
            properties.indicators = false;
        }

        if (!this.props.character.hasShow && !this.props.character.hasBook || related.length === 0) {
            return <span></span>;
        }

        var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;

        let content =             
            <Slide {...properties}>
            {
                related.map(function (page, index) {
                    return (<div className="each-slide" key={'slider-'+index}>
                    {
                        page.map((value, index) => {
                            return <span key={index} className={index > 2 ? "hideOnMobile" : ""} onClick={() => {
                                Actions.loadCharacter(decodeURIComponent(value.name));

                                $('.indicators div[data-key="0"]').trigger('click');

                                browserHistory.push({
                                    pathname: '/characters/' + value.name
                                });
                            }}>
                                <div className="relatedCharacter">
                                    <div className="imageContainer">
                                        <img src={baseUrl + value.imageLink} />
                                    </div>
                                    <div className="characterNameContainer">
                                        <div className="characterName">{value.name}</div>
                                    </div>
                                </div>
                            </span>;
                        })
                    }</div>);
                })
            }
            </Slide>;

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
