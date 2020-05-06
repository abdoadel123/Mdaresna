import React, { Component } from 'react';
import {Platform,StyleSheet,Text, View,Image , Dimensions  } from 'react-native' ;
import {DrawerNavigator ,DrawerItems  } from 'react-navigation'
import { Container, Header , Content,Body} from 'native-base';

import StudentHome from './navigation/home';
import Assignments from './navigation/assignments';
import Feedbacks from './navigation/feedbacks';
import OneSubjectFeedbacks from './navigation/onesubjectfeedback'
import Messages from '../Main/Header/messges';
import Notifications from '../Main/Header/notification'
import oneConversation from '../Main/Header/oneconversation'
import Myattendance from './navigation/viewAttend'
import ViewGrades from './navigation/ViewGrades'
import onesubjectgrades from './navigation/onesubjectgrade'
import Mdaresna from '../../assets/Imges/Title.png'
import logo from '../../assets/Imges/Untitled-1.png'


import  Sendnewmessage from './navigation/sendnewmessage'
import Sendto from './navigation/sendtox'

//import AttendanceClass from '../Teacher/attendClassSubject'
//import AttendacePage from '../Teacher/attend'

class Student extends Component {
    static navigationOptions = {
        header: null
    }
    
    render(){
        return(
            <Navigat/>
        );      
    }
}

const Hi=(props)=> {
    
    return(
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
    )}

const Navigat=DrawerNavigator({
    Home:{
        screen: StudentHome
    },
    Feedbacks:{
        screen: Feedbacks
    },
    Assignments:{
        screen: Assignments
    },
    Messages:{
        screen:Messages
    },
    NotificationsPage:{
        screen:Notifications
    },
    oneConversationView:{
        screen:oneConversation
    },
    Compose_Message :{
        screen: Sendnewmessage
    },
    Sendtox:{
        screen:Sendto
    },
    OneSubjectFeedback:{
        screen:OneSubjectFeedbacks
    },
    Attendance:{
        screen:Myattendance
    },
    Grades:{
        screen:ViewGrades
    },
    OneSubjectGrade:{
        screen : onesubjectgrades
    }

},{
    initialRouteName:'Home',
    contentComponent : Hi,
    darwerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle',
});

const style=StyleSheet.create({
    headerstyle: {
        height: '15%',
        backgroundColor: '#008080'
    }
});
export default Student ;