import React, { Component } from 'react';
import { Platform,Image, StyleSheet, View, Button, TouchableOpacity ,ScrollView } from 'react-native';
import { Container, Content, Text } from 'native-base';
import gradeIcon from '../../../assets/Imges/grade.png'

import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements';
import ip from '../ipaddress';

class Grades extends Component {
    static navigationOptions = {
        drawerIcon:(<Image  resizeMode='contain' source={gradeIcon} style={{ width: 25, height: 25 }} />)
    }
    state = {
        subjects: []
    }
    componentDidMount() {
        const sid = window.userid;
        const slevel = window.level;
        const sclass = window.class;
        return fetch(ip + '/student/getmysubjects/' + sid + '/' + slevel + '/' + sclass)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) {
                    this.setState((prevState) => {
                        return {
                            subjects: ['No Subjects You Taken ']
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
        
        
        const viewsubjects = this.state.subjects.map((subject, i) => {
            return (
                <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('OneSubjectGrade',{subject:subject.subject})}  >
                    <Text style={style.subjecttext } >{subject.subject}</Text>
                </TouchableOpacity >);
        });
        
        return (
            <Container >
                  <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={gradeIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Grades</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content >
                    <ScrollView>
                        {viewsubjects}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
const style = StyleSheet.create({
    subjecttext: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#eee',
        margin: 7,
        height: 70,
        textAlign:'center',
        textAlignVertical:'center',
        borderColor: '#008080',
        fontSize:23
    }
});
export default Grades;