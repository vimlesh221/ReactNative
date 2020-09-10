import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Alert
} from 'react-native';
import { sha256 } from 'react-native-sha256';
import { FontAwesomeIcon } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'; 


class Welcome extends React.Component {

    constructor(props) {
        super(props);
         this.getSha256= this.getSha256.bind(this);
      
         this.state = { 
          data:''
         };
      }
    componentDidMount(){
        this.getSha256();
      }
      
getSha256(){
    var date = moment().format('yyyy-MM-dd HH:mm:ss');
    var shasting = date+"sugmg803hs756vjf83ak";
    sha256(shasting).then( hash => {
        console.log(hash);
    })
}
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Dashboard'
                    onPress={this._openDashboard.bind(this)}
                >
                </Button>

            </View>

        );
    }

    //function calling
    _openDashboard() {
        this.props.navigation.navigate('Home')
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
});




export default Welcome;
