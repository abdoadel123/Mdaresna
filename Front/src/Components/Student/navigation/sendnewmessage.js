import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements'

import chaticon from '../../../assets/Imges/chat.png'
import { Container, Content } from 'native-base';

import sendIcon from '../../../assets/Imges/paper-plane.png'
import ip from '../ipaddress';


class ComposeMessage extends Component {
    state = {
        allteachers: []
    }
    static navigationOptions = {
        drawerLabel: 'Compose Message',
        drawerIcon:(<Image  resizeMode='contain' source={sendIcon} style={{ width: 25, height: 25 }} />)

    }
    componentDidMount() {
        return fetch(ip + '/message/getteacherslist')
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) {
                    this.setState((prevState) => {
                        return {
                            allteachers: [{name:'No Teachers To View' , teacherID:''}]
                        }
                    });
                }
                else {
                    this.setState((prevState) => {
                        return {
                            allteachers: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const teachers = this.state.allteachers.map((teacher, i) => {
            return (
                <TouchableOpacity style={style.oneteacher} key={i} onPress={() => { this.props.navigation.navigate('Sendtox', { toid: teacher.teacherID , toname:teacher.name }) }}>
                    <View style={{ flexDirection: 'row', margin: 5, }}>
                        <Image style={style.imagestyle} source={require('../../../assets/Imges/user.jpg')}></Image>
                        <Text style={style.namestyle} >{teacher.name}</Text>
                    </View>
                </TouchableOpacity>
            );

        });
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={chaticon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Teachers List</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <ScrollView >
                        {teachers}
                    </ScrollView  >
                </Content>
            </Container>

        );
    }
}

const style = StyleSheet.create({
    oneteacher: {
        height: 50,
        margin: 5,
        backgroundColor: '#eee',
    },
    namestyle: {
        margin: 7
    },
    imagestyle: {
        height: 30,
        width: 30,
        margin: 5, paddingLeft: 2
    }

});
export default ComposeMessage;