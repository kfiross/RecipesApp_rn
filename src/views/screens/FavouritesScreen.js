import React, {useEffect} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import Space from '../components/Space';
import RecipeStore from '../../stores/RecipeStore';
import auth from '@react-native-firebase/auth';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import RecipeComponent from '../components/RecipeComponent';
import {useTranslation} from 'react-i18next';
import firestore from  '@react-native-firebase/firestore';

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const store = new RecipeStore();
  const currUserId = auth().currentUser.uid;

  useEffect(() => {
    firestore().doc(`users/${currUserId}`).onSnapshot(() => {
      store.getFavouritesRecipes(currUserId);
    });
  }, []);

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
          title={<Text>{t('favourites')}</Text>}
          style={{ alignItems: 'center', paddingEnd: 70}}>
        </Appbar.Content>
      </Appbar.Header>


      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <RecipesInfo store={store} />
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

export default FavouritesScreen;

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
