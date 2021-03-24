import React, {useEffect, useState} from 'react';
import {Text, View, Button, Image, TouchableHighlight} from 'react-native';
import {Card, IconButton, Colors} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import RecipeStore from '../../stores/RecipeStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const RecipeComponent = ({recipe}) => {
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    firestore().doc(`users/${auth().currentUser.uid}`).get().then((snapshot) => {
      if(snapshot.get('favourites') == null || snapshot.get('favourites') === []){
        setIsFav(false)
      }
      setIsFav(snapshot.get('favourites').includes(recipe.id))
    })
  }, []);

  const updateIfFav = async () => {
    if(isFav) {
      await firestore().doc(`users/${auth().currentUser.uid}`).update(
        'favourites', firestore.FieldValue.arrayRemove(recipe.id)
      );
    }
    else{
      await firestore().doc(`users/${auth().currentUser.uid}`).update(
        'favourites', firestore.FieldValue.arrayUnion(recipe.id)
      );
    }

    setIsFav(!isFav);
  }

  return (
    <View style={{marginBottom: 12}}>
      <TouchableHighlight
        underlayColor="white"
        onPress={() => navigation.navigate('RecipeDetails', {recipe})}>
        <Card style={styles.card}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 6}}>
              <View style={{position:'absolute'}}>

                  <IconButton style={{backgroundColor: 'white', zIndex: 5}}
                              icon="star"
                              color={isFav ? Colors.red500 : Colors.black}
                              size={28}
                              onPress={() => updateIfFav()}>
                  </IconButton>


              </View>
              <Image source={{uri: recipe.image}}
                     style={{flex: 1, zIndex: 2, overflow: 'hidden', borderRadius: 12, borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
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
