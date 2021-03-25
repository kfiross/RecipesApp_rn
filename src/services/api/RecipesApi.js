import firestore from '@react-native-firebase/firestore';

class RecipesApi{
  // static async addRecipe(recipe){
  //   let docData = await firestore().collection('recipes').add(recipe);
  //   return docData.id;
  // }
  //
  // static async removeRecipe(recipeId){
  //   await firestore().collection('recipes').doc(recipeId).delete();
  // }

  static async addRecipeToUserFavs(recipeId, userId){
    await firestore().doc(`users/${userId}`).update(
      'favourites', firestore.FieldValue.arrayUnion(recipeId)
    );
    console.log(17)
  }

  static async removeRecipeFromUserFavs(recipeId, userId){
    await firestore().doc(`users/${userId}`).update(
      'favourites', firestore.FieldValue.arrayRemove(recipeId)
    );
  }

  static async getUserFavsRecipes(userId){
    let userSnapshot = await firestore().doc(`users/${userId}`).get();
    return userSnapshot.get('favourites');
  }
}

export default RecipesApi;
