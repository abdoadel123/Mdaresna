import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView } from 'react-native';
import { Container, Content, Button } from 'native-base';

import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements';
import ip from '../../Student/ipaddress';

class oneConversation extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        allmessages: [{ from: '', to: '', messagetext: '' }],
        messagereply: ''
    }
    valuechanged = (reply) => {
        this.setState((prevstate) => {
            return { messagereply: reply }
        });
    }
    sendreply = () => {
        //alert('i will send ');
        
        const data = {
            toid:this.props.navigation.state.params.from,
            fromid: window.userid,
            messagetext: this.state.messagereply
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
    componentDidMount() {
        myid = window.userid;
        fromid = this.props.navigation.state.params.from;
        //alert(myid + '  ' + fromid)
        return fetch(ip + '/message/getmymessagesconversation/' + myid + '/' + fromid)
            .then((res) => res.json())
            .then((res) => {
                if (res.length > 0) {
                    this.setState((prevState) => {
                        return {
                            allmessages: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        const conversation = this.state.allmessages.map((message, i) => {
            if (message.from === window.userid) {
                return (
                    <View style={style.messagestyle} key={i}>
                        <View style={style.messageheader}>
                            <Text style={style.headerfromname}> ME </Text>
                        </View>
                        <Text >{message.messagetext}</Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={style.messagestyle} key={i}>
                        <View style={style.messageheader}>
                            <Text style={style.headerfromname}> {message.from} </Text>
                        </View>
                        <Text >{message.messagetext}</Text>
                    </View>
                );
            }
        });
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Icon name='home' color='white' type='font-awesome' size={30} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Conversation </Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <ScrollView  >
                        {conversation}
                    </ScrollView  >
                    <TextInput style={{ height: 50, margin: 5, borderWidth: 2, borderColor: '#eee' }} onChangeText={this.valuechanged} value={this.state.messagereply} />
                    <Button rounded onPress={this.sendreply} style={{ backgroundColor: '#008080' }} >
                        <Text>    Send    </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
const style = StyleSheet.create({
    messagestyle: {
        margin: 5,
        backgroundColor: '#eeee'
    },
    messageheader: {
        flexDirection: 'row',
        marginBottom: 5
    },
    headerdate: {
        marginLeft: 100,
    },
    headerfromname: {
        marginRight: 5
    },
});
export default oneConversation;