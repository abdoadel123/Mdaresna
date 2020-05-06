import React, { Component } from "react";
import {StyleSheet, FlatList, View, Text} from "react-native";
import Header from '../Header/header'
import { Icon } from 'react-native-elements'

class Notifications extends Component {
    static navigationOptions = {
        drawerLabel: () => null
   }
    state = {
        notifications: [
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
            {
                date:'30-jun-18',
                notification: 'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            },
        ]
    }
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
            <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                   <View style={{margin:9}}>
                   <Icon name='bell' color='white' type='font-awesome'size={30} />
                   </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Notifications</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
            <View style={styles.container}>
                <NotificationList
                    notifications={this.state.notifications} />
            </View>
            </View>
        );
    }
}


const NotificationItem = props => (
    <View style={styles.Itemcontainer}>
        <Text style={styles.text}>{props.date}</Text>
        <Text>{props.notification}</Text>
    </View>
);

const NotificationList = props => {
    return (
        <FlatList
            style={styles.Listcontainer}
            data={props.notifications}
            renderItem={(info) => (
                <NotificationItem
                    notification={info.item.notification}
                    date={info.item.date}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    Listcontainer: {
        width: "100%"
    },
    Itemcontainer: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "column",
        // alignItems: "center"
    },
    text: {
        padding: 5
    }
});
export default Notifications;