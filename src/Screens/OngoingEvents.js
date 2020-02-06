import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, AsyncStorage, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios'
export default class OngoingEvents extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            
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
    // componentDidMount(){
        
    //     // this.getItem()
    //     this.getAllData()
    // }
    // login() {
    //     this.props.navigation.navigate('MainTabs')
    //     this.props.navigation.dispatch(StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
    //     }))
    // }

    

    render() {
        const data = this.props.data
        return (
            <View style={styles.cardStyles}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', width: '60%' }} >
                        <Text style={styles.head}>Name: </Text>
                        <Text style={styles.inHead}>Grand Transver Bay</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '30%', marginLeft: 10 }} >
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
                   
                </View>
                <View style={{ flexDirection: 'row', width: '100%'}} >
                        <Text style={styles.head}>Matches Refereed : </Text>
                        <Text style={styles.inHead}>8/8</Text>
                    </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: '50%' }} >
                        <Text style={styles.head}>Division : </Text>
                        <Text style={styles.inHead}>Men's Single</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '40%', marginLeft: 10 }} >
                        <TouchableOpacity style={styles.mySBtn}>
                            <Text style={styles.myStext}> See Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        width: '100%',
        backgroundColor: '#48A080',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom:10
    },
    head: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: 15
    },
    inHead: {
        color: '#DCDCDC',
        fontFamily: 'open-sans-bold',
        fontSize: 14
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