import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableHighlight, Text, Image } from 'react-native';
import Header from '../../Main/Header/header';
import feedIcon from '../../../assets/Imges/feedback.png';
import ip from '../../Student/ipaddress';


class Feedback extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        studentID: this.props.navigation.state.params.studentID,
        teacherID: window.userid,
        feedback: "",
        subject: ""
    };
    subjectChangedHandler = val => {
        this.setState({
            subject: val
        });
    };
    feedbackChangedHandler = val => {
        this.setState({
            feedback: val
        });
    };
    render() {

        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={feedIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Add Feedbacks</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.subjectChangedHandler}
                    />
                    <TextInput
                        style={styles.feedback}
                        multiline={true}
                        onChangeText={this.feedbackChangedHandler}
                    />
                    <TouchableHighlight
                        style={styles.buttom}>
                        <Button
                            color="#008080"
                            title="Add"
                            onPress={this.onPres} />
                    </TouchableHighlight>
                </View>
            </View>
        )

    }
    onPres = () => {
        const data = {
            studentID: this.state.studentID,
            teacherID: this.state.teacherID,
            feedback: this.state.feedback,
            subject: this.state.subject
        }
        const notificationData = {
            level: window.feedlevel,
            class: window.feedclass,
            description: "Teacher Add Feedback"
        }
        fetch(ip + '/teacher/addfeedback/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                response.json()
                alert("Response:", responseData);
            })
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
            this.props.navigation.navigate('Add_Feedbacks')
    }

}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
    },
    inputView: {
        marginTop: 80,
        alignItems: "center",
        backgroundColor: '#fff',
        flexDirection: "column"
    },
    feedback: {
        margin: 10,
        height: "40%",
        width: "90%",
        borderRadius: 6,
        borderColor: "#008080",
        borderWidth: 1
    },
    input: {
        margin: 10,
        width: "90%",
        borderRadius: 6,
        borderColor: "#008080",
        borderWidth: 1
    },
    buttom: {
        width: 150,
        marginTop: 30
    },
});

export default Feedback;