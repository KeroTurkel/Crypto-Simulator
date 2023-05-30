import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Screens/MainScreen';
import CoinInfoScreen from './Screens/CoinInfoScreen';
import AuthScreen from './Screens/AuthScreen';
import SellScreen from './Screens/SellScreen';
import BuyScreen from './Screens/BuyScreen.';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="AuthScreen" component={AuthScreen}  />
        <Stack.Screen options={{headerShown: false}} name="MainScreen" component={MainScreen}  />
        <Stack.Screen name="CoinInfoScreen" component={CoinInfoScreen}/>
        <Stack.Screen name="SellScreen" component={SellScreen}/>
        <Stack.Screen name="BuyScreen" component={BuyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
