import React from 'react';
import { Modal, AsyncStorage, View, Text, Picker, Button, ImageBackground, Image,TouchableOpacity, TextInput, Dimensions, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa2 from './EventCardsMa2';
import { SearchBar} from 'react-native-elements'
import ToBeRequestedEvents from './ToBeRequestedEvents'
import axios from 'axios';
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            searchValue1:'',
            AllEventsData:[],
            AllEventsDropChanged:false,
            AllEventsLoading:false,
            AllEventsDataFound:false,
            AllEventsCounter:0,
            AllEventDataBackup:[],


            LeagueData:[],
            LeagueCounter:0,
            LeagueDropChanged:false,
            LeagueLoading:false,
            LeagueDataFound:false,

            RecreationalData:[],
            RecreationalCounter:0,
            RecreationalDropChanged:false,
            RecreationalLoading:false,
            RecreationalDataFound:false,

            TournamentData:[],
            TournamentCounter:0,
            TournamentDropChanged:false,
            TournamentLoading:false,
            TournamentDataFound:false,

            eventType: '',
            seLoc: '',
            tourData: [],
            recreationalData:[],
            loading: true,
            dataFound: false,
            // counter: 0,
            recounter:0,
            lecounter:0,
            tocounter:0,
            reData:[],
            dropChanged: false,
            modalVisible:false,
            actScr: 2,
            gettingUrl: 'http://pickletour.com/api/get/tournament/page/'
        };
        this.onEndReachedCalledDuringMomentum = true;
        this.onEndReachedCalledDuringMomentumLeague = true;
        this.onEndReachedCalledDuringMomentumTournament = true;
        this.onEndReachedCalledDuringMomentumRecreational = true;
        this.onEndReachedCalledDuringMomentumAllEvents = true;

        this.getAlldata = this.getAlldata.bind(this)
    }
    getLeagueData(){
        let prevData = []
        let con = this.state.LeagueCounter
        if(this.state.LeagueDropChanged){
            this.setState({ 
                LeagueLoading:true,
                LeagueDataFound:false,
                LeagueCounter:0,
                LeagueDropChanged:false
            })
            con = 0
        }
        else{
            prevData =  this.state.LeagueData
        } 

        let newData =[]
        let gettingUrl = 'http://pickletour.com/api/get/league/page/'
        axios.get(gettingUrl+con)
            .then((response)=>{
                newData = response.data
                let allData = [...prevData, ...newData]
                // let combineData = [...this.state.AllEvents,...allData]
                let con = this.state.LeagueCounter
                if(newData.length>0){
                    this.setState({
                        LeagueData:allData,
                        LeagueLoading:false,
                        LeagueDataFound:true,
                        LeagueCounter:con+1, 
                        // AllEvents:combineData                       
                    })
                }
                else{
                    this.setState({
                        LeagueData:allData,
                        LeagueLoading:false,
                        LeagueDataFound:false,
                        // AllEvents:combineData
                    })
                }

            }).catch((error)=>{
                console.log(error)
                this.setState({msg:'You are not connected to internet'})
            })
    }

    onEndReachedLeague=({distanceFromEnd})=>{
        let con = this.state.LeagueCounter
        if(this.state.LeagueDataFound){
            if(!this.onEndReachedCalledDuringMomentumLeague){
                this.setState({
                    LeagueLoading:true,
                    LeagueCounter:con+1
                });
                this.forceUpdate()
                this.getLeagueData()
                this.onEndReachedCalledDuringMomentumLeague = true
            }
        }
    }


    getTournamentData(){
        let prevData = []
        let con = this.state.TournamentCounter
        if(this.state.TournamentDropChanged){
            this.setState({ 
                TournamentLoading:true,
                TournamentDataFound:false,
                TournamentCounter:0,
                TournamentDropChanged:false
            })
            con = 0
        }
        else{
            prevData =  this.state.TournamentData
        } 

        let newData =[]
        let gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
        axios.get(gettingUrl+con)
            .then((response)=>{
                newData = response.data
                let allData = [...prevData, ...newData]
                // let combineData = [...this.state.AllEvents,...allData]
                let con = this.state.TournamentCounter
                // console.log(newData)
                if(newData.length>0){
                    this.setState({
                        TournamentData:allData,
                        TournamentLoading:false,
                        TournamentDataFound:true,
                        TournamentCounter:con+1,
                        // AllEvents:combineData

                    })
                }
                else{
                    this.setState({
                        TournamentData:allData,
                        TournamentLoading:false,
                        TournamentDataFound:false,
                        // AllEvents:combineData

                    })
                    // console.log(this.state.TournamentData)
                }

            }).catch((error)=>{
                console.log(error)
                this.setState({msg:'You are not connected to internet'})
            })
    }
    onAllEndReached=({distanceFromEnd})=>{
        let con = this.state.AllEventsCounter
        if(this.state.AllEventsDataFound){
            if(!this.onEndReachedCalledDuringMomentumAllEvents){
                this.setState({
                    AllEventsLoading:true,
                    AllEventsCounter:con+1
                })
                this.forceUpdate()
               
                this.getAllEventsData()
                this.onEndReachedCalledDuringMomentumAllEvents = true
            }
        }
    }
    onEndReachedTournament=({distanceFromEnd})=>{
        let con = this.state.TournamentCounter
        if(this.state.TournamentDataFound){
            if(!this.onEndReachedCalledDuringMomentumTournament){
                this.setState({
                    TournamentLoading:true,
                    TournamentCounter:con+1
                });
                this.forceUpdate()
                this.getTournamentData()
                this.onEndReachedCalledDuringMomentumTournament = true
            }
        }
    }


    getRecreationalData(){
        let prevData = []
        let con = this.state.RecreationalCounter
        if(this.state.RecreationalDropChanged){
            this.setState({ 
                RecreationalLoading:true,
                // AllEventsLoading:true,
                RecreationalDataFound:false,
                RecreationalCounter:0,
                RecreationalDropChanged:false
            })
            con = 0
        }
        else{
            prevData =  this.state.RecreationalData
        } 

        let newData =[]
        let gettingUrl = 'http://pickletour.com/api/get/recreational/page/'
        axios.get(gettingUrl+con)
            .then((response)=>{
                newData = response.data
                let allData = [...prevData, ...newData]
                let con = this.state.RecreationalCounter
                // let combineData = [...this.state.AllEvents,...allData]
                //console.log(newData)
                if(newData.length>0){
                    this.setState({
                        RecreationalData:allData,
                        RecreationalLoading:false,
                        RecreationalDataFound:true,
                        RecreationalCounter:con+1,
                        // AllEvents:combineData,
                        // AllEventsLoading:false,
                        // AllEventsFound:true

                    })
                }
                else{
                    this.setState({
                        RecreationalData:allData,
                        RecreationalLoading:false,
                        RecreationalDataFound:false,
                        // AllEvents:combineData,
                        // AllEventsLoading:false,
                        // AllEventsFound:true
                    })
                    // console.log(this.state.TournamentData)
                }

            }).catch((error)=>{
                console.log(error)
                this.setState({msg:'You are not connected to internet'})
            })
    }

    onEndReachedRecreational=({distanceFromEnd})=>{
        let con = this.state.RecreationalCounter
        if(this.state.RecreationalDataFound){
            if(!this.onEndReachedCalledDuringMomentumRecreational){
                this.setState({
                    RecreationalLoading:true,
                    RecreationalCounter:con+1
                });
                this.forceUpdate()
                this.getRecreationalData()
                this.onEndReachedCalledDuringMomentumRecreational = true
            }
        }
    }

    getAllEventsData(){
        let prevData = []
        let con = this.state.AllEventsCounter
        if(this.state.AllEventsDropChanged){
            this.setState({
                AllEventsLoading:true,
                AllEventsDataFound:false,
                AllEventsCounter:0,
                AllEventsDropChanged:false
            })
            con =0
        }
        else{
            prevData = this.state.AllEventsData
        }

        let newData = []
        let firstUrl = 'http://pickletour.com/api/get/tournament/page/'
        let secondUrl = 'http://pickletour.com/api/get/league/page/'
        let thirdUrl = 'http://pickletour.com/api/get/recreational/page/'
        const requestOne = axios.get(firstUrl+con)
        const requestSecond = axios.get(secondUrl+con)
        const requestThree = axios.get(thirdUrl+con)

        axios.all([requestOne, requestSecond, requestThree])
             .then(axios.spread((...response)=>{
                 const responseOne = response[0].data
                 const responseTwo = response[1].data
                 const responseThree = response[2].data
                 const allData = [...prevData,...responseOne, ...responseTwo,...responseThree]
                 this.setState({
                    AllEventsData:allData,
                    AllEventDataBackup:allData,
                    AllEventsLoading:false,
                    AllEventsDataFound:true

                 })
             }))
    }

    // doRequest() {
    //     var prevData = this.state.tourData;
    //     var newData = [];
    //     var gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
    //     if (this.state.eventType == 'Recreational') {
    //         gettingUrl = 'http://pickletour.com/api/get/recreational/page/'
    //     }
    //     else if (this.state.eventType == 'League') {
    //         gettingUrl = 'http://pickletour.com/api/get/league/page/'

    //     }
    //     else if (this.state.eventType == 'Tournament') {
    //         gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
    //     }
    //     console.log(prevData, 'my prevData')
    //     console.log(gettingUrl, 'my uRl')
    //     console.log(this.state.counter, 'my counter')
    //     console.log(this.state.dropChanged, 'drop Changes')
    //     console.log(this.state.eventType, 'asd')
    //     axios
    //         .get(this.state.gettingUrl + this.state.counter)
    //         .then((response) => {
    //             newData = response.data
    //             var allData = [...prevData, ...newData]
    //             var con = this.state.counter
    //             if (newData.length > 0) {
    //                 this.setState({
    //                     tourData: allData,
    //                     loading: false,
    //                     dataFound: true,
    //                     counter: con + 1
    //                 })
    //             }
    //             else {
    //                 this.setState({
    //                     tourData: allData,
    //                     loading: false,
    //                     dataFound: false
    //                 })
    //             }

    //         }).catch((error) => {
    //             console.log("mongodb get register error", error)
    //             this.setState({ msg: "you are not connect to the internet" })
    //         })
    // }
    async getUserData(){
        try{
            let user = await AsyncStorage.getItem('userProfileData')
            // console.log('Here',user)
            this.data= JSON.parse(user)

            //  console.log(this.data)
      
          }catch(error){
            console.log(error)
          }
    }

    // UNSAFE_componentWillMount(){
    //     this.getUserData()
    //   }

    // getRecreationalData(){
    //     this.setState({actScr:4})
    //     console.log('here')
    //     var prevData = []
    //     var con = this.state.recounter
    //     if(this.state.dropChanged){
    //         this.setState({
    //             loading:true,
    //             dataFound:false,
                
    //         })
    //     }
    // }
    getDataParent(screenNumber, eventType){
        switch(screenNumber){
            case 4:
                this.getRecreationalData()
                break;
        }
    }
    getAlldata = () => {
        // console.log('in grtAllDatsa')
        var prevData = []
        var con = this.state.counter
        if(this.state.dropChanged){
            this.setState({
                loading: true,
                dataFound: false,
                counter: 0,
                dropChanged: false,
            })
            con = 0
        }
        else{
            prevData = this.state.tourData
        }
        var newData = [];
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
        // console.log(prevData, 'my prevData')
        // console.log(con, 'my counter')
        // console.log(this.state.dropChanged, 'drop Changes')
        // console.log(this.state.eventType, 'asd')
        if (this.state.eventType == 'Recreational') {
            gettingUrl = 'http://pickletour.com/api/get/recreational/page/'
        }
        else if (this.state.eventType == 'League') {
            gettingUrl = 'http://pickletour.com/api/get/league/page/'
        }
        else if (this.state.eventType == 'Tournament') {
            gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
        }
    //     console.log(gettingUrl, 'my uRl')
    //   console.log( gettingUrl + con) 
        axios
            .get(gettingUrl + con)
            .then((response) => {
                newData = response.data
                // console.log(newData,'asdasd')
                var allData = [...prevData, ...newData]
                var con = this.state.counter
                if (newData.length > 0) {
                    this.setState({
                        tourData: allData,
                        loading: false,
                        dataFound: true,
                        counter: con + 1
                    })
                }
                else {
                    this.setState({
                        tourData: allData,
                        loading: false,
                        dataFound: false
                    })
                }

            }).catch((error) => {
                console.log("mongodb get register error", error)
                this.setState({ msg: "you are not connect to the internet" })
            })


    }
    onEndReached = ({ distanceFromEnd }) => {
        var con = this.state.counter
        if (this.state.dataFound) {
            if (!this.onEndReachedCalledDuringMomentum) {
                this.setState({    // prevState?
                    loading: true,
                    counter: con + 1
                });
                this.forceUpdate()
                this.getAlldata()
                this.onEndReachedCalledDuringMomentum = true;
            }
        }
    }
    componentDidMount() {
        // this.getAlldata()
        //this.getAllEventsData()
        this.getLeagueData()
        this.getTournamentData()
        this.getRecreationalData()
        this.getUserData()
    }


   
    searchFilterFunction = text =>{
        const newData = this.state.AllEventsData.filter(item =>{
            const itemData = `${item.tournamentName.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            //const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
    
        })
        this.setState({ AllEventsData :newData })
    }

    clearSearch(){
        this.setState({
            AllEventsData:this.state.AllEventDataBackup
        })
    }
    renderHeader =() => {
        return(
            <SearchBar
                lightTheme
                round
                autoCorrect={false}
                placeholder='Search by name or location'
                onChangeText={text => this.searchFilterFunction(text)}                            
            />
        )
    }
    render() {
        const { state, navigate } = this.props.navigation;    
        //console.log(this.props.navigation.state.params)
        return (
        <View>
            <View style={styles.wrapTopSty}>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Tournaments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>Leagues</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 4 })} style={this.state.actScr == 4 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==4?styles.selectedtopBarText:styles.topBarText}>Recreational</Text>
                    </TouchableOpacity>
                </View>
        

               
            {
                this.state.actScr == 3? 
                <View style={{paddingTop:10, paddingBottom:80  }}>
                    {this.state.LeagueData.length>0 ?
                        <FlatList 
                            data={this.state.LeagueData}
                            renderItem ={({item})=>(
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                                    <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={()=>(
                                <View>
                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.forms}
                                            placeholderTextColor={'#C5C5C5'}
                                            onChangeText={seLoc => this.setState({ seLoc })}
                                            value={this.state.seLoc}
                                            placeholder="Search by name or location"
                                            keyboardType="default"
                                            returnKeyType="next"
                                        />
                                        <Image style={{ padding: 10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 10, marginBottom: 10, width:'94.5%', alignSelf:'center' }} />
                                </View>
                            )}

                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.onEndReachedLeague.bind(this)}
                            disableVirtualization={false}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentumLeague = false; }}
                            ListFooterComponent =
                            {this.state.LeagueLoading ? <ActivityIndicator size='large' color='#48A080'/>: this.state.LeagueDataFound?null : <Text style={{ paddingBottom:20,justifyContent: 'center', textAlign: 'center' }}>No Remaining found !</Text>}
                        />
                    :<Text style={{marginTop:'50%',fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No Events found !</Text>}
                </View>
                :null
               
            }

            {
                this.state.actScr == 2? 
                <View style={{paddingTop:10, paddingBottom: 80 }}>
                    {this.state.TournamentData.length>0 ?
                        <FlatList 
                            // style={{flex:1}}
                            data={this.state.TournamentData}
                            renderItem ={({item})=>(
                                <TouchableOpacity  onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                                    <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={()=>(
                                <View>
                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.forms}
                                            placeholderTextColor={'#C5C5C5'}
                                            onChangeText={seLoc => this.setState({ seLoc })}
                                            value={this.state.seLoc}
                                            placeholder="Search by name or location"
                                            keyboardType="default"
                                            returnKeyType="next"
                                        />
                                        <Image style={{ padding: 10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 10, marginBottom: 10, width:'94.5%', alignSelf:'center' }} />
                                </View>
                            )}

                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.onEndReachedTournament.bind(this)}
                            disableVirtualization={false}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent =
                            {this.state.TournamentLoading ? <ActivityIndicator size='large' color='#48A080'/>: this.state.TournamentDataFound?null : <Text style={{ paddingBottom:20,justifyContent: 'center', textAlign: 'center' }}>No Remaining Data</Text>}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentumTournament = false; }}
                        />
                    :<Text style={{marginTop:'50%',fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No Events found !</Text>}
                </View>
                :null
               
            }

            {
                this.state.actScr == 4? 
                <View style={{paddingTop:10 , paddingBottom:80 }}>
                    {this.state.RecreationalData.length>0 ?
                        <FlatList 
                            data={this.state.RecreationalData}
                            renderItem ={({item})=>(
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                                    <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={()=>(
                                <View>
                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.forms}
                                            placeholderTextColor={'#C5C5C5'}
                                            onChangeText={seLoc => this.setState({ seLoc })}
                                            value={this.state.seLoc}
                                            placeholder="Search by name or location"
                                            keyboardType="default"
                                            returnKeyType="next"
                                        />
                                        <Image style={{ padding: 10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 10, marginBottom: 10, width:'94.5%', alignSelf:'center' }} />
                                </View>
                            )}

                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.onEndReachedRecreational.bind(this)}
                            disableVirtualization={false}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentumRecreational = false; }}
                            ListFooterComponent =
                            {this.state.RecreationalLoading ? <ActivityIndicator size='large' color='#48A080'/>: this.state.RecreationalDataFound?null : <Text style={{paddingBottom:20, justifyContent: 'center', textAlign: 'center' }}>No Remaining Data</Text>}
                        />
                    :<Text style={{marginTop:'50%',fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>No Events found !</Text>
                }
                </View>
                :null
               
            }
                
               
                
            
        </View>
        );
    }
}
const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 2 - 15,
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#48A080',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 50,
        width: '100%',
        color: '#48A080',
    },
    SectionStyle: {
        alignSelf:'center',
        width:'94.5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderRadius: 5,
        borderColor: "#48A080",
        borderWidth: 1,
        
    },
    forms: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#48A080',
        width: Dimensions.get('window').width - 100,
        fontSize: Responsive.font(18),
    },
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
        fontSize:Responsive.font(13)
    },
    selectedtopBarText:{
        color:'#9EEACE',
        fontFamily: 'open-sans-bold',
        textDecorationLine:'underline',
        fontSize:Responsive.font(13)
    },
    topBarStyAct: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },




});