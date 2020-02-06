import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, AsyncStorage,TouchableOpacity, Dimensions } from 'react-native';
import ToBeRequestedEvents from './ToBeRequestedEvents';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        actScr:1,
        loadingTourData:false,
        isTourListEnd:false,
        tourData:[],
        fetching_tour_from_server:false
    };
    this.offset_Tour = 0
    this.data=''
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount(){
      this.loadTourData()
      this.getUserData()
  }
  async getUserData(){
    try{
        let user = await AsyncStorage.getItem('userProfileData')
        // console.log('Here',user)
        this.data= JSON.parse(user)

        //  console.log(this.data)
  
      }catch(error){
        console.log(error)
      }
}

  loadTourData=()=>{
    if(!this.state.fetching_tour_from_server && !this.state.isTourListEnd){
        this.setState({fetching_tour_from_server:true},()=>{
            fetch('http://pickletour.com/api/get/tournament/page/'+this.offset_Tour)
            .then(response=>response.json())
            .then(responseJson =>{
                if(responseJson.length>0){
                    this.offset_Tour = this.offset_Tour+1
                    let prevData = this.state.tourData
                    let newData = responseJson
                    // console.log(newData)
                    this.setState({
                        tourData:[...prevData, ...newData],
                        fetching_tour_from_server:false
                    })
                } else{
                    this.setState({
                        fetching_tour_from_server:false,
                        isTourListEnd:true
                    })
                }
            })
            .catch(error =>{
                console.error(error)
            })
        })
    }
  }

  renderFooter(){
      return(
          <View>
              {this.state.fetching_tour_from_server ?(
                  <ActivityIndicator/>
              ):null}
          </View>
      )
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
        {this.state.actScr ==1 ? 
        <View style={{paddingTop:10, marginBottom:90}}>
            {this.state.loadingTourData ?(
                <ActivityIndicator/>
            ) :(
            <FlatList
                data = {this.state.tourData}
                renderItem ={({item})=>(
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                        <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={()=>this.loadTourData()}
                onEndReachedThreshold={0.5}
                disableVirtualization={false}
                ListFooterComponent={this.renderFooter.bind(this)}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            />
        )}
        </View>:null}
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
        alignSelf:'center',
        width:'94.5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderRadius: 5,
        borderColor: "#48A080",
        borderWidth: 1,
        
    },
    forms: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#48A080',
        width: Dimensions.get('window').width - 100,
        fontSize: Responsive.font(18),
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