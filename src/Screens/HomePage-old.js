import React from 'react';
import { Modal, AsyncStorage, View, Text, Picker, Button, ImageBackground, Image,TouchableOpacity, TextInput, Dimensions, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions, StackActions } from 'react-navigation';
import EventCardsMa2 from './EventCardsMa2';
import ToBeRequestedEvents from './ToBeRequestedEvents'
import axios from 'axios';
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.data=''
        this.state = {
            eventType: '',
            seLoc: '',
            tourData: [],
            recreationalData:[],
            loading: true,
            dataFound: false,
            counter: 0,
            recounter:0,
            lecounter:0,
            tocounter:0,
            reData:[],
            dropChanged: false,
            modalVisible:false,
            actScr: 1,
            gettingUrl: 'http://pickletour.com/api/get/tournament/page/'
        };
        this.onEndReachedCalledDuringMomentum = true;
        this.getAlldata = this.getAlldata.bind(this)
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

    getRecreationalData(){
        this.setState({actScr:4})
        console.log('here')
        var prevData = []
        var con = this.state.recounter
        if(this.state.dropChanged){
            this.setState({
                loading:true,
                dataFound:false,
                
            })
        }
    }
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
        this.getAlldata()
        this.getUserData()
    }


   
    render() {
        const { state, navigate } = this.props.navigation;    
        //console.log(this.props.navigation.state.params)
        return (
        <View>
            <View style={styles.wrapTopSty}>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Tournaments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>Leagues</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.getDataParent(4,'Recreational')} style={this.state.actScr == 4 ? styles.topBarStyAct : styles.topBarSty}>
                        <Text style={this.state.actScr==4?styles.selectedtopBarText:styles.topBarText}>Recreational</Text>
                    </TouchableOpacity>
                </View>
        
            <View style={{ paddingTop: 10 }}>

                
               
                {this.state.tourData.length>0 && this.state.actScr==1 ?
                    <FlatList
                        data={this.state.tourData}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                                <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                            </TouchableOpacity>

                        )}
                        ListHeaderComponent={() => (
                            <View>    
                                {/* <View style={{ flexDirection: 'row' }}> */}
                                    {/* <View style={styles.myDrops}>
                                        <Picker
                                            selectedValue={this.state.eventType}
                                            style={styles.myDrop}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ eventType: itemValue,dropChanged: true }, this.getAlldata)
                                            }>
                                            <Picker.Item label="Event Type" value="" />
                                            <Picker.Item label="Recreational" value="Recreational" />
                                            <Picker.Item label="League" value="League" />
                                            <Picker.Item label="Tournament" value="Tournament" />
                                        </Picker>
                                    </View> */}
                                    {/* <View style={styles.myDrops}>
                                        <Picker
                                            selectedValue={this.state.language}
                                            style={styles.myDrop}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ language: itemValue })
                                            }>
                                            <Picker.Item label="Event Division" value="" />
                                            <Picker.Item label="Men's Singles" value="Men's Singles" />
                                            <Picker.Item label="Men's Doubles" value="Men's Doubles" />
                                            <Picker.Item label="Women's Single" value="Women's Single" />
                                            <Picker.Item label="Womem's Doubles" value="Womem's Doubles" />
                                            <Picker.Item label="Mixed Doubles" value="Mixed Doubles" />
                                        </Picker>
                                    </View> */}
                                {/* </View> */}
                                {/* <View style={styles.SectionStyle}>
                                    <TextInput
                                        style={styles.forms}
                                        placeholderTextColor={'gray'}
                                        onChangeText={seName => this.setState({ seName })}
                                        value={this.state.seName}
                                        placeholder="Search by Name"
                                        keyboardType="default"
                                        returnKeyType="next"
                                    />
                                    <Image style={{ padding: 10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                </View> */}
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
                                {this.state.loading ? <View style={{flex:1, justifyContent:'center', paddingTop:'50%'}}>
                                    <ActivityIndicator size="large" color="#48A080" />
                                </View> : null}

                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.onEndReached.bind(this)}
                        disableVirtualization={false}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent=
                        {this.state.loading ? <ActivityIndicator size="large" color="#48A080" /> : this.state.dataFound ? null : <Text style={{ justifyContent: 'center', textAlign: 'center' }}>No Remaining Data</Text>}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    />
                    : <View style={{flex:1, justifyContent:'center', paddingTop:'50%'}}>
                        <ActivityIndicator size="large" color="#48A080" />
                        </View>}
            </View>
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
        width: Dimensions.get('window').width / 4,
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
        width: Dimensions.get('window').width / 4,
        alignItems: 'center',
        justifyContent: 'center',
        
    },




});