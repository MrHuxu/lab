import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Style } from 'radium';

import { shape, bool, object, string } from 'prop-types';

import Menu from './menu';
import MusicPlayer from './music-player';
import TreeVisualizer from './tree-visualizer';

import { global, leftPanel, rightPanel } from '../styles/app';

const App = ({ match }) => (
  <div>
    <Style rules={ global } />

    <div style={ leftPanel }>
      <Menu />
    </div>

    <div style={ rightPanel }>
      { ('/' === window.location.hostname || match.isExact) ? (
        <Redirect to={ '/music-player' } />
      ) : null }
      <Route path="/music-player" component={ MusicPlayer } />
      <Route path="/tree-visualizer" component={ TreeVisualizer } />
    </div>

  </div>
);

App.propTypes = {
  match : shape({
    isExact : bool.isRequired,
    params  : object,
    path    : string.isRequired,
    url     : string.isRequired
  }).isRequired
};

export default App;
