import React, { Component, useState, useEffect } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  StatusBar,
  Platform,
  Dimensions,
  Touchable,
  TextInput,
} from "react-native";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  Alert,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SensorGoal from "./GyrosensorScreen";

export default function GyrosensorSelect({ navigation }) {
  const [number, onChangeNumber] = React.useState(0);
  movesensor = () => {
    if (number === 0) {
      Alert.alert("목표를 설정해주세요.");
    } else {
      <SensorGoal goal={number} />;
      navigation.navigate("GyrosensorScreen", { goal: number });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle} />

      <Text
        style={{
          fontSize: 70,
          textAlign: "center",
          fontWeight: "bold",
          color: "#ffce57",
        }}
      >
        HaBIG
      </Text>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ marginLeft: 15, marginRight: 15 }}>
            <Text
              style={{
                color: "black",
                fontSize: 17,
                // fontWeight: "bold",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              목표설정 후 인증버튼을 눌러주세요!
            </Text>
            <View style={styles.count}>
              <Text
                style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                목표설정
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                maxLength={10}
                placeholder="목표 횟수를 설정하세요."
                returnKeyType="done"
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  Keyboard.dismiss();
                  console.log(number);
                }}
              >
                <View style={styles.container2}>
                  <Text
                    style={{
                      flex: 1,
                      color: "black",
                      fontSize: 17,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    {" "}
                    설정{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button2} onPress={this.movesensor}>
              <View style={styles.container2}>
                <Text
                  style={{
                    flex: 1,
                    color: "black",
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  {" "}
                  인증{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerStyle: {
    height: StatusBarHeight + 20,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 251, 241, 3)",
    alignContent: "center",
    // justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffce57",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffce57",
    paddingBottom: 5,
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  // titleText: {
  //   fontSize: 70,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#ffce57',
  // },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  vtop: {
    flex: 1,
    paddingTop: StatusBarHeight,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  header: {
    fontSize: 20,
    // marginBottom: 20,
    fontWeight: "bold",
    marginTop: -120,
    color: "black",
  },
  button2: {
    textAlign: "right",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ffce57",
    padding: 20,
    margin: 5,
    paddingTop: 30,
    marginBottom: 30,
  },
});