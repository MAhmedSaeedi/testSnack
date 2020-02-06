import React from 'react';
import { View, Text, Button, ImageBackground, Switch, Image, TextInput, Dimensions, StyleSheet, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions,withNavigation  } from 'react-navigation';
import Responsive from 'react-native-lightweight-responsive';
import {Icon} from 'native-base'
export default class MatchCards extends React.Component {

    constructor(props) {
        super(props);
        this.Time='12:28'
        this.state = {
            actScr: '1',
            test:false,
            buttonDisabled:true,
            checkCourt:false,
            checkPlayer1:false,
            checkPlayer2:false,
            testTime:'11:10',
            convertedDate:null,
            showWidget:true
        };
    }
    // login() {
    //     // this.props.navigation.navigate('MainTabs')
        // this.props.navigation.dispatch(StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        // }))
    // }
    componentDidMount(){
        // console.log(this.props.data)
        let date=this.convertDate(this.props.data.matchDate)
        this.setState({convertedDate:date})

        let fname = this.props.data.one.fName
        let sname = this.props.data.two.fName
        if( fname.includes('Winner of') && sname.includes('Winner of') ){
            this.setState({
                showWidget:false
            })
        }
        // this.getTimeFirstTime()
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
    // getTimeFirstTime(){
    //     const  testTime  = this.Time
    //     const today = new Date();
    //     const h = today.getHours();
    //     let m = today.getMinutes();
    //     const s = today.getSeconds();
    //     m = (m < 10) ? ("0" + m) : m;
    //     let time = h+':'+m
    //     if(time<this.state.testTime){
    //         setInterval(this.getTime(this),10000)
    //     }
    //     else{
    //         console.log(' Match Started')
    //     }
    // }
    showingAlert(){
        Alert.alert(
          'Time not correct !',
          'Match cannot be started yet.',
          [
            {},
            {
              // text: 'Cancel',
              // onPress: () => console.log('Cancel Pressed'),
              // style: 'cancel',
            },
            {text: 'OK',style:'cancel'},
          ],
          {cancelable: false},
        );
      }
    getTime(){
        // const  testTime  = this.Time
        const today = new Date();
        const h = today.getHours();
        const s = today.getSeconds();
        let m = today.getMinutes();
        m = (m < 10) ? ("0" + m) : m;
        let time = h+':'+m
        console.log(time)
        if(time>this.state.testTime){
            console.log('Start Match Now')
        }
        //console.log(h+' : '+m+' : '+s)
    }

    checkTime(userData, data){
        const today = new Date();
        var month = '' + (today.getMonth() + 1)
        var day = '' + today.getDate()
        var year = today.getFullYear()
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        const date = [day,month,year].join('/')
        console.log(date)
        const h = today.getHours();
        const s = today.getSeconds();
        let m = today.getMinutes();
        m = (m < 10) ? ("0" + m) : m;
        let time = h+':'+m
        console.log(time)
        if(time>=this.props.data.matchTime ){
            this.props.navigation.navigate('ScoreCard',{userData, data})
        }
        else{
            this.showingAlert()
        }
    }
    render() {
        const data = this.props.data
        const { checkCourt, checkPlayer1, checkPlayer2 } =this.state
        const enabled = checkCourt==true && checkPlayer1==true && checkPlayer2==true
        //console.log('----------------------------------------------------------------------------------------------------------')
        // console.log(this.props.data)
        // console.log('saeedi')
        // console.log(this.props.navigation.state.params.item)
        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent:'center', alignContent:'center' }} >
        <Text style={{paddingHorizontal:5,paddingVertical:2,alignSelf:'center',justifyContent:'center',alignContent:'center',backgroundColor:'#5D5D5D',color:'#FFFFFF',fontFamily:'open-sans-bold', fontSize:Responsive.font(12)}}>Match No {this.props.location+1}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop:10,}}>
                    <View style={{flexDirection:'row', }}>
                    <Icon type="MaterialCommunityIcons" name="calendar-today"  style={{ fontSize:Responsive.font(14) ,color: '#585858', alignSelf:'center'}}/>
                    <Text style={{alignSelf:'center',fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{this.state.convertedDate}</Text>
                    </View>

                    <View style={{flexDirection:'row', marginLeft:15}}>
                        <Icon type="Ionicons" name="md-time"  style={{ fontSize:Responsive.font(14) ,color: '#585858', alignSelf:'center'}}/>
        <Text style={{alignSelf:'center',fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', paddingLeft:5}}>{data.matchTime}</Text>
                    </View>
                </View>

                <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
                    <View style={{width:'65%'}}>

                    </View>
                    <View style={{paddingHorizontal:7,flexDirection:'row', justifyContent:'flex-start', borderColor:'#8B8B8B', borderWidth:1, borderRadius:50}}>
        <Text style={{marginRight:5,alignSelf:'center',color:'#585858',fontSize:Responsive.font(12), fontFamily:'open-sans-bold'}}>Court no. {data.court}</Text>
                        <Switch thumbColor={this.state.checkCourt? '#42974D':'#D14D4D'} trackColor={{false:'#D14D4D' , true:'#42974D' }}
                            value={this.state.checkCourt}  
                            onValueChange ={(checkCourt)=>this.setState({checkCourt})}
                        />  


                        
                    </View>

                </View>


                <View style={{ height: 1, backgroundColor: '#AAAAAA', marginBottom: 5, marginTop: 5 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '48%', marginRight: '4%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team A - </Text>
                            <Text style={styles.head}>Alpha</Text>
                        </View>
                        <View style={styles.teamNames} >
                            <Text style={styles.head1}>{data.one.fName}</Text>
                            {this.state.showWidget &&  <Switch thumbColor={this.state.checkPlayer1? '#42974D':'#D14D4D'} trackColor={{false:'#D14D4D' , true:'#42974D' }}
                                value={this.state.checkPlayer1}  
                                onValueChange ={(checkPlayer1)=>this.setState({checkPlayer1})}
                            />  }
                        </View>
                    </View>
                    <View style={{ width: '48%' }}>
                        <View style={styles.teamName} >
                            <Text style={styles.head}>Team B - </Text>
                            <Text style={styles.head}>Beta </Text>
                        </View>
                        <View style={styles.teamNames} >
                            <Text style={styles.head1}>{data.two.fName}</Text>
                            {this.state.showWidget && <Switch thumbColor={this.state.checkPlayer2? '#42974D':'#D14D4D'} trackColor={{false:'#D14D4D' , true:'#42974D' }}
                                value={this.state.checkPlayer2}  
                                onValueChange ={(checkPlayer2)=>this.setState({checkPlayer2})}
                            />  }
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#AAAAAA', marginBottom: 10, marginTop: 5 }} />

                    
                    
                    <View style={{ flexDirection: 'row', width: '100%', marginRight: 10 ,justifyContent:'flex-end'}} >
                    <TouchableOpacity disabled={!enabled} onPress={() =>  this.checkTime(this.props.navigation.state.params.item,data) }style={[styles.mySBtn,{backgroundColor: enabled?'#42974D':'#82C68B'}]}>
                            <Text style={styles.myStext}> Start Match</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity disabled={!enabled} onPress={() =>  this.props.navigation.navigate('ScoreCard',this.props.navigation.state.params.item) }style={[styles.mySBtn,{backgroundColor: enabled?'#42974D':'#82C68B'}]}>
                            <Text style={styles.myStext}> Start Match</Text>
                        </TouchableOpacity> */}
                    </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        width: '100%',
        backgroundColor: '#C4C4C4',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom: 10
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    head1: {
        color: '#585858',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12),
        alignSelf:'center'
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(12)
    },
    mySBtn: {
        
        color:'white',
        // s
        // borderColor:'white',
        padding: 4,
        justifyContent:'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
    },
    mcde: {
        alignSelf:'center',
        justifyContent:'center',
        color: 'white',
        backgroundColor: '#5D5D5D',
        padding: 3,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        fontWeight: 'bold',
        height: 28,
        
        fontSize: Responsive.font(11)
    },
    teamName: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#8B8B8B',
        padding: 5
    },
    teamNames: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ECECEC',
        padding: 5,
        color: 'black',
        justifyContent:'space-between'
    },
    myStext:{
        color:'white',
        alignSelf:'center',
        fontFamily:'open-sans-bold',
        fontSize: Responsive.font(12)
    }


});