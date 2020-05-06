import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import Header from '../../Main/Header/header';
import homeworkIcon from '../../../assets/Imges/homework.png'

import ip from '../../Student/ipaddress';

class Createassignment extends Component{
    static navigationOptions = {
        drawerLabel: () => 'Homeworck',
        drawerIcon: (<Image resizeMode='contain' source={homeworkIcon} style={{ width: 25, height: 25 }} />)
    }
    state={
        level:0 ,
        classnum:0 ,
        description:''
    }
    setclass=(classinput)=>{
        this.setState((prevState) => { return { classnum: classinput } });
    }
    setlevel=(levelinput)=>{
        this.setState((prevState) => { return { level: levelinput } });
    }
    setdescription=(descriptioninput)=>{
        this.setState((prevState) => { return { description: descriptioninput } });
    }
    sendthehomework=()=>{
        const data = {
            level : this.state.level,
            classnum:this.state.classnum,
            task:this.state.description,
            teacherid:window.userid
        }
        fetch(ip+'/teacher/homeworks', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            response.json()
            if(response.status === 500){
                alert('You don not have access for this course');
            }
            else{
                alert('Your Homework was added . ');
            }
            
            this.props.navigation.navigate('Home');
        })
        .catch((error) => {
            alert('You don not have access for this course');
        });
    }
    render()
    {
        return (
            <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={homeworkIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Homework</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <Text style={style.textinputstyle}>Level </Text>
                    <TextInput style={style.textinputstyle} onChangeText={this.setlevel} value={this.state.level}/>

                    <Text style={style.textinputstyle}>Class  </Text>
                    <TextInput onChangeText={this.setclass} value={this.state.classnum} style={style.textinputstyle}/>

                    <Text style={style.textinputstyle}>Desription </Text>
                    <TextInput style={style.descriptionstyle} onChangeText={this.setdescription} value={this.state.description} />
                    
                    <View style={{ alignSelf: 'flex-end', marginTop: 70 }} >
                        <Button rounded onPress={this.sendthehomework} style={{ backgroundColor: '#008080' }} >
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
export default Createassignment ;