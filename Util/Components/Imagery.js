import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import ImageInputBox from './ImageInputBox';
class Imagery extends Component {
  state = {
    length: null,
    width: null,
    spotInfo: null,
    count: 0,
  };
  componentDidMount = async () => {
    const length = parseInt(this.props.length);
    const width = parseInt(this.props.width);
    var spotInfo = new Array();
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < width; j++) {
        spotInfo.push({
          row: i,
          column: j,
          class: null,
        });
      }
    }
    this.setState({
      length: this.props.length,
      width: this.props.width,
      spotInfo: spotInfo,
      count: 0,
    });
  };
  classUpdate = (classname, row, column) => {
    var spotInfo = this.state.spotInfo;
    for (var i = 0; i < spotInfo.length; i++) {
      if (spotInfo[i].row == row && spotInfo[i].column == column) {
        spotInfo[i].class = classname;
        break;
      }
    }
    this.setState({spotInfo: spotInfo, count: this.state.count + 1});
  };
  renderItem = ({item}) => (
    <ImageInputBox
      row={item.row}
      column={item.column}
      class={item.class}
      onClassRecieve={this.classUpdate}
    />
  );
  printClasses = () => {
    for (var i = 0; i < this.state.spotInfo.length; i++) {
      console.log(this.state.spotInfo[i]);
    }
  };
  proceedInterpolate = () => {
    if (this.state.count >= 0) {
      Actions.result({data: this.state});
    } else {
      alert('Input atleast 5 images');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 4,
            alignItems: 'center',
            backgroundColor: 'white',
            height: 45,
            padding: 5,
            marginBottom: 10,
            marginTop: 5,
          }}>
          <Button
            color="#5a99d3"
            title="TO hOME"
            onPress={() => Actions.main({refresh: true})}
          />
          <Button
            title="Interpolate"
            color="#55b949"
            onPress={this.proceedInterpolate}
          />
        </View>
        {this.state.spotInfo == null ? null : (
          <FlatList
            data={this.state.spotInfo}
            renderItem={this.renderItem}
            keyExtractor={() => Math.random().toString(36).substring(7)}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '20%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    height: '6%',
    padding: 5,
    marginBottom: '3%',
    marginTop: '3%',
    marginLeft: '2%',
    marginRight: '2%',
  },
});

export default Imagery;
