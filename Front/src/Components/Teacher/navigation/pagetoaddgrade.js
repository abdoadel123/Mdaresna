import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Header from '../../Main/Header/header';
import gradeIcon from '../../../assets/Imges/grade.png'
import ip from '../../Student/ipaddress';

class OneStudent extends Component{
    static navigationOptions = {
        drawerLabel: () => null,
    }
    state={
        studentid:'',
        grade:'',
    }
    setstudentid=(input)=>{
        this.setState((prevState) => { return { studentid: input } });
    }
    setgrade=(input)=>{
        this.setState((prevState) => { return { grade: input } });
    }
    sendthegrade=()=>{
        //alert()
        const data = {
            level : this.props.navigation.state.params.level,
            classnumber:this.props.navigation.state.params.classnum,
            description:this.props.navigation.state.params.description,
            subject:this.props.navigation.state.params.subject,
            studentid:this.state.studentid,
            grade:this.state.grade,
            teacherid:window.userid
        }
        /*alert(data.level)
        alert(data.classnum)
        alert(data.subject)
        alert(data.studentid)
        alert(data.teacherid)
        alert(data.description)
        alert(data.grade)*/
        fetch(ip+'/teacher/grades', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            response.json()
            if(response.status === 500){
                alert('You don not have access for this course ttttttt');
            }
            else{
                alert(' Grade was added . ');
            }
           // this.props.navigation.navigate('');
        })
        .catch((error) => {
            alert('You don not have access for this course mkmkj');
        });
    }

    
    render()
    {
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={gradeIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Grades</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <Text style={style.textinputstyle}>Student ID</Text>
                    <TextInput style={style.textinputstyle} onChangeText={this.setstudentid} value={this.state.studentid}/>

                    <Text style={style.textinputstyle}>Grade </Text>
                    <TextInput onChangeText={this.setgrade} value={this.state.grade} style={style.textinputstyle}/>                    
                    
                    <View style={{ alignSelf: 'flex-end', marginTop: 70 }} >
                        <Button rounded onPress={this.sendthegrade} style={{ backgroundColor: '#008080' }} >
                            <Text>    Add    </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )}
}
style = StyleSheet.create({
    textinputstyle:{ 
        height: 70, 
        margin: 5, 
        borderWidth: 2, 
        backgroundColor: '#eee',
        borderColor: '#eee', 
        color: '#008080', 
        paddingTop: 20 
        },
        descriptionstyle:{ 
            height: 200, 
            margin: 5, 
            borderWidth: 2, 
            borderColor: '#eee' 
        }
});
export default OneStudent ;