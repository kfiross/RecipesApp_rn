import React, {useEffect, useState} from 'react';
import {Text, View, Button, Image, TouchableHighlight} from 'react-native';
import {Card, IconButton, Colors} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import RecipesApi from '../../services/api/RecipesApi';
import Images from '../../res/images';
import {ImageLoader} from 'react-native-image-fallback';


const RecipeComponent = ({recipe}) => {
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const currUserId = auth().currentUser.uid;


  useEffect(() => {
    RecipesApi.getUserFavsRecipes(currUserId).then((favRecipes) => {
      if(favRecipes == null || favRecipes === []){
        setIsFav(false)
      }
      else {
        setIsFav(favRecipes.includes(recipe.id))
      }
    })
  }, []);

  const updateIfFav = async () => {
    if(isFav) {
      await RecipesApi.removeRecipeFromUserFavs(recipe.id, currUserId);
    }
    else{
      await RecipesApi.addRecipeToUserFavs(recipe.id, currUserId);
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
              <ImageLoader
                style={{flex: 1, zIndex: 2,width: 160, overflow: 'hidden', borderRadius: 12, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                source={recipe.image}
                fallback={Images.not_found}
              />
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
