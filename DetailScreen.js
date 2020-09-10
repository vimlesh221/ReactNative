import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


class DetailScreen extends React.Component {
  render() {

    return (
      <View style={styles.container}>
       <Text style={styles.TextStyle}>
          {this.props.navigation.state.params.JSON_ListView_Clicked_Item
            ? this.props.navigation.state.params.JSON_ListView_Clicked_Item
            : 'No Value Passed'}
        </Text>
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




export default DetailScreen;
