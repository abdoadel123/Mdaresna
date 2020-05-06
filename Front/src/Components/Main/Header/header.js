import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { View } from 'native-base';

class Header extends Component{
    static navigationOptions = {
        drawerLabel: () => null
   }
    state={
        noti:'white',
        mess:'white',
        menue:'white'
    }
    onMessPress=()=>{
        this.setState({mess:'#009999',menue:'white',noti:'white'});
        //this.props.navigation.
        this.props.navigate('Messages');
    }
    onNotiPress=()=>{
        this.setState(()=>{return {mess:'white',menue:'white',noti:'#009999'}});
        this.props.navigate('NotificationsPage');
    }
    onMenuPress=()=>{
        this.setState({mess:'white',menue:'#009999',noti:'white'});
        this.props.navigate('DrawerOpen');
    }
    render() {
        return (

            <View style={styles.container}>
                <View style={styles.menue}>
                    <TouchableOpacity style={styles.imageMen} onPress={this.onMenuPress}>
                        <Icon
                            name='menu'
                            color={this.state.menue}
                            size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.message}>
                    <TouchableOpacity style={styles.imageMes} onPress={this.onMessPress}>
                        <Icon
                            name='mail'
                            color={this.state.mess}
                            size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.notification}>
                    <TouchableOpacity style={styles.imageNoti} onPress={this.onNotiPress}>
                        <Icon
                            name='bell'
                            type='font-awesome'
                            color={this.state.noti}
                            size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '9%',
        flexDirection: 'row',
        backgroundColor: '#008080',
        position: 'relative'
    },
    imageNoti: {
        marginRight: 2,
        marginTop: 5,
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
    imageMes: {
        marginTop: 5,
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    imageMen: {
        marginLeft: 2,
        marginTop: 5,
        width: 40,
        height: 40,

        alignSelf: 'flex-start',

    },
    notification: {
        width: '33%',
    },
    message: {
        width: '33%',
    },
    menue: {
        width: '33%',
    }
});
export default Header;