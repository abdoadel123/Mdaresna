import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import TitleImage from '../../assets/Imges/Title.png';
import Student from '../../assets/Imges/Student.png';
import Teacher from '../../assets/Imges/Teacher.png';

class Main extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        type: ''
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.titleView}>
                    <Image resizeMode="contain" source={TitleImage} style={style.titleImage} />
                </View>
                <View style={style.mainContainer}>

                    <TouchableOpacity style={style.touchablestayle} onPress={() => this.props.navigation.navigate('SignIn', { type: 'student' })}>
                        <Image resizeMode="contain" source={Student} style={style.image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.touchablestayle} onPress={() => this.props.navigation.navigate('SignIn', { type: 'teacher' })}>
                        <Image resizeMode="contain" source={Teacher} style={style.image} />
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        flexDirection: "column",
        //alignItems: "center"
    },
    titleView: {
        width: '100%',
        height: '10%',
        marginTop: '10%',
        alignItems: "center"
        // ,backgroundColor:'red'
    },
    titleImage: {
        height: '100%',
        width: '100%',
    },
    mainContainer: {
        width: '100%',
        height: '80%',
        marginTop: '13%',
        flexDirection: "row",
        // backgroundColor:'#eee'
    },
    image: {
        width: '70%',
        height: '70%'
    },
    touchablestayle:{
        height: '100%',
        width: '50%',
        alignItems: "center"
    }
});
export default Main;