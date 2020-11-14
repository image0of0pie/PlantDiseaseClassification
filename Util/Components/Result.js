import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Button, View} from 'react-native';
import InterpolatedView from './InterpolatedView';
class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View
          style={{
            width: '30%',
            alignSelf: 'baseline',
            margin: 10,
          }}>
          <Button
            color="#5a99d3"
            title="hOME"
            onPress={() => Actions.main((refresh = true))}
          />
        </View>
        <InterpolatedView data={this.props.data} />
      </View>
    );
  }
}

export default Result;
