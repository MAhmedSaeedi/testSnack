import React from 'react';
import { ActivityIndicator, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import MatchCards from './MatchCards';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'


// tournament details and schedule----------------------------------------------
export default class EventDetails extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false,
            startDate:null,
            loading:true,
            showMessage:false
        };
    }
  
    componentDidMount(){
        const tournamentInfo = this.props.navigation.getParam('item')
        console.log(tournamentInfo)
        let date=this.convertDate(tournamentInfo.tournamentStartDate)
        this.setState({startDate:date})
        this.getData()
    }

    convertDate(date){
        var d= new Date(date)
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear()
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        return [day, month, year].join('/');
    }

    getData= (tournamentId, eventType)=>{

        var newData = [];
        // dslkfsd;lfsd
        var dummyData=[]
        // var gettingUrl = 'https://pickletour.appspot.com/api/get/Schedule/'
        //var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        var gettingUrl = 'http://pickletour.appspot.com/api/get/schedule/5e2eb96e8bb07c00121fa750/'
        var div='Men\'s Singles'
        // axios.get(gettingUrl+tournamentId)
        axios.get(gettingUrl+div)
        .then((response)=>{
            newData = response.data[0].schedule
            // console.log(newData[0].schedule[0])
            if (newData.length > 0) {
                newData.forEach(element => {
                    element.map(item=>{
                        dummyData.push(item)
                    })
                });
                // console.log(dummyData)
                this.setState({
                    tourData: dummyData,
                    dataLoaded:true,
                    loading:false
                })
            }
            else {
                this.setState({
                    dataLoaded:false,
                    loading:false,
                    showMessage:true
                    
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        
        const tournamentInfo = this.props.navigation.getParam('item')
        // console.log(tournamentInfo)
        // console.log(tournamentInfo.tournamentName)
        //console.log('----------------------------------------------------------------------------------')
        //console.log(this.props.navigation.getParam('item'))
        return (
            <View>
                {/* <ScrollView style={{ marginBottom: 10 }}> */}
                    

                    <View style={{ padding: 10 }}>
                        <FlatList
                            
                            data ={this.state.tourData}
                            extraData={this.props}
                            keyExtractor={item => item._id}
                            ListHeaderComponent={()=>(
                                <View>
                                        <View style={styles.cardStyles}>
                                        <View style={{ flexDirection: 'row' , paddingLeft:10, paddingTop:10}}>
                                            <View style={{ }} >
                                                <Text style={styles.inHead}>{tournamentInfo.tournamentName}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={{borderWidth:0.5,borderColor:'#CAECDF', marginTop:10, marginRight:10, marginLeft:10}}></View>
                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.startDate} - 22/01/2020</Text>
                                        </View>

                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="Entypo" name="location-pin"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{tournamentInfo.address}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft:10}}>
                                            <View style={{ flexDirection: 'row', width: '50%' }} >
                                                <Text style={styles.head}>Event Type : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.type}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft:10 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                                <Text style={styles.head}>Organizer Name : </Text>
                                                <Text style={styles.detail}>Steve</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingTop:10, paddingBottom:10 }}>
                                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <Text style={styles.detail}>{tournamentInfo.divisionName}</Text>
                                            </View>
                                        </View>
                                    
                                    
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 0, marginBottom: 10 }} />
                                </View>
                    
                            )}
                            ListEmptyComponent={()=>
                            //     (
                            //     (this.state.loading && <ActivityIndicator size='large'/> )
                            //     (this.state.showMessage && <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Schedule not found !</Text>)
                            // )
                                {
                                    if(this.state.loading){
                                        return <ActivityIndicator size='large'/>
                                    }
                                    else if(this.state.showMessage){
                                        return <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Schedule not found !</Text>
                                    }
                                }
                            }

                            
                            renderItem={({item, index})=>
                            (
                                <MatchCards navigation={this.props.navigation} data={item} location={index}/>
                            )
                            // {
                            //     if(item){
                            //         return <MatchCards navigation={this.props.navigation} data={item} location={index}/>
                            //     }
                            //     else
                            //     return   <Text style={{fontFamily:'open-sans-bold',alignSelf:'center',fontSize:Responsive.font(20)}}>Upcoming Events not found !</Text>
                            // }
                            
                                
                                
                                
                                
                            
                            }
                        />
                        {/* :<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#48A080" />
                    </View>} */}
                    </View>
                {/* </ScrollView> */}

            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        //marginHorizontal:10,
        width: '100%',
        backgroundColor:'#DBFFF1',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
        marginBottom: 10
    },
    head: {
        color: '#585858',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    inHead: {
        fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'
    },
    detail:{
        fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold'
    },
    mySBtn: {
        backgroundColor: 'white',
        padding: 4,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        alignContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },


});