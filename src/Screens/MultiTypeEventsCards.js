// // import React from 'react';
// // import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
// // import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// // import { TouchableOpacity } from 'react-native-gesture-handler';
// // import { NavigationActions, StackActions } from 'react-navigation';
// // import axios from 'axios'
// // import Responsive from 'react-native-lightweight-responsive';
// // export default class MultiTypeEventsCards extends React.Component {

// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             convertedDate:null
// //         };
// //     }
// //     // async getItem(){
// //     //     try{
// //     //         this.userId =await AsyncStorage.getItem('userId')
// //     //         this.getAllData()
// //     //         // console.log('User ID:  ',this.userId)
// //     //     }catch (error){
// //     //         console.log('error')
// //     //     }
// //     // }
// //     componentDidMount(){
// //         let date=this.convertDate(this.props.data.tournamentStartDate)
// //         this.setState({convertedDate:date})
// //         //console.log(date)
// //         // console.log(this.props.data)
// //         // this.getItem()
// //         // this.getAllData()
// //     }
// //     convertDate(date){
// //         var d= new Date(date)
// //         var month = '' + (d.getMonth() + 1)
// //         var day = '' + d.getDate()
// //         var year = d.getFullYear()
// //         if (month.length < 2) 
// //         month = '0' + month;
// //         if (day.length < 2) 
// //         day = '0' + day;
// //         return [day, month, year].join('-');
// //     }
// //     // login() {
// //     //     this.props.navigation.navigate('MainTabs')
// //     //     this.props.navigation.dispatch(StackActions.reset({
// //     //         index: 0,
// //     //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
// //     //     }))
// //     // }

    

// //     render() {
// //         const data = this.props.data
// //         const show = this.props.show
// //         //console.log(show)
// //         return (
// //             <View style={styles.cardStyles}>
// //                 <View style={{ flexDirection: 'row' }}>
// //                     <View style={{ flexDirection: 'row', flex:2 }} >
// //                         <Text style={styles.head}>Name: </Text>
// //                         <Text style={styles.inHead}>{ data.tournamentName }</Text>
// //                     </View>
// //                     <View style={{ flexDirection: 'row', flex:1, justifyContent:'flex-end' }} >
// //                         <Text style={styles.head}>Date: </Text>
// //                         <Text style={styles.inHead}>{this.state.convertedDate}</Text>
// //                     </View>
// //                 </View>
// //                 <View style={{ flexDirection: 'row', width: '100%' }} >
// //                     <Text style={styles.head}>Address : </Text>
// //                     <Text style={styles.inHead}>{ data.address}</Text>
// //                 </View>

// //                 <View style={{ flexDirection: 'row', width: '100%'}} >
// //                         <Text style={styles.head}>Matches Refereed : </Text>
// //                         <Text style={styles.inHead}>8/8</Text>
// //                     </View>
// //                 <View style={{ flexDirection: 'row', marginTop: 10 }}>
// //                     <View style={{ flexDirection: 'row', flex:1 }} >
// //                         <Text style={styles.head}>Event Type : </Text>
// //                         <Text style={styles.inHead}>{data.type}</Text>
// //                     </View>

// //                     <View style={{ flexDirection: 'row', flex:1, justifyContent:'flex-end' }} >
// //                         <Text style={styles.head}>Division : </Text>
// //                         <Text style={styles.inHead}>{ data.divisionName }</Text>
// //                     </View>


                   
// //                 </View>
// //             </View>

// //         );
// //     }
// // }
// // const styles = StyleSheet.create({
// //     cardStyles: {
// //         width: '100%',
// //         backgroundColor: '#48A080',
// //         padding: 10,
// //         shadowColor: "#000",
// //         shadowOffset: {
// //             width: 0,
// //             height: 2,
// //         },
// //         shadowOpacity: 0.23,
// //         shadowRadius: 2.62,

// //         elevation: 4,
// //         marginBottom:10
// //     },
// //     head: {
// //         color: 'white',
// //         fontFamily: 'open-sans-bold',
// //         fontWeight: 'bold',
// //         fontSize: Responsive.font(13)
// //     },
// //     inHead: {
// //         color: '#DCDCDC',
// //         fontFamily: 'open-sans-bold',
// //         fontSize: Responsive.font(13)
// //     },
// //     mySBtn: {
// //         backgroundColor: 'white',
// //         padding: 4,
// //         paddingLeft: 20,
// //         paddingRight: 20,
// //         borderRadius: 10,
// //         alignContent: 'flex-end',
// //         shadowColor: "#000",
// //         shadowOffset: {
// //             width: 0,
// //             height: 2,
// //         },
// //         shadowOpacity: 0.23,
// //         shadowRadius: 2.62,

// //         elevation: 4,
// //     },
// //     myStext:{
// //         fontSize: Responsive.font(12),
// //         color:'#7E7E7E'
// //     }

// // });

// import React from 'react';
// import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { NavigationActions, StackActions } from 'react-navigation';
// import axios from 'axios'
// import { Icon } from 'native-base'
// import Responsive from 'react-native-lightweight-responsive';
// export default class EventCards extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     // async getItem(){
//     //     try{
//     //         this.userId =await AsyncStorage.getItem('userId')
//     //         this.getAllData()
//     //         // console.log('User ID:  ',this.userId)
//     //     }catch (error){
//     //         console.log('error')
//     //     }
//     // }
//     componentDidMount(){
//         // console.log(this.props.data)
//         // this.getItem()
//         // this.getAllData()
//     }
//     // login() {
//     //     this.props.navigation.navigate('MainTabs')
//     //     this.props.navigation.dispatch(StackActions.reset({
//     //         index: 0,
//     //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
//     //     }))
//     // }

    

//     render() {
//         const data = this.props.data
        
//         const show = this.props.show
//         //console.log(show)
//         return (
//             <View style={styles.cardStyles}>
//                 <View style={{ height:'45%', alignSelf:'center', width:'95%',justifyContent:'center'}}>
//                     <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{data.tournamentName}</Text>
//                 </View>
//                 {/* Rows here */}

//                 <View style={{borderWidth:1,marginHorizontal:10,borderColor:'#81D4B6'}}></View>
//                 <View style={{ height:'45%', width:'95%', alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>
//                     <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
//                         {/* <Text style={{fontSize:Responsive.font(12), color:'#585858'}}>Date:</Text> */}
//                         <Icon type="FontAwesome" name="calendar"  style={{ alignSelf:'center',fontSize:Responsive.font(14) ,color: '#585858'}}/>
//                         <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600'}}>  12/01/2020 - 22/01/2020</Text>
//                     </View>


//                     {/* <View style={{flex:1, justifyContent:'center',}}>
//                     <TouchableOpacity style={styles.mySBtn} onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                  
//                                   <Text style={styles.myStext}>See Summary</Text>
//                   </TouchableOpacity>
//                     </View> */}
//                 </View>
//                 {/* <View style={{ flexDirection: 'row' }}>
//                     <View style={{ flexDirection: 'row', flex: 2, }} >
//                         <Text style={styles.head}>Name: </Text>
//                         <Text style={styles.inHead}>Grand Transver Bay</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row',  flex:1, justifyContent:'flex-end' }} >
//                         <Text style={styles.head}>Date: </Text>
//                         <Text style={styles.inHead}>12-10-2019</Text>
//                     </View>
//                 </View>
//                 <View style={{ flexDirection: 'row', width: '100%' }} >
//                     <Text style={styles.head}>Address : </Text>
//                     <Text style={styles.inHead}>Street 4, California Stadium USA</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                     <View style={{ flexDirection: 'row', width: '50%' }} >
//                         <Text style={styles.head}>Event Type : </Text>
//                         <Text style={styles.inHead}>Tournament</Text>
//                     </View>

//                     <View style={{ flexDirection: 'row', width: '50%', justifyContent:'flex-end'}} >
//                         <Text style={styles.head}>Matches Refereed : </Text>
//                         <Text style={styles.inHead}>8/8</Text>
//                     </View>
                   
//                 </View>
                
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <View style={{ flexDirection: 'row', width: '50%' }} >
//                         <Text style={styles.head}>Division : </Text>
//                         <Text style={styles.inHead}>Men's Single</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', width: '35%', justifyContent:'flex-end'}} >
//                     <TouchableOpacity style={styles.mySBtn} onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                  
//                                     <Text style={styles.myStext}>See Summary</Text>
//                     </TouchableOpacity>

                      
//                     </View>
//                 </View> */}
//             </View>

//         );
//     }
// }
// const styles = StyleSheet.create({
//     cardStyles: {
//         width: '100%',
//         backgroundColor: '#9EEACE',
//         // marginHorizontal: 10,
//         // paddingHorizontal:10,
//         // paddingVertical:10,
//         height:70,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         justifyContent:'center',
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,

//         elevation: 4,
//         marginBottom:10
//     },
//     head: {
//         color: 'white',
//         fontFamily: 'open-sans-bold',
//         fontWeight: 'bold',
//         fontSize: Responsive.font(13)
//     },
//     inHead: {
//         color: '#DCDCDC',
//         fontFamily: 'open-sans-bold',
//         fontSize: Responsive.font(13)
//     },
//     mySBtn: {
//         backgroundColor: 'white',
//         justifyContent:'center',
//         alignSelf:'flex-end',
//         padding: 2,
//         paddingLeft: 15,
//         paddingRight: 15,
//         borderRadius: 10,
//         alignContent: 'flex-end',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,

//         elevation: 4,
//     },
//     myStext:{
//         fontSize: Responsive.font(12),
//         fontFamily:'open-sans-simple',
//         color:'#7E7E7E',
//         alignSelf:'center'
//     }

// });


import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios'
import { Icon } from 'native-base'
import Responsive from 'react-native-lightweight-responsive';
export default class MultiTypeEventsCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newName:'',
            useNewName:false,
            convertedDate:null
        };
    }
    // async getItem(){
    //     try{
    //         this.userId =await AsyncStorage.getItem('userId')
    //         this.getAllData()
    //         // console.log('User ID:  ',this.userId)
    //     }catch (error){
    //         console.log('error')
    //     }
    // }
    getWords(){

    }
    componentDidMount(){
        let date=this.convertDate(this.props.data.tournamentStartDate)
        this.setState({convertedDate:date})

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
        return [day, month, year].join('-');
    }

    convertString(name){
        name = name.replace(/(^\s*)|(\s*$)/gi,"");
        name = name.replace(/[ ]{2,}/gi," ");
        name = name.replace(/\n /,"\n");
        return name.length;
    }
    // login() {
    //     this.props.navigation.navigate('MainTabs')
    //     this.props.navigation.dispatch(StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
    //     }))
    // }

    

    render() {
        const item = this.props.data
        // console.log(data)
        const show = this.props.show
        //console.log(show)
        return (
            <View style={styles.cardStyles}>
                <View style={{ height:'45%', alignSelf:'center', width:'95%',justifyContent:'center'}}>
                    <Text style={{fontSize:Responsive.font(14), color:'#585858', fontFamily:'open-sans-bold'}}>{this.state.useNewName?this.state.newName:item.tournamentName}</Text>
                </View>
                {/* Rows here */}

                <View style={{borderWidth:0.5,marginHorizontal:10,borderColor:'#81D4B6'}}></View>
                <View style={{ height:'45%', width:'95%', alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
                        <Icon type="MaterialIcons" name="date-range"  style={{ alignSelf:'center',fontSize:Responsive.font(15) ,color: '#585858'}}/>
                        <Text style={{fontSize:Responsive.font(11), color:'#585858', fontFamily:'open-sans-bold', fontWeight:'600'}}>  12/01/2020 - 22/01/2020</Text>
                    </View>


                    <View style={{flex:1, justifyContent:'center'}}>
                    <TouchableOpacity style={styles.mySBtn} onPress={()=>this.props.navigation.navigate('EventDetails',{item})}>
                                  
                                  <Text style={styles.myStext}>Manage</Text>
                  </TouchableOpacity>
                    </View> 
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 2, }} >
                        <Text style={styles.head}>Name: </Text>
                        <Text style={styles.inHead}>Grand Transver Bay</Text>
                    </View>
                    <View style={{ flexDirection: 'row',  flex:1, justifyContent:'flex-end' }} >
                        <Text style={styles.head}>Date: </Text>
                        <Text style={styles.inHead}>12-10-2019</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }} >
                    <Text style={styles.head}>Address : </Text>
                    <Text style={styles.inHead}>Street 4, California Stadium USA</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Event Type : </Text>
                        <Text style={styles.inHead}>Tournament</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '50%', justifyContent:'flex-end'}} >
                        <Text style={styles.head}>Matches Refereed : </Text>
                        <Text style={styles.inHead}>8/8</Text>
                    </View>
                   
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Division : </Text>
                        <Text style={styles.inHead}>Men's Single</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '35%', justifyContent:'flex-end'}} >
                    <TouchableOpacity style={styles.mySBtn} onPress={()=>this.props.navigation.navigate('EventSummary')}>
                                  
                                    <Text style={styles.myStext}>See Summary</Text>
                    </TouchableOpacity>

                      
                    </View>
                </View> */}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        alignSelf:'center',
        // marginLeft:10,
        // marginRight:10,
        
        marginHorizontal:10,
        width: '94.5%',
        backgroundColor: '#9EEACE',
        // marginHorizontal: 10,
        // paddingHorizontal:10,
        // paddingVertical:10,
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
        fontSize: Responsive.font(13)
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: Responsive.font(13)
    },
    mySBtn: {
        backgroundColor: 'white',
        justifyContent:'center',
        alignSelf:'flex-end',
        padding: 2,
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
        fontSize: Responsive.font(12),
        fontFamily:'open-sans-bold',
        color:'#7E7E7E',
        alignSelf:'center'
    }

});