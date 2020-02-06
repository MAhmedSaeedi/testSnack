import React from 'react';
import { View, Text, Button, TouchableHighlight, Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import Login from './Screens/Login'

import MainScreen from './Screens/MainScreen'
import CustomSidebarMenu from './CustomSidebarMenu'
import HomePage from './Screens/HomePage'
import ManageEvents from './Screens/ManageEvents'
import EventDetails from './Screens/EventDetails'
import EventSummary from './Screens/EventSummary'
import ScoreCard from './Screens/ScoreCard'
import MatchCards from './Screens/MatchCards'
import LoadingScreen from './Screens/Loading';
import RefereeRequest from './Screens/RefereeRequest';


const ManageEventsStack = createStackNavigator(
    {
        ManageEvents: ManageEvents,
        EventDetails: EventDetails,
        MatchCards:MatchCards,
        
    },
    {
        initialRouteName: 'ManageEvents',
    }
);

const HomePageStack = createStackNavigator(
    {
        HomePage:{screen:HomePage, navigationOptions: {header: null}},
        RefereeRequestScreen:{screen:RefereeRequest, navigationOptions: {header: null}},
        
    },
    {
        initialRouteName:'HomePage',
    }
)

// const RefereeRequestStack = createStackNavigator(
//     {
//         RefereeRequest:{screen:RefereeRequest, navigationOptions: {header: null}}
//     },
//     {
//         initialRouteName:'RefereeRequest'
//     }
// )

const ScoreCardStack = createStackNavigator({
    ScoreCard: {screen:ScoreCard, navigationOptions: {header: null}}
},
{
    initialRouteName: 'ScoreCard',
})
const MainScreenStack = createStackNavigator(
    {
        MainScreen: MainScreen,
        EventSummary: EventSummary,
        
    },
    {
        initialRouteName: 'MainScreen',
    }
);

const EventSummaryStack = createStackNavigator(
    {
        EventSummary: EventSummary,
        
    },
    {
        initialRouteName: 'EventSummary',
    }
);
const DrawerNavigator = createDrawerNavigator({
    HomePageStack,
    // RefereeRequest,
    MainScreenStack,
    EventSummaryStack,
    ManageEventsStack
},
{
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#48A080' },
        headerTintColor: 'white',
        headerTitle:navigation.state.routes[navigation.state.index].key=='HomePageStack'?'Find Events':
                    navigation.state.routes[navigation.state.index].key=='MainScreenStack'?'Dashboard':
                    navigation.state.routes[navigation.state.index].key=='ManageEventsStack'?'Manage Events':
                    navigation.state.routes[navigation.state.index].key=='EventSummaryStack'?'Match Summary':
                    navigation.state.routes[navigation.state.index].key=='RefereeRequest'?'Request as Referee':'Profile',
        headerTitleStyle: { alignSelf: 'center' , textAlign:"center", flex:0.8 },
        headerLeft:
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={{ width: 30, height: 30, marginLeft: 10 }} source={require('../assets/navigation.png')} />
            </TouchableOpacity >
    }),
    // initialRouteName: 'MainScreenStack',
    initialRouteName: 'MainScreenStack',
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'drawerOpen',
    drawerCloseRoute: 'drawerClose',
    drawerToggleRoute: 'drawerToggle',
});

const RootStack = createStackNavigator(
    {   
        Loading:{screen:LoadingScreen, navigationOptions: {header: null}},
        Login: Login,
        
        HomePageStack:HomePageStack,
        MainTabs: DrawerNavigator,
        ScoreCard:{screen:ScoreCardStack, navigationOptions: {header: null}}
    },
    {
        initialRouteName: 'Loading',
    }
);
const AppContainer = createAppContainer(RootStack);
export default AppContainer