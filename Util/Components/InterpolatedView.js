import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Modal,
  Button,
} from 'react-native';
import {Dimensions} from 'react-native';
const NUM_PIXELS = 60;
export default class InterpolatedView extends Component {
  state = {
    showPreview: false,
    disease: null,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {};
  handleBackButton = () => {
    return true;
  };
  toggleModalView = (disease) => {
    this.setState({showPreview: !this.state.showPreview, disease: disease});
  };
  showView = () => {
    const MARGIN = Math.pow(NUM_PIXELS, 0.7);
    var lengthMultiplier =
      (NUM_PIXELS * 1.0) / parseInt(this.props.data.length);
    var widthMultiplier = (NUM_PIXELS * 1.0) / parseInt(this.props.data.width);
    var gridColorInfo = Array.from(NUM_PIXELS);
    for (var i = 0; i < NUM_PIXELS; i++) {
      gridColorInfo[i] = new Array(NUM_PIXELS);
      for (var j = 0; j < NUM_PIXELS; j++) {
        gridColorInfo[i][j] = 0;
      }
    }
    this.props.data.spotInfo.map((val) => {
      if (val.class != null) {
        if (val.class == this.state.disease) {
          // console.log(
          //   val.row,
          //   val.column,
          //   Math.floor(
          //     parseInt(val.row) * lengthMultiplier + lengthMultiplier / 2,
          //   ),
          //   Math.floor(
          //     parseInt(val.column) * widthMultiplier + widthMultiplier / 2,
          //   ),
          // );
          gridColorInfo[
            Math.floor(
              parseInt(val.row) * lengthMultiplier + lengthMultiplier / 2,
            )
          ][
            Math.floor(
              parseInt(val.column) * widthMultiplier + widthMultiplier / 2,
            )
          ] = 2;
        } else if (val.class.includes('healthy')) {
          // console.log(
          //   val.row,
          //   val.column,
          //   Math.floor(
          //     parseInt(val.row) * lengthMultiplier + lengthMultiplier / 2,
          //   ),
          //   Math.floor(
          //     parseInt(val.column) * widthMultiplier + widthMultiplier / 2,
          //   ),
          // );
          gridColorInfo[
            parseInt(val.column) * lengthMultiplier + lengthMultiplier / 2
          ][parseInt(val.column) * widthMultiplier + widthMultiplier / 2] = 1;
        }
      }
    });
    var gridColorInfoUp = Array.from(NUM_PIXELS);
    for (var i = 0; i < NUM_PIXELS; i++) {
      gridColorInfoUp[i] = new Array(NUM_PIXELS);
      for (var j = 0; j < NUM_PIXELS; j++) {
        gridColorInfoUp[i][j] = gridColorInfo[i][j];
        if (gridColorInfo[i][j] != 0) continue;
        var valueRed = 100 * 100,
          valueGreen = 100 * 100;
        for (var k = 0; k < NUM_PIXELS; k++) {
          for (var l = 0; l < NUM_PIXELS; l++) {
            if (gridColorInfo[k][l] == 1) {
              valueGreen = Math.min(
                valueGreen,
                Math.abs(i - k) * Math.abs(i - k) +
                  Math.abs(j - l) * Math.abs(j - l),
              );
            } else if (gridColorInfo[k][l] == 2) {
              valueRed = Math.min(
                valueRed,
                Math.abs(i - k) * Math.abs(i - k) +
                  Math.abs(j - l) * Math.abs(j - l),
              );
            }
          }
        }
        if (valueGreen < valueRed && valueGreen <= MARGIN) {
          gridColorInfoUp[i][j] = 1;
        }
        if (valueGreen > valueRed && valueRed <= MARGIN) {
          gridColorInfoUp[i][j] = 2;
        }
      }
    }

    var data = [];
    for (var i = 0; i < NUM_PIXELS; i++) {
      for (var j = 0; j < NUM_PIXELS; j++) {
        data.push({
          row: i,
          column: j,
          color:
            gridColorInfoUp[i][j] == 2
              ? 'red'
              : gridColorInfoUp[i][j] == 1
              ? 'green'
              : 'blue',
        });
      }
    }

    return (
      <Modal animationType="slide" transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              shadowColor: '#000',
              height: '68%',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 25,
              padding: 15,
            }}>
            <View
              style={{
                width: '40%',
                alignSelf: 'center',
                marginRight: '2%',
              }}>
              <Button
                title="Close"
                onPress={() => this.setState({showPreview: false})}
              />
            </View>
            <Text>{this.state.disease}</Text>
            <ShowView data={data} NUM_PIXELS={NUM_PIXELS} />
          </View>
        </View>
      </Modal>
    );
  };
  giveDiseaseList = (spotInfo) => {
    var diseases = new Set();
    spotInfo.map((val) => {
      if (val.class != null) {
        diseases.add(val.class);
      }
    });
    var diseaseList = [];
    diseases.forEach((val) => {
      if (!val.includes('healthy')) {
        diseaseList.push({
          name: val,
        });
      }
    });
    return diseaseList;
  };
  render() {
    const diseaseList = this.giveDiseaseList(this.props.data.spotInfo);
    return (
      <View>
        {diseaseList.length == 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 4,
              alignItems: 'center',
              backgroundColor: '#f0f2f5',
              height: 45,
              padding: 5,
              marginBottom: 3,
            }}>
            <Text>No disease found</Text>
            <Button title="Overview" disabled={true} />
          </View>
        ) : (
          diseaseList.map((val) => (
            <View key={Math.random().toString(36).substring(7)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 4,
                  alignItems: 'center',
                  backgroundColor: '#f0f2f5',
                  height: 45,
                  padding: 5,
                  marginBottom: 3,
                }}>
                <Text>{val.name}</Text>
                <Button
                  title="Overview"
                  onPress={() => {
                    this.setState({
                      showPreview: !this.state.showPreview,
                      disease: val.name,
                    });
                  }}
                />
              </View>
            </View>
          ))
        )}
        {this.state.showPreview ? <this.showView /> : null}
      </View>
    );
  }
}

class ShowView extends Component {
  render() {
    const {data, NUM_PIXELS} = this.props;
    var size = Dimensions.get('window').width / (NUM_PIXELS * 1.0);
    const styles = StyleSheet.create({
      itemContainer: {
        width: size,
        height: size,
      },
      item: {},
    });
    return (
      <FlatList
        style={{margin: 5}}
        data={data}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text
              style={{
                backgroundColor: item.color,
              }}></Text>
          </View>
        )}
        keyExtractor={() => Math.random().toString(36).substring(7)}
        numColumns={NUM_PIXELS}
      />
    );
  }
}
