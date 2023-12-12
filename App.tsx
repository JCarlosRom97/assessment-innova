import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import AlbumDetail from './src/Screens/AlbumDetail';
import { Provider } from 'react-redux';
import store from './src/Redux/store';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Users' component={HomeScreen}/>
            <Stack.Screen name='AlbumDetail' component={AlbumDetail} options={{title:"Album Photos"}}   />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
