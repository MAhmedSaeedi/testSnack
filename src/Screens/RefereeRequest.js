import React from 'react';
import { ActivityIndicator, View, Text, Button, BackHandler, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
// import MatchCards from './MatchCards';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'


// tournament details and schedule----------------------------------------------
export default class RefereeRequest extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        // this.BracketTypes=null
        this.DivisionData=''
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false,
            startDate:null,
            endDate:null,
            params:null,
            selectedValue:'',
            selectionModal:false,
            buttonDisabled:true,
            modalVisible:false,
            isSuccessFull:false,
            address:'',
            phoneNumber:'',
            incomData:false,
            submitted:false,
            arrayLocation:0,
            finallyComplete:false,

        };
    }
  
    componentDidMount(){    
        //this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const tournamentInfo = this.props.navigation.getParam('item')
       
        // this.BracketTypes = bracketTypes
        let date=this.convertDate(tournamentInfo.tStartDate)
        this.setState({startDate:date})

        let endate=this.convertDate(tournamentInfo.tEndDate)
        this.setState({endDate:endate})
    }
    handleBackPress = () => {
        console.log('Here')
        // this.props.navigation.dispatch(StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'HomePageStack' })],
        // }))
        // this.props.navigation.pop()
        //this.backHandler.remove()
        // this.props.navigation.goBack('ManageEventsStack');
 
        // const { state, goBack } = this.props.navigation;
        // const params = state.params
        // goBack(params.go_back_key)
    }



    componentWillUnmount(){
        //this.backHandler.remove()

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

    getData= (tournamentId)=>{
       

        var newData = [];
       
        var gettingUrl = 'https://pickletour.appspot.com/api/get/Schedule/'
        
        axios.get(gettingUrl+tournamentId)
        .then((response)=>{
            newData = response.data
            // console.log(newData[0].schedule)
            if (newData.length > 0) {
                this.setState({
                    tourData: newData,
                    dataLoaded:true,
                })
            }
            else {
                this.setState({
                    dataLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

closeSelectedModal({item, location}){
        // console.log('Here')
        this.setState({selectionModal:false, selectedValue:item, buttonDisabled:false, arrayLocation:location})
    }

    conformingRequest(user, tournament){
        const {address, phoneNumber, incomData, submitted, isSuccessFull, selected} = this.state
        // console.log(user, tournament)
        //console.log(this.DivisionData[this.state.arrayLocation])
        // console.log(address, phoneNumber)
        if(address.length>0 && phoneNumber.length>0){
            const Obj ={
                address:  address,
                dob: user.dateOfBirth,
                fName: user.firstName,
                email: user.email,
                gender: user.gender,
                phone: phoneNumber,
                divisionName: this.DivisionData[this.state.arrayLocation],
                tournamentId: tournament._id,
                tournamentName: tournament.tournamentName,
                tournamentStartDate: tournament.tStartDate,
                type:  tournament.type,                
                userId:  user.uid,
                isPaid: false,
                tournamentAddress:tournament.address
            }

            //console.log('Request Sent')
            this.setState({submitted:true, isSuccessFull:true})
            //console.log(Obj)
            this.sendingData(Obj)
        }
        else{
            this.setState({incomData:true})
        }
    }

    async sendingData(obj){
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }
        try{
            // console.log(obj)0
            let url ='https://pickletour.appspot.com/api/referee/register'
            const res = await fetch(url, config)
            const data = await res.json()
            // console.log(data)
            if(data.message =='referee Registered'){
                this.setState({finallyComplete:true})

                setTimeout(()=>{
                    //this.setState({modalVisible:false})
                    this.props.navigation.goBack()
                },3000)
            }
            //console.log(data)
        }catch(error){

        }
    }
    render() {
        const { state, navigate } = this.props.navigation;
        const user = this.props.navigation.getParam('user')

        const { address, phoneNumber, incomData, submitted, isSuccessFull, selected, finallyComplete } = this.state
    
        // console.log(this.BracketTypes)
        const tournamentInfo = this.props.navigation.getParam('item')
        const bracketTypes =  tournamentInfo.division.map(a => {
            if(a.bracketType=='Round Robin')
                return '(R.R.)'
            else if(a.bracketType=='Flex Ladder')
                return '(F.L.)'
            else if(a.bracketType == 'Box League')
                return '(B.L.)'
            else
                return '(USAPA)'
           }
        )
        
        const division = tournamentInfo.division
        let result = division.map(a => a.nameOfDivision);
        const divisionData=[...result]
        this.DivisionData= divisionData
        // console.log(this.DivisionData)
        //console.log(divisionData)
        // console.log('Here')
        // console.log(tournamentInfo.division)
        //console.log(tournamentInfo)
        // console.log(tournamentInfo.tournamentName)
        //console.log('----------------------------------------------------------------------------------')
        //console.log(this.props.navigation.getParam('item'))
        return (
            <View>

                <Modal animationType='slide'
                       visible={this.state.modalVisible}>
                           <View style={{width:'100%', height:'100%'}}>
                                {isSuccessFull?
                                    <View style={{flex:1, alignContent:'center', alignItems:'center',justifyContent:'center', backgroundColor:'white' }}> 
                                
                                
                                    {finallyComplete? <Icon type="FontAwesome" name="check"  style={{ color: 'green'}}/>:<ActivityIndicator size={"large"}/>}
                                
                                        
                                        {finallyComplete?
                                        <Text style={{fontSize:Responsive.font(20), fontFamily:'open-sans-bold'}}>Request Submitted Successfully !</Text>
                                        :
                                        <Text style={{fontSize:Responsive.font(20), fontFamily:'open-sans-bold'}}>Submitting Request..</Text>
                                        }
                                        
                                    </View>
                                :
                                
                                <View style={{flex:1, alignContent:'center', alignItems:'center',justifyContent:'center', backgroundColor: '#86d6b9' }}>
                                    <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} editable={false} placeholder="Name" value={user.firstName} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} editable={false} placeholder="Email Address" value={user.email} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Phone Number"  value={phoneNumber} keyboardType="phone-pad" onChangeText={phoneNumber => this.setState({ phoneNumber })} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Address"  value={address}  keyboardType="default" onChangeText={address => this.setState({ address })} placeholderTextColor={'gray'}/>
                                
                                {incomData ? <Text style={{color:'red', fontSize:Responsive.font(16), fontFamily:'open-sans-bold'}}> Please complete form !!</Text>:<Text></Text>}
                                <TouchableOpacity disabled={submitted} onPress={()=>this.conformingRequest(user, tournamentInfo)} style={{fontFamily: 'open-sans-simple',
                                                                                                width: Dimensions.get('window').width - 105,
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: submitted?'#BEBAC5':'#48A080',
                                                                                                padding: 10,
                                                                                                borderRadius: 100,
                                                                                                marginTop: 60,}}>
                                    <Text style={{color:'white',fontFamily:'open-sans-simple',fontSize:Responsive.font(22)}}>Confirm</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity  disabled={submitted} onPress={()=>this.setState({modalVisible:false})} style={{fontFamily: 'open-sans-simple',
                                                                                                            width: Dimensions.get('window').width - 105,
                                                                                                            alignItems: 'center',
                                                                                                            backgroundColor: submitted?'#BEBAC5':'#48A080',
                                                                                                            padding: 10,
                                                                                                            borderRadius: 100,
                                                                                                            marginTop: 20,}}>
                                    <Text style={{color:'white',fontFamily:'open-sans-simple',fontSize:Responsive.font(22)}}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                }
                                
                           </View>
                        

                </Modal>

                <Modal
                    transparent ={true}

                    animationType='none'
                    visible={this.state.selectionModal}
                    style={{}}
                    // style={{justifyContent: 'center', alignContent:'center', alignItems:'center', alignSelf:'center'}}
                   
                >
                   <View style={{   backgroundColor:'white',
                                    opacity:0.9,
                                
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>

                       <View style={{ width:'94.5%', justifyContent: 'center'}}>
                       <ScrollView style={{ backgroundColor:'white',borderColor:'#585858', borderWidth:1, borderRadius:3}} contentContainerStyle={{alignItems:'center', justifyContent: 'center',alignContent:'center'}}>
                           <View style={{justifyContent:'center',borderBottomWidth:1,borderColor:'#585858', paddingVertical:10, backgroundColor:'white', width:'99%'}}>
                           <Text style={{ color:'#276091', alignSelf:'center',fontSize:Responsive.font(16),fontFamily:'open-sans-bold'}}>Select Division</Text>
                           </View>
                            {divisionData.map((item,index)=>{
                                 return(
                                 <TouchableOpacity key={index} onPress={()=>this.closeSelectedModal({ item:item+' '+ bracketTypes[index], location:index })} style={{justifyContent:'center',borderBottomWidth:1,borderColor:'#585858', paddingVertical:10, backgroundColor:'white', width:'99%'}}><Text style={{color:'#585858',alignSelf:'center', fontSize:Responsive.font(14),fontFamily:'open-sans-bold'}}>{item} {bracketTypes[index]}</Text></TouchableOpacity>
                                )
                            })}
                            <TouchableOpacity onPress={()=>this.setState({selectionModal:false})} style={{justifyContent:'center', paddingVertical:10, backgroundColor:'white', width:'99%'}}>
                           <Text style={{color:'#FF0000', alignSelf:'center',fontSize:Responsive.font(16),fontFamily:'open-sans-bold'}}>Close</Text>
                           </TouchableOpacity>
                          




                            

                        </ScrollView>
                       </View>

                   </View>
                </Modal>
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
                                            <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.startDate} - {this.state.endDate}</Text>
                                        </View>

                                        <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
                                            <Icon type="Entypo" name="location-pin"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                            <Text style={{fontSize:Responsive.font(11), width:'95%' ,color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{tournamentInfo.address}</Text>
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
                                                <Text style={styles.detail}>{tournamentInfo.OrganizerName}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop:30, paddingBottom:23 }}>
                                            <View style={{ flexDirection: 'row', alignItems:'center'  }} >
                                                <Text style={styles.head}>Division : </Text>
                                                <TouchableOpacity onPress={()=>this.setState({selectionModal:true})} style={{flexDirection:'row', backgroundColor:'white',paddingLeft:5,justifyContent:'center', paddingVertical:2, paddingRight:10, borderColor:'#585858', borderWidth:0.5 }}>
                                                    <Text style={{paddingLeft:5, color:'#474747', fontFamily:'open-sans-bold', fontSize:Responsive.font(11)}}>{this.state.selectedValue.length==''?'Select':this.state.selectedValue}</Text>
                                                    <Icon type="Entypo" name="chevron-small-down"  style={{ paddingLeft:10,alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{alignItems:'center', justifyContent:'center', }}>
                                                <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}  style={[styles.mySBtn,{backgroundColor: this.state.buttonDisabled?'#96D1BB':'#48A080'}]} disabled={this.state.buttonDisabled}>
                                                    <Text style={styles.myStext}>Request</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    

                                        <View>

                                        </View>
                                    
                                    </View>

                                    {/* <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 5, marginBottom: 5 }} /> */}
                                </View>
                    
                            )}
                            
                            renderItem={({item})=>(
                                
                                <MatchCards navigation={this.props.navigation} data={item} />
                                
                                
                            
                            )}
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
        fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', alignSelf:'center'
    },
    mySBtn: {
        
        justifyContent:'center',
        alignSelf:'flex-end',
        paddingVertical:2,
        marginLeft:10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        alignContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
    },
    myStext:{
        fontSize: Responsive.font(11),
        fontFamily:'open-sans-bold',
        color:'white',
        justifyContent:'center',
        alignSelf:'center'
    }


});