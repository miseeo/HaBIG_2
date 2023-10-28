import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
// import MainScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SelectScreen from '../screens/SelectScreen';
import CameraScreen from '../screens/CameraScreen';
import MapCert from '../screens/MapCert';
import MapSelect from '../screens/MapSelect';
import Cert_pill from '../screens/Cert_pill';
import Cert_clean from '../screens/Cert_clean';
import Cert_read from '../screens/Cert_read';
import Cert_meditate from '../screens/Cert_meditate';
import Cert_study from '../screens/Cert_study';
import Cert_walk from '../screens/Cert_walk';
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
        <Stack.Screen name="Main" component={HomeScreen}/>
        <Stack.Screen name="Select" component={SelectScreen}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen}/>
        <Stack.Screen name="MapSelect" component={MapSelect}/>
        <Stack.Screen name="MapCert" component={MapCert}/>
        <Stack.Screen name="Cert_pill" component={Cert_pill}/>
        <Stack.Screen name="Cert_clean" component={Cert_clean}/>
        <Stack.Screen name="Cert_meditate" component={Cert_meditate}/>
        <Stack.Screen name="Cert_read" component={Cert_read}/>
        <Stack.Screen name="Cert_study" component={Cert_study}/>
        <Stack.Screen name="Cert_walk" component={Cert_walk}/>
        <Stack.Screen name="StudyCert" component={StudyCert}/>
        <Stack.Screen name="Study" component={Study}/>
        <Stack.Screen name="StudySelect" component={StudySelect}/>
        <Stack.Screen name="GyrosensorScreen" component={GyrosensorScreen}/>
        <Stack.Screen name="GyrosensorSelect" component={GyrosensorSelect}/>
    </Stack.Navigator>
  )
}

export default StackNavigation;