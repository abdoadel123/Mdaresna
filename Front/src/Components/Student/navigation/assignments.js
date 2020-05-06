import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { Container, Content } from 'native-base';

import Header from '../../Main/Header/header'

import homeworkIcon from '../../../assets/Imges/homework.png'

import ip from '../ipaddress'

class Assignments extends Component {
    static navigationOptions = {
        drawerLabel: () => 'Homeworck',
        drawerIcon: (<Image resizeMode='contain' source={homeworkIcon} style={{ width: 25, height: 25 }} />)
    }
    state = {
        tasks: []
    }
    componentDidMount() {
        const sid = window.userid;
        const sclass = window.class;
        const slevel = window.level;
        //alert(sid + ' ' + window.class + ' ' + window.level);
        return fetch(ip + '/student/homeworks/' + sid + '/' + slevel + '/' + sclass)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) {
                    //alert(res.length)
                    this.setStates((prevState) => {
                        return {
                            tasks: [{ subject: '', date: '', task: 'No Tasks To View' }]
                        }
                    });
                }
                else {
                    this.setState((prevState) => {
                        return {
                            tasks: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        const mytasks = this.state.tasks.map((task, i) => {
            return (
                <View key={i} style={{ margin: 5, borderWidth: 1, borderRadius: 5, backgroundColor: '#eee', borderColor: '#eee' }}>

                    <View style={{ flexDirection: 'row', margin: 8 }}>
                        <Text style={style.taskheader}  >
                            {task.subject}
                        </Text>
                        <Text style={style.taskheader } >{task.date}</Text>
                    </View>
                    <Text style={{ margin: 8 }}>
                        {task.task}
                    </Text>
                </View>

            );
        });
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={homeworkIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Homeworks</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <ScrollView>
                        {mytasks}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
style = StyleSheet.create({
    taskheader: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '50%',
        fontSize: 20
    }

});
export default Assignments;