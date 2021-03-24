/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import {Button, Text, View} from 'react-native';
import DrawerContentScrollView from '@react-navigation/drawer/src/views/DrawerContentScrollView';
import DrawerItemList from '@react-navigation/drawer/src/views/DrawerItemList';
import DrawerItem from '@react-navigation/drawer/src/views/DrawerItem';
import {Appbar, Divider} from 'react-native-paper';
import Space from './src/views/components/Space';
import {Icon} from 'react-native-elements';
import FavouritesScreen from './src/views/screens/FavouritesScreen';

// import {
//   I18nManager as RNI18nManager,
// } from 'react-native';
//
// import i18n from './src/services/i18n';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeContainer = () => {
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
      <Stack.Screen name="All Recipes" component={HomeScreen}/>
      <Stack.Screen name="RecipesCategory" component={DetailsScreen}/>
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen}/>
    </Stack.Navigator>
  );
};

const MainContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" options={{
        drawerIcon: ({ _, __ }) => (<Icon name='home' size={20} color="#3f51b5"/>)
      }}>
        {(props) => <HomeContainer {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name="Create Recipe" component={CreateRecipeScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='edit' size={20} color="#3f51b5"/>)
      }}/>

      <Drawer.Screen name="Favourites" component={FavouritesScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='star' size={20} color="#3f51b5"/>)
      }}/>
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
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
        label="Disconnect"
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
  // const [isI18nInitialized, setI18nInitialized] = useState(false);

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

  // useEffect(() -> {
  //   i18n.init()
  //     .then(() => {
  //       const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
  //       // RN doesn't always correctly identify native
  //       // locale direction, so we force it here.
  //       if (i18n.dir !== RNDir) {
  //         const isLocaleRTL = i18n.dir === 'RTL';
  //         RNI18nManager.forceRTL(isLocaleRTL);
  //         // RN won't set the layout direction if we
  //         // don't restart the app's JavaScript.
  //         // Updates.reloadFromCache();
  //       }
  //       setI18nInitialized(true);
  //     })
  //     .catch((error) => console.warn(error));
  // });

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

  //
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator
  //       screenOptions={{
  //         headerShown: false
  //       }}>
  //       {authStore.isLogged ? (
  //         <Stack.Screen name="home" component={HomeScreen} />
  //       ) : (
  //         <Stack.Screen name="login" component={LoginScreen} />
  //       )}
  //
  //       {/*<Stack.Screen name="login" component={LoginScreen}  options={{ headerShown: false }}/>*/}
  //       {/*<Stack.Screen name="main" options={{ headerShown: false }}>*/}
  //       {/*  {(props) => <MainContainer {...props} />}*/}
  //       {/*</Stack.Screen>*/}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  //
  // );
};

export default App;
