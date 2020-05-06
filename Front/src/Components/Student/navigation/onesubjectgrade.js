import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import { Container, Content } from 'native-base';
import grade from '../../../assets/Imges/grade.png'
import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements';

import ip from '../ipaddress'

class OneSubjectGrade extends Component {
    static navigationOptions = {
        drawerLabel: () => null 
    }
    state = {
        subjectgrades: [{ description: '', grade: '' }]
    }
    componentDidMount() { 
        // alert(window.userid);
        const sid = window.userid;
        const subject = this.props.navigation.state.params.subject;
        //alert('subject ' + subject)

        return fetch(ip + '/student/grades/' + window.userid + '/' + subject)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) {
                    this.setState((prevState) => {
                        return {
                            subjectgrades: [{ description: 'No Grade added . ', grade: '' }]
                        }
                    });
                }
                else {
                    this.setState((prevState) => {
                        return {
                            subjectgrades: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        const onesubjectgrades = this.state.subjectgrades.map((grade, i) => {
            return (
                <View style={{ flexDirection: 'row', textAlign: 'center', height: 70, margin: 5, borderWidth: 1, borderRadius: 5, backgroundColor: '#eee', borderColor: '#eee' }}>
                    <Text style={style.textstyle}> {grade.description}  </Text>
                    <Text style={style.textstyle}>{grade.grade} </Text>
                </View>
            );
        });
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={grade} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Grades</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content >
                    <ScrollView >
                        {onesubjectgrades}
                    </ScrollView  >
                </Content >
            </Container>
        );
    }
}
const style = StyleSheet.create({
    textstyle: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '50%'
    }
});
export default OneSubjectGrade;