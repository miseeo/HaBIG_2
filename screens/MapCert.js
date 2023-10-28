import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar, Platform, Dimensions, Touchable } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

function MapCert({navigation}) {
  const [city, setCity] = useState("Loading...")
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);
  const [lat, setLat] = useState(37.5665);
  const [long, setLong] = useState(126.9780);
  const [savedData, setSavedData] = useState([])
  let ck = false;

  //현재 위치 데이터 구하기
  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync({accuracy: 5});
    setLat(latitude)
    setLong(longitude)
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(location[0].city);
    setRegion(location[0].region);
    setDistrict(location[0].district);
  };

  useEffect(() => {
    ask();
  }, []);

  const check = () => {
    Alert.alert(
      '인증하기',
      '현재 위치로 인증하시겠습니까?',
      [
        {
          text: '네',
          onPress: () => {
            compare();
            if(ck){
              Alert.alert('인증되었습니다.');
              //navigation.reset({routes: [{name: "home"}]})
              navigation.navigate('Home')
            }
            else{
              Alert.alert('다시 인증해주세요.')
            }
          }
        },
        {
          text: '아니요',
          onPress: () => {
            Alert.alert('다시 인증해주세요.')
          }
        }
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  //저장된 위치 데이터 가져옴
  const getData=()=>{
    fetch("http://192.168.0.7:19000/api/GPS/")
    .then(response=>response.json())
    .then(data=>setSavedData(data))
    .catch(error=>console.log(error))
  }

  const compare=()=>{
    getData();
    //가장 최근에 저장된 위치 데이터로 거리 비교
    dist(savedData[savedData.length-1].lat, lat, savedData[savedData.length-1].long, long);
  }

  //저장된 위치와 현재 위치 비교(반경 20미터 이내)
  const dist=(lat1, lat2, lon1, lon2)=>{
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;  //in meter

    if(d <= 20){
      ck = true;
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.headerStyle}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View padding='1%' style={{justifyContent: 'flex-start', paddingLeft: 20, paddingBottom: 10}}>
                <TouchableOpacity activeOpacity={0.8} hitSlop={{left: 30, right:30}} style={styles.button_white} 
                    onPress={() => navigation.pop()}>
                    <Text style={{color: '#ffce57', textAlign: 'center',
                        fontSize: 17, fontWeight: 'bold',}}>이전</Text>
                </TouchableOpacity>
            </View>
            <View padding='1%' style={{justifyContent: 'flex-end', paddingRight: 20, paddingBottom: 10}}>        
                <TouchableOpacity activeOpacity={0.8} hitSlop={{left: 30, right:30}} style={styles.button_yellow} 
                    onPress={() => check()}>
                <Text style={styles.text}>위치 인증</Text>
                </TouchableOpacity>
            </View>
        </View>
      <MapView 
        style={styles.map}
        region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
        provider={PROVIDER_GOOGLE}
      > 
    	<Marker
            coordinate={{
            latitude: lat,
            longitude: long,
          }}
            pinColor="#2D63E2"
            title="현재 위치"
            description="현재 위치"
          />
      </MapView>
      <View style={styles.bottom}>
        <Text style={styles.title}> 현재 위치 </Text>
        <Text style={styles.locate}>{region} {city} {district}</Text>
      </View>
    </View>
  );
}

const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '81%'
  },
  headerStyle: {
    height: StatusBarHeight,
  },
  button_yellow: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffce57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_white: {
    width: 80,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#ffce57',
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
  locate: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  }
});

export default MapCert;