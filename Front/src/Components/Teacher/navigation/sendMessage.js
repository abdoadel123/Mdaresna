import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import Header from '../../Main/Header/header';
import chaticon from '../../../assets/Imges/chat.png'
import ip from '../../Student/ipaddress';

import sendIcon from '../../../assets/Imges/paper-plane.png'



class Sendto extends Component {
    static navigationOptions = {
        drawerLabel: 'Compose Message',
        drawerIcon:(<Image  resizeMode='contain' source={sendIcon} style={{ width: 25, height: 25 }} />)
    }
    state = {
        message: '',
        toid:''
    }
    valuechanged = (yourinput) => {
        this.setState((prevState) => { return { message: yourinput } });
    }
    tochaged = (yourinput) => {
        this.setState((prevState) => { return { toid: yourinput } });
    }


    sendmymessage = () => {
        const data = {
            toid:this.state.toid ,
            fromid: window.userid,
            messagetext: this.state.message
        }
        fetch(ip+'/message/addmessage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            response.json()
            alert('Your Message have been Sent .');
            this.props.navigation.navigate('Home')
        })
        .catch((error) => {
            alert('problem while adding data');
        });
    }
    render() {
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={chaticon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Compose Message</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    
                    <TextInput placeholder='Enter Student ID' style={{ height: 70, margin: 5, borderWidth: 2, backgroundColor: '#eee', borderColor: '#eee', color: '#008080', paddingTop: 20 }}  onChangeText={this.tochaged} value={this.state.toid}/>
                    <TextInput style={{ height: 200, margin: 5, borderWidth: 2, borderColor: '#eee' }} onChangeText={this.valuechanged} value={this.state.message} />
                    
                    <View style={{ alignSelf: 'flex-end', marginTop: 70 }} >
                        <Button rounded onPress={this.sendmymessage} style={{ backgroundColor: '#008080' }} >
                            <Text>    Send    </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }

}
const style = StyleSheet.create({

});

export default Sendto;