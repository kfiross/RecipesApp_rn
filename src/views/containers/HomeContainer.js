import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

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

export default HomeContainer;
