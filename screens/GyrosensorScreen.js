import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";

let count = 0;
let flag = 1;

export default function GyrosensorScreen({ navigation, route }) {
  const [orientation, setOrientation] = useState("protrait");
  useEffect(() => {
    count = 0;
  }, []);
  useEffect(() => {
    DeviceMotion.addListener(({ rotation }) => {
      const alpha = Math.floor(Math.abs(rotation.beta));
      setOrientation(alpha === 1 ? "landscape" : "protrait");
    });
  }, []);

  if (orientation === "landscape") {
    if (flag === 1) {
      flag = 0;
      count += 1;
      console.log(route.params.goal);
      if (route.params.goal == count) {
        Alert.alert("인증되었습니다!");
        navigation.navigate("Home");
        count = 0;
      }
    } else {
      flag = 1;
    }
  }

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
          <Text
            style={{
              color: "black",
              fontSize: 30,
              // fontWeight: "bold",
              textAlign: "center",
            }}
          >
            목표: {route.params.goal}회
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            현재: {count}회
          </Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  headerStyle: {
    height: StatusBarHeight + 20,
  },
  header: {
    fontSize: 20,
    // marginBottom: 20,
    fontWeight: "bold",
    marginTop: -120,
    color: "black",
  },
});