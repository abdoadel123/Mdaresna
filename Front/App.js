
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator  } from 'react-navigation';

import AppHome from './src/Components/Main/appHome';
import StudentRout from './src/Components/Student/studentNavigation'
import TeacherRout from './src/Components/Teacher/teacherNavigation'
import Signin from './src/Components/Main/signin'

import Addassignment from './src/Components/Teacher/navigation/addAssignment'

console.disableYellowBox=true;

class App extends Component {
  render() {
    return (
      <AppStackNavigator />
      //<Addassignment/>
    );
  }
}
const AppStackNavigator=createStackNavigator({
  HomePage:AppHome,
  SignIn:Signin,
  StudentRoute:StudentRout,
  TeacherRoute:TeacherRout,

})
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: "center"
  },
});
export default App;