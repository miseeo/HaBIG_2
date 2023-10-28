import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CheckedItems } from "./HabitCell"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  Modal,
  Pressable,
  Button,
  TouchableOpacity,

} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Item } from "./HabitCell";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';

const { manifest } = Constants;

const habitData = [
  {
    name: "물 마시기",
    img: require("../assets/water.png"),
    explain: "우리 몸이 물을 원하고 있어요!!\n 물 보충 해주실래요?",
    certified: "머그컵, 텀블러 사진",
  },
  {
    name: "공부하기",
    img: require("../assets/eng.png"),
    explain: "오공완.\n 오늘도 공부 완료.",
    certified: "저장된 장소에서 인증",
  },
  {
    name: "미라클 모닝",
    img: require("../assets/clock.png"),
    explain: "미라클 모닝으로 상쾌한 하루~",
    certified: "알람을 누르고 휴대폰 흔들기",
  },
  {
    name: "헬스장 가기",
    img: require("../assets/run.png"),
    explain:
      "날이 좋아서, 날이 좋지 않아서, 날이 적당해서\n 모든 날이 헬스장가기 좋아요!",
    certified: "저장된 장소에서 인증",
  },
  {
    name: "윗몸 일으키기",
    img: require("../assets/exercise.png"),
    explain: "복근을 만들어 봅시다",
    certified: "휴대폰을 안고 윗몸 일으키기 하기",
  },
  {
    name: "영양제 먹기",
    img: require("../assets/drugs.png"),
    explain:
      "<이 포스팅은 HaBIG 파트너스 활동의 일환으로,\n 이에 따른 사용자의 습관형성을 제공합니다.>",
    certified: "인증 버튼 클릭",
  },
  {
    name: "청소하기",
    img: require("../assets/vacuum.png"),
    explain:
      "의자에 옷 걸쳐둔 거 다 알아요.\n 걸을 때 하나씩 뭐가 걸리는거 다 알아요.",
    certified: "인증 버튼 클릭",
  },
  {
    name: "반려견 산책",
    img: require("../assets/dog.png"),
    explain: "산책? 산책가까? 산책가자!!",
    certified: "인증 버튼 클릭",
  },
  {
    name: "책읽기",
    img: require("../assets/book.png"),
    explain:
      "사각사각 책을 넘기는 소리, 저는 정말 좋아하는데요.\n 그래서 저는 ...더보기",
    certified: "인증 버튼 클릭",
  },
  {
    name: "명상하기",
    img: require("../assets/meditation.png"),
    explain:
      "지쳤던 나의 마음을 달래며,\n 생각하고, 생각하고, 깊이 생각해봐요.",
    certified: "인증 버튼 클릭",
  },
];

export { habitData };
export default function SelectScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedcertified, setSelectedcertified] = useState();
  const [selectedexplain, setSelectedexplain] = useState();
  const [selectedHabits, setSelectedHabits] = useState([]);
  const handleCompletion = () => {
    if (selectedHabits.length > 0) {
      // 선택된 습관 중 첫 번째 습관을 선택한 습관으로 설정
      updateSelectedHabit(selectedHabits[0]);
      navigation.navigate('Main');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setModalVisible(!modalVisible);
          setSelectedId(item.name);
          setSelectedexplain(item.explain);
          setSelectedcertified(item.certified);

        }}
        // 선택 여부에 따라 체크 아이콘 변경
        Checked={selectedHabits.some((habit) => habit.name === item.name)}
      />
    );
  };

  return (
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}
      >
        <View style={styles.headerStyle}/>
        <View style={styles.top}>
          <Text
            style={{
              margin: 10,
              fontSize: 35,
              fontWeight: "bold",
              marginLeft: "5%",
              textAlign: "center",
            }}
          >
            HaBIG
          </Text>
        </View>

        <View style={styles.middle}>
          <Text
            style={{
              margin: 20,
              textAlign: "left",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            습관 선택하기
          </Text>
          <View style={styles.header}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  width: wp("95%"),
                }}
                data={habitData.filter((item) => !CheckedItems.has(item.name))}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        </View>

        {/* 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                  // fontSize: 20,
                }}
              >
                {selectedId}
              </Text>
              <Text style={styles.modalText}>{selectedexplain}</Text>
              <Text style={styles.modalText}>인증: {selectedcertified}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.finishbutton}
          onPress={() => {
            navigation.navigate("Main", { CheckedItems});

          }}
        >
          <Text
            style={{ fontWeight: "bold", textAlign: "center", color: "black" }}
          >
            완료
          </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
  );
}


const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    height: StatusBarHeight,
  },
  top: {
    flex: 0.7,
  },
  middle: {
    flex: 7,
    backgroundColor: "white",
    marginBottom: 50,
  },
  bottom: {
    // flex: 0.7,
    height: StatusBarHeight + 30,
    justifyContent: "center",
    borderStyle: "solid",
    marginBottom: 30,
    alignItems: "center",
    borderColor: "rgba(255, 251, 241, 3)",
    borderTopWidth: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#ffce57",
  },
  buttonOpen: {
    backgroundColor: "#ffce57",
  },
  buttonClose: {
    backgroundColor: "#ffce57",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  endbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  finishbutton: {
    padding: 10,
    width: wp("95%"),
    alignItems: "center",
    backgroundColor: "#ffce57",
    borderRadius: 100,
  },
});