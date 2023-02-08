import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from './assets/screens/AudioList';
import PlayList from './assets/screens/PlayList';
import Player from './assets/screens/Player';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AudioProvider from './assets/context/AudioProvider';
import AudioListItem from './assets/components/AudioListItem';
import { View } from 'react-native';




const MyTheme = {
  dark: false,
  colors: {
    primary: '#9570FF',
    background: '#FFF',
    text: '#333',
  },
};

export default function App() {
  const Tab = createBottomTabNavigator();
  


  return (
    <AudioProvider>
      <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{
    tabBarStyle: { 
      backgroundColor:'#fff',
      },
  }}>
        <Tab.Screen name="AudioList" component={AudioList} options={{
          tabBarIcon: ({ size, color }) => (
            < MaterialIcons name="headset" size={size} color={color} />
          )
        }} />
        <Tab.Screen name="Player" component={Player} options={{
          tabBarIcon: ( {size, color }) => (
            <FontAwesome5 name="compact-disc" size={size} color={color} />
          )
        }} />
        <Tab.Screen name="PlayList" component={PlayList} options={{
          tabBarIcon: ({size, color }) => (
            <MaterialIcons name="library-music" size={size} color={color} />
          )
        }}/>
      </Tab.Navigator>  
     </NavigationContainer>
    </AudioProvider>
  )
}


