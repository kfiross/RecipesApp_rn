import React, {useEffect, useState} from 'react';
import {Text, View, Button, TouchableOpacity, Observer} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import RecipeComponent from '../components/RecipeComponent';
import {ScrollView} from 'react-native-gesture-handler';
import Recipe from '../../model/Recipe';
import firestore from '@react-native-firebase/firestore';
import RecipeStore from '../../stores/RecipeStore';
import {observer} from 'mobx-react';

const DetailsScreen = () => {
  const {name, index} = useRoute().params;
  const navigation = useNavigation();

  const store = new RecipeStore();

  useEffect(() => {
    store.getRecipes(index);
  }, []);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation]);

  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <RecipesInfo store={store} />
    </View>
  );
};

@observer
class RecipesInfo extends React.Component {
  render() {
    let {store} = this.props;
    return (
        <ScrollView style={{marginTop: 12}}>
          {
            store.recipes.map((recipe, i) => {
              return (<RecipeComponent key={i} recipe={recipe}/>);
            })
          }
        </ScrollView>
    );
  }
}

export default DetailsScreen;

const styles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
