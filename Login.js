import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


class Login extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
      </View>

    );

  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
  }
});




export default Login;
