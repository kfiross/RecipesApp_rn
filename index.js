/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import appColors from './src/res/appColors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  // fonts:{
  //   android: {
  //     regular: {
  //       fontFamily: fonts.rubik_regular,
  //       fontWeight: 'normal',
  //     },
  //   },
  // },
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary,
    accent: '#f1c40f',
    backdrop: 'black',

  },
};

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
