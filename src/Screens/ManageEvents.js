import React from 'react';
import { ActivityIndicator,FlatList,AsyncStorage, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa1 from './EventCardsMa1'
import EventCardsMa2 from './EventCardsMa2'
import Responsive from 'react-native-lightweight-responsive';
import EventCardsMa3 from './EventCardsMa3'
import axios from 'axios';


export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null,
        
    }
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            actScr: 1,
            eventsData:[],
            reqData:[],
            inviData:[],
            dataOneLoaded:false,
            dataOneFetching:false,
            dataTwoLoaded:false,
            dataTwoFetching:false,
            dataThreeLoaded:false,
            dataThreeFetching:false,
            showMessage:false,
            showTwoMessage:false,
            showThreeMessage:false,
            userIdGlobal:null
        };
    }


    componentDidMount(){
        this.getItem()
    }
    async getItem(){

        
            try{
                let user = await AsyncStorage.getItem('userProfileData')
                // console.log('Here',user)
                this.data= JSON.parse(user)
                // console.log(this.data)
                //this.setState({})
                this.getMyEvents()
                this.getRequestedEvents()
                //this.testingData()
          
              }catch(error){
                console.log(error)
              }
    }
    


    recall(screen){
        // console.log(screen)
        switch(screen)
        {
            case 'First':
                this.getMyEvents(this.data.uid);
                break;
            case 'Second':
                this.getRequestedEvents(this.data.uid);
                break;
        }
        
        
    }
    getMyEvents(){
        var myEvents=[]
        this.setState({dataOneFetching:true})
        var userId = this.data.uid
        var gettingUrl = 'http://pickletour.com/api/get/enroll/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            myEvents = response.data
            // console.log(myEvents)
            if(myEvents.length>0){
                this.setState({
                    eventsData:myEvents,
                    dataOneLoaded:true,
                    showMessage:false,
                    dataOneFetching:false
                })
            }
            else{
                this.setState({
                    dataOneLoaded:false,
                    showMessage:true,
                    dataOneFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })

    }


    checkingReqEvents(reqEvents){
        let result = reqEvents.filter(item => item.isAccepted == false)
        // console.log(result)
        if(result.length==0){
            console.log('No False Found')
            this.setState({
                dataTwoLoaded:false,
                showTwoMessage:true,
                dataTwoFetching:false
            })
        }
        else{
            this.setState({
                dataTwoLoaded:true,
                reqData:reqEvents,
                dataTwoFetching:false
            })
        }
    }
    getRequestedEvents(){
        var reqEvents = []
        this.setState({dataTwoFetching:true})
        var userId = this.data.uid
        var gettingUrl = 'http://pickletour.com/api/get/referee/requests/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            reqEvents = response.data
            // console.log(reqEvents)
            if(reqEvents.length>0){
                this.checkingReqEvents(reqEvents)
             
            }
            else {
                this.setState({
                    dataTwoLoaded:false,
                    showMessage:true,
                    dataTwoFetching:false
                })
            }
        })
    }

    



    

    
    render() {
        // console.log("state", this.state)
        const {showMessage, showTwoMessage, showThreeMessage} = this.state
        return (
            <View>
                <View style={styles.wrapTopSty}>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>My Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Requested Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>My Invitations</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.divider}></View> */}
                {/* <ScrollView style={{ marginBottom: 50 }}> */}
                    {this.state.actScr == 1 ? <View style={{paddingTop:10  }}>
                        

                        {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:90}}
                                data ={this.state.eventsData}
                                keyExtractor={item => item._id}
                                refreshing={this.state.dataOneFetching}
                                onRefresh={()=>this.getMyEvents()}
                                // onEndReached={()=>this.recall('First')}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetails',{item}) }}>
                                    <EventCardsMa1 data={item}/>
                                </TouchableOpacity>
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>

                            {showMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No data found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                            
                            
                        
                                </View>}

                    </View> : null}
                    {this.state.actScr == 2 ? <View style={{ paddingTop: 10 }}>
                    {this.state.dataTwoLoaded?<FlatList
                                style={{marginBottom:90}}
                                data ={this.state.reqData}
                                refreshing={this.state.dataTwoFetching}
                                onRefresh={()=>this.getRequestedEvents()}
                                // extraData={this.state}
                                keyExtractor={item => item._id}
                                // onEndReached={()=>this.recall('Second')}
                                renderItem={({item})=>{
                                    if(item.isAccepted == false){
                                        // console.log(item);
                                            return <EventCardsMa2  data={item}/>
                                    }

                                }}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                            {showTwoMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20), color:'black'}}>No data found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                        </View>}
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ paddingTop: 10 }}>
                    {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:90}}
                                keyExtractor={item => item._id}
                                data ={this.state.inviData}
                                refreshing={this.state.dataThreeFetching}
                                renderItem={({item})=>(
                                    <EventCardsMa3 />
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                            {showThreeMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No data found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                        </View>}
                    </View> : null}
                {/* </ScrollView> */}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    topBarSty: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    wrapTopSty: {
        backgroundColor: '#686868',
        flexDirection: 'row',
    },
    topBarText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize:Responsive.font(12)
    },
    selectedtopBarText:{
        color:'#9EEACE',
        fontFamily: 'open-sans-bold',
        textDecorationLine:'underline',
        fontSize:Responsive.font(12)
    },
    topBarStyAct: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    divider: { width: '100%', height: 10, backgroundColor: 'white' }
});