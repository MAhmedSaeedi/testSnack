import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'firebase';
import axios from 'axios'



export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            isFetching:false,
            userName: '',
            Password: '',
            msg: "",
            userId:'',
            backtoLogin:false
        };
    }
    componentDidMount(){
        this.setState({
            userName:'mahmedsaeedi2020@gmail.com',
            Password:'123456'
        })
        // this.props.navigation.dispatch(StackActions.reset({
        //                     index: 0,
        //                     actions: [NavigationActions.navigate({ routeName: 'Login' })],
        //                 }))
    }
    async letsHandleLogin(){
        try{
            // setTimeout(()=>{},5000)
            this.setState({isFetching:true})
            const {userName, Password}= this.state
            let user = await firebase.auth().signInWithEmailAndPassword(userName,Password)
            //let dum = await firebase.auth().signOut()
            //console.log(dum)
            let url = 'https://pickletour.appspot.com/api/user/get/'+ user.user.uid
            const res = await fetch(url)
            const data = await res.json()
            const newUser ={
                uid: data.uid,
                firstName:data.firstName,
                email: data.email,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                gender:data.gender,
                address:'abc',
                phoneNumber:'123'        
            }
            this.storingUserData(newUser)
            
        }catch(error){
            this.setState({isFetching:false})
        }
    }
    // componentDidUpdate(){
    //     this.setState({isFetching:true})
    // }

    async storingUserData(user){
        try{
            // const {userName, Password}= this.state
            await AsyncStorage.setItem('userProfileData', JSON.stringify(user))
            //await firebase.auth().signInWithEmailAndPassword(name,password)
            setTimeout(()=>{
                this.setState({isFetching:false})
            },3000)
        }catch(error){
            console.log(error)
        }
    }

    handleLogin = () => {
        this.setState({isFetching:true})
        // TODO: Firebase stuff...
        const {userName, Password}= this.state
        firebase.auth().signInWithEmailAndPassword(userName,Password)
        .then((data)=>{
            console.log(data.user.uid)
            this.setState({ userId:data.user.uid})
            axios.get('https://pickletour.appspot.com/api/user/get/'+data.user.uid)
            .then((data)=>{
                const newUser ={
                    uid: data.data.uid,
                    firstName:data.data.firstName,
                    email: data.data.email,
                    password: data.data.password,
                    dateOfBirth: data.data.dateOfBirth,
                    gender:data.data.gender,
                    address:data.data.address,
                    phoneNumber:data.data.phoneNumber    
                    
                    
                }


                // console.log(data.data.gender)
                AsyncStorage.setItem('userProfileData', JSON.stringify(newUser))
                // console.log(AsyncStorage.getItem('userProfileData'))
                // this.props.navigation.navigate('MainTabs')
                this.setState({isFetching:false})
                
                // const saveUserId = async userId=>{
                //     try{
                //         await AsyncStorage.setItem('userId', this.state.userId)
                //     }
                //     catch(error){
                //         console.log(error)
                //     }
                // }
                // saveUserId()
            })
        // axios.get('https://pickletour.appspot.com/api/user/profile/'+user.user.uid).then(resp => {
        //         console.log("agyaaaaaaa")
        //         console.log(resp.data);
        //         dispatch(uidsave(resp.data)
        })
        .catch(error=>{this.setState({isFetching:false, msg:'Incorrect credentials, please try again'})})
        
      }
    login() {
        // console.log("login")
        // axios
        //     .post('https://blooming-ridge-94645.herokuapp.com/login',{
        //         userName: this.state.userName,
        //         password: this.state.Password
        //     })
        //     .then((response) => { 

        //         console.log("resp1",response.data)
        //         if(response.data === "match"){
        //             this.props.navigation.navigate('MainTabs')
        //             this.props.navigation.dispatch(StackActions.reset({
        //                 index: 0,
        //                 actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        //             }))
        //         }else if(response.data === "wrong"){
        //             this.setState({msg: "password is incorrect"})
        //         }
        //     }).catch((error) => { 
        //     console.log("mongodb get register error",error)
        //     this.setState({msg: "login info is incorrect"})
        //     })
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    render() {
        
        // console.log("state", this.state)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#86d6b9' }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        <View style={styles.SectionStyle}>
                           <Image style={{ height:50,marginBottom:100, width: Dimensions.get('window').width - 70}} source={require('../../assets/Logo.png')}/>
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms}
                                placeholderTextColor={'gray'}
                                onChangeText={userName => this.setState({ userName })}
                                value={this.state.userName}
                                placeholder="User Name"
                                keyboardType="default"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                onChangeText={Password => this.setState({ Password })}
                                value={this.state.Password}
                                placeholderTextColor={'gray'}

                                placeholder="Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>

                        {
                            this.state.isFetching? <ActivityIndicator size='large'/>:
                            <TouchableOpacity onPress={() =>
                                this.letsHandleLogin()
                            } style={styles.regButton} >
                                <Text style={styles.regButton1} >LOGIN  </Text>
                            </TouchableOpacity>
                        
                        }
                        
                        <View>
                            <Text>
                                {this.state.msg}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.reg1}>  Don't have an account? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={styles.reg} >REGISTER </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <Button
                            title="Go to Sign up"
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        /> */}
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
        fontSize: 19,
        padding: 8,
        paddingLeft: 20,
        width: Dimensions.get('window').width - 105,
        borderWidth: 1,
        borderColor: '#48A080',
        borderRadius: 50,
        backgroundColor: 'white',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'black'
    },
    regButton1: {
        fontSize: 22,
        fontFamily: 'open-sans-simple',
        color: 'white'
    },
    regButton: {
        fontFamily: 'open-sans-simple',
        width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        backgroundColor: '#48A080',
        padding: 10,
        borderRadius: 100,
        marginTop: 60,
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
        fontSize: 20
    }
});