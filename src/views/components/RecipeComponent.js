import React, {useState} from 'react';
import {Text, View, Button, Image, TouchableHighlight} from 'react-native';
import {Card} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Recipe from '../../model/Recipe';
import {useNavigation} from '@react-navigation/core';

const RecipeComponent = ({recipe}) => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: 12}}>
      <TouchableHighlight
        underlayColor="white"
        onPress={() => navigation.navigate('RecipeDetails', {recipe})}>
        <Card style={styles.card}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 6}}>
              <Image source={{uri: recipe.image}}
                     style={{flex: 1, overflow: 'hidden', borderRadius: 12, borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
              </Image>
            </View>
            <View style={{width: 12}}/>
            <View style={[styles.content, {flex: 7}]}>
              <Text style={styles.title}>{recipe.name}</Text>
            </View>
          </View>
        </Card>
      </TouchableHighlight>


    </View>
  );
};

export default RecipeComponent;

const styles = {
  card: {
    height: 160,
    elevation: 6,
    margin: 4,
    borderRadius: 12,
  },
  content:{
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};
