import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { sha256 } from 'react-native-sha256';
 

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.getSha256= this.getSha256.bind(this);
    this.state = {
      takingPic: false,
      PicturePath: "",
      date:'',
      hashString:'',
    };
  }
  componentDidMount(){
    this.getSha256();
   
  }
  
  getSha256(){
    var that = this;
    
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var dateString = year + '-' + '0'+month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
    console.log(dateString);
    var shasting = dateString+"sugmg803hs756vjf83ak";
    that.setState({
      date:dateString,
    });
    sha256(shasting).then( hash => {
        console.log(hash);
      
        that.setState({
          hashString: hash,
        });
     
    })
  }
  storePicture(){
    var that = this;
    console.log( that.state.PicturePath );
    if (that.state.PicturePath) {
      // Create the form data object
      var form = new FormData();
      form.append('task', "uploaddailyphoto");
      form.append('dailyphotofile', {uri: that.state.PicturePath, name: 'selfie.jpg', type: 'image/jpg'});
      form.append('mem_mobile', "7065228686");
      form.append('signature', this.state.hashString);
      form.append('requesttime', this.state.date);
      form.append('token', "772:6hr53r9u082h463wtmymr7kmgpabcshi");
      // Create the config object for the POST
      // You typically have an OAuth2 token that you use for authentication
      fetch('https://in.rs.dreaminfo.in/api/api.php',
       {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'multipart/form-data'
           },
           body: form,
       })
       .then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log("result:"+result);
        console.log('Status:'+result.Status);
        console.log('Message:'+result.Message);
       
      if(result.Status === "OK"){
      
      }
  
     }).catch(function (error) {
       console.log("-------- error ------- "+error);
      alert("result:"+error)
     });
  }
}

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
       
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        console.log(data);
        this.setState({PicturePath: data.uri});
      
      //  Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({takingPic: false});
      }

    }
  };

  render() {
    return (
      
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAlignment}
          onPress={this.takePicture}>
          <Icon name="camera" size={50} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.capture} onPress={this.storePicture.bind(this)}>[UPLOAD]</Text>
      
      </RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  btnAlignment: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
  },
});