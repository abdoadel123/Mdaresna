import React, { Component } from "react";
import { TextInput, StyleSheet, FlatList, View, Image, Text, Button, TouchableOpacity, TouchableHighlight } from "react-native";
import Header from '../../Main/Header/header';
import feedIcon from '../../../assets/Imges/feedback.png'
import ip from '../../Student/ipaddress';



class FeedbackTeacerView extends Component {
    teacherID = window.userid;
    static navigationOptions = {
        drawerLabel: () => null
    }
    stID = { studentID: this.props.navigation.state.params.studentID };
    state = {
        feedbacks: []
    }

    componentDidMount() {
        return fetch(ip + '/teacher/geteedback/' + this.stID.studentID + '/' + this.teacherID)
            .then((res) => res.json())
            .then((res) => {
                if (res.count === 0)
                    alert("No feedbacks")
                else
                    this.setState({ feedbacks: res.feedbacks });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={{ width: '100%', height: '9%', backgroundColor: '#008080', borderBottomWidth: 1, borderBottomColor: 'white', flexDirection: 'row' }}>
                    <View style={{ margin: 9 }}>
                        <Image resizeMode='contain' source={feedIcon} style={{ width: 30, height: 30 }} />
                    </View>
                    <Text style={{ fontSize: 40, alignSelf: 'flex-start', color: 'white' }}>Feedbacks History</Text>
                </View>
                <Header navigate={this.props.navigation.navigate.bind(this)} />
                <View style={styles.Scrollcontainer}>
                    <FeedbackList
                        feedbacks={this.state.feedbacks} />
                    <TouchableHighlight style={styles.button}>
                        <Button
                            title="Add Feedback"
                            color='#008080'
                            onPress={() => this.props.navigation.navigate('feedback_Student_List',this.stID)} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const FeedbacktItem = props => (
    <View style={styles.Itemcontainer}>
        <Text style={styles.text}>{props.subject}</Text>
        <Text>{props.feedback}</Text>
    </View>
);

const FeedbackList = props => {
    return (
        <FlatList
            style={styles.Listcontainer}
            data={props.feedbacks}
            renderItem={(info) => (
                <FeedbacktItem
                    feedback={info.item.feedback}
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
    Scrollcontainer: {
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
    },
    button: {
        width: 150,
        marginTop: 8

    }
});
export default FeedbackTeacerView;