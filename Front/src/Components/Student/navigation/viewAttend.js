import React, { Component } from 'react';
import { View, Button, CheckBox,Image, Text, StyleSheet, ScrollView, TouchableHighlight, Picker } from 'react-native';

import { Icon } from 'react-native-elements';
import Header from '../../Main/Header/header';
import { Container,Content } from 'native-base';
import attendIcon from '../../../assets/Imges/attend.png'
import ip from '../ipaddress'

class View_attendance extends Component {
    static navigationOptions = {
        drawerLabel: 'My Attendance' ,
        drawerIcon:(<Image  resizeMode='contain' source={attendIcon} style={{ width: 25, height: 25 }} />)

    }
    state = {
        subjects:  [{subjectName:'No Subjects To Show ' , absent:''}]
    }
    componentDidMount() {
        const sid = window.userid;
        //alert(sid)
        return fetch(ip +'/student/attend/show/' + sid)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) 
                {
                    this.setState((prevState) => {
                        return {
                            subjects:  [{subjectName:'No Subjects To Show ' , absent:''}]
                        }
                    });
                }
                else {
                    this.setState((prevState) => {
                        return {
                            subjects: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        allsubjects = this.state.subjects.map((subject, i) => {
            return (
                <View key={i} style={style.subjectstyle}>
                    <Text style={style.textstyle}>{subject.subjectName}</Text>
                    <Text style={style.textstyle}>{subject.absent}</Text>
                </View>
            );
        });
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={attendIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>My Attendance</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <ScrollView>
                    {allsubjects}
                </ScrollView>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    subjectstyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#eee',
        margin: 5,
        height: 70,
        borderColor: '#008080',
    },
    textstyle: {
        margin: 20,
        width: '50%',
        textAlign: 'center',
        fontSize: 23
    }
});
export default View_attendance;