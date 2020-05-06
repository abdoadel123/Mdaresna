import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import { Container, Header, Content, Body } from 'native-base';

import logo from '../../assets/Imges/Untitled-1.png'
import AttendanceClass from './navigation/Class_Subject'
import AttendacePage from './navigation/attend'
import teacherHome from './navigation/home'
import Feedbacks from './navigation/feedback'
import FeedbackStudentList from './navigation/FeedbackStudentListl'
import NoteStudentList from './navigation/noteStudentList';
import Notes from './navigation/note';
import FeedbackTeacerView from './navigation/feedbackTeacherView';
import NoteTeacerView from './navigation/noteTeacherView';
import Notifications from '../Main/Header/notification';
import NavigationActions from 'react-navigation';
import HeaderComp from '../Main/Header/header'
import Mdaresna from '../../assets/Imges/Title.png'
import Messages from '../Main/Header/messges'
import Assignment from './navigation/addAssignment'

import Gradespage from './navigation/addgrades'
import Onegrade from './navigation/pagetoaddgrade'

import Sendmessage from './navigation/sendMessage'

import oneConversation from '../Main/Header/oneconversation'


class Teacher extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Navigat/>
        );
    }
}

const Hi = (props) => {
    return (
        <Container>
            <Header style={{ backgroundColor: 'white', height: 200 }}>
                <Body style={{flexDirection:'column'}}>
                    <Image resizeMode='contain' source={logo} style={{ width: '100%', height:'50%', alignSelf:'flex-start'}} />
                    <Image resizeMode='contain' source={Mdaresna} style={{ width: '100%', height:'50%',alignSelf:'flex-end'}} />
                </Body>
            </Header>
            <Content >
                <DrawerItems {...props} />
            </Content>
        </Container>
    )
}

const Navigat = DrawerNavigator({
    Home: {
        screen: teacherHome,
    },
    Add_Feedbacks: {
        screen: FeedbackStudentList
    },
    feedback_Student_List: {
        screen: Feedbacks
    },
    feedbcak_teacher_view: {
        screen: FeedbackTeacerView
    },
    Add_Note: {
        screen: NoteStudentList,
    },
    note_student_list: {
        screen: Notes
    },
    note_teacher_view: {
        screen: NoteTeacerView
    },
    
    AttendanceClass: {
        screen: AttendacePage
    },
    Attendance: {
        screen: AttendanceClass
    },
    Messages: {
        screen: Messages
    },
    NotificationsPage: {
        screen: Notifications
    },
    header:{
        screen:HeaderComp
    },
    Add_Homework :{
        screen:Assignment
    },
    ComposeMessage:{
        screen:Sendmessage
    },
    Grades:{
        screen:Gradespage
    },
    Pagetoaddgeade:{
        screen: Onegrade
    },
    oneConversationView:{
        screen:oneConversation 
    }
   }, 
    {
        initialRouteName: 'Home',
        contentComponent: Hi,
        drawerOPenRout: 'DrawerOpen',
        drawerCloseRout: 'DrawerClose',
        drawerToggleRout: 'DrawerToggle',
    });


const style = StyleSheet.create({
    headerstyle: {
        height: '15%',
        backgroundColor: '#008080'
    }
});
export default Teacher;