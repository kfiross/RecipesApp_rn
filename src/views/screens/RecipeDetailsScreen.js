import React from 'react';
import {Text, View, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import Space from '../components/Space';

const RecipeDetailsScreen = () => {
  const {recipe} = useRoute().params;
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe.name,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Image source={{uri: recipe.image}}
             style={{height: 200}}/>
      <View style={styles.content}>
        <Text style={styles.title}>Ingredients</Text>
        <View>
          {
            recipe.ingredients.map((ingredient, index) => {
              return (
                <View key={index}>
                  <Text style={styles.name}>* {ingredient.toString()}</Text>
                  <Space height={8}/>
                </View>
              );
            })
          }
        </View>
        <View style={{height: 12}}/>
        <Text style={styles.title}>Steps:</Text>
        <View>
          {
            recipe.steps.map((step, index) => {
              return (
                <View key={index}>
                  <Text style={styles.name}>{index+1}. {step}</Text>
                  <Space height={8}/>
                </View>
              );
            })
          }
        </View>
      </View>
    </ScrollView>

  );
};

export default RecipeDetailsScreen;

const styles = {
  content: {
    padding: 12,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  name:{
    fontSize: 18,
  },
};
