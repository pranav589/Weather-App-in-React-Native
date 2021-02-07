import React, {useState} from 'react';
import {TextInput, Button,Card} from 'react-native-paper';
import {View, Text,FlatList,Alert,TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Search({navigation}) {
  const [text, setText] = useState('');
  const [cities, setCities] = useState([]);

  const fetchCities = (city)=>{
      try {
          setText(city)
        fetch("https://api.weather.com/v3/location/search?apiKey=YOUR_API_KEY&language=en-US&query="+city+"&locationType=city&format=json")    
      .then(res=>res.json())    
      .then(data=>{    
        setCities(data.location.address.slice(0,9))
         console.log(cities)
    })
      } catch (error) {
          console.log(error)
          Alert.alert(error)
          throw error
      }

}

const pressHandler=async()=>{
  await AsyncStorage.setItem('newCity',text)
    navigation.navigate('home',{city:text})
    
    setText('')
}

const listClick=async(cityName)=>{
  await AsyncStorage.setItem('newCity',cityName)
    setText(cityName)
}

  return (
    <View style={{flex: 1}}>
      <Header name="Search City" />
      <TextInput
        label="City Name"
        theme={{colors: {primary: '#00aaff'}}}
        mode="outlined"
        focusable
        value={text}
        onChangeText={(val) => fetchCities(val)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        onPress={()=>pressHandler()}>
        <Text style={{color: 'white'}}>Search</Text>
      </Button>

      <FlatList data={cities} renderItem={({item})=>(
          <TouchableOpacity>
          <Card style={{margin:2,padding:12}} onPress={()=>listClick(item)}>
              <Text>{item}</Text>
          </Card>
          </TouchableOpacity>

      )} 
      keyExtractor={item=>item}
      />

    </View>
  );
}
