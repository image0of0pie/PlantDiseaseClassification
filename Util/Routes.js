import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Main from './Components/Main';
import Imagery from './Components/Imagery';
import Result from './Components/Result';
class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="main" component={Main} hideNavBar={true} initial={true} />
          <Scene key="imagery" component={Imagery} hideNavBar={true} />
          <Scene key="result" component={Result} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}

export default Routes;
