//import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar, Platform, Dimensions, Touchable } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Agenda} from 'react-native-calendars';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { CheckedItems } from "./HabitCell.js";
import {habitData} from "./SelectScreen";
import {FlatList} from "react-native";
import { useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import {Item2} from "./HabitCell.js";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Searchbar } from "react-native-paper";

let imagename = "";
let image = "";

const Tab = createBottomTabNavigator();

const postdata = async () => {
  try {
    fetch("http://192.168.0.30:8000/api/img/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgname: imagename,
        imge: image,
        // imgname: "dd",
        // imge: "https://cdn.pixabay.com/photo/2016/08/27/11/17/bag-1623898_960_720.jpg",
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  } catch (err) {
    console.log(err);
  }
};

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: '#ffce57',
        tabBarStyle: {height: 90},
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
      name="Ranking"
      component={RankingScreen}
      options={{
        title: '랭킹',
        tabBarIcon: ({focused, color, size}) => (
          <Icon name="person" size={32} color={focused ? '#ffce57' : 'grey'}></Icon>
        ),
      }}/>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: '홈',
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="home" size={32} color={focused ? '#ffce57' : 'grey'}></Icon>
          )
        }}/>
      <Tab.Screen
        name="Calender"
        component={AgendaScreen}
        options={{
          title: '달력',
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="calendar" size={32} color={focused ? '#ffce57' : 'grey'}></Icon>
          ),
        }}/>
      </Tab.Navigator>
  )
}
const certification = new Set();
export{certification};

function MainScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const isFocused = useIsFocused(); 

  useEffect(() => {
    return () => {
    }
    }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        console.log(item.name)
        if (item.name === "헬스장 가기") {
          navigation.navigate("MapSelect");
        }
        else if (item.name === "물 마시기") {
          navigation.navigate("CameraScreen");
        }
        else if (item.name === "공부하기") {
          navigation.navigate("StudySelect");
        }
        else if (item.name === "윗몸 일으키기") {
          navigation.navigate("GyrosensorSelect");
        }
        else if (item.name === "공부하기") {
          navigation.navigate("Cert_study");
        }
        else if (item.name === "청소하기") {
          navigation.navigate("Cert_clean");
        }
        else if (item.name === "반려견 산책") {
          navigation.navigate("Cert_walk");
        }
        else if (item.name === "책읽기") {
          navigation.navigate("Cert_read");
        }
        else if (item.name === "영양제 먹기") {
          navigation.navigate("Cert_pill");
        }
        else if (item.name === "명상하기") {
          navigation.navigate("Cert_meditate");
        }
        else {navigation.navigate("Cert")};
      }}>
      <View style={styles.container2}>
        <Image
          source={item.img}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
        <Text style={[styles.name2, certification.has(item.name) && styles.strikethrough]}>{item.name}</Text>
        {/* <View>{console.log(certification)}</View> */}
      </View>
      </TouchableOpacity>
    );
  };

  return(
    <View style={styles.container}>
      <View style={styles.headerStyle}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 70,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: '#ffce57'}}>HaBIG</Text>
        <TouchableOpacity style={{alignItems: 'flex-end', paddingRight: 15}} onPress={() => navigation.navigate('Select')}>
          <Icon name="add-circle" size="70" color='#ffce57'/>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={{ justifyContent: "center", alignItems: "center" }} />
        {CheckedItems ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: wp("95%"),
            }}
            data={habitData.filter((item) => CheckedItems.has(item.name))}
            // renderItem={({ item }) => (
            //   <View style={styles.item}>
            //     <Text>{item.name}</Text>
            //   </View>
            // )}
            renderItem = {renderItem}
            keyExtractor={(item) => item.name} />
        ) : ( 
          <Text>No selected habits.</Text>
        )
        }
      </View>
    </View>
  )
}

const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
  },
  headerStyle: {
    height: StatusBarHeight+20,
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
  // titleText: {
  //   fontSize: 70,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#ffce57',
  // },
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
  container2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255, 251, 241, 3)",
  },
  name2: {
    flex: 1,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-end",
  },
});

//달력 한국버전 
LocaleConfig.locales['ko_KR'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};

LocaleConfig.defaultLocale = 'ko_KR';


class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <View style={styles.vtop}>
        <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={''}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        
        month={this.state.currentMonth}
        theme={{
          selectedDayBackgroundColor: '#ffce57',
          arrowColor: 'rgba(255, 251, 241, 3)',
          dotColor: '#ffce57',
          textdaycoloer: 'ffce57',
          todayTextColor: '#ffce57',
          agendaColor: '#ffce57',
          agendaTodayColor: '#ffce57', //주간달력 Agenda 오늘날짜 색
          agendaKnobColor: '#ffce57' //주간->월간 달력으로 볼 수 있게 내리는 기능 색 
        }}
        
        />
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5); //3+1로 하면 빈 메모 안뜸 
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: '확인용 습관 목록  ' + strTime, // 위에 코드랑 + '#' + j  추가
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }


  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

//랭킹!
const fullWidth = Dimensions.get("window").width;

const rankingData = [
  {
    rank: 1,
    id: "Mumin",
    score: 200,
  },
  {
    rank: 2,
    id: "cold",
    score: 140,
  },
  {
    rank: 3,
    id: "habit",
    score: 100,
  },
];

const Item = ({ id, score, rank }) => (
  <View style={styles.rankitem}>
    <Text style={styles.title}>{rank}</Text>
    <Text style={styles.title}>{id}</Text>
    <Text style={styles.title}>{score}</Text>
  </View>
);

function RankingScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.rank_container}>
      <View style={styles.headerStyle} />
      <Text
        style={{
          fontSize: 50,
          textAlign: "center",
          fontWeight: "bold",
          color: "#ffce57",
          padding: 20,
        }}
      >
        RANKING
      </Text>
      <View style={styles.rank_container}>
        {/* <View style={styles.header}> */}
        <View style={{ marginLeft: 15, marginRight: 15 }}>
          <Searchbar
            placeholder="친구를 찾아보세요!"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{
              width: fullWidth,
              backgroundColor: "rgba(255, 251, 241,3)",
              marginBottom: 20,
            }}
          />
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                width: fullWidth,
              }}
              data={rankingData}
              renderItem={({ item }) => (
                <Item rank={item.rank} id={item.id} score={item.score} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
}

export default HomeScreen;