import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker, Image, TouchableHighlight } from 'react-native';
import TitleImage from '../../assets/Imges/Title.png';
import signIcon from '../../assets/Imges/sign-in.png'
import ip from '../Student/ipaddress';


class SignIn extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        userPassword: '',
        userid: '',
        schoolNames: ['Orman'],
        schoolName: ''
    }
    setpassword = (event) => {
        this.setState(() => {
            return { userPassword: event };
        });
    }
    setId = (event) => {
        this.setState(() => {
            return { userid: event };
        });
    }
    setSchool = (choose) => {
        this.setState(() => { return { schoolName: choose }; });
    }
    loginplease = () => {
        // alert('check here for data base and then make navigation  . ');
        if (this.props.navigation.state.params.type === 'teacher') {
            fetch(ip + '/admin/login/teacher/' + this.state.userid + '/' + this.state.userPassword)
                .then((res) => res.json())
                .then((res) => {
                    if (res.count === 0) {
                        alert("Login Error")
                        this.props.navigation.navigate('HomePage')
                    }
                    else {
                        window.userid = this.state.userid;
                        this.props.navigation.navigate('TeacherRoute');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            // window.userid=this.state.userid;
            // this.props.navigation.navigate('TeacherRoute');
        }
        else {
            fetch(ip + '/admin/login/student/' + this.state.userid + '/' + this.state.userPassword)
                .then((res) => res.json())
                .then((res) => {
                    if (res.count === 0) {
                        alert("Login Error")
                        this.props.navigation.navigate('HomePage')
                    }
                    else {
                        window.userid = this.state.userid;
                        this.props.navigation.navigate('StudentRoute');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            // window.userid = this.state.userid;
            // this.props.navigation.navigate('StudentRoute');
        }
    }
    render() {
        const schools = this.state.schoolNames.map((element, i) => <Picker.Item label={element} value={element} key={i} />);
        return (
            <View style={style.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={signIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Sign In</Text>
                </View>
                <View style={style.titleView}>
                    <Image resizeMode="contain" source={TitleImage} style={style.titleImage} />
                </View>
                <View style={style.parent}>
                    <View style={style.textinputcontainer} >
                        <Text style={style.textstyle} > ID: </Text>
                        <TextInput onChangeText={this.setId} style={style.textinput} />
                    </View>
                    <View style={style.textinputcontainer} >
                        <Text style={style.textstyle} > Password:</Text>
                        <TextInput onChangeText={this.setpassword} style={style.textinput} />
                    </View>
                    <View style={style.pikerContainer}>
                        <Text style={style.textstyle} >Choose School:</Text>
                        <View style={style.pickerstyle}>
                            <Picker selectedValue={this.state.schoolName} onValueChange={this.setSchool} >
                                {schools}
                            </Picker>
                        </View>
                    </View>
                    <TouchableHighlight style={style.buttonstyle}>
                        <Button color='#008080' title='Sign In' onPress={this.loginplease} />
                    </TouchableHighlight>
                </View>

            </View>

        );
    }
}
const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    titleView: {
        marginTop: 60,
        alignItems: "center"
    },
    titleImage: {
        height: 50,
        width: 230,
    },
    parent: {
        height: '50%',
        alignItems: "center",
        borderRadius: 2,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#eee',
        marginTop: 20,
        marginBottom: '25%',
        marginLeft: '2%',
        marginRight: '2%'

    },
    pickerstyle: {
        borderRadius: 6,
        borderWidth: 1,
        width: '70%',
        height: 50
    },
    textinputcontainer: {
        flexDirection: 'row',
        margin: 8,
        alignItems: "center"
    },
    pikerContainer: {
        flexDirection: 'row',
        margin: 8,
        alignItems: "center"
    },
    textstyle: {
        width: '30%',
        fontFamily: 'Helvetica',
        marginTop: '5%',
    },
    textinput: {
        borderRadius: 6,
        borderWidth: 1,
        width: '70%',
        height: 50
    },
    buttonstyle: {
        width: 130,
        marginTop: 15,
    }
});
export default SignIn;