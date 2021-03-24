import Ingredient from './Ingredient';

export default class Recipe {
  constructor(id, name, image, ingredients, steps, category) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.ingredients = ingredients ?? [];
    this.steps = steps ?? [];
    this.category = category;
  }

  static fromSnapshot(documentSnapshot) {

    return new Recipe(
      documentSnapshot.id,
      documentSnapshot.data().name,
      documentSnapshot.data().image,
      (documentSnapshot.data().ingredients ?? []).map(item => {
        return new Ingredient(item.name, item.type, item.count);
      }),
      documentSnapshot.data().steps,
      documentSnapshot.data().category,
    );
  }
}
