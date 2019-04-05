/* eslint-disable no-alert, no-console */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './favicon.png';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import {Route} from "react-router";
import history from 'history';
// import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './app/components/app/App.jsx';
import Map from './app/components/public/Map/Map.jsx';
import Site404 from './app/components/public/404/404.jsx';

// import About from './app/components/public/About/About.jsx';
// import Start from './app/components/public/Start/Start.jsx';
// import Statistics from './app/components/public/Statistics/Statistics.jsx';
// import Attributions from './app/components/public/Attributions/Attributions.jsx';
// import Contribute from './app/components/public/Contribute/Contribute.jsx';
// import Credits from './app/components/public/Credits/Credits.jsx';
// import EpisodesRecap from './app/components/public/EpisodesRecap/EpisodesRecap.jsx';
// import Characters from './app/components/public/Characters/Characters.jsx';
// import CharacterListPage from './app/components/public/CharacterListPage/CharacterListPage.jsx';
// import Imprint from './app/components/public/Imprint/Imprint.jsx';
// import PrivacyPolicy from './app/components/public/PrivacyPolicy/PrivacyPolicy.jsx';
// import PlodDescription from './app/components/public/PlodDescription/PlodDescription.jsx';

ReactDOM.render(
  <BrowserRouter >
    <div>
      <Switch>
        <Route path="/" component={App} />
        <Route exact path="/map" component={Map} />
        <Route component={Site404} />
      </Switch>
    </div>
  </BrowserRouter>

  , document.getElementById('root')
);
