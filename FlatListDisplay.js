import React, { Component } from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   ScrollView,
   TextInput,
   FlatList,
   Alert,
   TouchableOpacity,
   AsyncStorage,
   Button,
} from 'react-native';
import moment from 'moment';
import { sha256 } from 'react-native-sha256';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress';
import Loader from './Loader';


export default class FlatListDisplay extends Component {
constructor(props) {
  super(props);
  this.getSha256= this.getSha256.bind(this);
   this.getListLeaderBoardCall= this.getListLeaderBoardCall.bind(this);
   this.GetListItem= this.GetListItem.bind(this);
   this.state = { 
    data:'',
    date:'',
    hashString:'',
    isloading: false,
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
  var dateString = year + '-' + '0'+month + '-' + +date + ' ' +'0'+ hours + ':' + min + ':' + sec;
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
      this.getListLeaderBoardCall();
  })
}
getListLeaderBoardCall(){
 
  var that = this;
  that.setState({
    isloading: true
});
  var form = new FormData();
  form.append('task', "getmonthlyleaderboard");
   form.append('mem_mobile', "7065228686");
   form.append('signature', that.state.hashString);
   form.append('requesttime', that.state.date);
   form.append('token', "772:6hr53r9u082h463wtmymr7kmgpabcshi");

   fetch('https://in.rs.dreaminfo.in/api/api.php',
       {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'multipart/form-data'
           },
           body: json,
       })
       .then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log('Status:'+result.Status);
        console.log('Message:'+result.Message);
      if(result.Status === "OK"){
        that.setState({
          data: result.Data.monthly_leader_board,
          isloading: false,
        });
      }
  
     }).catch(function (error) {
       console.log("-------- error ------- "+error);
      alert("result:"+error)
     });
}
GetListItem (name) {
  Alert.alert(name);
}

ItemSeparatorLine = () => {
  return (
    <View
    style={{height: .5,width: "100%",backgroundColor: "red",}}
    />
  );
}

render() {
  return ( 
    <View style={styles.container}>
     <Loader
                    loading={this.state.isloading} />
    <FlatList
      data={ this.state.data.Monthly }
      ItemSeparatorComponent = {this.ItemSeparatorLine}

  renderItem={({item}) => 
   <TouchableOpacity activeOpacity={0.9} onPress={this.GetListItem.bind(this, item.mem_shop_name)}>
   <View style={styles.container} >
   <Text style={styles.welcome} > {item.mem_shop_name} </Text>
   <Text style={styles.welcome} > {item.mem_month_target_percentage} </Text>

<Button
  onPress={this.GetListItem.bind(this, item.mem_shop_name)}
/>
   </View>
</TouchableOpacity>

  }
keyExtractor={(item, index) => index.toString()}
/>
</View> 
);
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  width:400,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
},
welcome: {
  fontSize: 20,
  textAlign: 'center',
  justifyContent: 'center',
  margin: 10,
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
});