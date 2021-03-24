import {action, computed, observable} from 'mobx';
import firestore from '@react-native-firebase/firestore';
import Recipe from '../model/Recipe';

class RecipeStore {
  @observable
  list = [];

  @computed get recipes() {
    return this.list;
  }

  @action
  async getRecipes(category) {
    let querySnapshot = await firestore().collection('recipes')
      .where('category','==',category)
      .get();

    this.list = [];
    querySnapshot.forEach((documentSnapshot) => {
      let recipe = Recipe.fromSnapshot(documentSnapshot);
      this.list.push(recipe);
    });
  }

  @action
  async getFavouritesRecipes(userId) {
    let userSnapshot = await firestore().collection('users')
      .doc(userId)
      .get();

    this.list = [];
    for (const id of userSnapshot.get('favourites')) {
      let documentSnapshot = await firestore().collection('recipes').doc(id).get();
      let recipe = Recipe.fromSnapshot(documentSnapshot);
      this.list.push(recipe);
    }
  }
}

export default RecipeStore;
