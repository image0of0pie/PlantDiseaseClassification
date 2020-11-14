import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  BackHandler,
  Modal,
  Text,
} from 'react-native';
import Logo from '../Images/logo.png';
import axios, * as others from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
class Main extends Component {
  state = {
    length: null,
    width: null,
    start: false,
    showGuide: false,
    showLoading: false,
  };
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    if (this.props.refresh) {
      Actions.refresh();
    }
  };
  handleBackButton = () => {
    BackHandler.exitApp();
  };
  checkValues = () => {
    if (
      /^\d+$/.test(this.state.length) != true ||
      /^\d+$/.test(this.state.width) != true
    ) {
      alert('Enter numeric value for Length and Width');
      return false;
    } else if (
      parseInt(this.state.length) < 5 ||
      parseInt(this.state.length) > 10 ||
      parseInt(this.state.width) < 5 ||
      parseInt(this.state.width) > 10
    ) {
      alert('Enter values for Length and Width in the range of 5 to 10');
      return false;
    }
    return true;
  };
  proceedToImagery = async () => {
    if (this.checkValues()) {
      this.setState({showLoading: true});
      const url = 'https://pdc-api-lite.herokuapp.com/';
      await axios({
        method: 'POST',
        url: url + 'predict',
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      this.setState({showLoading: false});
      Actions.imagery({length: this.state.length, width: this.state.width});
    }
  };
  start = () => {
    this.setState({start: true});
  };
  render() {
    const classes = [
      'Apple scab',
      'Apple Black_rot',
      'Apple Cedar_apple_rust',
      'Apple healthy',
      'Blueberry healthy',
      'Cherry(including_sour) Powdery_mildew',
      'Cherry_(including_sour) healthy',
      'Corn(maize) Cercospora or Gray leaf spot',
      'Corn(maize) Common rust',
      'Corn(maize) Northern Leaf Blight',
      'Corn(maize) healthy',
      'Grape Black rot',
      'Grape Esca (Black Measles)',
      'Grape Leaf blight(Isariopsis Leaf Spot)',
      'Grape healthy',
      'Orange Haunglongbing (Citrus greening)',
      'Peach Bacterial spot',
      'Peach healthy',
      'Pepper,bell Bacterial spot',
      'Pepper,bell healthy',
      'Potato Early blight',
      'Potato Late blight',
      'Potato healthy',
      'Raspberry healthy',
      'Soybean healthy',
      'Squash Powdery mildew',
      'Strawberry Leaf scorch',
      'Strawberry healthy',
      'Tomato Bacterial spot',
      'Tomato Early blight',
      'Tomato Late blight',
      'Tomato leaf Mold',
      'Tomato Septoria leaf spot',
      'Tomato spider mites Two-spotted spider mite',
      'Tomato Target Spot',
      'Tomato Yellow Leaf Curl Virus',
      'Tomato Tomato mosaic virus',
      'Tomato healthy',
    ];
    return (
      <View style={{flex: 1}} key={Math.random().toString(36).substring(10)}>
        <ScrollView>
          <Spinner
            color="cyan"
            visible={this.state.showLoading}
            textContent={'Loading....'}
          />
          <Image source={Logo} style={styles.logoStyle} />
          {this.state.start ? (
            <View key={Math.random().toString(36).substring(10)}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                key={Math.random().toString(36).substring(10)}
                style={{marginTop: 100}}>
                <TextInput
                  style={styles.item}
                  placeholder="Length of field"
                  keyboardType="number-pad"
                  onChangeText={(val) => this.setState({length: val})}
                  value={this.state.length}
                />
                <TextInput
                  style={styles.item}
                  placeholder="Breadth of field"
                  keyboardType="number-pad"
                  onChangeText={(val) => this.setState({width: val})}
                  value={this.state.width}
                />
              </ScrollView>
              <View
                key={Math.random().toString(36).substring(10)}
                style={{
                  marginTop: 40,
                  width: '50%',
                  alignSelf: 'center',
                }}>
                <Button title="Proceed" onPress={this.proceedToImagery} />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.startButtonStyle}>
                <Button title="Start" color="green" onPress={this.start} />
              </View>
              <View
                style={{
                  width: '40%',
                  marginTop: 5,
                  alignSelf: 'center',
                }}>
                <Button
                  title="Guide"
                  onPress={() => this.setState({showGuide: true})}
                />
              </View>
            </View>
          )}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showGuide}>
          <View
            key={Math.random().toString(36).substring(10)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 25,
                padding: 25,
                width: '90%',
                height: '95%',
              }}>
              <View
                key={Math.random().toString(36).substring(10)}
                style={{
                  width: '40%',
                  alignSelf: 'center',
                  marginRight: '2%',
                }}>
                <Button
                  title="Close"
                  onPress={() => this.setState({showGuide: false})}
                />
              </View>
              <ScrollView style={{marginTop: 10, marginBottom: 25}}>
                <Text style={styles.textStyling}>
                  Classes available for prediction
                </Text>
                <View
                  key={Math.random().toString(36).substring(10)}
                  style={{shadowColor: 'grey', shadowOpacity: 1}}>
                  {classes.map((val, idx) => (
                    <Text
                      style={{flex: 1}}
                      key={Math.random().toString(36).substring(10)}
                      style={{
                        fontSize: 12,
                        color: val.includes('healthy') ? 'green' : 'red',
                      }}>
                      {idx + 1}. {val}
                    </Text>
                  ))}
                </View>
                <Text style={{marginTop: 10, fontSize: 14}}>
                  In the next page there will be Length * Width number of input
                  boxes reqpresenting the cells spread over the field. Users are
                  supposed to submit more images for accurate result. Images
                  will be submitted in the Blue colored box in the right end.
                </Text>
                <Text style={{marginTop: 10, fontSize: 14}}>
                  Click proceed to find overviews for every predicted disease
                </Text>
                <Text style={{marginTop: 20, fontSize: 14}}>
                  Thank you for using .....
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
    alignSelf: 'center',
    margin: 1,
    width: '60%',
    height: 40,
    borderColor: '#2a4944',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#55b949',
  },
  logoStyle: {
    width: 300,
    height: 115,
    marginTop: '30%',
    alignSelf: 'center',
  },
  startButtonStyle: {
    width: '40%',
    marginTop: 200,
    alignSelf: 'center',
  },
  textStyling: {
    fontSize: 16,
  },
});

export default Main;
