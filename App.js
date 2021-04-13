import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/views/screens/LoginScreen';

import auth from '@react-native-firebase/auth';

import './src/services/i18n';
import MainContainer from './src/views/containers/MainContainer';

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

  // user logged out / not logged in yet
  if (!user) {
    return (
      <LoginScreen/>
    );
  }

  // user has logged in
  return (
    <NavigationContainer>
      <MainContainer/>
    </NavigationContainer>
  );
};

export default App;
