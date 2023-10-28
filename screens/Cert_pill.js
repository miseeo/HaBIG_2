import React, { Component, useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar, Platform, Dimensions, Touchable } from 'react-native';
import { FlatList, TouchableOpacity, StyleSheet, Image, Text, View, Button, Alert } from 'react-native';
import { certification } from './HomeScreen';

export default function Certification({navigation}) {
    const check = () => {
      certification.add('영양제 먹기')
      navigation.navigate('Home', certification)
    }

    return(
      <View style={styles.container}>
        <View style={styles.headerStyle}/> 
        <Text style={{fontSize: 70,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#ffce57'}}>HaBIG</Text>
      <View style={styles.container}>
        <View style={styles.header}>    
          <View style={{marginLeft: 15, marginRight: 15}}>
            <TouchableOpacity style={styles.button2} 
              onPress={() => check()}
              >
              <View style={styles.container2}>
                <Text style={{flex: 1,
                    color: "black",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: 'center',
                    marginBottom: 20,
                }}> 인증 완료 </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    )
  }

  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  headerStyle: {
    height: StatusBarHeight+20,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 80,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 251, 241, 3)",
    alignContent: 'center',
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffce57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffce57',
    paddingBottom: 5,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  vtop:{
    flex:1,
    paddingTop:StatusBarHeight,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  button2: {
    textAlign: "right", 
  },
});
