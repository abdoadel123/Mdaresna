import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableHighlight, Text, Image } from 'react-native';
import Header from '../../Main/Header/header';
//import FormData from 'FormData';
import noteIcon from '../../../assets/Imges/notes.png';
import ip from '../../Student/ipaddress';



class Note extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        studentID: this.props.navigation.state.params.studentID,
        teacherID: window.userid,
        note: "",
        subject: ""
    };
    noteChangedHandler = val => {
        this.setState({
            note: val
        });
    };
    subjectChangedHandler = val => {
        this.setState({
            subject: val
        });
    };
    render() {

        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={noteIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Add Notes</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.subjectChangedHandler}
                    />
                    <TextInput
                        style={styles.note}
                        multiline={true}
                        onChangeText={this.noteChangedHandler}
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
            note: this.state.note,
            subject: this.state.subject
        }
        const notificationData = {
            level: window.feedlevel,
            class: window.feedclass,
            description: "Teacher Add Note"
        }
        fetch(ip + '/teacher/note/add/', {
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
            this.props.navigation.navigate('Add_Note')
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
    inputView: {
        width: "100%",
        marginTop: 80,
        alignItems: "center",
        backgroundColor: '#fff',
        flexDirection: "column"
    },
    note: {
        margin: 10,
        height: "50%",
        width: "90%",
        borderRadius: 6,
        borderColor: "#008080",
        borderWidth: 1
    },
    text: {
        alignItems: "center",
        margin: 10,
        width: "90%",
        height: 40,
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
    }
});

export default Note;