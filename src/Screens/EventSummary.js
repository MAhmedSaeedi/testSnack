import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import MatchCardsRes from './MatchCardsRes';
import { Item } from 'native-base';
import axios from 'axios'
import Responsive from 'react-native-lightweight-responsive';

export default class EventSummary extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            actScr: '1',
            tourData:[],
            dataLoaded:false
        };
    }
    
    componentDidMount(){
        this.getAllData(this.props.navigation.state.key)
        // console.log(this.props.data)
    }

    getAllData= (userId)=>{
       
        console.log(userId)
        var newData = [];
       
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/0'
        
        axios.get(gettingUrl)
        .then((response)=>{
            newData = response.data
            // console.log(newData)
            var allData = [...newData]
            // var con = this.state.counter
            if (newData.length > 0) {
                this.setState({
                    tourData: allData,
                    // loading: false,
                    dataLoaded:true,
                    // counter: con + 1
                })
            }
            else {
                this.setState({
                    // tourData: allData,
                    // loading: false,
                    dataLoaded:false,
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        // console.log(this.props.navigation)
        return (
            <View>
                {/* <ScrollView style={{ marginBottom: 10 }}> */}
                    
                    

                    <View style={{ padding: 10 }}>
                    {this.state.dataLoaded  ? <FlatList
                            
                            data ={this.state.tourData}
                            extraData={this.props}
                            keyExtractor={item => item._id}
                            ListHeaderComponent={()=>(
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
                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }} >
                                        <Text style={styles.head}>Address : </Text>
                                        <Text style={styles.inHead}>Street 4, California Stadium USA</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', width: '50%' }} >
                                            <Text style={styles.head}>Event Type : </Text>
                                            <Text style={styles.inHead}>Tournament</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '40%', marginLeft: 10, }} >
                                            <Text style={styles.head}>Matches Refereed : </Text>
                                            <Text style={styles.inHead}>8/8</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }} >
                                            <Text style={styles.head}>Division : </Text>
                                            <Text style={styles.inHead}>Men's Single</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', width: '100%' }} >
                                <Text style={styles.head}>Organizer Name : </Text>
                                <Text style={styles.inHead}>Anjum Muneer</Text>
                            </View>
                        </View>
                                <View style={{ height: 1, backgroundColor: '#E2E2E2', marginVertical: 10 }} />
                                </View>
                            )}
                            renderItem={({item})=>(

                                
                                <MatchCardsRes navigation={this.props.navigation} data={item} />
                            
                            )}
                        />:<View style={{ paddingTop:"50%",flex: 1,justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#48A080" />
                    </View>}
                        
                        {/* <MatchCardsRes />
                        <MatchCardsRes />
                        <MatchCardsRes /> */}
                    </View>
                {/* </ScrollView> */}

            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardStyles: {
        width: '100%',
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
        color: '#145840',
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold',
        fontSize: Responsive.font(12)
    },
    inHead: {
        color: '#606060',
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