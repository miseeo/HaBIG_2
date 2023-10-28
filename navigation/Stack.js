import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SelectScreen from '../screens/SelectScreen';
import Home2 from '../screens/Home2';
import CameraScreen from '../screens/CameraScreen';
import Home3 from '../screens/Home3';
import MapScreen2 from '../screens/MapScreen2';
import Home4 from '../screens/Home4';
import MapCert from '../screens/MapCert';
import MapSelect from '../screens/MapSelect';
import Certification from '../screens/Certification';
import Study from '../screens/StudyScreen';
import StudyCert from '../screens/StudyCert';
import StudySelect from '../screens/StudySelect';
import GyrosensorScreen from '../screens/GyrosensorScreen';
import GyrosensorSelect from '../screens/GyrosensorSelect';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator 
        initialRouteName = "Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: '메인'}}/>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="Select" component={SelectScreen}/>
        <Stack.Screen name="Home2" component={Home2}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen}/>
        <Stack.Screen name="Home3" component={Home3}/>
        <Stack.Screen name="Home4" component={Home4}/>
        <Stack.Screen name="MapSelect" component={MapSelect}/>
        <Stack.Screen name="MapCert" component={MapCert}/>
        <Stack.Screen name="Cert" component={Certification}/>
        <Stack.Screen name="StudyCert" component={StudyCert}/>
        <Stack.Screen name="Study" component={Study}/>
        <Stack.Screen name="StudySelect" component={StudySelect}/>
        <Stack.Screen name="GyrosensorScreen" component={GyrosensorScreen}/>
        <Stack.Screen name="GyrosensorSelect" component={GyrosensorSelect}/>
    </Stack.Navigator>
  )
}

export default StackNavigation;