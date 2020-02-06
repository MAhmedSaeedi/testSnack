import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ActivityIndicator,SafeAreaView, ScrollView, AsyncStorage, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';
import EventCards from './EventCards'
import MultiTypeEventsCards from './MultiTypeEventsCards'
import axios from 'axios'
export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.userData=''
        this.userId=''
        this.state = {
            actScr: 1,
            seLoc: '',
            compData: [],
            upData:[],
            onData:[],
            dataOneLoaded:false,
            dateOneFetching:false,
            dataTwoLoaded:false,
            dataTwoFetching:false,
            dataThreeLoaded:false,
            dataThreeFetching:false,
            loading: true,
            dataFound: false,
            showButton:false,
            showMessage:false,
            showTwoMessage:false,
            showThreeMessage:false
        };
    }
// componentDidUpdate(){
//         this.forceUpdate()
//     }
    // UNSAFE_componentWillMount(){
        
    //     this.getUserData()
    //     //this.props.navigation.closeDrawer()

    //     // console.log() 
    // }
    componentDidMount(){
        this.getUserData()
    }

    testingData(){
        var onEvents=[];
        // var gettingUrl = 'http://pickletour.com/api/get/ongoing/Events/'
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        //axios.get(gettingUrl+userId)
        axios.get(gettingUrl)
        .then((response)=>{
            onEvents = response.data
            //c0onsole.log(upEvents)
            if(onEvents.length>0){
                this.setState({
                    compData:onEvents,
                    onData:onEvents,
                    upData:onEvents,
                    dataThreeLoaded:true,
                    dataOneLoaded:true,
                    dataTwoLoaded:true,

                })
            }
            else{
                this.setState({
                    dataOneLoaded:false,
                    dataTwoLoaded:false,
                    dataThreeLoaded:false,
                    showMessage:true
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    getCompletedData(){
        this.setState({dateOneFetching:true})
        var compEvents=[];
        var userId = this.userData.uid
        var gettingUrl = 'http://pickletour.com/api/get/completed/Events/'
        //var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        //axios.get(gettingUrl+userId)
        axios.get(gettingUrl+userId)
        .then((response)=>{
            compEvents = response.data
            //console.log(onEvents)
            if(compEvents.length>0){
                this.setState({
                    compData:compEvents,
                    dataOneLoaded:true,
                    dateOneFetching:false
                })
            }
            else{
                this.setState({
                    dataOneLoaded:false,
                    showMessage:true,
                    dateOneFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    getUpcomingData(){
        // console.log(userId)
        this.setState({dataThreeFetching:true})
        var upEvents=[];
        var userId = this.userData.uid
        var gettingUrl = 'http://pickletour.com/api/get/upcoming/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            upEvents = response.data
            //console.log(upEvents)
            if(upEvents.length>0){
                this.setState({
                    upData:upEvents,
                    dataThreeLoaded:true,
                    dataThreeFetching:false
                })
            }
            else{
                this.setState({
                    dataThreeLoaded:false,
                    showThreeMessage:true,
                    dataThreeFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    getOngoingData(){
        // console.log(userId)
        this.setState({dataTwoFetching:true})
        var onEvents=[];
        var userId = this.userData.uid
        var gettingUrl = 'http://pickletour.com/api/get/ongoing/Events/'
        axios.get(gettingUrl+userId)
        .then((response)=>{
            onEvents = response.data
            //c0onsole.log(upEvents)
            if(onEvents.length>0){
                this.setState({
                    onData:onEvents,
                    dataTwoLoaded:true,
                    dataTwoFetching:false
                })
            }
            else{
                this.setState({
                    dataTwoLoaded:false,
                    showTwoMessage:true,
                    dataTwoFetching:false
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    // componentDidMount(){
    //     this.getUserData()
    // }
    async getUserData(){
        try{
            let user = await AsyncStorage.getItem('userProfileData')
            let parsed = JSON.parse(user)
            this.userData= parsed
            this.getUpcomingData()
            this.getOngoingData()
            
            this.getCompletedData()

            // this.testingData()
            //this.getItem()
            // console.log(parsed)
        }catch(error){
            console.log(error)
        }
    }

    recall(screen){
        // switch(screen){
        //     case 'Third':
        //         this.getUpcomingData(this.userData.uid)
        //         break;
        // }
    }
    
    async getItem(){
        try{
            this.userId =await AsyncStorage.getItem('userId')
            // this.getAllData(this.userId)
            this.getOneData(this.userId)
            this.getTwoData(this.userId)
            this.getThreeData(this.userId)
            // console.log('User ID:  ',this.userId)
        }catch (error){
            console.log('error')
        }
    }

    getOneData= (userId)=>{

        // var prevData = []
        // var con = this.state.counter
        // if(this.state.dropChanged){
        //     this.setState({
        //         dataOneLoaded
        //         // loading:true,
        //         // dataFound:false,
        //         // counter:0,
        //         // dropChanged:false

        //     })
        //     con = 0
        // }
        // else{
        //     prevData = this.state.tourData
        // }

        var newData = [];
       //var gettingUrl = 'https://pickletour.appspot.com/api/get/completed/Events/'+this.userId
        var gettingUrl = 'http://pickletour.com/api/get/league/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    compData: allData,
                    // loading: false,
                    dataOneLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
                    dataOneLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }


    getTwoData= (userId)=>{
       

        var newData = [];
       
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    onData: allData,
                    // loading: false,
                    dataTwoLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
                    dataTwoLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    getThreeData= (userId)=>{
       

        var newData = [];
       
        var gettingUrl = 'http://pickletour.com/api/get/recreational/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    upData: allData,
                    // loading: false,
                    dataThreeLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
                    dataThreeLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        // console.log("state", this.state)
        const {showMessage, showTwoMessage, showThreeMessage} = this.state
        return (
            <View>
                {/* <Text>Here</Text> */}
                <View style={styles.wrapTopSty}>

                    
                    <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>Completed Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Ongoing Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>Upcoming Events</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.divider}></View> */}
                {/* <ScrollView style={{  marginBottom: 50 }}> */}
                    {this.state.actScr == 1 ? 
                        <View style={{ paddingTop:10 }}>
                            {this.state.dataOneLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                refreshing={this.state.dataOneFetching}
                                onRefresh={()=>this.getCompletedData()}
                                data ={this.state.compData}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <EventCards navigation={this.props.navigation} data={item} />
                                    // </TouchableOpacity>
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                                    {showMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Completed Events not found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                                </View>
                            }
                               
                            
                            
                            {/* <EventCards />
                            <EventCards />
                            <EventCards /> */}
                        </View> : null}
                    {this.state.actScr == 2 ? <View style={{ paddingTop: 10 }}>
                    {this.state.dataTwoLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.onData}
                                refreshing={this.state.dataTwoFetching}
                                onRefresh={()=>this.getOngoingData()}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <MultiTypeEventsCards navigation={this.props.navigation} data={item} />
                                    // </TouchableOpacity>
                                )}
                            />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                                {showTwoMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No data found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                            </View>
                    }
                    </View> : null}
                    {this.state.actScr == 3 ? <View style={{ paddingTop: 10 }}>
                    {this.state.dataThreeLoaded?<FlatList
                                style={{marginBottom:100}}
                                keyExtractor={item => item._id}
                                data ={this.state.upData}
                                
                                refreshing={this.state.dataThreeFetching}
                                onRefresh={()=>this.getUpcomingData()}
                                renderItem={({item})=>(
                                    // <TouchableOpacity onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                    <MultiTypeEventsCards navigation={this.props.navigation} data={item} show={false}/>
                                    // {/* </TouchableOpacity> */}
                                )}
                            />:<View style={{paddingTop:"50%", flex: 1,justifyContent: 'center'}}>
                                    {showThreeMessage?<Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Upcoming Events not found !</Text>: <ActivityIndicator size="large" color="#48A080" />}
                                </View>
                    }
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
        // backgroundColor: '#48A080',
    },
    divider: { width: '100%', height: 10, backgroundColor: 'white' }
});