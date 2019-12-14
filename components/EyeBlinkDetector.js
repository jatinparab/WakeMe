import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({
  eyeCss: {
    position: 'absolute',
    backgroundColor: 'lightgreen',
    borderRadius: 100,
    height: 10,
    width: 10
  }
})

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    showEyesClosedAlert: false,
    type: Camera.Constants.Type.front,
    eyes: { leftEye: {}, rightEye: {}}
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.eyes.leftEye != this.state.eyes.leftEye || prevState.eyes.rightEye != this.state.eyes.rightEye)
      if(this.state.eyes.leftEye.open < 0.55 || this.state.eyes.rightEye.open < 0.55) {
        this.setState({...this.state, showEyesClosedAlert: true})
        Vibration.vibrate()
      }
      else
        this.setState({...this.state, showEyesClosedAlert: false})
  }

  handleFacesDetected(result) {
    console.log("FACE DETECT")
    if(!result.faces)
      return

    for(let face of result.faces) {
      // console.log("HERE")
      let eyes = { leftEye: {}, rightEye: {}}
      if(face.leftEyePosition) {
        eyes.leftEye = {x: face.leftEyePosition.x, y: face.leftEyePosition.y, open: face.leftEyeOpenProbability}
      }
      if(face.rightEyePosition)
        eyes.rightEye = {x: face.rightEyePosition.x, y: face.rightEyePosition.y, open: face.rightEyeOpenProbability}

      this.setState({...this.state, eyes})
    }
  }

  render() {
    console.log("RENDER")
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }}
            type={this.state.type}
            onFacesDetected = { this.handleFacesDetected.bind(this) }
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
              minDetectionInterval: 60,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              { this.state.showEyesClosedAlert ?
                <Text style={{ position: 'absolute', top: 5, color: 'red', width: '100%', textAlign: 'center', fontSize: 15 }}>************ EYES CLOSED ************</Text>
                : null
              }
              { this.state.eyes.leftEye.x ? 
                <Text style={{ ...styles.eyeCss, left: this.state.eyes.leftEye.x, top:this.state.eyes.leftEye.y , opacity: this.state.eyes.leftEye.open}}></Text>
                : null
              }

              { this.state.eyes.rightEye.x ? 
                <Text style={{ ...styles.eyeCss, left: this.state.eyes.rightEye.x, top:this.state.eyes.rightEye.y, opacity: this.state.eyes.rightEye.open}}></Text>
                : null
              }
            </View>
          </Camera>
        </View>
      );
    }
  }
}
