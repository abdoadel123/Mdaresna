import React, { Component } from 'react';
import { View, Button, CheckBox, Text, StyleSheet, ScrollView, TouchableHighlight, Picker, Image } from 'react-native';
// import { CheckBox } from 'native-base'
import Header from '../../Main/Header/header';
import Attend from './attend';
import { createStackNavigator } from 'react-navigation';
import attendClass from '../../../assets/Imges/classes.png';
import ip from '../../Student/ipaddress';


class AttendClass extends Component {
    teacherID = window.userid;
    static navigationOptions = {
        drawerLabel: () => 'Set Attendance',
        drawerIcon: (<Image resizeMode='contain' source={attendClass} style={{ width: 25, height: 25 }} />)
    }
    state = {
        classes: [],
        subjects: [],
        selectedClass:{},
        selectedSubject: ''
    }
    setClass = (choose) => {
        window.class=choose
        this.getSubjects(choose);
        this.setState({ selectedClass:choose });
    }

    setSubject = (choose) => {
        window.subject=choose
        alert(window.subject);
        this.setState({ selectedSubject: choose });
    }
    getSubjects = (choose) => {
        return fetch(ip + '/teacher/subject/' + this.teacherID + '/' +choose.level + '/' +choose.class)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ subjects: res });
            })
            .catch((err) => {
                console.error(err);
            });
    }
    componentDidMount() {
        return fetch(ip + '/teacher/levelsClasses/' + this.teacherID)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ classes: res })
            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        const info = { classes: this.state.selectedClass, subject: this.state.selectedSubject }
        const classes = this.state.classes.map((element, i) => <Picker.Item label={element.level + '/' + element.class} value={element} key={i} />);
        const subjects = this.state.subjects.map((element, i) => <Picker.Item label={element.subject} value={element.subject} key={i} />);
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={attendClass} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Class</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.main}>
                    <View style={styles.itemContainer}>
                        <Text style={{
                            width: '30%',
                            fontFamily: 'Helvetica',
                            marginTop: '5%',
                        }}> Choose Class:</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={this.state.selectedClass} onValueChange={this.setClass}>
                                {classes}
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.itemContainer}>
                        <Text style={{
                            width: '30%',
                            fontFamily: 'Helvetica',
                            marginTop: '5%',
                        }}>Choose Subject</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={this.state.selectedSubject} onValueChange={this.setSubject}>
                                {subjects}
                            </Picker>
                        </View>
                    </View>



                    <TouchableHighlight
                        style={styles.buttom}>
                        <Button
                            color="#008080"
                            title="Next"
                            onPress={() => this.props.navigation.navigate('AttendanceClass',{subject:this.state.selectedSubject})} />
                    </TouchableHighlight>
                </View>
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

    }, pickerstyle: {
        borderRadius: 6,
        borderWidth: 1,
        width: '70%',
        height: 50
    },
    itemContainer: {
        flexDirection: 'row',
        margin: 8,
        alignItems: "center"
    },
    main: {
        height: '50%',
        borderRadius: 2,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#eee',
        marginTop: 40,
        marginBottom: '25%',
        marginLeft: '2%',
        marginRight: '2%',
        width: '95%',
        alignItems: 'center'
    },
    buttom: {
        width: 150,
        marginTop: 20
    }
});
export default AttendClass;