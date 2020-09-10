/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import FlatListDisplay from './src/FlatListDisplay'
import GridScreen from './src/GridScreen';
import Welcome from './src/Welcome'
import Profile from './src/Profile';
import Summary from './src/Summary';
import HomeScreen from './src/HomeScreen';
import Settings from './src/Settings';
import DetailScreen from './src/DetailScreen';


class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const homeStack =  createStackNavigator ({
  Home: {
    screen: HomeScreen,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Home',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  
 
}
},
{
  defaultNavigationOptions : {
    gesturesEnabled : false
  }
}


);

const ProfileStack =  createStackNavigator ({
  Profile: {
    screen: Profile,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Profile',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  }
});
const SettingStack =  createStackNavigator ({
  Settings: {
    screen: Settings,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Settings',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  }

});

const FlatListStack =  createStackNavigator ({
  FlatListDisplay: {
    screen: FlatListDisplay,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'FlatList',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  }
});
const GridStack =  createStackNavigator ({
  GridScreen: {
    screen: GridScreen,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Grid',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  }

});
const SummaryStack =  createStackNavigator ({
  Summary: {
    screen: Summary,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Summary',
        headerLeft: (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>

        )
      };
    }
  }

});

//-----------------------
const dashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: homeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/home.png')} />
        )
      }
    },
    FlatListDisplay: {
      screen: FlatListStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/avatar.png')} />
        )
      }
    },
    GridScreen: {
      screen: GridStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/settings.png')} />
        )
      }
    }

  },
  {
    navigationOptions: ({ navigation }) => {
    //  const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: '',
        header : null // remove tab navigation 
      };
    }
  }
);

//-----------------------

const dashboardStackNavigator = createStackNavigator(
  {
    dashboardTabNavigator: dashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (

          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={navigation.openDrawer} hitSlop={{ paddingLeft: 10, top: 20, bottom: 20, left: 50, right: 50 }}>
            <Image style={{ paddingLeft: 20, width: 20, height: 20 }} source={require('./src/assets/image/menu.png')} />
          </TouchableOpacity>


        )
      };
    }
  }

);


//-----------------------

const appDrawerNavigator = createDrawerNavigator({
  Home: { screen: dashboardStackNavigator },
  Summary: { screen: SummaryStack },
  DetailScreen: { screen: DetailScreen }


});

//-----------------------

const appSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Home: { screen: appDrawerNavigator }
 
});

//----------******---------------
const AppContainer = createAppContainer(appSwitchNavigator)



//----style sheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
  }
});

export default App;
