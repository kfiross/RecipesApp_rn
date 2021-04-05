import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import Space from '../components/Space';
import {useTranslation} from 'react-i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const CreateRecipeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [ingredients, setIngredients] = useState(Array.from({length: 3}));
  const [steps, setSteps] = useState(Array.from({length: 3}));

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = () => {
    if(ingredients.length > 2) {
      setIngredients(ingredients.slice(0, -1));
    }
  }

  const addStep = () => setSteps([...steps, '']);
  const removeStep = () => {
    if(steps.length > 2) {
      setSteps(steps.slice(0, -1));
    }
  }

  return (
    <View style={{display: 'flex'}}>
        <Appbar.Header>
          <Icon
            reverse
            name='menu'
            type='ionicon'
            color='transparent'
            onPress={() => navigation.openDrawer()}
          />
          <Appbar.Content
            title={<Text>{t('add_new_recipe')}</Text>}
            style={{ alignItems: 'center', paddingEnd: 80}}>
          </Appbar.Content>
        </Appbar.Header>

      <ScrollView style={{height: hp(80)}}>
        <View style={{paddingHorizontal: 24, paddingTop: 10}}>
          <TextInput placeholder={t('enter_recipe_name')}/>
          <Space height={12}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={[styles.title, {paddingTop: 4}]}>{t('ingredients')}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button icon="plus" mode="text" onPress={() => addIngredient()}>
                {t('add')}
              </Button>
              <Button icon="minus" mode="text" onPress={() => removeIngredient()}>
                {t('remove')}
              </Button>
            </View>
          </View>

          <Space height={8}/>
          {
            ingredients.map((ingredient, i) => {
              return <TextInput key={`ingredient_${i}`} placeholder={t('enter_ingredient')} value={ingredient} />
            })
          }
          <Space height={12}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={[styles.title, {paddingTop: 4}]}>{t('steps')}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button icon="plus" mode="text" onPress={() => addStep()}>
                {t('add')}
              </Button>
              <Button icon="minus" mode="text" onPress={() => removeStep()}>
                {t('remove')}
              </Button>
            </View>
          </View>
          <Space height={8}/>
          {
            steps.map((step, i) => {
              return <TextInput key={`step_${i}`} placeholder={t('enter_step')} value={step}/>
            })
          }
          <Space height={24}/>
        </View>
      </ScrollView>



      <Button
        style={{marginHorizontal:24}}
        mode="contained"
        onPress={() => {}}>
        {t('add_recipe')}
      </Button>
    </View>
  );
};

export default CreateRecipeScreen;

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
