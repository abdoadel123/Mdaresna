import React, { Component } from "react";
import { TextInput, StyleSheet, FlatList, View, Image, Text, Button, TouchableOpacity, TouchableHighlight } from "react-native";

import Header from '../../Main//Header/header';
import noteIcon from '../../../assets/Imges/notes.png'
import ip from'../../Student/ipaddress';

class FeedbackTeacerView extends Component {
    teacherID = window.userid;
    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        notes:[]
    }
    stID = { studentID: this.props.navigation.state.params.studentID };


    componentDidMount() {
        return fetch(ip + '/teacher/note/show/' + this.stID.studentID + '/' + this.teacherID)
            .then((res) => res.json())
            .then((res) => {
                if (res.count === 0)
                    alert("No Notes")
                else
                    this.setState({ notes: res.notes});
            })
            .catch((err) => {
                console.error(err);
            });
    }


    render() {
        return (
            <View style={styles.container}>
            <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                   <View style={{margin:9}}>
                   <Image  resizeMode='contain' source={noteIcon} style={{ width: 30, height: 30 }} />
                   </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Notes History</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.scrollcontainer}>
                    <NoteList
                        notes={this.state.notes} />
                    <TouchableHighlight style={{ width: 150,marginTop: 8 }}>
                        <Button
                            color='#008080'
                            title="Add Note"
                            onPress={() => this.props.navigation.navigate('note_student_list',this.stID)} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const NotetItem = props => (
    <View style={styles.Itemcontainer}>
        <Text style={styles.text}>{props.subject}</Text>
        <Text>{props.note}</Text>
    </View>
);

const NoteList = props => {
    return (
        <FlatList
            style={styles.Listcontainer}
            data={props.notes}
            renderItem={(info) => (
                <NotetItem
                    note={info.item.note}
                    subject={info.item.subject}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%'
    },
    scrollcontainer: {
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
export default FeedbackTeacerView;