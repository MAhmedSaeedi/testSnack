import React, { Component } from 'react';
import { Alert,Modal,View, Text,StyleSheet,SafeAreaView , BackHandler,ImageBackground,StatusBar , TouchableOpacity, Image} from 'react-native';
import { ScreenOrientation, } from 'expo';
import { RadioGroup} from 'react-native-btr';
import { CheckBox, ListItem, Icon } from 'native-base'
import Responsive from 'react-native-lightweight-responsive';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class ScoreCard extends Component {
  
  constructor(props) {
    

    super(props);
    this.playingSide=''
    this.interval=null
    // this.lapArr=[]
    //this.SideSelected='Left'
    this.TargetSelected = 11
    this.state = {
      radioButtons:[
        {
          label:'Left',
          value:'left',
          checked: true,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'Right',
          value:'right',
          checked: false,
          disabled:false,
          flexDirection:'row',
          size:11
        }],
      pointsButton:[
        {
          label:'11',
          value:11,
          checked:true,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'15',
          value:15,
          checked:false,
          disabled:false,
          flexDirection:'row',
          size:11
        },
        {
          label:'21',
          value:21,
          checked:false,
          disabled:false,
          flexDirection:'row',
          size:11
        },
      ], 

      startClicked:false,
      start:false,
      min:0,
      sec:0,
      msec:0,
      ballpos1:false,
      ballpos2:false,
      ballpos3:false,
      ballpos4:false,
      GameStart:true,
      Team1Serving:false,
      Team2Serving:false,
      Serve:0,
      ScoreTeam1:0,
      ScoreTeam2:0,
      Section1:'Player #1',
      Section2:'Player #2',
      Section3:'Player #3',
      Section4:'Player #4',
      TeamFormation:'Doubles',
      Player1Name:'George set',
      Player2Name:'B',
      Player3Name:'William',
      Player4Name:'D',
      modalVisible:true,
      checked:true,
      PlayingSide:''
      
    };
  }

  handleToggle = () =>{
    this.setState(
      {
        start:!this.state.start
      },
      () =>this.handleStart()
    )
  }


  handleStart = () =>{
    if(this.state.start){
      this.interval = setInterval(()=>{
         if(this.state.sec!==59){
            this.setState({
              msec:0,
              sec: ++ this.state.sec
            })
        } else {
          this.setState({
            msec:0,
            sec:0,
            min: ++this.state.min
          })
        }
      }, 1000)
    } else{
      clearInterval(this.interval)
    }
  }

  handleReset =()=>{
    this.setState({
      min:0,
      sec:0,
      msec:0,
      start: false
    });
    clearInterval(this.interval)

  }

  async changeScreenOrientation() {
    
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async exitScreenOrientation(){
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN)
  }
  // balltesting(){
  //   this.setState({ballpos1:false, ballpos2:false})
  // }
  // balltesting2(){
  //   this.setState({ballpos1:true, ballpos2:true})
  // }
  checkingScore(whichTeam){
    if(whichTeam=='ByOne'){
      
      if(this.state.checked==true){
        if(this.state.ScoreTeam2==this.TargetSelected && this.state.ScoreTeam2-this.state.ScoreTeam1>=2){
          console.log(this.state.ScoreTeam2  +'   '+ this.TargetSelected +'   '+this.state.ScoreTeam1)
          this.showingAlert('Team two is the Winner.')  
        }
        else if(this.state.ScoreTeam2>this.TargetSelected && this.state.ScoreTeam2-this.state.ScoreTeam1>=2){
          console.log(this.state.ScoreTeam2  +'   '+ this.TargetSelected +'   '+this.state.ScoreTeam1)
          this.showingAlert('Team two is the Winner.')  
        }
      }
      else{
        if(this.state.ScoreTeam2==this.TargetSelected){
          this.showingAlert('Team two is the Winner.') 
        }
      }
        
    }
  else if(whichTeam=='ByTwo'){
    if(this.state.checked==true){
      if(this.state.ScoreTeam1==this.TargetSelected && this.state.ScoreTeam1-this.state.ScoreTeam2>=2){
        this.showingAlert('Team one is the Winner.') 
      }
      else if(this.state.ScoreTeam1>this.TargetSelected && this.state.ScoreTeam1-this.state.ScoreTeam2>=2){
        this.showingAlert('Team one is the Winner.') 
      }
    }
    else{
      if(this.state.ScoreTeam1==this.TargetSelected){
        this.showingAlert('Team one is the Winner.') 
      }
    }
  }
}

  showingAlert(teamMsg){
    Alert.alert(
      'Game Over !',
      teamMsg,
      [
        {},
        {
          // text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          // style: 'cancel',
        },
        {text: 'OK', onPress: () => this.setState({modalVisible:true})},
      ],
      {cancelable: false},
    );
  }

  fault(whichTeam){
    if(this.state.TeamFormation=='Doubles'){
    if(whichTeam=='ByOne' && this.state.Team1Serving==true && this.state.Serve==2){
      this.setState({ballpos1:false, ballpos3:true, Serve:1, GameStart:false, Team1Serving:false, Team2Serving:true, ballpos2:false},()=>this.checkingScore(whichTeam))
    }
    else if(whichTeam=='ByOne' && this.state.Team2Serving==true && this.state.Serve==1){
      if(this.state.ballpos3==true){
        this.setState({ballpos4:true, ballpos3:false, ScoreTeam2:this.state.ScoreTeam2+1, Section4:this.state.Player3Name, Section3:this.state.Player4Name},()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos3==false && this.state.ballpos4==true){
        this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1,  Section4:this.state.Player4Name, Section3:this.state.Player3Name},()=>this.checkingScore(whichTeam))  
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true && this.state.Serve==1){
      if(this.state.ballpos3==true){
        this.setState({ballpos3:false, ballpos4:true, Serve:2})
      }
      else if(this.state.ballpos4==true){
        this.setState({ballpos3:true, ballpos4:false, Serve:2})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true && this.state.Serve==2){
      this.setState({ballpos3:false, ballpos4:false, ballpos1:true, Serve:1, Team1Serving:true, Team2Serving:false})
    }  
    else if(whichTeam=='ByOne' && this.state.Team2Serving==true && this.state.Serve==2){
      // this.setState({ScoreTeam2:this.state.ScoreTeam2+1, player3Move:true, player4Move:false})
      if(this.state.ballpos3==true){
        if(this.state.Section3==this.state.Player3Name){
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name},()=>this.checkingScore(whichTeam))
        }
        else{
          this.setState({ballpos3:false, ballpos4:true, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name},()=>this.checkingScore(whichTeam))
        }
      }
      else if(this.state.ballpos4==true){
        if(this.state.Section3==this.state.Player3Name){
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player4Name, Section4:this.state.Player3Name },()=>this.checkingScore(whichTeam))
        }
        else{
          this.setState({ballpos3:true, ballpos4:false, ScoreTeam2:this.state.ScoreTeam2+1, Section3:this.state.Player3Name, Section4:this.state.Player4Name },()=>this.checkingScore(whichTeam))
        }
      }
    }
    else if(whichTeam=='ByOne' && this.state.Team1Serving==true && this.state.Serve==1){
      if(this.state.ballpos1==true){
        this.setState({ballpos1:false, ballpos2:true, Serve:2})
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, Serve:2})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true && this.state.Serve==1){
      if(this.state.ballpos1==true){
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name},()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name},()=>this.checkingScore(whichTeam))
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true && this.state.Serve==2){
      if(this.state.ballpos1==true){
        this.setState({ballpos2:true, ballpos1:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player1Name, Section2:this.state.Player2Name },()=>this.checkingScore(whichTeam))
      }
      else if(this.state.ballpos2==true){
        this.setState({ballpos1:true, ballpos2:false, ScoreTeam1:this.state.ScoreTeam1+1, Section1:this.state.Player2Name, Section2:this.state.Player1Name},()=>this.checkingScore(whichTeam))
      }
    }
  }

  else{
    if(whichTeam=='ByOne' && this.state.Team1Serving==true){
      if(this.state.ballpos1==true){
        this.setState({ballpos3:true, Team2Serving:true, Serve:1, ballpos1:false, Team1Serving:false})
      }
      else{
        this.setState({ballpos4:true, ballpos2:false, Serve:1, Team2Serving:true, Team1Serving:false})
      }
    }
    else if(whichTeam=='ByTwo' && this.state.Team1Serving==true){
      if(this.state.ballpos1==true){
        this.setState({
          ballpos1:false, ballpos2:true, Section2:this.state.Player1Name, ScoreTeam1:this.state.ScoreTeam1+1, Section1:'', Section3:'', Section4:this.state.Player3Name
        },()=>this.checkingScore(whichTeam))
      }
      else{
        this.setState({
          ballpos2:false, ballpos1:true, Section3:this.state.Player3Name, Section4:'', Section2:'', Section1:this.state.Player1Name, ScoreTeam1:this.state.ScoreTeam1+1
        },()=>this.checkingScore(whichTeam))
      }
    }

    else if(whichTeam=='ByTwo' && this.state.Team2Serving==true){
      if(this.state.ballpos3==true){
        this.setState({
          ballpos3:false, ballpos1:true, Team1Serving:true, Team2Serving:false, Serve:1
        })
      }
      else{
        this.setState({
          ballpos4:false, ballpos2:true, Team1Serving:true, Team2Serving:false, Serve:1
        })
      }
    }

    else if(whichTeam=='ByOne' && this.state.Team2Serving==true){
      if(this.state.ballpos3==true){
        this.setState({
          ballpos4:true, ballpos3:false, Section4:this.state.Player3Name, Section3:'', ScoreTeam2:this.state.ScoreTeam2+1, Section2:this.state.Player1Name, Section1:''
        },()=>this.checkingScore(whichTeam))
      }
      else{
        this.setState({
          ballpos3:true, ballpos4:false, Section4:'', Section3:this.state.Player3Name, ScoreTeam2:this.state.ScoreTeam2+1, Section2:'', Section1:this.state.Player1Name
        },()=>this.checkingScore(whichTeam))
      }
    }
  }
  }

  componentDidMount(){
    // console.log(this.props.navigation.state.params)
    let userData = this.props.navigation.state.params.userData
    let data = this.props.navigation.state.params.data
    // console.log(userData)
    if(userData.divisionName.includes('Single')){
      this.setState({
        Player1Name: data.one.fName,
        Player3Name: data.two.fName
      })
    }
    this.changeScreenOrientation()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // if(this.state.TeamFormation=='Doubles'){
    //   this.settingDoubles()
    // }
    // else{
    //   this.settingSingles()
    // }
  }
  componentWillUnmount() {
    this.exitScreenOrientation()
    this.backHandler.remove()
  }

  handleBackPress = () => {
    if(this.state.startClicked){
      this.setState({modalVisible:true})
    }
    return true;
  }

  settingSingles(){
    if(this.playingSide=='left'){
      this.setState({
        ballpos1:true, ballpos2:false,ballpos3:false, ballpos4:false,Team1Serving:true,Team2Serving:false, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name, TeamFormation:'Singles'
      })
    }
    else{
      this.setState({
        ballpos3:true, ballpos2:false, ballpos4:false,ballpos1:false,Team2Serving:true,Team1Serving:false, Serve:1, Section2:'', Section4:'', Section1:this.state.Player1Name, Section3:this.state.Player3Name, TeamFormation:'Singles'
      })
    }
  }

  settingDoubles(playingSide){
    if(playingSide=='left'){
      this.setState({ballpos3:false,ballpos1:true,ballpos2:false, ballpos4:false,Team2Serving:false,Team1Serving:true,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
      
    }
    else{
      this.setState({ballpos3:true,ballpos1:false,ballpos2:false, ballpos4:false,Team2Serving:true,Team1Serving:false,Serve:2, Section1:this.state.Player1Name, Section2:this.state.Player2Name, Section3:this.state.Player3Name, Section4:this.state.Player4Name})
    }
  }

  gameStyle(side, gamePattern){
    console.log(this.TargetSelected)
    if(gamePattern=='Doubles'){
      this.settingDoubles(side)
    }
    else{
      this.settingSingles(side)
    }
  }

  startingGame(){
    this.resettingGame()
    this.setState({
      modalVisible:!this.state.modalVisible, startClicked:true
    },()=>this.gameStyle(this.playingSide, 'Singles'))  

  }

  resettingGame(){
    this.setState({
      startClicked:false,
      GameStart:true,
      Serve:0,
      ScoreTeam1:0,
      ScoreTeam2:0,
      PlayingSide:''})
  }
  


  render() {     
    let selectedItem = this.state.radioButtons.find(e=>e.checked == true)
    selectedItem = selectedItem? selectedItem.value: this.state.radioButtons[0].value
    this.playingSide=selectedItem

    let selectedTarget = this.state.pointsButton.find(e=>e.checked == true)
    selectedTarget= selectedTarget?selectedTarget.value:this.state.pointsButton[0].value
    this.TargetSelected = selectedTarget

    return (
      <View style={{flex:1, }}>
        <StatusBar hidden={true} />


        {/* Modal Settings-`--`-------------------- */}
        <Modal  animationType='slide'
                visible={this.state.modalVisible}>
            <StatusBar hidden={true} />
            {/* Heading */}
            <View style={{backgroundColor:'white', flex:0.15, justifyContent:'center', flexDirection:'row'}}>
              <View style={{flex:0.1}}>

              </View>
              <View style={{flex:0.8, justifyContent:'center'}}>
              <Text style={{ fontFamily: 'open-sans-bold', alignSelf:'center',fontSize:Responsive.font(20)}}>Settings</Text>
              </View>

              <View style={{flex:0.1, justifyContent:'center'}}>
               {this.state.startClicked? <Icon onPress={()=>this.setState({modalVisible:false})} type="FontAwesome" name="close"/>:<View></View>}   

                
              </View>
            </View>
            {/* Options */}
            <View style={{flex:0.6, flexDirection:'column'}}>

              <View style={{flex:0.5, flexDirection:'row',alignItems:'center', }}>
                <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Starting Side</Text>
                </View>
                <View style={{flex:0.5}}>
                <RadioGroup
                  labelStyle={{fontFamily: 'open-sans-simple',fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons=>this.setState({radioButtons})}
                  style={ {flexDirection:'row'}}
                />
                </View>
              
              </View>



              <View style={{flex:0.5,flexDirection:'row',alignItems:'center',}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Points to win</Text>
                </View>
                <View style={{flex:0.5}}>
               <RadioGroup
                  labelStyle={{fontFamily: 'open-sans-simple',fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.pointsButton}
                  onPress={pointsButton=>this.setState({pointsButton})}
                  style={{ flexDirection:'row',}}
                />
                </View>
              </View>



              <View style={{flex:0.5,flexDirection:'row',alignItems:'center',}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontFamily: 'open-sans-simple',paddingLeft:50,fontSize:Responsive.font(20)}}>Win By 2</Text>
                </View>
                <View style={{flex:0.5}}>
                <ListItem >
                    <CheckBox checked={this.state.checked} onPress={()=>this.setState({checked:!this.state.checked})}/>     
                  </ListItem>
                </View>
              </View>

              {/* Text Only */}
              {/* <View style={{ flex:0.3, flexDirection:'column', paddingLeft:10, justifyContent:'space-around'}}> */}
                {/* <Text style={{fontSize:Responsive.font(20)}}>Starting Side</Text>
                <Text style={{fontSize:Responsive.font(20)}}>Points to win</Text>
                <Text style={{fontSize:Responsive.font(20)}}>Win By 2</Text> */}
            
              </View>


              {/* RadioButtons etc */}
              {/* <View style={{backgroundColor:'green', flex:0, justifyContent:'space-around'}}> */}
              {/* <RadioGroup
                  labelStyle={{fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons=>this.setState({radioButtons})}
                  style={ {flexDirection:'row', paddingLeft:10}}
                />

                <RadioGroup
                  labelStyle={{fontSize:Responsive.font(16)}}
                  color='#0277BD'
                  radioButtons={this.state.pointsButton}
                  onPress={pointsButton=>this.setState({pointsButton})}
                  style={{ flexDirection:'row',paddingLeft:10}}
                />

                <ListItem style={{height:20}}>
                    <CheckBox checked={this.state.checked} onPress={()=>this.setState({checked:!this.state.checked})}/>     
                  </ListItem>  */}

              {/* </View> */}
              
            {/* </View> */}
            {/* Buttons */}
            <View style={{ flex:0.25, justifyContent:'space-around', flexDirection:'row'}}>
                <TouchableOpacity  onPress={()=>this.startingGame()} style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center', borderRadius:12}}>
                  <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.resettingGame()}style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center',borderRadius:12}}>
                <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ManageEventsStack')} style={{ height:'50%',paddingHorizontal:20,marginTop:10,backgroundColor:'#91c549', justifyContent:'center',borderRadius:12}}>
                <Text style={{fontFamily: 'open-sans-bold',alignSelf:'center', color:'#515151',fontSize:Responsive.font(15)}}>Exit</Text>
                </TouchableOpacity>
            </View>

        </Modal>





        {/* Modal Settings-`--`-------------------- */}
        <ImageBackground style={{width: '100%', height: '100%', flexDirection:'column'}} source={require('../../assets/background.png')}>
                  <View style={{width:'100%', height:'90%', flexDirection:'row'}}>
                  <View style={{width:'50%', flex:1, flexDirection:'row' }}>
          <View style={{flex:0.7, flexDirection:'column'}}>
            {this.state.Team1Serving?<View style={{backgroundColor:'#91c549', width:Responsive.width(100), height:Responsive.height(30), alignSelf:'flex-end', borderColor:'#707070', borderWidth:1,marginTop:'1%'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(20)}}>{'Serve '+this.state.Serve}</Text>
            </View>:<View style={{ height:Responsive.height(30)}}></View>}
            {/* Player 2 Name and Ball */}
            
            <View style={{flex:0.6, flexDirection:'row', justifyContent:'space-between', paddingLeft:Responsive.width(70), alignItems:'center'}}> 

              <View>
                {this.state.ballpos2?<Image style={{marginLeft:Responsive.width(10)}} source={require('../../assets/ball.png')}/>:<View></View>}
              </View>


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white', fontSize:Responsive.font(16)}}>{this.state.Section2}</Text>
              </View>

              
            </View>
            <TouchableOpacity onPress={()=>this.fault('ByOne')} style={{ height:Responsive.height(40), width:Responsive.width(100),marginLeft:Responsive.width(80), alignSelf:'center'}}>

            </TouchableOpacity>

            {/* Player 1 Name and Ball*/}
            <View style={{flex:0.4, flexDirection:'row',justifyContent:'space-between',  paddingLeft:Responsive.width(70), alignItems:'center', marginBottom:Responsive.height(40)}}>
            <View>
               {this.state.ballpos1? <Image style={{marginLeft:Responsive.width(10)}}source={require('../../assets/ball.png')}/>:<View></View>}
              </View>


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white',fontSize:Responsive.font(16)}}>{this.state.Section1}</Text>
              </View> 
            </View>



            {/* Timer------------------------------------------------------------------------ */}
            
          </View> 
        {/* ------------------------------ */}
          <View style={{ flex:0.3}}>
            <View style={{height:Responsive.height(40),width:Responsive.width(50),backgroundColor:this.state.Team1Serving?'#91c549':'white', alignSelf:'center', justifyContent:'center', borderWidth:1,borderColor:'#707070'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(16)}}>{this.state.ScoreTeam1}</Text>
            </View>
          </View>
        </View>
            
            
            
            
            
        <View style={{width:'50%',flex:1, flexDirection:'row'}}>
          <View style={{ flex:0.3}}>
            <View style={{height:Responsive.height(40),width:Responsive.width(50), backgroundColor:this.state.Team2Serving?'#91c549':'white', alignSelf:'center', justifyContent:'center', borderWidth:1, borderColor:'#707070'}}>
              <Text style={{fontFamily: 'open-sans-bold',color:'#515151', alignSelf:'center', fontSize:Responsive.font(16)}}>{this.state.ScoreTeam2}</Text>
            </View>
          </View> 
        {/* ------------------------------ */}
          <View style={{ flex:0.7, flexDirection:'column'}}>
            {this.state.Team2Serving?<View style={{backgroundColor:'#91c549', width:Responsive.width(100), height:Responsive.height(30), borderColor:'#707070',borderWidth:1,alignSelf:'flex-start', marginTop:'1%'}}>
            <Text style={{fontFamily: 'open-sans-bold',color:'#515151',alignSelf:'center', fontSize:Responsive.font(20)}}>{'Serve '+this.state.Serve}</Text>
            </View>:<View style={{height:Responsive.height(30)}}></View>}
            <View style={{flex:0.6, flexDirection:'row', justifyContent:'space-between', paddingRight:Responsive.width(70), alignItems:'center'}}> 

              


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white', fontSize:Responsive.font(16)}}>{this.state.Section3}</Text>
              </View>

              <View>
                {this.state.ballpos3?<Image style={{marginRight:Responsive.width(10)}} source={require('../../assets/ball.png')}/>:<View></View>}
              </View>

              </View>
              <TouchableOpacity onPress={()=>this.fault('ByTwo')} style={{ height:Responsive.height(40), width:Responsive.width(100),marginRight:Responsive.width(80), alignSelf:'center'}}>

              </TouchableOpacity>

              <View style={{flex:0.4, flexDirection:'row',justifyContent:'space-between',  paddingRight:Responsive.width(70), alignItems:'center', marginBottom:Responsive.height(40)}}>
           


              <View>
                <Text style={{fontFamily: 'open-sans-bold',color:'white',fontSize:Responsive.font(16)}}>{this.state.Section4}</Text>
              </View>
              <View>
                {this.state.ballpos4?<Image style={{marginRight:Responsive.width(10)}}source={require('../../assets/ball.png')}/>:<View></View>}
              </View>
            </View>

          </View>
        </View>
        


                  </View>

                    

                  <View style={{width:'100%', height:'10%', justifyContent:'flex-start', flexDirection:'row'}}>
                  <View style={{marginLeft:10,marginBottom:10,flexDirection:'row', borderColor:'white', borderWidth:2}}>
                    <Text style={{color:'white',fontSize:Responsive.font(20), fontFamily:'open-sans-bold', alignSelf:'center'}}>{'  '+padToTwo(this.state.min)+' : '}</Text>
                    <Text style={{color:'white',fontSize:Responsive.font(20), fontFamily:'open-sans-bold', alignSelf:'center'}}>{padToTwo(this.state.sec) +'  '}</Text>
                  </View>
                  
                  {/* <Text style={{fontSize:Responsive.font(20), fontFamily:'open-sans-bold'}}>{padToTwo(this.state.msec)}</Text> */}
                  <TouchableOpacity onPress={this.handleToggle} style={{ marginBottom:10,marginLeft:20,paddingHorizontal:20, justifyContent:'center',backgroundColor:'#91c549',borderRadius:12}}>
                    <Text style={{fontFamily: 'open-sans-bold', color:'#515151',fontSize:Responsive.font(15)}}>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleReset} style={{marginBottom:10,marginLeft:20,paddingHorizontal:20, justifyContent:'center',backgroundColor:'#91c549',borderRadius:12}}>
                    <Text style={{fontFamily: 'open-sans-bold', color:'#515151',fontSize:Responsive.font(15)}}>Reset</Text>
                  </TouchableOpacity>

            
                  </View>
          
          
        </ImageBackground>
      </View>
//       <View style={{flex:1, justifyContent: 'center', flexDirection:'row', }}>
        
//         <StatusBar hidden={true} />
        
//         <Modal

//             <StatusBar hidden={true} />
//             <View style={{width:'100%', backgroundColor:'white', height:'100%', alignSelf:'center'}}>
//               <Text style={{marginTop:Responsive.height(10), fontSize:Responsive.font(20), alignSelf:'center', fontWeight:'bold'}}>Settings</Text>
//                 <View style={{flexDirection:'row',padding:Responsive.width(20) }}>
//                   <Text style={{fontWeight:'bold',fontSize:Responsive.font(18), marginLeft:Responsive.width(50)}}>Select starting side</Text>
//                   <RadioGroup
//                   labelStyle={{fontSize:16}}
//                   color='#0277BD'
//                   radioButtons={this.state.radioButtons}
//                   onPress={radioButtons=>this.setState({radioButtons})}
//                   style={{marginLeft:Responsive.width(144), flexDirection:'row'}}
//                 />
//                 </View>
              

//                 <View style={{flexDirection:'row', paddingHorizontal:Responsive.width(20), paddingBottom:Responsive.width(20) }}>
//                   <Text style={{fontWeight:'bold',fontSize:Responsive.font(18),marginLeft:Responsive.width(50)}}>Points to win</Text>
                 
//                 </View>
                
//                 <View style={{flexDirection:'row', paddingHorizontal:Responsive.width(20),paddingBottom:Responsive.width(20) }}>
//                   <Text style={{fontWeight:'bold',fontSize:Responsive.font(18),marginLeft:Responsive.width(50)}}>Win by 2</Text>

//                 </View>

//                <View style={{}}>
//                 <TouchableOpacity 
//                     onPress={()=>this.startingGame()}
//                     style={{width:'50%', backgroundColor:'#91c549',justifyContent:'center', alignItems:'center',alignSelf:'center', padding:Responsive.height(5), borderRadius:Responsive.width(20), }}>
//                     <Text style={{fontSize:Responsive.font(20), fontWeight:'bold', color:'white'}}>Start</Text>
//                   </TouchableOpacity>
//                </View>
//               {/* <View style={{flexDirection:'column', justifyContent:'center', alignSelf:'center', flex:0.8}}>
//               <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:Responsive.height(150)}}>
//                 <Text style={{fontSize:Responsive.font(18)}}>Select starting Side</Text>
//                 <RadioGroup
//                   labelStyle={{fontSize:16}}
//                   color='#0277BD'
//                   radioButtons={this.state.radioButtons}
//                   onPress={radioButtons=>this.setState({radioButtons})}
//                   style={{flexDirection:'row'}}
//                 />
//               </View> */}
// {/* 
//               <View style={{flexDirection:'row', justifyContent:'space-between'}}>
//                 <Text style={{fontSize:Responsive.font(18), padding:Responsive.height(10)}}>Points to win</Text>
//                 <RadioGroup
//                   labelStyle={{fontSize:16}}
//                   color='#0277BD'
//                   radioButtons={this.state.pointsButton}
//                   onPress={pointsButton=>this.setState({pointsButton})}
//                   style={{flexDirection:'row',}}
//                 />
//               </View> */}

//               {/* <View style={{flexDirection:'row'}}>
//                 <Text style={{fontSize:Responsive.font(18), padding:Responsive.height(10)}}>Win by 2</Text>
//                 <ListItem>
//                   <CheckBox checked={this.state.checked} onPress={()=>this.setState({checked:!this.state.checked})}/>     
//                 </ListItem> 
//               </View> */}
//             {/* </View> */}
            
//             {/* <TouchableOpacity 
//               onPress={()=>this.startingGame()}
//               style={{width:'50%', backgroundColor:'#91c549',justifyContent:'center', alignItems:'center',alignSelf:'center', paddingTop:'2%', borderRadius:20, }}>
//               <Text style={{fontSize:Responsive.font(20), fontWeight:'bold', paddingBottom:'5%', color:'white'}}>Start</Text>
//             </TouchableOpacity> */}
//             </View>
//           {/* <View style={{backgroundColor:'#6e8980', justifyContent:'center', alignItems:'center'}}>
//             <Text>Hello</Text>
//             <TouchableOpacity onPress={()=>{this.setState({modalVisible:!this.state.modalVisible})}}>
//               <Text>Hide</Text>
//             </TouchableOpacity>
//           </View> */}

//         </Modal>
        
//       <View style={{backgroundColor:'#6e8980', flex:1,}}>
//         <View style={{flex:0.213, flexDirection:'row'}}>
//           <View style={{backgroundColor:'#91c549',alignSelf:'flex-end', marginLeft:'54%', marginRight:'2%'}}>
//             <Text style={{alignSelf:'center', fontSize:18}}>{this.state.Team1Serving?' Serve : '+this.state.Serve+' ':''}</Text>
//           </View>
//           <View style={{backgroundColor:this.state.Team1Serving?'#91c549':'white', alignSelf:'flex-end', marginLeft:this.state.Team2Serving?'27.5%':'0%'}}>
//             <Text style={{alignSelf:'center',paddingHorizontal:'4%', fontSize:18}}>{this.state.ScoreTeam1}</Text>
//           </View>
//         </View>
//         <View style={{backgroundColor:'#2f8465', width: '80%', flex:1, alignSelf:'flex-end',borderColor:'white', borderWidth:2, marginBottom:'15%'  }}>
//         {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.GameStart==true ?'Player #2':this.state.player2Move?'Player #1':'Player #2'}</Text> */}
//         <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.Section2}</Text>
//           {this.state.ballpos2?<Image 
//           style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-10%'}}
//           source={require('./assets/ball.jpg')}/>:<View></View>}
//           <TouchableOpacity onPress={()=>this.fault('ByOne')} style={{backgroundColor:'#ad4538', borderWidth:2, borderColor:'white', alignSelf:"center", marginVertical:"20%", paddingHorizontal:20}}>
//             <Text style={{color:'white'}}>FAULT</Text>
//           </TouchableOpacity>
//           <View style={{borderColor:'white', borderWidth:1,marginTop:-65, zIndex:-1}}></View>
//           {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.GameStart==true ?'Player #1':this.state.player1Move?'Player #2':'Player #1'}</Text> */}
//           <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.Section1}</Text>
//           {this.state.ballpos1?<Image 
//           style={{width:'10%', height:'10%', marginLeft:'2%'}}
//           source={require('./assets/ball.jpg')}/>:<View></View>}
//         </View>
//       </View>

      
//       {/* <View style={{ backgroundColor:'#91c549', flex:0.1, marginVertical:'7%',borderWidth:2, borderColor:'white'}}>

//       </View>
//       <View style={{ backgroundColor:'#91c549', flex:0.1, marginVertical:'7%', borderWidth:2, borderColor:'white'}}>

//       </View> */}

//       <View style={{ backgroundColor:'#6e8980', flex:1}}>
//       <View style={{flex:0.213, flexDirection:'row'}}>
//           <View style={{backgroundColor:this.state.Team2Serving?'#91c549':'white',alignSelf:'flex-end', marginRight:'2%', marginLeft:'6%'}}>
//             <Text style={{alignSelf:'center',paddingHorizontal:'4%', fontSize:18}}>{this.state.ScoreTeam2}</Text>
//           </View>
//           <View style={{backgroundColor:'#91c549', alignSelf:'flex-end'}}>
//             <Text style={{alignSelf:'center', fontSize:18,}}>{this.state.Team1Serving?'':' Serve : '+this.state.Serve+' '}</Text>
            
//           </View>
//         </View>

      
      
//       <View style={{backgroundColor:'#2f8465', width: '80%', flex:1, alignSelf:'flex-start',marginBottom:'15%', borderColor:'white', borderWidth:2  }}>
//       <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.Section3}</Text>
//     {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'15%'}}>{this.state.GameStart?'Player #3': this.state.player3Move?"Player #4":'Player #3'}</Text> */}
//         <View>
//         {this.state.ballpos3?<Image 
//           style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-9%', padding:12}}
//           source={require('./assets/ball.jpg')}/>:<View></View>}
//         <TouchableOpacity onPress={()=>this.fault('ByTwo')} style={{backgroundColor:'#ad4538', borderWidth:2, borderColor:'white', alignSelf:"center", marginVertical:"20%", paddingHorizontal:20}}>
//             <Text style={{color:'white'}}>FAULT</Text>
//           </TouchableOpacity>
//           <View style={{borderColor:'white', borderWidth:1,marginTop:-65, zIndex:-1}}></View>
//         </View>
      
//           {/* <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.GameStart?'Player #4': this.state.player3Move?"Player #3":'Player #4'}</Text> */}
//           <Text style={{alignSelf:'center', color:'white', fontSize:18, marginTop:'20%'}}>{this.state.Section4}</Text>
//           {this.state.ballpos4?<Image 
//           style={{width:'10%', height:'10%', marginLeft:'2%', marginBottom:'-10%'}}
//           source={require('./assets/ball.jpg')}/>:<View></View>}
//       </View>
//       </View>
//       </View>
    );
  }
}

export default ScoreCard;

const styles = StyleSheet.create({
  statusBar:{
    
  }
})
