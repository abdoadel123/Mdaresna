import React, { Component } from 'react';
import {Platform,StyleSheet,Text, View , Dimensions , ScrollView,Image  } from 'react-native' ;
import { Container, Content } from 'native-base';
import feedIcon from '../../../assets/Imges/feedback.png'
import Header from '../../Main/Header/header';
import ip from '../ipaddress'

class OneSubjectFeedbacks extends Component{
    static navigationOptions = {
        drawerLabel: () => null
    }
    state={
        subjectfeedbacks:[]
    }
    componentDidMount() {
        const sid = window.userid;
        const subject=this.props.navigation.state.params.subject;
        //alert(sid + "    hi")
        return fetch(ip + '/student/feedbacks/' + sid + '/' + subject)
            .then((res) => res.json())
            .then((res) => {
                if (res.length === 0) {
                    this.setState((prevState) => {
                        return {
                            subjectfeedbacks: [{date:'',feedback:'No Feedbacks Founded'}]
                        }
                    });
                }
                else {
                    this.setState((prevState) => {
                        return {
                            subjectfeedbacks: res
                        }
                    });
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }

    render(){
        const onesubjectfeedbacks=this.state.subjectfeedbacks.map((feedback,i)=>{
            return (
                <View style={{margin : 5 ,borderWidth: 1,borderRadius: 5,backgroundColor:'#eee',borderColor:'#eee'}}>
                    <Text style={{padding:2}}> {feedback.date}  </Text>
                    <Text style={{padding:2}}>{feedback.feedback}</Text>
                </View>
            );
        });
        return(
           <Container>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{margin:9}}>
                        <Image  resizeMode='contain' source={feedIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>MY Feedback</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content>
                    <ScrollView >
                        {onesubjectfeedbacks}
                   </ScrollView  >
               </Content>
            </Container>
        );
    }
}
export default OneSubjectFeedbacks;