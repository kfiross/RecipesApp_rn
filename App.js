import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import HomeScreen from './src/views/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './src/views/screens/DetailsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CreateRecipeScreen from './src/views/screens/CreateRecipeScreen';
import RecipeDetailsScreen from './src/views/screens/RecipeDetailsScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import AuthStore from './src/stores/RecipeStore';
import {observer} from 'mobx-react';

import auth from '@react-native-firebase/auth';
import {Button, Text, I18nManager, View} from 'react-native';
import DrawerContentScrollView from '@react-navigation/drawer/src/views/DrawerContentScrollView';
import DrawerItemList from '@react-navigation/drawer/src/views/DrawerItemList';
import DrawerItem from '@react-navigation/drawer/src/views/DrawerItem';
import {Appbar, Divider} from 'react-native-paper';
import Space from './src/views/components/Space';
import {Icon} from 'react-native-elements';
import FavouritesScreen from './src/views/screens/FavouritesScreen';



import {useTranslation} from 'react-i18next';

I18nManager.forceRTL(true);
import './src/services/i18n';


// import {
//   I18nManager as RNI18nManager,
// } from 'react-native';
//
// import i18n from './src/services/i18n';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeContainer = () => {

  const {t} = useTranslation();


  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3f51b5',
        },
        headerTintColor: '#fff',
        elevation: 8,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name={t('all_recipes')} component={HomeScreen}/>
      <Stack.Screen name="RecipesCategory" component={DetailsScreen}/>
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen}/>
    </Stack.Navigator>
  );
};

const MainContainer = () => {
  const {t, i18n} = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={t('home')} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='home' size={20} color="#3f51b5"/>)
      }}>
        {(props) => <HomeContainer {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name={t('create_recipe')} component={CreateRecipeScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='edit' size={20} color="#3f51b5"/>)
      }}/>

      <Drawer.Screen name={t('favourites')} component={FavouritesScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='star' size={20} color="#3f51b5"/>)
      }}/>
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
  const {t, i18n} = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: '#3f51b5',
          height: 160,
          paddingBottom: 12,
          paddingStart: 8,
        }}
      >
        <View style={{flex: 1}}/>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}>Kfir</Text>
        <Text style={{ color: 'white', fontSize: 14}}>1@1.com</Text>
      </View>
      <DrawerItemList {...props} />
      <Space height={12}/>
      <Text style={{paddingStart: 8, fontWeight: 'bold', fontSize: 15}}>options</Text>
      <DrawerItem
        label={t('disconnect')}
        icon={({ _, __ }) => (<Icon name='logout' size={20} color="#3f51b5"/>)}
        onPress={() => {auth().signOut()}}
      />
    </DrawerContentScrollView>
  );
}

const App: () => React$Node = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();




  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;  // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <LoginScreen/>
    );
  }

  return (
    <NavigationContainer>
      <MainContainer/>
    </NavigationContainer>
  );
};

export default App;
