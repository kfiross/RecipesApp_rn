import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../res/appColors';
const Stack = createStackNavigator();

const HomeContainer = () => {

  const {t} = useTranslation();


  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: appColors.primary,
        },
        headerTintColor: '#fff',
        elevation: 8,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name={t('all_recipes')} component={HomeScreen}/>
      <Stack.Screen name="RecipesCategory" component={CategoryScreen}/>
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen}/>
    </Stack.Navigator>
  );
};

export default HomeContainer;
