import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements'
import profilePic from '../../../assets/Imges/user.jpg'
import { Textarea } from 'native-base';
import ip from '../../Student/ipaddress'

class Home extends Component {
    state = {
        informations: {
            id: 'default',
            name: 'deafult',
        }
    }
    componentDidMount() {
        const sid = window.userid;
        //alert(sid);
        return fetch(ip + '/teacher/home/' + sid)
            .then((res) => res.json())
            .then((res) => {
                this.setState((prevState) => {
                    window.level=res[0].level;
                    window.class=res[0].classNume;
                    //alert(sid+' '+window.class + ' ' + window.level);
                    return {   
                        informations : {
                            id:sid ,
                            name : res[0].name,
                        }  }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
    render() {
        //const mysubjects = this.subjects.map((s, i) => { return <Text key={i}>{s}</Text> })
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Icon name='home' color='white' type='font-awesome' size={30} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Home</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.main}>
                    <Image
                        resizeMode="cover"
                        source={profilePic}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text>Name:</Text>
                        <Text>{this.state.informations.name} </Text>
                        <Text>ID:</Text>
                        <Text>{this.state.informations.id}</Text>
                        {/*<Text style={{ fontSize: 50 }}>Subjects</Text>*/}
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '40%'
    },
    textContainer: {
        height: '40%',
        // alignItems: "center",
        borderRadius: 2,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#eee',
        marginTop: 10,
        marginLeft: 8,
        marginRight: 8

    }
});
export default Home;