import React, { Component } from 'react';
import { View, Button, CheckBox, Text, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native';
// import { CheckBox } from 'native-base'
import Header from '../../Main/Header/header';
import atten from '../../../assets/Imges/attend.png'
import ip from '../../Student/ipaddress';

class Attend extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        students: [],
    }
    changeHandler = (i) => {
        const newArr = this.state.students;
        newArr[i].check = !newArr[i].check;
        this.setState({ students: newArr });
    }
    buttonHandler = () => {
        subjects = window.subject;
        // alert(subjects)
        this.state.students.map((stud) => {
            if (stud.check === true) {
                alert(stud.studentID+"   "+subjects)
                const data = {
                    studID: stud.studentID,
                    subject:subjects
                }
                fetch(ip + '/teacher/attend/update/', {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        response.json()
                        alert("Response:", responseData);
                    })
                
            }
        })
        const notificationData = {
            level: window.class.level,
            class: window.class.class,
            description: "Teacher Set Attendance"
        }
        fetch(ip + '/teacher/notification/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notificationData)
        })
            .then((response) => {
                response.json()
                alert("Response:", responseData);
            })
            this.props.navigation.navigate('Home')
    }

    componentDidMount() {
        level = window.class.level
        classNum = window.class.class;
        return fetch(ip + '/teacher/getStud/' + level + '/' + classNum)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ students: res.info });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={atten} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Set Attendance</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <ScrollView style={styles.scroll}>
                    {this.state.students.map((std, i) => {
                        return (
                            <View style={styles.check}
                                key={i}>
                                <CheckBox
                                    value={std.check}
                                    onChange={this.changeHandler.bind(this, i)}
                                />
                                <Text style={styles.text}>{std.name+"   "+std.studentID}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
                <TouchableHighlight
                    style={styles.buttom}>
                    <Button
                        color="#008080"
                        title="Next"
                        onPress={this.buttonHandler} />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: '#fff',
        flexDirection: "column"
    },
    scroll: {
        width: "100%",
        flex: 1
    },
    check: {
        flexDirection: "row"
    },
    text: {
        marginTop: 7
    },
    buttom: {
        width: 150,
    }
})
export default Attend;