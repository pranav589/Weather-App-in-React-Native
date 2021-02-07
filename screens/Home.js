import React, {useState,useEffect} from 'react';
import {TextInput, Button, Card,Title} from 'react-native-paper';
import {View, Text, FlatList, Alert,Image} from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = {
  key: 'YOUR_API_KEY',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
};

export default function Home({navigation,route}) {
  const [info, setInfo] = useState({
    name: '-',
    temp: '-',
    humidity: '-',
    desc: '-',
    icon: '-',
  });

  useEffect(()=>{
    fetchInfo()
  },[])

  const fetchInfo =async () => {
      let myCity=await AsyncStorage.getItem('newCity')
      if(!myCity){
        const {city}=route.params
        myCity=city
      }
      
    
  
    fetch(`${api.baseurl}weather?q=${myCity}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((data) => {
          setInfo({
              name:data.name,
              temp:data.main.temp,
              humidity:data.main.humidity,
              desc:data.weather[0].description,
              icon:data.weather[0].icon
          })
          console.log(data)
      }).catch(err=>{
        Alert.alert(err.message)
      });
  };



  if(route.params.city !== 'Nashik'){
      fetchInfo()
  }

  return (
  <View style={{flex:1}}>
      <Header name='Weather App'/>
      <View style={{alignItems:"center"}}>
          <Title style={{color:'#00aaff',marginTop:30,fontSize:30}}>
              {info.name}
          </Title>
          <Image
            style={{
                width:120,
                height:120
            }}
            source={{uri:`https://openweathermap.org/img/w/${info.icon}.png`}}
          />
      </View>
      <Card style={{margin:5,padding:10}}>
         <Title style={{color:"#00aaff"}}>Temperature - {info.temp}</Title>   
      </Card>
      <Card style={{margin:5,padding:10}}>
         <Title style={{color:"#00aaff"}}>Humidity - {info.humidity}</Title>   
      </Card>
      <Card style={{margin:5,padding:10}}>
         <Title style={{color:"#00aaff"}}>Description - {info.desc}</Title>   
      </Card>
  </View>
  )
}


