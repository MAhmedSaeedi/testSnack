import React from 'react';
import { AsyncStorage, Picker,View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Responsive from 'react-native-lightweight-responsive';



export default class SignUp extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: 'mahmedsaeedi@gmail.com',
            firstName: 'Ahmed',
            Password: '123456',
            confirmPass: '123456',
            msg: "",
            dob: '',
            gender:'',
            address:'abc',
            stage1:true,
            phoneNumber:'123',
            isDatePickerVisible:false,
            setDatePickerVisibility:false,
            convertedDate:''
        };
    }

    verifyDataBefore=()=>{
        if(this.state.address==='' || this.state.dob==='' || this.state.gender==='' || this.state.email ==='' || this.state.confirmPass==='' || this.state.email==='' || this.state.userName===''){
            this.setState({msg: 'Incomplete form !'})
        }
        else{
            this.handleSignUp()
        }
    }
    
    handleSignUp=()=>{
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.Password)
            .then((data)=>{
                // console.log(data.user.uid)
                const newUser ={
                    uid: data.user.uid,
                    firstName:this.state.firstName,
                    email: this.state.email,
                    password: this.state.confirmPass,
                    dateOfBirth: this.state.convertedDate,
                    gender:this.state.gender,
                    // address:this.state.address,
                    // phoneNumber:this.state.phoneNumber    
                    
                    
                }
                // console.log('newUser: ',newUser)
                axios.post('http://pickletour.appspot.com/api/user/add',newUser)
                    .then((data)=>{
                        // console.log("Herereeeeeeeeee", data)
                        // console.log(newUser)
                        AsyncStorage.setItem('userProfileData', JSON.stringify(newUser))
                        console.log(AsyncStorage.getItem('userProfileData'))
                    })
                    
            }
            
            )
            .catch((error)=>{
                this.setState({msg:error.message})
            })
    }

    login() {
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    showPicker = async (stateKey, options) => {
        try {
            const newState = {};
            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                const date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    handleConfirm=date=>{
        // console.log(date)
        let newDate = this.convertDate(date) 
        this.setState({convertedDate:newDate, isDatePickerVisible:false})    
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
        return [day, month, year].join('-');
    }
    render() {
        // console.log("state", this.state)

        const { firstName, email, Password, confirmPass, dob, gender, address, phoneNumber, convertedDate} = this.state
        const enabled = firstName.length >0 && email.length>0 && Password==confirmPass && convertedDate.length>0 && Password.length>0 && confirmPass.length>0 && gender.length>0
        const enabled2 = gender.length>0 && address.length>0 && phoneNumber.length>0 
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>


                <KeyboardAwareScrollView enableOnAndroid={true}>
                    {this.state.stage1? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        <View style={{flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 50,
                                    marginBottom:10, marginTop:80}}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName}
                                placeholder="First Name"
                                keyboardType="default"
                                returnKeyType="next"
                            />

                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}

                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}

                                onChangeText={Password => this.setState({ Password })}
                                value={this.state.Password}
                                placeholder="Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                placeholderTextColor={'gray'}
                                onChangeText={confirmPass => this.setState({ confirmPass })}
                                value={this.state.confirmPass}
                                placeholder="Confirm Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}

                            />
                        </View>
                        <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode='date'
                                onConfirm={this.handleConfirm}
                                onCancel={()=>this.setState({isDatePickerVisible:false})}
                            />
                        <View style={styles.SectionStyle}>
                            <TouchableOpacity style={styles.DateForms1} onPress={()=>this.setState({isDatePickerVisible:true})}>
                                {this.state.convertedDate.length>0?
                                <Text style={{  fontSize: Responsive.font(19),
                                    color: 'black',}}>
                                {this.state.convertedDate}
                                </Text>
                                :
                                <Text style={{  fontSize: Responsive.font(19),
                                    color: 'gray',}}>
                                Date of Birth
                                </Text>
                                
                                }
                            </TouchableOpacity>                         
                        </View>

                        <View style={{borderWidth: 1,fontSize: 19, margin:10,
                            borderColor: '#48A080',
                            width: Dimensions.get('window').width - 105,
                            borderRadius:20,
                            backgroundColor:'white',
                            // padding: 8,
                            paddingLeft:10,height: 50,paddingRight:20, justifyContent:'center'}}>

                
                <Picker
                        selectedValue={this.state.gender}
                        style={{
                            
                           height:45,
                            
                            backgroundColor:'white',
                            fontSize:Responsive.font(19),
                            fontFamily: 'open-sans-bold',
                            color: 'grey'}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ gender: itemValue})
                        }>
                        <Picker.Item label='Select Gender' value=""/>
                        <Picker.Item label='Male' value="male"/>
                        <Picker.Item label='Female' value="female"/>
                    </Picker>
                    </View>

                    <TouchableOpacity disabled={!enabled} onPress={() =>
                    this.handleSignUp()
                } style={{width: Dimensions.get('window').width - 105,
                        alignItems: 'center',
                        backgroundColor: enabled?'#48A080':'#BEBAC5',
                        padding: 10,
                        borderRadius: 100,
                        marginTop: 20}} >
                    <Text style={styles.regButton1} >REGISTER  </Text>
                </TouchableOpacity>

                <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color:'#E48D6A', fontFamily:'open-sans-bold', fontSize:19, padding:20, alignSelf:'center', textAlign:'center'}}>
                        {this.state.msg}
                    </Text>
                </View>
                        {/* <TouchableOpacity  disabled={!enabled} onPress={()=>this.setState({stage1:false})
                } style={{ width: Dimensions.get('window').width - 105, alignItems: 'center', backgroundColor: enabled ? "#48A080" :'#BEBAC5', padding: 10, borderRadius: 100, marginTop: 20}} >
                    <Text style={styles.regButton1} >Continue  </Text>
                </TouchableOpacity> */}
                        </View>:
                        
                        
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                      
                    <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms
                        }
                        placeholderTextColor={'gray'}

                        onChangeText={address=> this.setState({ address })}
                        value={this.state.address}
                        placeholder="Address"
                        keyboardType="email-address"
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms
                        }
                        placeholderTextColor={'gray'}

                        onChangeText={phoneNumber=> this.setState({ phoneNumber })}
                        value={this.state.phoneNumber}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        returnKeyType="done"
                    />
                </View>

                {/* <TouchableOpacity disabled={!enabled2} onPress={() =>
                    this.handleSignUp()
                } style={{width: Dimensions.get('window').width - 105,
                        alignItems: 'center',
                        backgroundColor: enabled2?'#48A080':'#BEBAC5',
                        padding: 10,
                        borderRadius: 100,
                        marginTop: 20}} >
                    <Text style={styles.regButton1} >REGISTER  </Text>
                </TouchableOpacity> */}
                <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color:'#E48D6A', fontFamily:'open-sans-bold', fontSize:19, padding:20, alignSelf:'center', textAlign:'center'}}>
                        {this.state.msg}
                    </Text>
                </View>
            </View>
                        }
                        

                        
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <View style={{ alignItems: 'center', marginTop:15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.reg1}>  Already have an Account </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.reg} >LOGIN </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    ImageStyle1: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    forms: {
        fontSize: Responsive.font(19),
        padding: 8,
        paddingLeft:20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'black'
    },
    DateForms1:{
        justifyContent:'center',
        padding: 8,
        paddingLeft:20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
    },
    forms1: {
        // fontSize: 19,
        padding: 8,
        paddingLeft:20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius:50,
        backgroundColor:'white',
        height: 50,
        // color: 'black'
    },
    regButton1: {
        fontSize: 22,
        fontFamily: 'open-sans-simple',
        color: 'white'
    },
    regButton: {
        width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        backgroundColor: '#48A080',
        padding: 10,
        borderRadius: 100,
        marginTop: 20

    },
    reg: {
        textDecorationLine: 'underline',
        color: '#48A080',
        fontWeight: 'bold',

        fontFamily: 'open-sans-simple',
        fontSize: 20
    },
    reg1: {
        fontFamily: 'open-sans-simple',
        color: 'white',
        fontSize: 20,

    }

});