import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Responsive from 'react-native-lightweight-responsive';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from 'native-base'
export default class EventCardsMa1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            newName:'',
            useNewName:false,
            startDate:null,
            endDate:null
        };
    }
    login() {
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    componentDidMount(){
        let date=this.convertDate(this.props.data.tournamentStartDate)
        this.setState({startDate:date})
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

    render() {
        const data = this.props.data
        // console.log(data)
        return (
            <View style={styles.cardStyles}>

<View style={{ height:'45%', alignSelf:'center', width:'95%',justifyContent:'center'}}>
                    <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{this.state.useNewName?this.state.newName:data.tournamentName}</Text>
                </View>
                {/* Rows here */}

                <View style={{borderWidth:0.5,marginHorizontal:10,borderColor:'#81D4B6'}}></View>
                <View style={{ height:'45%', width:'95%', alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row', }}>
                        <Text  style={{fontSize:Responsive.font(13), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600', alignSelf:'center'}}>Event Type : </Text>
                        <Text  style={{fontSize:Responsive.font(12), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600',alignSelf:'center'}}>{data.type}</Text>

                    </View>                   
                   
                    <View style={{flex:1, flexDirection:'row',  justifyContent: 'flex-end',}}>
                        <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(15) ,color: '#585858'}}/>
                        <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold',alignSelf:'center', paddingLeft:5}}>{this.state.startDate} - 20/01/2020</Text>
                    </View>


                 
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: '60%' }} >
                        <Text style={styles.head}>Name: </Text>
                        <Text style={styles.inHead}>{data.tournamentName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '30%', marginLeft: 10 }} >
                        <Text style={styles.head}>Date: </Text>
                        <Text style={styles.inHead}>12-10-2019</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '80%' }} >
                    <Text style={styles.head}>Address : </Text>
                    <Text style={styles.inHead}>{data.address}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }} >
                        <Text style={styles.head}>Event Type : </Text>
                        <Text style={styles.inHead}>{data.type}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }} >
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Division : </Text>
                        <Text style={styles.inHead}>{data.divisionName}</Text>
                    </View>
                </View> */}
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
        marginBottom:10
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
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