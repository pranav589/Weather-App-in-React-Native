import React from 'react';
import { StatusBar} from 'react-native';
import Home from './screens/Home';
import Search from './screens/Search';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Tab=createBottomTabNavigator()

function App(){
 return(
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#00aaff'/>
      <NavigationContainer>
        <Tab.Navigator
         screenOptions={({route})=>({
            tabBarIcon:({color})=>{
              let iconName;
              if(route.name==='home'){
                iconName='home'
              }else if(route.name==='search'){
                iconName='search1'
              }
              return <AntDesign name={iconName} size={25} color={color} />
            }
         })}
         tabBarOptions={{
           activeTintColor:"#00aaff",
           inactiveTintColor:"gray"
         }} >
          <Tab.Screen name='home' component={Home} initialParams={{city:"Nashik"}} />
          <Tab.Screen name='search' component={Search}/>
        </Tab.Navigator>
      </NavigationContainer>

     
      {/* <Search/> */}
    </>
  )
}


export default App