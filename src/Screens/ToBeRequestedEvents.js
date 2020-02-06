import React from 'react';
import { Modal, View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Picker, PickerItem } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Responsive from 'react-native-lightweight-responsive';
import { Icon } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
export default class ToBeRequestedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            modalVisible:false,
            address:'',
            phoneNumber:'',
            incomData:false,
            submitted:false,
            isSuccessFull:false,
            selected:'',
            finallyComplete:false,
            convertedDate:null,
            newName:'',
            useNewName:false,
            startDate:null,
            endDate:null
        

        };
    }
    // login() {
    //     this.props.navigation.navigate('MainTabs')
    //     this.props.navigation.dispatch(StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
    //     }))
    // }
    componentDidMount(){
        let date=this.convertDate(this.props.data.tStartDate)
        this.setState({startDate:date})
        // console.log(this.props)
        //console.log(this.props.data.division)
        let name=this.props.data.tournamentName
        let index= ''
        let splitter = 4

        let nameLength=this.convertString(name)
        if(nameLength>40){
            index = name.split(' ').slice(0,splitter).join(' ');
            this.setState({newName:index, useNewName:true})
        }
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
    convertString(name){
        name = name.replace(/(^\s*)|(\s*$)/gi,"");
        name = name.replace(/[ ]{2,}/gi," ");
        name = name.replace(/\n /,"\n");
        return name.length;
    }
    // closeModal(){
    //     const  { address, phoneNumber, incomData} = this.state
    //     if(address.length>0 && phoneNumber.length>0){
    //         this.setState({modalVisible:false})
    //     }
    // }
    request(){
        const {selected} = this.state
        // console.log('Selected:  ',selected)
        if(selected == '' || selected == 'Select'){
            
        }
        else{
            this.setState({modalVisible:true})
        }
        //for creating a request for registration
        // Object ={
        //     address:  this.state.address,
        //     dob: this.state.dob,
        //     fName: this.state.fName,
        //     email: this.state.email,
        //     gender: this.state.gender,
        //     phone: this.state.phone,
        //     divisionName: this.state.divisionName,
        //     tournamentId: this.state.tournament._id,
        //     tournamentName: this.state.tournament.tournamentName,
        //     tournamentStartDate: this.state.tournament.tStartDate,
        //     address:  this.state.tournament.address,
        //     type:  this.state.tournament.type,                
        //     userId:  this.props.user.uid,
        //     isPaid: false
        // }

        // const refereeData={

        // }
        // var postingUrl = ''

        // axios.post(postingUrl,refereeData)
        // .then(()=>{

        // })
        // getData= (userId)=>{
       

        //     var newData = [];
           
        //     var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
            
        //     axios.get(gettingUrl)
        //     .then((response)=>{
        //         newData = response.data
        //         var allData = [...newData]
        //         if (newData.length > 0) {
        //             this.setState({
        //                 tourData: allData,
        //                 dataLoaded:true,
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 dataLoaded:false,
        //             })
        //         }
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        // }


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
            console.log(data)
            if(data.message =='referee Registered'){
                this.setState({finallyComplete:true})

                setTimeout(()=>{
                    this.setState({modalVisible:false})
                },3000)
            }
            console.log(data)
        }catch(error){

        }
    }

    conformingRequest(user, tournament){
        const {address, phoneNumber, incomData, submitted, isSuccessFull, selected} = this.state
        // console.log(user, tournament)
        // console.log(address, phoneNumber)
        if(address.length>0 && phoneNumber.length>0){
            const Obj ={
                address:  address,
                dob: user.dateOfBirth,
                fName: user.firstName,
                email: user.email,
                gender: user.gender,
                phone: phoneNumber,
                divisionName: selected,
                tournamentId: tournament._id,
                tournamentName: tournament.tournamentName,
                tournamentStartDate: tournament.tStartDate,
                type:  tournament.type,                
                userId:  user.uid,
                isPaid: false,
                tournamentAddress:tournament.address
            }

            console.log('Request Sent')
            this.setState({submitted:true, isSuccessFull:true})

            this.sendingData(Obj)
        }
        else{
            this.setState({incomData:true})
        }
    }
    render() {
        //console.log('````````````````````````````````````````')
        const data = this.props.data
        // console.log(tournament)
        //console.log(tournament.division)
        let result = data.division.map(a => a.nameOfDivision);

        //const divisionData =['Select', ...result]
        const user = this.props.user
        // console.log(divisionData)
        const { address, phoneNumber, incomData, submitted, isSuccessFull, selected, finallyComplete } = this.state
        // console.log('User Data:  ',this.props.user)
        return (
            <View style={styles.cardStyles}>
                <View style={{ height:'45%', alignSelf:'center', width:'95%',justifyContent:'center'}}>
                    <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{this.state.useNewName?this.state.newName:data.tournamentName}</Text>
                </View>
                {/* Rows here */}

                <View style={{borderWidth:0.5,marginHorizontal:10,borderColor:'#81D4B6'}}></View>
                <View style={{ height:'45%', width:'95%', alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row',width:'50%' }}>
                        <Text  style={{fontSize:Responsive.font(13), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', alignSelf:'center'}}>Event Type : </Text>
                        <Text  style={{fontSize:Responsive.font(12), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600',alignSelf:'center'}}>{data.type}</Text>

                    </View>                   
                   
                    <View style={{flex:1, flexDirection:'row', width:'50%' ,justifyContent: 'flex-end'}}>
                        <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(15) ,color: '#585858'}}/>
                        <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold',alignSelf:'center',paddingLeft:1}}>{this.state.startDate} - 22/01/2020</Text>
                    </View>


                 
                </View>









                {/* <Modal animationType='slide'
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
                                
                                </View>:
                                
                                <View style={{flex:1, alignContent:'center', alignItems:'center',justifyContent:'center', backgroundColor: '#86d6b9' }}>
                                    <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} editable={false} placeholder="Name" value={user.firstName} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} editable={false} placeholder="Email Address" value={user.email} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Phone Number"  value={phoneNumber} keyboardType="phone-pad" onChangeText={phoneNumber => this.setState({ phoneNumber })} placeholderTextColor={'gray'}/>
                                <TextInput style={{backgroundColor:'white',borderRadius:10,paddingLeft:10, paddingVertical:5, borderColor:'#48A080',borderWidth:1,width:'90%', fontFamily:'open-sans-bold', marginBottom:20, fontSize:Responsive.font(20)}} placeholder="Address"  value={address}  keyboardType="default" onChangeText={address => this.setState({ address })} placeholderTextColor={'gray'}/>
                                
                                {incomData ? <Text style={{color:'red', fontSize:Responsive.font(16), fontFamily:'open-sans-bold'}}> Please complete forum !!</Text>:<Text></Text>}
                                <TouchableOpacity disabled={submitted} onPress={()=>this.conformingRequest(user,tournament)} style={{fontFamily: 'open-sans-simple',
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
                <View style={{ height:'45%', alignSelf:'center', width:'95%',justifyContent:'center'}}>
                <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{this.state.useNewName?this.state.newName:tournament.tournamentName}</Text>
                </View> */}
                {/* <View style={{ flexDirection: 'row', width: '85%' }} >
                    <Text style={styles.head}>Address : </Text>
                    <Text style={styles.inHead}>{tournament.address}</Text>
                </View> */}
                {/* <View style={{borderWidth:0.5,marginHorizontal:10,borderColor:'#81D4B6'}}></View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', flex:1 }} >
                        <Text  style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', alignSelf:'center'}}>Event Type : </Text>
                        <Text style={styles.inHead}>{tournament.type}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}> */}
                    {/* <View style={{ flexDirection: 'row', width: '50%', alignItems:'center' }} >
                        <Text style={styles.head}>Division : </Text>
                        <View style={{  width: "80%",height: 25,
                        marginRight: 10,
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: '#48A080',
                                        justifyContent:'center',
                                        borderRadius: 5,
                                        backgroundColor: '#F6F6F6',}}>
                             <Picker 
                            
                            style={{  height:25,        width: '100%',

                                color: '#48A080',}}
                            
                            onValueChange={(itemValue, itemIndex)=>{
                                this.setState({selected:itemValue})
                            }}
                            selectedValue={this.state.selected}>

                             {divisionData.map((item, index)=>{
                                return(<Picker.Item label={item} value={item} key={index}/>)
                            })}
                            
                        </Picker>
                       
                        </View>
                        
                    </View> */}
                    {/* <View style={{flexDirection: 'row', height:'100%', alignSelf:'center', justifyContent:'center'}} >
                        <TouchableOpacity onPress={()=>this.request()} style={{backgroundColor:'#2E8465', borderRadius:5, borderWidth:1, paddingHorizontal:15, height:25,alignContent:'center', justifyContent:'center', borderColor:'black'}}>
                            <Text style={styles.buttonText}>Request</Text>
                        </TouchableOpacity>
                    </View> */}
                {/* </View> */}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        marginHorizontal:10,
        width: '94.5%',
        backgroundColor: '#9EEACE',
        height:70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        justifyContent:'center',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
        marginBottom:10,
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)

    },
    buttonText:{
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(10),
        alignSelf:'center',
        textAlignVertical:'center',
        textAlign:'center',
        alignItems:'center',
        alignContent:'center'


    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)

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