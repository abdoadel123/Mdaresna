import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import Header from '../../Main/Header/header';
import gradeIcon from '../../../assets/Imges/grade.png'

import ip from '../../Student/ipaddress';



class Grade extends Component{
    static navigationOptions = {
        //drawerLabel: () => 'Grades',
        drawerIcon: (<Image resizeMode='contain' source={gradeIcon} style={{ width: 25, height: 25 }} />)
    }
    state={
        level:0 ,
        classnum:0 ,
        description:'',
        subject:''
    }
    setclass=(classinput)=>{
        this.setState((prevState) => { return { classnum: classinput } });
    }
    setsubject=(input)=>{
        this.setState((prevState) => { return { subject: input } });
    }
    setlevel=(levelinput)=>{
        this.setState((prevState) => { return { level: levelinput } });
    }
    setdescription=(descriptioninput)=>{
        this.setState((prevState) => { return { description: descriptioninput } });
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
                    <Text style={style.textinputstyle}>Level </Text>
                    <TextInput style={style.textinputstyle} onChangeText={this.setlevel} value={this.state.level}/>

                    <Text style={style.textinputstyle}>Class  </Text>
                    <TextInput onChangeText={this.setclass} value={this.state.classnum} style={style.textinputstyle}/>

                    <Text style={style.textinputstyle}>  Subject </Text>
                    <TextInput style={style.textinputstyle} onChangeText={this.setsubject} value={this.state.subject} />
                    
                    <Text style={style.textinputstyle}>  Grade Desription </Text>
                    <TextInput style={style.textinputstyle} onChangeText={this.setdescription} value={this.state.description} />
                    
                    <View style={{ alignSelf: 'flex-end', marginTop: 70 }} >
                        <Button rounded onPress={()=>this.props.navigation.navigate('Pagetoaddgeade',{level:this.state.level ,classnum:this.state.classnum , description:this.state.description , subject : this.state.subject })} style={{ backgroundColor: '#008080' }} >
                            <Text>    Add    </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )}
}
style = StyleSheet.create({
    textinputstyle:{ 
        height: 50, 
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
export default Grade ;