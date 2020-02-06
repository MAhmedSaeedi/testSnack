import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button , AsyncStorage} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.itemDeleted=false
    this.data=''
    this.state = {
      modalVisible: false,
      parsedData:''
    }
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: require('../assets/Blog_gray.png'),
        navOptionName: 'Dashboard',
        screenToNavigate: 'MainScreen',
      },
      {
        navOptionThumb: require('../assets/Video_gray.png'),
        navOptionName: 'Find Events',
        screenToNavigate: 'HomePageStack',
      },
      {
        navOptionThumb: require('../assets/Contact_Us_gray.png'),
        navOptionName: 'Manage Events',
        screenToNavigate: 'ManageEvents',
      },

      // {
      //   navOptionThumb: require('../assets/Blog_gray.png'),
      //   navOptionName: 'My Profile',
      //   screenToNavigate: 'BlogPosting',
      // },
    ];
  }
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
  closeAndLogout() {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('Login')
    this.props.navigation.closeDrawer()
  }
  UNSAFE_componentWillMount(){
    this.getUserData()
  }

  async getUserData(){
    try{
      let user = await AsyncStorage.getItem('userProfileData')
      // console.log('Here',user)
      this.data= JSON.parse(user)
      // console.log(this.data)

    }catch(error){
      alert(error)
    }
  }

  UserLogout(){
    firebase.auth().signOut().then(function() {
      this.props.navigation.closeDrawer()
      AsyncStorage.removeItem('userProfileData')
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
    }))
      //this.props.navigation.navigate('Login',{loading:true})
    }).catch(function(error) {
      // An error happened.
    });
  }

  // async deleteItem(){
  //   try{
  //     // await AsyncStorage.removeItem('userId');
  //     this.UserLogout()
  //   }catch(error){

  //   }
  // }
  render() {
    // console.log(this.state.parsedData.address)
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={{ backgroundColor: '#48A080', width: '100%', margin: 0, padding: 20 }}>
        
          <Image
            source={require('../assets/User_Icon.png')}
            style={{ width: 50, height: 50,borderRadius:100,marginTop:20 }}
          />
          <Text style={{fontSize:Responsive.font(23),color:'white',fontFamily: 'open-sans-bold'}}>{this.data.firstName}</Text>
          <Text style={{fontSize:Responsive.font(13),color:'white',fontFamily: 'open-sans-bold'}}>{this.data.email}</Text>
        </View>
       
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity onPress={() => {
              global.currentScreenIndex = key;
              this.props.navigation.navigate(item.screenToNavigate,this.data);
            }}
              key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: global.currentScreenIndex === key ?  '#86d6b9' : '#ffffff',
                }}

              >
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Image source={item.navOptionThumb} style={{ width: 30, height: 30 }} color="#808080" />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? 'white' : 'black',
                    fontFamily: 'open-sans-bold',
                  }}
                >
                  {item.navOptionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => this.UserLogout()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#ffffff',
              }}

            >
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Image source={require('../assets/logout_Gray.png')} style={{ width: 30, height: 30 }}  />
              </View>
              <Text 
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff7400',
  },
  contentTitle:{
    fontSize:23
  },
  yesOrNO: {
    marginLeft: 20,
     marginRight: 20,
      marginTop: 30,
      borderRadius:20,
      width:50
  }
});