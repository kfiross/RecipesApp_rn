import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import Space from '../components/Space';
import { Chip } from 'react-native-paper';
import Ingredient from '../../model/Ingredient';
import RecipeStore from '../../stores/RecipeStore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import RecipeComponent from '../components/RecipeComponent';

const SearchScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);

  const store = new RecipeStore();

  const addIngredient = () =>{
    setIngredients([...ingredients, query]);
    setQuery('');
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((val, i) => index !== i));
  }

  const search = async () =>{
    console.log(33);
    await store.getRecipesWithIngredients(ingredients);
  }

  return (
    <View>
      <Appbar.Header>
        <Icon
          reverse
          name='menu'
          type='ionicon'
          color='transparent'
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content
          title={<Text>{t('search_recipes')}</Text>}
          style={{ alignItems: 'center', paddingEnd: 70}}>
        </Appbar.Content>
      </Appbar.Header>

      <View style={styles.screen}>
        <View style={styles.searchBar}>

          <TextInput
            style={{flex: 1}}
            placeholder={t('enter_ingredient')}
            onChangeText={text => setQuery(text)}
            value={query}
          />

          <Space width={12}/>
          <Button
            style={{marginVertical:14}}
            mode="contained"
            onPress={() => {addIngredient()}}>
            {t('add')}
          </Button>
          <Space width={8}/>
          <Button
            style={{marginVertical:14}}
            mode="contained"
            onPress={() => {search()}}>
            {t('search')}
          </Button>
        </View>

        <Text style={styles.title}>{t('chosen_ingredients')}</Text>
        <View style={styles.grid}>
          {
            ingredients.map((ingredient, index) => {
              return (
                <Chip
                  style={styles.chip}
                  key={`ingredient${index}`}
                  icon="information"
                  onPress={() => removeIngredient(index)}>
                  {ingredient}
                </Chip>
              )
            })
          }
        </View>

        <Space height={16}/>
        <Text style={styles.title}>{t('results')}:</Text>
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <RecipesInfo store={store} />
        </View>


      </View>
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

export default SearchScreen;

const styles = {
  screen: {
    padding: 8,
  },
  grid:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    // backgroundColor: "#2096F3",
    margin: 4
  },
  searchBar: {
    // height: 48,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};
