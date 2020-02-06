{this.state.tourData.length>0 && this.state.actScr==1 ?
    <FlatList
        data={this.state.tourData}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('RefereeRequestScreen',{item:item, user:this.data}) }}>
                <ToBeRequestedEvents key={item._id} data={item} user={this.data} />
            </TouchableOpacity>

        )}
        ListHeaderComponent={() => (
            <View>    
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms}
                        placeholderTextColor={'#C5C5C5'}
                        onChangeText={seLoc => this.setState({ seLoc })}
                        value={this.state.seLoc}
                        placeholder="Search by name or location"
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <Image style={{ padding: 10, width: 20, height: 20 }} source={require('../../assets/Path100.png')} />
                </View>

                <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 10, marginBottom: 10, width:'94.5%', alignSelf:'center' }} />
                {this.state.loading ? <View style={{flex:1, justifyContent:'center', paddingTop:'50%'}}>
                    <ActivityIndicator size="large" color="#48A080" />
                </View> : null}

            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.onEndReached.bind(this)}
        disableVirtualization={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent=
        {this.state.loading ? <ActivityIndicator size="large" color="#48A080" /> : this.state.dataFound ? null : <Text style={{ justifyContent: 'center', textAlign: 'center' }}>No Remaining Data</Text>}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
    />
    : <View style={{flex:1, justifyContent:'center', paddingTop:'50%'}}>
        <ActivityIndicator size="large" color="#48A080" />
        </View>}