import React, { Component } from 'react';
import {Platform,StyleSheet,Text, View  , TouchableHighlight , ScrollView  } from 'react-native';
import { Container, Content, Button} from 'native-base';

import Header from '../../Main/Header/header';
import { Icon } from 'react-native-elements';

import ip from '../../Student/ipaddress';

class Messages extends Component{
    static navigationOptions = {
        drawerLabel: () => null
   }
   state={
       allconversations :[]
   }
   componentDidMount() {
        myid = window.userid;
        return fetch(ip + '/message/getinbox/'+ myid )
        .then((res) => res.json())
        .then((res) => {
            if (res.length === 0) {
                this.setState((prevState) => {
                    return {
                        allconversations: [{from:'No Thing To Show' }]
                    }
                });
            }
            else {
                this.setState((prevState) => {
                    return {
                        allconversations: res
                    }
                });
            }

        })
        .catch((err) => {
            console.error(err);
        });
}
   render(){
       const myinbox=this.state.allconversations.map((message,i)=>{
           return (
                <View  style={style.messagestyle} key={i}>
                    <View style={style.messageheader}>
                        <Text  style={style.headerfromname}> {message}</Text>
                    </View>
                    <View styl={{justifyContent: 'flex-end', marginTop:70 }}>
                        <Button rounded style={style.bb}  onPress={()=>this.props.navigation.navigate('oneConversationView',{from:message})}>
                            <Text>    Reply    </Text>
                        </Button>
                    </View> 
                </View>
           
            );
       });
       return (
        
           <Container  >
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Icon name='mail' color='white' size={30} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Inbox</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <Content >
                    <ScrollView  >
                        {myinbox} 
                    </ScrollView >
                </Content >
           </Container  >
            
       );
   } 
}
const style =StyleSheet.create({
    messagestyle:{
        margin :5,
        backgroundColor:'#eee'
    },
    messageheader:{
        flexDirection:'row',
        marginBottom:5
    },
    headerdate:{
       marginLeft:100,
    },
    headerfromname:{
        marginRight:5
     },
     bb:{
        backgroundColor:'#008080',
     }
});
export default Messages ;