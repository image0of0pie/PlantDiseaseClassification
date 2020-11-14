import React from 'react';
import {
  Button,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import axios, * as others from 'axios';
import FormData from 'form-data';
import DocumentPicker from 'react-native-document-picker';
export default class ImageInputBox extends React.Component {
  state = {
    avatarSource: null,
    row: this.props.row,
    column: this.props.column,
    class: this.props.class,
    showLoading: false,
  };

  constructor(props) {
    super(props);
  }
  selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({
        avatarSource: res,
        showLoading: true,
      });

      var formData = new FormData();
      formData.append('image', res, 'image');
      const url = 'https://pdc-api-lite.herokuapp.com/';
      await axios({
        method: 'POST',
        url: url + 'predict',
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then((res) => {
          this.setState({class: res.data.class, showLoading: false});
          this.props.onClassRecieve(
            res.data.class,
            this.state.row,
            this.state.column,
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>R {this.state.row}</Text>
        <Text>C {this.state.column}</Text>
        <View style={[styles.avatarContainer]}>
          <Button
            style={styles.avatar}
            color={
              this.state.class == null
                ? 'blue'
                : this.state.class.includes('healthy')
                ? 'green'
                : 'red'
            }
            onPress={this.selectOneFile}
            title="S"></Button>
        </View>
        {this.state.showLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : null}
        <Text>{this.state.class == null ? 'N/A' : this.state.class}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#e9f9f9',
    minWidth: 100,
    height: 45,
    padding: 5,
    marginBottom: 3,
  },
  avatarContainer: {
    height: 8,
    width: 33,
    marginBottom: 30,
  },
});
