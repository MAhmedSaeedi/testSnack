import React from 'react';
import { View, Text, Picker, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import ToBeRequestedEvents from './ToBeRequestedEvents';
import axios from 'axios';
import ListView from 'deprecated-react-native-listview'
import Responsive from 'react-native-lightweight-responsive';
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            actScr:1,
            eventType: '',
            seLoc: '',
            tourData: [],
            loading: true,
            dataFound: false,
            counter: 0,
            dropChanged: false,
            gettingUrl: 'http://pickletour.com/api/get/tournament/page/'
        };
        this.onEndReachedCalledDuringMomentum = true;
        this.getAlldata = this.getAlldata.bind(this)
    }


    getAlldata = () => {
        var prevData = []
        var con = this.state.counter
        if(this.state.dropChanged){
            this.setState({
                loading: true,
                dataFound: false,
                counter: 0,
                dropChanged: false,
            })
            con = 0
        }
        else{
            prevData = this.state.tourData
        }
        var newData = [];
        var gettingUrl = 'http://pickletour.com/api/get/tournament/page/'
        axios
            .get(gettingUrl + con)
            .then((response) => {
                newData = response.data
                var allData = [...prevData, ...newData]
                var con = this.state.counter
                if (newData.length > 0) {
                    this.setState({
                        tourData: allData,
                        loading: false,
                        dataFound: true,
                        counter: con + 1
                    })
                }
                else {
                    this.setState({
                        tourData: allData,
                        loading: false,
                        dataFound: false
                    })
                }

            }).catch((error) => {
                console.log("mongodb get register error", error)
                this.setState({ msg: "you are not connect to the internet" })
            })


    }
    onEndReached = () => {
        var con = this.state.counter
        if (this.state.dataFound) {
            if (!this.onEndReachedCalledDuringMomentum) {
                this.setState({    // prevState?
                    loading: true,
                    counter: con + 1
                });
                this.forceUpdate()
                this.getAlldata()
                this.onEndReachedCalledDuringMomentum = true;
            }
        }
    }
    componentDidMount() {
        this.getAlldata()

    }

   
    render() {
        return (
            <View>
                <View style={styles.wrapTopSty}>
                <TouchableOpacity onPress={() => this.setState({ actScr: 1 })} style={this.state.actScr == 1 ? styles.topBarStyAct : styles.topBarSty}>
                    <Text style={this.state.actScr==1?styles.selectedtopBarText:styles.topBarText}>Tournaments</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ actScr: 2 })} style={this.state.actScr == 2 ? styles.topBarStyAct : styles.topBarSty}>
                    <Text style={this.state.actScr==2?styles.selectedtopBarText:styles.topBarText}>Leagues</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ actScr: 3 })} style={this.state.actScr == 3 ? styles.topBarStyAct : styles.topBarSty}>
                    <Text style={this.state.actScr==3?styles.selectedtopBarText:styles.topBarText}>Recreational</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ paddingTop: 10 }}>
                {this.state.tourData.length > 0 ?
                    <FlatList
                        data={this.state.tourData}
                        renderItem={({ item }) => (
                            <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                        )}
                        ListHeaderComponent={() => (
                            <View>                                 
                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        style={styles.forms}
                                        placeholderTextColor={'gray'}
                                        onChangeText={seName => this.setState({ seName })}
                                        value={this.state.seName}
                                        placeholder="Search by Name"
                                        keyboardType="default"
                                        returnKeyType="next"
                                    />
                                    <Image style={{ marginRight:10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                </View>
                                <View style={{paddingTop:10}}></View>
                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        style={styles.forms}
                                        placeholderTextColor={'gray'}
                                        onChangeText={seLoc => this.setState({ seLoc })}
                                        value={this.state.seLoc}
                                        placeholder="Search by Location"
                                        keyboardType="default"
                                        returnKeyType="next"
                                    />
                                    <Image style={{ marginRight:10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                                </View>

                                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, marginBottom: 10, marginHorizontal:10 }} />
                                {this.state.loading ? <ActivityIndicator size="large" color="#48A080" /> : null}

                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={()=>this.onEndReached()}
                        disableVirtualization={false}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent=
                        {this.state.loading ? <ActivityIndicator size="large" color="#48A080" /> : this.state.dataFound ? null : <Text style={{ justifyContent: 'center', textAlign: 'center' }}>No Remaining Data</Text>}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    />
                    : <ActivityIndicator size="large" color="#48A080" style={{marginTop:Responsive.height(250)}}/>}
            </View>

            
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 2 - 15,
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#48A080',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 50,
        width: '100%',
        color: '#48A080',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderRadius: 5,
        borderColor: "#48A080",
        borderWidth: 1,
        marginHorizontal:10,
        
    },
    forms: {
        // paddingTop: 10,
        paddingRight: 10,
        // paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#48A080',
        width: Dimensions.get('window').width - 100,
        fontSize: Responsive.font(15),
        fontFamily: 'open-sans-bold',
    },
    
    topBarSty: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    wrapTopSty: {
        backgroundColor: '#686868',
        flexDirection: 'row',
    },
    topBarText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize:Responsive.font(13)
    },
    selectedtopBarText:{
        color:'#9EEACE',
        fontFamily: 'open-sans-bold',
        textDecorationLine:'underline',
        fontSize:Responsive.font(13)
    },
    topBarStyAct: {
        height: 40,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },


});