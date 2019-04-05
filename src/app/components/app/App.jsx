import React from 'react';
let { Component } = React;
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import './App.css';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import FooterCopy from './Footer/FooterCopy.jsx';

import About from '../public/About/About.jsx';
import Start from '../public/Start/Start.jsx';
import Statistics from '../public/Statistics/Statistics.jsx';
import Attributions from '../public/Attributions/Attributions.jsx';
import Contribute from '../public/Contribute/Contribute.jsx';
import Credits from '../public/Credits/Credits.jsx';
import EpisodesRecap from '../public/EpisodesRecap/EpisodesRecap.jsx';
import Characters from '../public/Characters/Characters.jsx';
import CharacterListPage from '../public/CharacterListPage/CharacterListPage.jsx';
import Imprint from '../public/Imprint/Imprint.jsx';
import PrivacyPolicy from '../public/PrivacyPolicy/PrivacyPolicy.jsx';
import PlodDescription from '../public/PlodDescription/PlodDescription.jsx';

import {Route, Switch} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="page-wrap">
        <div className="wrap">
          <Header />
          <Container fluid className="main-container">
            {/* {this.props.children || <Start />} */}
            <Switch>
              <Route exact path={this.props.match.path} component={Start} />
              <Route path={`/imprint`} component={Imprint} />
              <Route path={`/about`} component={About} />
              <Route path={`/credits`} component={Credits} />
              <Route path={`/episodes-recap`} component={EpisodesRecap} />
              <Route path={`/contribute`} component={Contribute} />
              <Route path={`/privacy`} component={PrivacyPolicy} />
              <Route path={`/machine-learning-algorithm-predicts-death-game-of-thrones`} component={PlodDescription} />
              <Route path={`/statistics`} component={Statistics} />
              <Route path={`/attributions`} component={Attributions} />
              <Route exact path={`/characters`} component={CharacterListPage}/>
              <Route exact path={`/characters/:id`} component={Characters}/>
            </Switch>
          </Container>
        </div>
        <Footer />
        <FooterCopy />
      </div >
    );
  }
}
App.propTypes = { children: PropTypes.object };
