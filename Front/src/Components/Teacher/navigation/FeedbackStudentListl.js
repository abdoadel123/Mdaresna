import React, { Component } from "react";
import { TextInput, StyleSheet, FlatList, View, Image, Text, Button, TouchableOpacity } from "react-native";

import Header from '../../Main/Header/header';
import Student from '../../../assets/Imges/user.jpg';
import feedIcon from '../../../assets/Imges/feedback.png'
import ip from '../../Student/ipaddress';

class StudentModal extends Component {
    teacherID = window.userid;
    static navigationOptions = {
        drawerLabel: () => 'Add Feedback',
        drawerIcon: (<Image resizeMode='contain' source={feedIcon} style={{ width: 25, height: 25 }} />)
    }
    state = {
        students: [],
    }
    selectedStud = key => {
        this.props.navigation.navigate('feedbcak_teacher_view', this.state.students[key])
    }
    componentDidMount() {
        return fetch(ip + '/teacher/levelsClasses/' + this.teacherID)
            .then((res) => res.json())
            .then((res) => {
                res.map((l) => {
                    const level = l.level;
                    const classNum = l.class;
                    return fetch(ip + '/teacher/getStud/' + level + '/' + classNum)
                        .then((res) => res.json())
                        .then((res) => {
                            window.feedlevel = level;
                            window.feedclass = classNum;
                            this.setState(prevState => {
                                return {
                                    students: prevState.students.concat(res.info)
                                };
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
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
                        <Image resizeMode='contain' source={feedIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Students List</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.scrollcontainer}>
                    <StudentList
                        students={this.state.students}
                        onItemSelected={this.selectedStud}
                    />
                </View>
            </View>
        );
    }
}


const StudentItem = props => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.Itemcontainer}>
            <Image resizeMode="contain" source={props.studentImage} style={styles.studentImage} />
            <View style={styles.text}>
                <Text>{props.studentName}</Text>
                <Text>{props.studentID}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const StudentList = props => {
    return (
        <FlatList
            style={styles.Listcontainer}
            data={props.students}
            renderItem={(info) => (
                <StudentItem
                    studentName={info.item.name}
                    studentID={info.item.studentID}
                    studentImage={Student}
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    scrollcontainer: {
        flex: 1,
        padding: 26,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    Listcontainer: {
        width: "100%"
    },
    Itemcontainer: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    studentImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    text: {
        flexDirection: "column",
    }
});
export default StudentModal;